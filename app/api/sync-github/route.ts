import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { token, owner, repo, branch, path, content, message } = await req.json();

    // Validate required fields
    if (!token || !owner || !repo || !path || !content) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // First, check if the file already exists to get its SHA
    let sha: string | undefined;
    try {
      const getFileResponse = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${branch}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Accept': 'application/vnd.github.v3+json',
            'User-Agent': 'Collation-AI-Builder',
          },
        }
      );

      if (getFileResponse.ok) {
        const fileData = await getFileResponse.json();
        sha = fileData.sha;
      }
    } catch (error) {
      // File doesn't exist, which is fine - we'll create it
      console.log('File does not exist yet, will create new file');
    }

    // Create or update the file
    const base64Content = Buffer.from(content).toString('base64');

    const body: any = {
      message: message || `Update ${path}`,
      content: base64Content,
      branch,
    };

    // Include SHA if file exists (for update)
    if (sha) {
      body.sha = sha;
    }

    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'Collation-AI-Builder',
        },
        body: JSON.stringify(body),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error('GitHub API error:', result);
      return NextResponse.json(
        { success: false, error: result.message || 'Failed to push to GitHub' },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        url: result.content?.html_url,
        sha: result.content?.sha,
      },
    });
  } catch (error: any) {
    console.error('Error syncing to GitHub:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
