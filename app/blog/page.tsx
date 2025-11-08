"use client";

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { blogPosts } from "@/data/blogPosts";

const Blog = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
              Blogs
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Keep up to date with our latest whitepapers, blog posts, articles, and news about Agentic AI, Wealth Management, RIAs, Family Offices, and Data Warehouse solutions.
            </p>
          </motion.div>

          <div id="bloglisting" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.a
                key={index}
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="block"
              >
                <Card className="h-full hover:shadow-xl transition-shadow">
                  <CardContent className="p-0">
                    <div className="aspect-video overflow-hidden rounded-t-lg">
                      <img
                        src={post.image}
                        alt={`${post.title} - blog thumbnail`}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <div className="text-sm text-muted-foreground mb-3">
                        {post.author} • {post.date}
                      </div>
                      <h3 className="text-lg font-semibold text-foreground hover:text-primary transition-colors mb-3">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground text-sm line-clamp-3">{post.excerpt}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
