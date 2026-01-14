"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import Navbar from '@/components/Navbar';
import SEOHead from '@/components/SEOHead';
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { blogPosts as staticBlogPosts } from "@/data/blogPosts";
import Link from 'next/link';

// Lazy load Footer
const Footer = dynamic(() => import('@/components/Footer'), { ssr: false });

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState(staticBlogPosts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch posts from database and merge with static posts
    fetch('/api/blog/posts')
      .then(res => res.json())
      .then(dbPosts => {
        if (Array.isArray(dbPosts) && dbPosts.length > 0) {
          // Merge database posts with static posts, removing duplicates
          const allPosts = [...dbPosts, ...staticBlogPosts];
          const uniquePosts = allPosts.filter((post, index, self) =>
            index === self.findIndex((p) => p.url === post.url)
          );
          setBlogPosts(uniquePosts);
        }
      })
      .catch(error => console.error('Error fetching blog posts:', error))
      .finally(() => setLoading(false));
  }, []);
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Blog - Collation.AI Insights | Agentic AI & Wealth Management Articles"
        description="Read the latest insights on Agentic AI, wealth management automation, RIA technology, and financial data solutions. Expert articles on portfolio management, data aggregation, and AI Bots for advisors."
        keywords="Wealth Management Blog, Agentic AI articles, RIA insights, Registered Investment Advisor technology, Family Office insights, WealthTech blog, AI Bots articles, financial data automation, portfolio management insights, investment reporting articles, data reconciliation blog, workflow automation, CRM insights, advisor productivity, financial technology articles, wealth management trends, AI for financial advisors, data aggregation articles, custodian integration, performance analytics, vibe-coding, financial services AI"
        canonical="https://www.collation.ai/blog"
      />
      <Navbar />

      <section className="pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-12 md:mb-16"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-3 sm:mb-4 px-2">
              Blog
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-2">
              Keep up to date with our latest whitepapers, blog posts, articles, and news about Agentic AI, Wealth Management, RIAs, Family Offices, and Data Warehouse solutions.
            </p>
            {/* Updated: 2026-01-14 */}
          </motion.div>

          <div id="bloglisting" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {blogPosts.map((post, index) => {
              const isInternal = post.url.startsWith('/blog/');
              const CardWrapper = isInternal ? Link : motion.a;
              const wrapperProps = isInternal
                ? { href: post.url }
                : {
                    href: post.url,
                    target: "_blank",
                    rel: "noopener noreferrer"
                  };

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  className="block"
                >
                  <CardWrapper {...wrapperProps} className="block">
                    <Card className="h-full hover:shadow-xl transition-shadow">
                      <CardContent className="p-0">
                        <div className="aspect-video overflow-hidden rounded-t-lg relative">
                          <Image
                            src={post.image}
                            alt={`${post.title} - Blog post thumbnail`}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="p-4 sm:p-5 md:p-6">
                          <div className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3">
                            {post.author} • {post.date}
                          </div>
                          <h3 className="text-base sm:text-lg font-semibold text-foreground hover:text-primary transition-colors mb-2 sm:mb-3 line-clamp-2">
                            {post.title}
                          </h3>
                          <p className="text-muted-foreground text-xs sm:text-sm line-clamp-3">{post.excerpt}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </CardWrapper>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
