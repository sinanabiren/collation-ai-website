"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InlineWidget } from "react-calendly";
import { Play, ArrowRight } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { motion } from "framer-motion";

const Contact = () => {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Contact Collation.AI - Request Demo | Agentic AI for Wealth Management"
        description="Schedule a free consultation with Collation.AI. Learn how our Agentic AI Bots can solve your wealth management data challenges. Free Proof of Concept available for RIAs and Family Offices."
        keywords="contact Collation.AI, request demo, wealth management consultation, Agentic AI demo, RIA solutions contact, Family Office consultation, data warehouse demo"
        canonical="https://www.collation.ai/contact"
      />
      <Navbar />

      {/* Get in Touch Section */}
      <section id="contact" className="py-20 px-4 bg-secondary">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left side - Form and Calendly */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Get in Touch
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Our friendly team would love to hear from you.
              </p>

              <Tabs defaultValue="inquiry" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8 h-12">
                  <TabsTrigger value="inquiry" className="text-base">Inquiry Form</TabsTrigger>
                  <TabsTrigger value="book" className="text-base">Book a Call</TabsTrigger>
                </TabsList>

                <TabsContent value="inquiry" className="mt-0">
                  <Card>
                    <CardContent className="p-6 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input id="firstName" placeholder="Ex. John" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input id="lastName" placeholder="Ex. Doe" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="you@company.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea id="message" rows={4} placeholder="Your message..." />
                      </div>
                      <div className="flex items-start space-x-2">
                        <Checkbox id="privacy" />
                        <Label htmlFor="privacy" className="text-sm leading-relaxed cursor-pointer">
                          You agree to our friendly privacy policy.
                        </Label>
                      </div>
                      <Button className="w-full" size="lg">
                        Submit
                        <ArrowRight className="ml-2" size={18} />
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="book" className="mt-0">
                  <Card className="overflow-hidden">
                    <CardContent className="p-0">
                      <InlineWidget
                        url="https://calendly.com/sinan-biren-collationai/30min"
                        styles={{ height: '700px', minWidth: '320px' }}
                      />
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </motion.div>

            {/* Right side - Robot with Video */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="h-full"
            >
              <Card className="h-full min-h-[700px]">
                <CardContent className="p-0 h-full">
                  <div className="relative w-full h-full">
                    {!showVideo ? (
                      <>
                        <img
                          src="/assets/robot-image.webp"
                          alt="AI Robot"
                          className="w-full h-full object-cover rounded-lg"
                        />
                        <button
                          onClick={() => setShowVideo(true)}
                          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform group"
                          aria-label="Play video"
                        >
                          <Play className="w-10 h-10 text-primary ml-1 group-hover:text-primary/80 transition-colors" fill="currentColor" />
                        </button>
                      </>
                    ) : (
                      <div className="w-full h-full rounded-lg overflow-hidden">
                        <iframe
                          width="100%"
                          height="100%"
                          src="https://www.youtube.com/embed/_UfCQ7y-pTo?autoplay=1"
                          title="Collation AI Demo"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-full"
                        />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
