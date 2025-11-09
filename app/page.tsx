"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { InlineWidget } from "react-calendly";
import { Play } from "lucide-react";
import { ArrowRight, Bot, Database, Workflow, Calculator, MessageSquare } from "lucide-react";
import HowItWorksIcon from "@/components/HowItWorksIcon";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import LottieAnimation from "@/components/LottieAnimation";
import { blogPosts } from "@/data/blogPosts";
import { motion } from "framer-motion";
import { useCounterAnimation } from "@/hooks/use-counter-animation";
import VibeCodingShowcase from "@/components/VibeCodingShowcase";

const Home = () => {
  const [showVideo, setShowVideo] = useState(false);
  const [heroAnimationComplete, setHeroAnimationComplete] = useState(false);

  // Trigger Vibe-Coding after 3rd box (Workflow Automation) appears
  useEffect(() => {
    const timer = setTimeout(() => {
      setHeroAnimationComplete(true);
    }, 9000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary overflow-hidden">
      <SEOHead />
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight"
          >
            We Solve Data Headaches<br />For Wealth Managers
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto mb-12 leading-relaxed"
          >
            We reduce operational costs, improve workflow efficiencies by Aggregating Financial Data via AI Bots from your 'existing technology stack', and bring it into your 'fully accessible' centralized Data Warehouse.
          </motion.p>

          {/* Hero Illustration with Arrow */}
          <div className="relative mt-16 mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
            >
              {/* Desktop Animation */}
              <div className="hidden lg:block max-w-7xl mx-auto">
                <LottieAnimation
                  animationImport={() => import("@/assets/animations/hero-desktop.json")}
                  className="w-full h-auto"
                  loop={false}
                  speed={3}
                />
              </div>
              {/* Tablet & Mobile Animation */}
              <div className="lg:hidden max-w-5xl mx-auto">
                <LottieAnimation
                  animationImport={() => import("@/assets/animations/hero-tablet-mobile.json")}
                  className="w-full h-auto"
                  loop={false}
                  speed={3}
                />
              </div>
            </motion.div>

            {/* Arrow pointing to Vibe Coding - curved arrow stopping before box */}
            <div
              className={`absolute -bottom-32 right-[35%] lg:right-[37%] hidden md:block pointer-events-none z-10 transition-opacity duration-200 ${heroAnimationComplete ? 'opacity-100' : 'opacity-0'}`}
            >
              <svg width="80" height="130" viewBox="0 0 80 130" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary/70">
                <defs>
                  <marker id="arrowhead" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
                    <polygon points="0 0, 8 4, 0 8" fill="currentColor" />
                  </marker>
                </defs>
                <motion.path
                  d="M 40 0 L 40 70 Q 40 90, 20 90 L 6 90"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                  markerEnd="url(#arrowhead)"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: heroAnimationComplete ? 1 : 0 }}
                  transition={{ duration: 0.5, delay: 0, ease: "easeInOut" }}
                />
              </svg>
            </div>
          </div>

          {/* Vibe-Coding Showcase */}
          <div className={`mb-32 max-w-5xl mx-auto transition-opacity duration-200 ${heroAnimationComplete ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <VibeCodingShowcase />
          </div>

          {/* Proudly Featured Section */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-0"
          >
            <h3 className="text-xl font-semibold text-foreground mb-8 text-center">Proudly featured on</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4 max-w-7xl mx-auto">
              {[
                { src: "/assets/logos/the_wealth_mosaic.png", alt: "The Wealth Mosaic" },
                { src: "/assets/logos/citywire.png", alt: "CityWire" },
                { src: "/assets/logos/forbes.png", alt: "Forbes" },
                { src: "/assets/logos/riabiz.png", alt: "RIABiz" },
                { src: "/assets/logos/wealthbriefing.png", alt: "WealthBriefing" },
                { src: "/assets/logos/kitces.png", alt: "Kitces" },
                { src: "/assets/logos/fotechhub.png", alt: "FOTech Hub" }
              ].map((logo, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + i * 0.05, duration: 0.4 }}
                  className="bg-card rounded-xl border border-border/50 p-6 flex items-center justify-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <img 
                    src={logo.src} 
                    alt={logo.alt}
                    className="w-full h-12 object-contain grayscale opacity-60 hover:opacity-80 transition-opacity duration-300"
                    loading="lazy"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Challenges Section */}
      <section id="challenges" className="py-20 px-4 bg-background">
        <div className="container mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Challenges you're facing
            </h2>
            <p className="text-xl text-muted-foreground">
              Breaking Through Data Barriers That Hold Your Business Back
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {challenges.map((challenge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
              >
                <Card className="h-full hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="mb-6 flex justify-center">
                      <LottieAnimation 
                        animationImport={challenge.animationImport} 
                        className="w-full max-w-xs h-auto"
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">{challenge.title}</h3>
                    <p className="text-muted-foreground">{challenge.description}</p>
                    {challenge.stat && (
                      <motion.p 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="mt-4 text-primary font-bold"
                      >
                        {challenge.stat}
                      </motion.p>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Agentic AI Bots Section */}
      <section id="our-agents" className="py-20 px-4 bg-secondary">
        <div className="container mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Our Agentic AI Bots: The Future of Data
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Smart automation that transforms complex data into actionable insights, revolutionizing wealth management
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {aiBots.map((bot, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -8,
                  transition: { duration: 0.2 } 
                }}
              >
                <Card className="h-full hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="mb-6 flex justify-center">
                      <LottieAnimation 
                        animationImport={bot.animationImport} 
                        className="w-full max-w-xs h-auto"
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">{bot.title}</h3>
                    <p className="text-muted-foreground">{bot.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 bg-background">
        <div className="container mx-auto max-w-7xl">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              How it works
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Seamless Integration, Powerful Automation - Your Data Journey Simplified
            </p>
          </motion.div>

          {/* Desktop & Tablet Layout - Side by side */}
          <div className="hidden md:flex gap-4 lg:gap-6 items-start">
            {/* Left side - Icons with connecting line and animated ball */}
            <div className="flex-shrink-0 relative overflow-hidden py-12 lg:py-16" style={{ width: "280px" }}>
              <div className="absolute inset-x-0 top-8 bottom-8 pointer-events-none">
                {/* Animated flowing ball - Desktop */}
                <div className="hidden lg:block">
                  <LottieAnimation
                    animationImport={() => import("@/assets/animations/how-it-works-desktop.json")}
                    className="h-full w-auto mx-auto"
                    loop={true}
                    autoplay={true}
                    speed={0.5}
                  />
                </div>
                {/* Animated flowing ball - Tablet */}
                <div className="lg:hidden">
                  <LottieAnimation
                    animationImport={() => import("@/assets/animations/how-it-works-tablet.json")}
                    className="h-full w-auto mx-auto"
                    loop={true}
                    autoplay={true}
                    speed={0.5}
                  />
                </div>
              </div>
              
              <div className="relative z-10 space-y-6">
                {[
                  { type: 'calendar' as const, offset: 0 },
                  { type: 'brain' as const, offset: 0 },
                  { type: 'share' as const, offset: 0 },
                  { type: 'chart' as const, offset: 0 },
                  { type: 'clock' as const, offset: 0 },
                  { type: 'puzzle' as const, offset: 0 },
                  { type: 'dashboard' as const, offset: 0 },
                ].slice(0, 7).map((icon, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative"
                  >
                    <HowItWorksIcon type={icon.type} size="lg" position="center" />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right side - Steps (only 7 steps) */}
            <div className="flex-1 space-y-6">
              {steps.slice(0, 7).map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center"
                  style={{ minHeight: '144px' }}
                >
                  <Card className="hover:shadow-lg transition-shadow w-full">
                    <CardContent className="p-8">
                      <h3 className="text-xl font-semibold text-foreground mb-3">{step.title}</h3>
                      <p className="text-muted-foreground">{step.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile Layout - Icons with cards */}
          <div className="md:hidden">
            <div className="relative">
              {/* Animated flowing ball - Mobile */}
              <LottieAnimation
                animationImport={() => import("@/assets/animations/how-it-works-phone.json")}
                className="absolute left-1/2 top-0 -translate-x-1/2 h-full w-auto scale-[1.5]"
                loop={true}
                autoplay={true}
              />
              
              <div className="relative z-10 space-y-4">
                {steps.slice(0, 7).map((step, index) => {
                  const iconTypes = ['calendar', 'brain', 'share', 'chart', 'clock', 'puzzle', 'dashboard'] as const;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="relative"
                    >
                      <div className="flex justify-center mb-4">
                        <HowItWorksIcon type={iconTypes[index]} size="md" position="center" />
                      </div>
                      <Card className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                          <h3 className="text-xl font-semibold text-foreground mb-2">{step.title}</h3>
                          <p className="text-muted-foreground">{step.description}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-choose-us" className="py-20 px-4 bg-secondary">
        <div className="container mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Why choose us
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Predictable Pricing. Minimal Risk. Maximum Value.
            </p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="max-w-2xl mx-auto"
            >
              <Card className="bg-card/50 backdrop-blur-sm border-primary/20 shadow-lg">
                <CardContent className="p-8">
                  <div className="space-y-4">
                    {["Flat fee — no surprises.", "Costs less than a quarter of a full-time hire.", "100% free if it doesn't work."].map((text, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + i * 0.1, duration: 0.4 }}
                        className="flex items-center gap-3 text-lg"
                      >
                        <div className="flex-shrink-0 w-2 h-2 rounded-full bg-primary" />
                        <p className="text-foreground font-medium">{text}</p>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
              >
                <Card className="h-full hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="mb-6 flex justify-center">
                      <LottieAnimation 
                        animationImport={benefit.animationImport} 
                        className="w-full max-w-xs h-auto"
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">{benefit.title}</h3>
                    <p className="text-muted-foreground mb-4">{benefit.description}</p>
                    <motion.p 
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="text-primary font-bold"
                    >
                      {benefit.stat}
                    </motion.p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Numbers Section with Blue Ribbon */}
      <section id="impact" className="relative py-20 px-4 bg-primary text-white overflow-hidden">
        {/* Decorative wave at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-background" style={{
          clipPath: 'polygon(0 50%, 10% 45%, 20% 50%, 30% 45%, 40% 50%, 50% 45%, 60% 50%, 70% 45%, 80% 50%, 90% 45%, 100% 50%, 100% 100%, 0 100%)'
        }} />
        
        <div className="container mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Impact Numbers
            </h2>
            <p className="text-xl opacity-90">
              Real results in numbers that speak for themselves
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {impactStats.map((stat, index) => (
              <ImpactStatItem key={index} stat={stat} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section - Circular Layout */}
      <section id="testimonials" className="py-20 px-4 bg-background relative overflow-hidden">
        <div className="container mx-auto max-w-7xl">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
              Over 20+ Clients
            </h2>
            <h3 className="text-3xl font-semibold text-foreground">
              Used Our Agentic AI Bots
            </h3>
          </motion.div>

          <div className="relative min-h-[700px] flex items-center justify-center">
            {/* Decorative circular lines */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[300px] h-[300px] rounded-full border border-muted/30 md:w-[500px] md:h-[500px]" />
              <div className="absolute w-[450px] h-[450px] rounded-full border border-muted/20 md:w-[700px] md:h-[700px]" />
              <div className="absolute w-[600px] h-[600px] rounded-full border border-muted/10 md:w-[900px] md:h-[900px]" />
            </div>

            <Carousel className="w-full max-w-4xl">
              <CarouselContent>
                {testimonials.map((t, i) => (
                  <CarouselItem key={i}>
                    <div className="relative min-h-[600px] flex items-center justify-center py-20">
                      {/* Circular image layout */}
                      <div className="hidden md:block absolute inset-0">
                        {[0, 1, 2, 3, 4, 5].map((idx) => {
                          const angle = (idx * 60 - 90) * (Math.PI / 180);
                          const radius = 200;
                          const x = Math.cos(angle) * radius;
                          const y = Math.sin(angle) * radius;
                          const size = idx === 0 ? 100 : idx % 2 === 0 ? 80 : 70;
                          
                            return (
                              <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ 
                                  opacity: 1, 
                                  scale: 1
                                }}
                                transition={{ 
                                  delay: idx * 0.1, 
                                  duration: 0.5
                                }}
                                className="absolute rounded-full overflow-hidden border-4 border-white shadow-lg"
                                style={{
                                  width: `${size}px`,
                                  height: `${size}px`,
                                  left: `calc(50% + ${x}px - ${size/2}px)`,
                                  top: `calc(50% + ${y}px - ${size/2}px)`
                                }}
                              >
                              <img 
                                src={testimonials[(i + idx) % testimonials.length].landmark} 
                                alt="Client location"
                                className="w-full h-full object-cover"
                              />
                            </motion.div>
                          );
                        })}
                      </div>

                      {/* Quote card */}
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="relative z-10 max-w-2xl mx-auto"
                      >
                        <Card className="shadow-xl">
                          <CardContent className="p-8 text-center">
                            <div className="text-6xl text-primary mb-4">"</div>
                            <p className="text-lg text-foreground mb-6 leading-relaxed">{t.quote}</p>
                            <div className="flex items-center justify-center gap-4">
                              <img src={t.landmark} alt={t.author} className="w-16 h-16 rounded-full object-cover border-2 border-primary" />
                              <div className="text-left">
                                <p className="font-semibold text-foreground">{t.author}</p>
                                <p className="text-muted-foreground text-sm">{t.role}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="-left-12 md:-left-16" />
              <CarouselNext className="-right-12 md:-right-16" />
            </Carousel>
          </div>
        </div>
      </section>

      {/* Blog Preview Section */}
      <section id="blog-preview" className="py-20 px-4 bg-background">
        <div className="container mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Blogs
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Keep up to date with our latest whitepapers, blog posts, articles, and news.
            </p>
            <Button asChild variant="outline" className="group">
              <Link href="/blog">
                View All Blogs
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
              </Link>
            </Button>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {blogPosts.slice(0, 3).map((blog, index) => (
              <motion.a
                key={index}
                href={blog.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ 
                  y: -12, 
                  transition: { duration: 0.2 } 
                }}
                className="block"
              >
                <Card className="h-full hover:shadow-xl transition-shadow">
                  <CardContent className="p-0">
                    <div className="aspect-video overflow-hidden rounded-t-lg">
                      <img src={blog.image} alt={`${blog.title} - blog thumbnail`} className="w-full h-full object-cover" loading="lazy" />
                    </div>
                    <div className="p-6">
                      <div className="text-sm text-muted-foreground mb-2">
                        {blog.author} • {blog.date}
                      </div>
                      <h3 className="text-lg font-semibold text-foreground hover:text-primary transition-colors">
                        {blog.title}
                      </h3>
                    </div>
                  </CardContent>
                </Card>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section with Accordion */}
      <section id="faq" className="py-20 px-4 bg-background">
        <div className="container mx-auto max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              FAQ
            </h2>
            <p className="text-xl text-muted-foreground">
              Answers to Your Most Frequent Questions
            </p>
          </motion.div>

          <Accordion type="single" collapsible defaultValue="item-0" className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <AccordionItem value={`item-${index}`} className="border-2 border-border rounded-xl overflow-hidden bg-card">
                  <AccordionTrigger className="px-6 py-5 text-lg font-semibold hover:no-underline hover:bg-muted/50 transition-colors [&[data-state=open]]:bg-muted">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pt-4 pb-6 text-base text-muted-foreground leading-relaxed bg-background">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </section>

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

const challenges = [
  {
    title: "Disconnected Data",
    description: "Data is fragmented across systems.",
    stat: "Registered Investment Advisor operations teams waste 3 hours per day to aggregate data.",
    animationImport: () => import("@/assets/animations/problem-statement-01.json")
  },
  {
    title: "Manual Data Management",
    description: "Downloading, copying, checking & fixing across systems manually causes delays.",
    stat: "On average 2 weeks of delays for preparing reports.",
    animationImport: () => import("@/assets/animations/problem-statement-02.json")
  },
  {
    title: "Repetitive Data Work",
    description: "Manual data entry and processing takes significant time.",
    stat: "Up to 15 hours per week for an External Asset Manager.",
    animationImport: () => import("@/assets/animations/problem-statement-03.json")
  },
  {
    title: "Poor Data Analytics",
    description: "FOs experiment with 'overpriced' performance reporting software and/or excel spreadsheets.",
    stat: "Already have a general ledger system, so why not overlay a more affordable reporting software?",
    animationImport: () => import("@/assets/animations/problem-statement-04.json")
  },
  {
    title: "Overstaffing & Understaffing",
    description: "RIAs struggle to recruit new financial advisors when they lack a future-proof, scalable tech stack.",
    stat: "Excessive hiring puts unnecessary pressure on budget.",
    animationImport: () => import("@/assets/animations/problem-statement-05.json")
  },
  {
    title: "High Cost of Manual Solutions",
    description: "Manual solutions are not scalable and become increasingly expensive.",
    stat: "Wealth Managers spend USD 60K per annum more for in-house tech vs. specialized vendor.",
    animationImport: () => import("@/assets/animations/problem-statement-06.json")
  }
];

const aiBots = [
  {
    icon: <Database size={40} />,
    title: "Data Extraction Bot",
    description: "Unlock trapped data from any source, automate extraction from CRMs, PDFs, Portals, and Protected Systems.",
    animationImport: () => import("@/assets/animations/agent-01.json")
  },
  {
    icon: <Bot size={40} />,
    title: "Data Scrubbing Bot",
    description: "Once the data is collated, our Bot reconciles, cleanses, and ensures the data's consistency and reliability across systems.",
    animationImport: () => import("@/assets/animations/agent-02.json")
  },
  {
    icon: <Database size={40} />,
    title: "Centralized Data Warehouse Bot",
    description: "Single source of truth and unlimited access to copies of your data from ALL of your tech stack! Monitor client relationships and predict retention.",
    animationImport: () => import("@/assets/animations/agent-03.json")
  },
  {
    icon: <Workflow size={40} />,
    title: "Automated Workflows Bot",
    description: "Intelligent automation across your existing technology stack. Recruit new financial advisors thanks to AI-ready, scalable platform.",
    animationImport: () => import("@/assets/animations/agent-04.json")
  },
  {
    icon: <Calculator size={40} />,
    title: "Analytics Calculator Bot",
    description: "Customizable financial calculations at scale. Bolt on top of your existing tech stack! Build Smart Analytics via Vibe Coding for better client understanding.",
    animationImport: () => import("@/assets/animations/agent-05.json")
  },
  {
    icon: <MessageSquare size={40} />,
    title: "AI Report Builder - Vibe Code",
    description: "Don't want to download 'canned reports' from online portals? Talk to your Data! Build custom Reports by giving simple prompts",
    animationImport: () => import("@/assets/animations/agent-06.json")
  }
];

const steps = [
  { number: 1, title: "Book a Call", description: "Schedule a 30-min free consultation with our Agentic AI Bot experts." },
  { number: 2, title: "Discuss Challenges", description: "We delve into your specific business challenges & objectives, and pick the best Bot from our library." },
  { number: 3, title: "Sign NDAs", description: "We prioritize data security & client confidentiality." },
  { number: 4, title: "$0 Proof Of Concept", description: "No specialized headcount needed. No changes to your tech stack. Quick, effortless, and free!" },
  { number: 5, title: "5 Minutes Setup", description: "Your data warehouse is created within 5 Minutes. You decide where to host it." },
  { number: 6, title: "1-3 Days Data Flow", description: "Data starts flowing into your warehouse using APIs, Bots, web scraping, etc." },
  { number: 7, title: "5-10 Days Insights", description: "Start seeing your first insights via online dashboards within 5-10 business days." }
];

const benefits = [
  {
    title: "Audit-Ready Data",
    description: "Benefit from accurate and readily auditable data, ensuring compliance and informed decision-making.",
    stat: "5x faster client onboarding",
    animationImport: () => import("@/assets/animations/why-choose-us-01.json")
  },
  {
    title: "Boost Revenue",
    description: "With increased efficiency & streamlined processes, you'll have more time to focus on selling.",
    stat: "Save 15 hours per week on mundane workload",
    animationImport: () => import("@/assets/animations/why-choose-us-02.json")
  },
  {
    title: "Total Automation",
    description: "Experience seamless automation across your data processes minimizing manual intervention.",
    stat: "200% YoY growth in client engagement",
    animationImport: () => import("@/assets/animations/why-choose-us-03.json")
  },
  {
    title: "Security",
    description: "Collation.AI meets international information security standards and is SOC2 certified.",
    stat: "32% reduction in infrastructure costs",
    animationImport: () => import("@/assets/animations/why-choose-us-04.json")
  },
  {
    title: "Scalable Data Handling",
    description: "No change required on your incumbent tech stack! Effortlessly manage vast amounts of data.",
    stat: "Save 2/3 on staff salaries",
    animationImport: () => import("@/assets/animations/why-choose-us-05.json")
  },
  {
    title: "Instant Insights",
    description: "Get immediate access to critical information, enabling faster responses to market changes.",
    stat: "Avoid 2 weeks of delays in reports",
    animationImport: () => import("@/assets/animations/why-choose-us-06.json")
  }
];

const impactStats = [
  { value: 100, suffix: "B+", prefix: "$", label: "Assets Under Reporting" },
  { value: 100, suffix: "+", prefix: "", label: "Active Agentic AI Bots" },
  { value: 20, suffix: "+", prefix: "", label: "Wealth Manager Clients" },
  { value: 4, suffix: "", prefix: "", label: "Locations" }
];

const ImpactStatItem = ({ stat, index }: { stat: { value: number; suffix: string; prefix: string; label: string }; index: number }) => {
  const { count, ref } = useCounterAnimation(stat.value, 2000);
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      className="text-center"
    >
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ 
          duration: 2, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: index * 0.2 
        }}
        className="text-4xl md:text-6xl font-bold mb-3"
      >
        {stat.prefix}{count}{stat.suffix}
      </motion.div>
      <div className="text-base md:text-lg opacity-90">{stat.label}</div>
    </motion.div>
  );
};

const testimonials = [
  {
    quote:
      "We were struggling badly with our manual workflows until we brought in Collation.AI. They automated all of our data audit workflows across our Portfolio Management Software, CRM System, Alternative Investments Data Handling Vendor.",
    author: "A RIA in California - USA",
    role: "CTO",
    landmark: "/assets/landmarks/california-golden-gate.jpg",
    image: "/assets/landmarks/california-golden-gate.jpg"
  },
  {
    quote:
      "Collation.AI has successfully built and meticulously maintained two data connectors for both of the custodian banks our RIA clients have been using.",
    author: "A Portfolio Software Provider in Massachusetts - USA",
    role: "Product Manager",
    landmark: "/assets/landmarks/massachusetts-state-house.jpg",
    image: "/assets/landmarks/massachusetts-state-house.jpg"
  },
  {
    quote:
      "We have been running Collation.AI for almost 2 years now. They have bolted on top of our incumbent Portfolio System effortlessly and provide extremely customizable, flexible, scalable reporting.",
    author: "A Multi Family Office in Chicago - USA",
    role: "Principal",
    landmark: "/assets/landmarks/chicago-skyline.jpg",
    image: "/assets/landmarks/chicago-skyline.jpg"
  },
  {
    quote:
      "Collation.AI has been successfully building APIs and web-scraping our data from our current tech stack and reconciling against our Bank Statements.",
    author: "A Registered Investment Advisor in New York - USA",
    role: "CEO",
    landmark: "/assets/landmarks/new-york-skyline.jpg",
    image: "/assets/landmarks/new-york-skyline.jpg"
  },
  {
    quote:
      "Before we engaged with Collation.AI we had 2x fulltime headcount that manually downloaded our data from our Real Estate Valuation Platform, Billing Software, Accounting System, Performance Reporting Software.",
    author: "A SFO in Atlanta - USA",
    role: "VP, Family Operations",
    landmark: "/assets/landmarks/atlanta-skyline.jpg",
    image: "/assets/landmarks/atlanta-skyline.jpg"
  },
  {
    quote:
      "Collation.AI's automated data reconciliation has saved us countless hours and eliminated costly errors in our portfolio reporting.",
    author: "A Wealth Management Firm in Texas - USA",
    role: "Operations Director",
    landmark: "/assets/landmarks/texas-capitol.jpg",
    image: "/assets/landmarks/texas-capitol.jpg"
  }
];

// featuredBlogs now pulled from shared blogPosts data (Home uses blogPosts.slice(0,3))

const faqs = [
  {
    question: "What is an Agentic AI Bot?",
    answer: "In artificial intelligence, an intelligent agent is an entity that perceives its environment, takes actions autonomously to achieve goals, and may improve its performance through machine learning or by acquiring knowledge."
  },
  {
    question: "How do I integrate?",
    answer: "Integration is seamless and requires no changes to your existing technology stack. We work with your current systems through APIs, bots, and web scraping."
  },
  {
    question: "What is Collation.AI's Data Structure?",
    answer: "We create a centralized data warehouse that serves as your single source of truth, with unlimited access to copies of your data from all your systems."
  },
  {
    question: "Does Collation.AI offer Customized Calculations?",
    answer: "Yes! Our Analytics Calculator Bot provides customizable financial calculations at scale that can bolt on top of your existing tech stack."
  },
  {
    question: "What type of data does Collation.AI aggregate?",
    answer: "We aggregate financial data from CRMs, Portfolio Management Systems, PDFs, online portals, protected systems, and all components of your existing technology stack."
  }
];

export default Home;
