"use client";

import { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Play, ArrowRight } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

// Lazy load heavy components
const Tabs = dynamic(() => import("@/components/ui/tabs").then(mod => ({ default: mod.Tabs })), { ssr: false });
const TabsContent = dynamic(() => import("@/components/ui/tabs").then(mod => ({ default: mod.TabsContent })), { ssr: false });
const TabsList = dynamic(() => import("@/components/ui/tabs").then(mod => ({ default: mod.TabsList })), { ssr: false });
const TabsTrigger = dynamic(() => import("@/components/ui/tabs").then(mod => ({ default: mod.TabsTrigger })), { ssr: false });
const InlineWidget = dynamic(() => import("react-calendly").then(mod => ({ default: mod.InlineWidget })), { ssr: false });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: false });

const Contact = () => {
  const [showVideo, setShowVideo] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate privacy policy agreement
    if (!agreedToPrivacy) {
      toast({
        title: "Privacy Policy Required",
        description: "Please agree to our privacy policy to continue.",
        variant: "destructive",
      });
      return;
    }

    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Show success animation
        setIsSuccess(true);

        // Also show toast
        toast({
          title: "Message Sent!",
          description: data.message || "Thank you for contacting us! We'll get back to you soon.",
        });

        // Reset form after showing success for 5 seconds
        setTimeout(() => {
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            message: ''
          });
          setAgreedToPrivacy(false);
          setIsSuccess(false);
        }, 5000);
      } else {
        throw new Error(data.error || 'Failed to send message');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send message. Please try again or email us at hello@collation.ai",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Contact Collation.AI - Request Demo | Agentic AI for Wealth Management"
        description="Schedule a free consultation with Collation.AI. Learn how our Agentic AI Bots can solve your wealth management data challenges. Free Proof of Concept available for RIAs and Family Offices."
        keywords="contact Collation.AI, request demo, wealth management consultation, Agentic AI demo, RIA solutions contact, Registered Investment Advisor, Family Office consultation, data warehouse demo, schedule demo, free consultation, WealthTech demo, AI Bots demo, financial data automation demo, portfolio management consultation, asset management platform demo, data aggregation consultation, proof of concept, POC, implementation consultation, wealth management software demo, investment reporting demo, client reporting consultation, compliance solution demo, data reconciliation demo, workflow automation consultation"
        canonical="https://www.collation.ai/contact"
      />
      <Navbar />

      {/* Get in Touch Section */}
      <section id="contact" className="py-12 sm:py-16 md:py-20 px-4 bg-secondary">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-start">
            {/* Left side - Form and Calendly */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 sm:mb-4">
                Get in Touch
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8">
                Our friendly team would love to hear from you.
              </p>

              <Tabs defaultValue="inquiry" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6 sm:mb-8 h-10 sm:h-12">
                  <TabsTrigger value="inquiry" className="text-sm sm:text-base">Inquiry Form</TabsTrigger>
                  <TabsTrigger value="book" className="text-sm sm:text-base">Book a Call</TabsTrigger>
                </TabsList>

                <TabsContent value="inquiry" className="mt-0">
                  <Card>
                    <CardContent className="p-4 sm:p-6 space-y-4">
                      {isSuccess ? (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5 }}
                          className="py-12 text-center"
                        >
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                          >
                            <svg
                              className="w-10 h-10 text-green-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <motion.path
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </motion.div>
                          <motion.h3
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-2xl font-bold text-foreground mb-2"
                          >
                            Message Sent Successfully!
                          </motion.h3>
                          <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="text-muted-foreground mb-6"
                          >
                            Thank you for contacting us! We'll get back to you at {formData.email} within 24 hours.
                          </motion.p>
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="flex items-center justify-center gap-2 text-sm text-muted-foreground"
                          >
                            <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                            </svg>
                            Email sent to hello@collation.ai
                          </motion.div>
                        </motion.div>
                      ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="firstName">First Name *</Label>
                            <Input
                              id="firstName"
                              placeholder="Ex. John"
                              value={formData.firstName}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name *</Label>
                            <Input
                              id="lastName"
                              placeholder="Ex. Doe"
                              value={formData.lastName}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="you@company.com"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="+1 (555) 000-0000"
                            value={formData.phone}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="message">Message *</Label>
                          <Textarea
                            id="message"
                            rows={4}
                            placeholder="Your message..."
                            value={formData.message}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="flex items-start space-x-2">
                          <Checkbox
                            id="privacy"
                            checked={agreedToPrivacy}
                            onCheckedChange={(checked) => setAgreedToPrivacy(checked as boolean)}
                            required
                          />
                          <Label htmlFor="privacy" className="text-xs sm:text-sm leading-relaxed cursor-pointer">
                            You agree to our friendly <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-blue-700 transition-colors">privacy policy</a>.
                          </Label>
                        </div>
                        <Button
                          type="submit"
                          className="w-full touch-manipulation bg-primary hover:bg-primary/90 text-white min-h-[44px]"
                          size="lg"
                          disabled={isSubmitting}
                        >
                          <span className="flex items-center justify-center">
                            {isSubmitting ? 'Sending...' : 'Submit'}
                            {!isSubmitting && <ArrowRight className="ml-2" size={18} />}
                            {isSubmitting && <span className="ml-2 w-[18px]" />}
                          </span>
                        </Button>
                        </form>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="book" className="mt-0">
                  <Card className="overflow-hidden">
                    <CardContent className="p-0">
                      <InlineWidget
                        url="https://calendly.com/sinan-biren-collationai/30min"
                        styles={{ height: '600px', minWidth: '280px' }}
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
              className="h-full mt-8 lg:mt-0"
            >
              <Card className="h-full min-h-[400px] sm:min-h-[500px] md:min-h-[600px] lg:min-h-[700px]">
                <CardContent className="p-0 h-full">
                  <div className="relative w-full h-full">
                    {!showVideo ? (
                      <>
                        <Image
                          src="/assets/robot-image.webp"
                          alt="AI Robot visualization - Click to play video"
                          fill
                          className="object-cover rounded-lg"
                        />
                        <button
                          onClick={() => setShowVideo(true)}
                          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform group"
                          aria-label="Play video"
                        >
                          <Play className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 text-primary ml-1 group-hover:text-primary/80 transition-colors" fill="currentColor" />
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
