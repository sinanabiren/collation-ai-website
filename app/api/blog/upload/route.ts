import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import fs from 'fs/promises';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

// Dynamic config to prevent static optimization
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const execAsync = promisify(exec);

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function extractTitle(text: string): string {
  // Try to find title in first few lines
  const lines = text.split('\n').filter(line => line.trim());

  // Look for the first substantial line (likely the title)
  for (const line of lines.slice(0, 5)) {
    const trimmed = line.trim();
    if (trimmed.length > 20 && trimmed.length < 200) {
      return trimmed;
    }
  }

  return lines[0]?.trim() || 'Untitled Post';
}

function convertTextToHTML(text: string): string {
  const lines = text.split('\n');
  let html = '';
  let inList = false;
  let skipTitle = true; // Skip the first title line

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (!line) {
      if (inList) {
        html += '</ul>\n';
        inList = false;
      }
      continue;
    }

    // Skip the title (first major line)
    if (skipTitle && line.length > 20) {
      skipTitle = false;
      continue;
    }

    // Check for headers (lines that look like section titles)
    if (line.length < 100 && line.length > 10 &&
        (line === line.toUpperCase() ||
         /^[A-Z][^.!?]*$/.test(line) ||
         /^The\s|^Why\s|^How\s|^What\s/.test(line))) {
      if (inList) {
        html += '</ul>\n';
        inList = false;
      }
      html += `<h2>${line}</h2>\n`;
      continue;
    }

    // Check for bullet points
    if (line.startsWith('•') || line.startsWith('-') || /^\d+\./.test(line)) {
      if (!inList) {
        html += '<ul>\n';
        inList = true;
      }
      const content = line.replace(/^[•\-]\s*/, '').replace(/^\d+\.\s*/, '');
      html += `<li>${content}</li>\n`;
      continue;
    }

    // Regular paragraph
    if (inList) {
      html += '</ul>\n';
      inList = false;
    }

    // Skip reference markers and citations
    if (/^\[\d+\]/.test(line) || line.startsWith('http')) {
      continue;
    }

    html += `<p>${line}</p>\n`;
  }

  if (inList) {
    html += '</ul>\n';
  }

  return html;
}

function calculateReadTime(text: string): string {
  const wordsPerMinute = 200;
  const words = text.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('pdf') as File;
    const author = formData.get('author') as string;
    const category = formData.get('category') as string;
    const excerpt = formData.get('excerpt') as string;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Convert File to Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Dynamically import pdf-parse to avoid build-time issues
    const pdfParse = await import('pdf-parse');
    const pdf = (pdfParse as any).default || pdfParse;

    // Parse PDF
    const pdfData = await pdf(buffer);
    const text = pdfData.text;

    // Extract title from PDF
    const title = extractTitle(text);
    const slug = generateSlug(title);

    // Check if slug already exists
    const existing = await prisma.blogPost.findUnique({
      where: { slug }
    });

    if (existing) {
      return NextResponse.json(
        { error: 'A blog post with this title already exists' },
        { status: 400 }
      );
    }

    // Convert text to HTML
    const content = convertTextToHTML(text);

    // Calculate read time
    const readTime = calculateReadTime(text);

    // Get current date
    const date = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });

    // Save PDF file temporarily and extract hero image
    const tempPdfPath = path.join(process.cwd(), 'temp', `${slug}.pdf`);
    await fs.mkdir(path.dirname(tempPdfPath), { recursive: true });
    await fs.writeFile(tempPdfPath, buffer);

    // Extract hero image from PDF using sips
    const imageFileName = `${slug}-hero.jpg`;
    const imagePath = path.join(process.cwd(), 'public', 'assets', imageFileName);

    try {
      await execAsync(`sips -s format jpeg "${tempPdfPath}" --out "${imagePath}"`);
    } catch (error) {
      console.error('Image extraction failed:', error);
      // Use a default image if extraction fails
    }

    // Clean up temp PDF
    await fs.unlink(tempPdfPath).catch(() => {});

    // Create blog post in database
    const blogPost = await prisma.blogPost.create({
      data: {
        slug,
        title,
        author,
        date,
        category,
        readTime,
        excerpt,
        content,
        image: `/assets/${imageFileName}`,
        pdfFileName: file.name,
      },
    });

    return NextResponse.json({
      success: true,
      slug: blogPost.slug,
      title: blogPost.title,
      message: 'Blog post created successfully'
    });

  } catch (error) {
    console.error('Error processing PDF:', error);
    return NextResponse.json(
      { error: 'Failed to process PDF file' },
      { status: 500 }
    );
  }
}
