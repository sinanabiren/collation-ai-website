# Collation AI Website - Next.js Clone

A modern, SEO-optimized Next.js website clone of Collation AI, designed for maximum LLM discoverability and search engine visibility.

## Key Features

### LLM Optimization
- **Server-Side Rendering (SSR)**: Content is immediately available in HTML for LLM crawlers
- **Semantic HTML**: Proper heading hierarchy (H1, H2, H3) for content structure
- **Rich Metadata**: Comprehensive meta tags, Open Graph, and Twitter Card data
- **JSON-LD Structured Data**: Schema.org markup for better content understanding
- **Keyword-Rich Content**: Strategic placement of industry keywords throughout the site

### SEO Features
- **Sitemap**: Automatic XML sitemap generation
- **Robots.txt**: Crawler-friendly configuration
- **Static Export Ready**: Can be deployed as static HTML for maximum crawlability
- **Fast Performance**: Optimized for Core Web Vitals
- **Mobile Responsive**: Works perfectly on all devices

## Getting Started

### Install Dependencies
\`\`\`bash
npm install
\`\`\`

### Run Development Server
\`\`\`bash
npm run dev
\`\`\`

Visit [http://localhost:3000](http://localhost:3000) to see the site.

### Build for Production
\`\`\`bash
npm run build
npm start
\`\`\`

### Export as Static Site (Optional)
For maximum LLM crawlability, you can export the site as static HTML:

1. Uncomment `output: 'export'` in `next.config.js`
2. Run `npm run build`
3. The static site will be in the `out/` directory

## Project Structure

\`\`\`
├── app/
│   ├── layout.tsx          # Root layout with SEO metadata
│   ├── page.tsx            # Homepage
│   ├── globals.css         # Global styles
│   ├── blog/
│   │   ├── page.tsx        # Blog listing
│   │   └── [slug]/
│   │       └── page.tsx    # Individual blog posts
│   ├── robots.ts           # Robots.txt generation
│   └── sitemap.ts          # Sitemap generation
├── components/
│   ├── Navigation.tsx      # Header navigation
│   └── Footer.tsx          # Footer component
├── public/                 # Static assets
└── next.config.js         # Next.js configuration
\`\`\`

## Why This Approach Works for LLMs

### 1. Server-Side Rendering
Unlike Framer sites that render content via JavaScript, Next.js serves fully-rendered HTML. LLMs can immediately read all content without executing JavaScript.

### 2. Semantic Structure
The site uses proper HTML5 semantic elements and heading hierarchy, making it easy for LLMs to understand content structure and importance.

### 3. Rich Metadata
Every page includes:
- Descriptive title tags
- Comprehensive meta descriptions
- Keyword tags
- Open Graph data
- JSON-LD structured data

### 4. Content-First Design
The site prioritizes text content with strategic keyword placement, making it highly discoverable for relevant search queries.

## Customization

### Adding Blog Posts
Edit `app/blog/page.tsx` to add new blog posts to the listing, and add corresponding entries in `app/blog/[slug]/page.tsx`.

### Updating Content
All content is in the component files. Simply edit the text in:
- `app/page.tsx` - Homepage content
- `app/blog/page.tsx` - Blog listing
- `components/Navigation.tsx` - Navigation links
- `components/Footer.tsx` - Footer content

### Styling
The site uses Tailwind CSS. Customize colors and styles in:
- `tailwind.config.ts` - Theme configuration
- `app/globals.css` - Global styles

## Deployment

The site can be deployed to any platform that supports Next.js:

- **Vercel** (Recommended): Zero-config deployment
- **Netlify**: Supports Next.js SSR
- **AWS Amplify**: Full Next.js support
- **Static Export**: Any static hosting (Cloudflare Pages, GitHub Pages, etc.)

## Performance

The site is optimized for performance with:
- Minimal JavaScript bundle size
- Optimized images (when added)
- CSS-in-JS with Tailwind
- Fast page loads
- Excellent Core Web Vitals scores

## Support

For questions or issues, please contact Collation AI support.
