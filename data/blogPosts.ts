export type BlogPost = {
  title: string;
  author: string;
  date: string;
  url: string;
  image: string;
  excerpt: string;
};
// Cache bust: 2026-02-24 10:30

export const blogPosts: BlogPost[] = [
  {
    title: "Building AI-Native Infrastructure: Empowering Wealth Managers with True Self-Service",
    author: "Sinan Biren",
    date: "Feb 24, 2026",
    url: "/blog/ai-native-infrastructure-wealth-managers-self-service",
    image: "/blog-images/ai-native-infrastructure.png",
    excerpt: "Wealth management faces fragmented data from custodians, CRMs, PDFs, and APIs—driving manual reconciliation, delays, and lost insights. AI-native infrastructure, built ground-up for agentic AI, changes this by enabling true self-service with automated data ingestion, unified models, and autonomous scaling."
  },
  {
    title: "The Dawn of Service-as-Software: AI's Bold Shift in Enterprise Tech",
    author: "Sinan Biren",
    date: "Feb 18, 2026",
    url: "/blog/service-as-software-ai-enterprise-tech",
    image: "/blog-images/service-as-software-ai-enterprise.png",
    excerpt: "Traditional SaaS models face intense pressure from AI advancements, but established players are evolving into 'Service-as-Software' (SaS) providers that automate entire workflows. This transition promises to blend software budgets with labor costs, unlocking massive growth opportunities for adaptable vendors."
  },
  {
    title: "Just as we got excited about AI agents running chores for us, they've already started gossiping behind our backs?",
    author: "Sinan Biren",
    date: "Feb 12, 2026",
    url: "/blog/ai-agents-gossiping-security-risks",
    image: "/blog-images/ai-agents-security-risks.png",
    excerpt: "OpenClaw and Moltbook reveal the dark side of AI agents: persistent memory, untrusted content, and real-world actions create a lethal combination. Without secure guardrails, we're handing over our keys to agents that might not be as trustworthy as we think."
  },
  {
    title: "Is the SaaS Model Dying—or Being Reborn Through AI?",
    author: "Sinan Biren",
    date: "Feb 4, 2026",
    url: "/blog/is-the-saas-model-dying-or-being-reborn-through-ai",
    image: "/blog-images/saas-model-ai-transformation.png",
    excerpt: "SaaS companies face unprecedented pressure in 2026 as AI tools threaten traditional subscription models. Yet this 'SaaSpocalypse' might ignite a powerful evolution rather than spell the end—discover how AI-native SaaS is being reborn."
  },
  {
    title: "How We Got Here: Reporting Platforms Did Their Job",
    author: "Sinan Biren",
    date: "Jan 27, 2026",
    url: "/blog/how-we-got-here-reporting-platforms-did-their-job",
    image: "/blog-images/shadow-data-layer.png",
    excerpt: "For the last decade, performance reporting solutions did exactly what they were supposed to do. Today, the real category shift is replacing the shadow layer with AI-native data infrastructure."
  },
  {
    title: "Vibe-Coding with Guardrails: Secure Innovation for Wealth Management",
    author: "Sinan Biren",
    date: "Jan 21, 2026",
    url: "/blog/vibe-coding-with-guardrails",
    image: "/blog-images/vibe-coding-guardrails.png",
    excerpt: "Vibe-coding empowers wealth managers to build custom UIs using natural language prompts, but its unpredictable nature demands robust guardrails to protect sensitive data."
  },
  {
    title: "Agentic AI Bots Are Eating Manual PE Data Ops: The End of PDF Hell in Alternatives",
    author: "Sinan Biren",
    date: "Jan 14, 2026",
    url: "/blog/agentic-ai-bots-eating-manual-pe-data-ops",
    image: "/blog-images/agentic-ai-pdf-hell.png",
    excerpt: "The alternative investments data world is moving from static PDF parsing to autonomous, agentic workflows where AI-driven bots ingest, classify, interpret, and route PE documents end-to-end."
  },
  {
    title: "What Basketball Teaches Us About Building Winning Teams in WealthTech",
    author: "Sinan Biren",
    date: "Dec 23, 2025",
    url: "/blog/basketball-winning-teams-wealthtech",
    image: "/blog-images/basketball-winning-teams.png",
    excerpt: "Success isn't just about individual talent — it's about how well a team moves together. Lessons from basketball coaching applied to wealth management technology."
  },
  {
    title: "Open Banking: Transforming Wealth Management",
    author: "Sinan Biren",
    date: "Dec 10, 2025",
    url: "/blog/open-banking-transforming-wealth-management",
    image: "/blog-images/open-banking-wealth-management.png",
    excerpt: "Open banking empowers wealth managers by enabling secure, API-driven access to clients' financial data across institutions, fostering personalized strategies and operational efficiency."
  },
  {
    title: "PDFs to Profits: Automate Parsing, Eliminate Manual Drudgery",
    author: "Sinan Biren",
    date: "Dec 2, 2025",
    url: "/blog/pdfs-to-profits-automate-parsing-eliminate-manual-drudgery",
    image: "/blog-images/pdfs-to-profits.png",
    excerpt: "Automating PDF parsing eliminates repetitive, error-prone manual data entry and turns static documents into live, reusable data that can feed downstream systems in seconds instead of hours."
  },
  {
    title: "5 Questions Every Executive Should Ask Before Adopting AI",
    author: "Nicole Grosskopf",
    date: "Dec 1, 2025",
    url: "/blog/questions-executives-should-ask-before-adopting-ai",
    image: "/blog-images/executives-ai-questions.png",
    excerpt: "The gap between AI momentum and meaningful implementation—five critical questions to ensure your AI initiatives deliver measurable business value in financial services."
  },
  {
    title: "What 'Actionable Intelligence' can we extract from data to empower Financial Advisors?",
    author: "Sinan Biren",
    date: "Nov 24, 2025",
    url: "/blog/what-actionable-intelligence-can-we-extract-from-data-empower-financial-advisors",
    image: "https://media.licdn.com/dms/image/v2/D4E12AQGqJAX-06MQLw/article-cover_image-shrink_720_1280/B4EZq1xfzPKoAI-/0/1763986243374?e=2147483647&v=beta&t=t-cToM0RQaYccXfp8E-10QGf7NeTWXw2zxNvF3WswTA",
    excerpt: "Transforming raw data into practical insights that enhance advisor performance—from sales science to productivity benchmarking and AI-powered monitoring."
  },
  {
    title: "Vibe-coding is revolutionizing how wealth managers approach reporting and portfolio management",
    author: "Sinan Biren",
    date: "Nov 11, 2025",
    url: "/blog/vibe-coding-revolutionizing-wealth-management-reporting-portfolio-management",
    image: "https://framerusercontent.com/images/K66K68WistVC1lbVpYLLSqzlkU.png?lossless=1&width=1279&height=720",
    excerpt: "How vibe-coding empowers wealth managers to build highly customized, advanced reports without technical expertise—delivering genuine flexibility and speed."
  },
  {
    title: "Decoding Data Storage: Database, Data Warehouse, and Data Lake in Financial Services",
    author: "Sinan Biren",
    date: "Oct 31, 2025",
    url: "https://www.collation.ai/blog/decoding-data-storage-database-data-warehouse-data-lake-in-financial-services",
    image: "https://framerusercontent.com/images/pRz69Yxifz1R7WjvP8RutjNo.png?lossless=1&width=1280&height=720",
    excerpt: "What databases, warehouses, and lakes really mean for financial services—and when to use each."
  },
  {
    title: "Disruption Of Traditional SaaS Models In Wealth Management.. Should We Blame Agentic AI?",
    author: "Sinan Biren",
    date: "Oct 23, 2025",
    url: "https://www.collation.ai/blog/disruption-of-traditional-saas-models-in-wealth-management",
    image: "https://framerusercontent.com/images/RMrTgzHblKtQ6xsfGI9crIVGI8k.png?lossless=1&width=1280&height=720",
    excerpt: "Agentic AI is reshaping software models across wealth management—here's how and why."
  },
  {
    title: "AI Agents: The Next Evolution in Wealth Management for RIAs",
    author: "Sinan Biren",
    date: "Oct 8, 2025",
    url: "https://www.collation.ai/blog/ai-agents-the-next-evolution-in-wealth-management-for-rias",
    image: "https://framerusercontent.com/images/A3IDWjsjbN4RDUMd3V4F2lI75I.png?lossless=1&width=1280&height=720",
    excerpt: "How AI agents take on real work for RIAs—from data ops to client reporting."
  },
  {
    title: "Data Warehouse And Use-Cases For RIAs/FOs?",
    author: "Sinan Biren",
    date: "Sep 2, 2025",
    url: "https://www.collation.ai/blog/what-is-a-data-warehouse-and-how-is-it-used-by-financial-institutions-such-as-registered-investment-advisors-(rias)-family-offices-(fos)",
    image: "https://framerusercontent.com/images/s22DxjCtUDodf0yHEUqoRI4awY.png?lossless=1&width=1280&height=720",
    excerpt: "Use-cases for warehouses in RIAs and Family Offices, with practical examples."
  },
  {
    title: "Asset Management Sector Is Aggressively Automating Its Operational Processes, BUT..",
    author: "Patrick G. Burke",
    date: "Aug 21, 2025",
    url: "https://www.collation.ai/blog/the-hidden-cost-why-good-enough-data-is-hurting-your-ria-copy",
    image: "https://framerusercontent.com/images/iLDOEjr4PWxtd6A3987T8RJ8bc.png?lossless=1&width=1200&height=673",
    excerpt: "Why automation is surging—and where legacy processes still bottleneck performance."
  },
  {
    title: "The Hidden Cost: Why \"Good Enough\" Data is Hurting Your RIA",
    author: "Patrick G. Burke",
    date: "Jul 8, 2025",
    url: "https://www.collation.ai/blog/the-hidden-cost-why-good-enough-data-is-hurting-your-ria",
    image: "https://framerusercontent.com/images/Zf3NlHnd2p7oUqcJ08CZXGimRI.png?lossless=1&width=1200&height=655",
    excerpt: "The real operational cost of mediocre data quality—and how to fix it."
  },
  {
    title: "Family Offices: Streamlining Performance Reporting With GL Overlay Solutions",
    author: "Patrick G. Burke",
    date: "Jan 13, 2025",
    url: "https://www.collation.ai/blog/family-offices-streamlining-performance-reporting-with-gl-overlay-solutions",
    image: "https://framerusercontent.com/images/hluZWKNJ3DV9dAwmI15lAMaFG4.png?lossless=1&width=1280&height=720",
    excerpt: "How GL overlays improve reporting workflows for family offices."
  },
  {
    title: "The Unseen Costs: Why Manual Data Management is Impacting Your RIA's Bottom Line",
    author: "Sinan Biren",
    date: "Jun 17, 2025",
    url: "https://www.collation.ai/blog/the-unseen-costs-why-manual-data-management-is-impacting-your-ria-s-bottom-line",
    image: "https://framerusercontent.com/images/SWW92a1ZuqcN4UJUQb66hHpcYU.png?lossless=1&width=1921&height=1086",
    excerpt: "Manual data ops drain time and margin—here are the numbers."
  },
  {
    title: "Data Lakehouse: Solving Wealth Management's Data Challenges",
    author: "Raymond DiNunzio",
    date: "May 15, 2025",
    url: "https://www.collation.ai/blog/data-lakehouse-solving-wealth-management-s-data-challenges",
    image: "https://framerusercontent.com/images/17K9JGpbp2OZD9IPgkH9xpysjHM.png?lossless=1&width=1920&height=1096",
    excerpt: "A pragmatic overview of lakehouse architecture for wealth managers."
  },
  {
    title: "Navigating the Technology Maze: Real Challenges Family Offices Face in Modernization",
    author: "Alex Ortolani",
    date: "May 13, 2025",
    url: "https://www.collation.ai/blog/navigating-the-technology-maze-real-challenges-family-offices-face-in-modernization",
    image: "https://framerusercontent.com/images/vac9bBHu3aZ1cQoF3U7L6ZNaEg.png?lossless=1&width=1921&height=1921",
    excerpt: "Common pitfalls in modernization—and paths through them."
  },
  {
    title: "More RIAs Are Using Multiple Custodians",
    author: "Sinan Biren",
    date: "May 6, 2025",
    url: "https://www.collation.ai/blog/more-rias-are-using-multiple-custodians",
    image: "https://framerusercontent.com/images/ADjVgAGimUf7rQrrKiiIH0ftoDY.png?lossless=1&width=1920&height=2550",
    excerpt: "Why multi-custodian strategies are rising—and the data implications."
  },
  {
    title: "Breaking Down Data Barriers: How Multi-Family Offices Achieve Total Automation",
    author: "Sinan Biren",
    date: "Jan 13, 2025",
    url: "https://www.collation.ai/blog/breaking-down-data-barriers-how-multi-family-offices-achieve-total-automation",
    image: "https://framerusercontent.com/images/L6WvripwEmL6Ih2I25oNwQy23w.png?lossless=1&width=1921&height=774",
    excerpt: "How top multi-family offices automate end-to-end data workflows."
  },
  {
    title: "Seamless Implementation: How Wealth Managers Can Adopt AI Without Disrupting Existing Systems",
    author: "Sinan Biren",
    date: "Jan 14, 2025",
    url: "https://www.collation.ai/blog/seamless-implementation-how-wealth-managers-can-adopt-ai-without-disrupting-existing-systems",
    image: "https://framerusercontent.com/images/AJP4CYp5bi4aZQbJFKqoHXW8HA.png?lossless=1&width=1921&height=774",
    excerpt: "Adopt AI with minimal disruption—tactics and timeline."
  },
  {
    title: "The Hidden ROI: Calculating the True Value of Automated Data Operations for Family Offices",
    author: "Sinan Biren",
    date: "Jan 12, 2025",
    url: "https://www.collation.ai/blog/the-hidden-roi-calculating-the-true-value-of-automated-data-operations-for-family-offices",
    image: "https://framerusercontent.com/images/7RnIPFjVldq7ODXfKVZun0ut1Lg.png?lossless=1&width=1920&height=1077",
    excerpt: "How to quantify the ROI of automated data operations."
  },
  {
    title: "Audit-Ready Data: How Agentic AI Bot Eliminate Compliance Headaches for RIAs",
    author: "Sinan Biren",
    date: "Jan 13, 2025",
    url: "https://www.collation.ai/blog/audit-ready-data-how-agentic-ai-bot-eliminate-compliance-headaches-for-rias",
    image: "https://framerusercontent.com/images/VqWU5QqG7w7PlXY8lY5UWdZprk.png?lossless=1&width=1920&height=774",
    excerpt: "Keep data audit-ready with agentic AI—reduce compliance overhead."
  },
  {
    title: "Beyond the Aspirin: How Collation's AI Agents Provide Lasting Relief for Wealth Managers' Data Headaches",
    author: "Sinan Biren",
    date: "Jan 20, 2025",
    url: "https://www.collation.ai/blog/beyond-the-aspirin-how-collation-s-ai-agents-provide-lasting-relief-for-wealth-managers-data-headaches",
    image: "https://framerusercontent.com/images/c9WPWRc5Cw3TT3xaFPmGh18bo.png?lossless=1&width=1920&height=774",
    excerpt: "Moving from quick fixes to lasting automation gains."
  },
  {
    title: "The True Cost of Data Silos: Why Financial Firms Need Integrated AI Solutions",
    author: "Sinan Biren",
    date: "Jan 20, 2025",
    url: "https://www.collation.ai/blog/the-true-cost-of-data-silos-why-financial-firms-need-integrated-ai-solutions",
    image: "https://framerusercontent.com/images/48oa49kDSusJWsqKupTgRXDDGs.png?lossless=1&width=1921&height=774",
    excerpt: "Siloed data hurts growth—integrated AI fixes it."
  },
  {
    title: "From Manual to Magical: How Agentic AI is Transforming Wealth Management Data Operations",
    author: "Sinan Biren",
    date: "Mar 28, 2025",
    url: "https://www.collation.ai/blog/from-manual-to-magical-how-agentic-ai-is-transforming-wealth-management-data-operations",
    image: "https://framerusercontent.com/images/nOF2R0xd0H6a4ar3cv3nbyPTISM.png?lossless=1&width=1280&height=690",
    excerpt: "A transformation story: from manual drudgery to AI-driven ops."
  },
  {
    title: "Sage Intacct announces new integration with Collation.AI",
    author: "Sinan Biren",
    date: "Mar 28, 2025",
    url: "https://www.collation.ai/blog/sage-intacct-announces-new-integration-with-collation-ai",
    image: "https://framerusercontent.com/images/y9bKC9A3uy4k0hh2YXhA7wXkw.png?lossless=1&width=1280&height=516",
    excerpt: "Announcing a new integration for seamless data flow."
  },
  {
    title: "Embrace the Family Office of the Future: Multigenerational Wealth Meets AI & RPA",
    author: "Sinan Biren",
    date: "Oct 20, 2024",
    url: "https://www.collation.ai/blog/embrace-the-family-office-of-the-future-multigenerational-wealth-meets-ai-rpa",
    image: "https://framerusercontent.com/images/A3IDWjsjbN4RDUMd3V4F2lI75I.png?lossless=1&width=1280&height=720",
    excerpt: "How AI and RPA support multigenerational family office operations."
  }
];
