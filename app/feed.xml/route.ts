import { blogPosts } from '@/data/blogPosts';

export async function GET() {
  const baseUrl = 'https://www.collation.ai';

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Collation.AI Blog</title>
    <link>${baseUrl}</link>
    <description>AI-powered financial data aggregation and automation insights for wealth management</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    ${blogPosts
      .map(
        (post) => `
    <item>
      <title>${post.title}</title>
      <link>${baseUrl}${post.url}</link>
      <description>${post.excerpt}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <guid isPermaLink="true">${baseUrl}${post.url}</guid>
    </item>`
      )
      .join('')}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
