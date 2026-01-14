import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const posts = await prisma.blogPost.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      select: {
        slug: true,
        title: true,
        author: true,
        date: true,
        category: true,
        readTime: true,
        excerpt: true,
        image: true,
      }
    });

    // Transform to match the format expected by the frontend
    const transformedPosts = posts.map((post: any) => ({
      title: post.title,
      author: post.author,
      date: post.date,
      url: `/blog/${post.slug}`,
      image: post.image,
      excerpt: post.excerpt,
    }));

    return NextResponse.json(transformedPosts);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}
