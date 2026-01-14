"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";
import { motion } from "framer-motion";
import { useCounterAnimation } from "@/hooks/use-counter-animation";

// Lazy load Footer
const Footer = dynamic(() => import("@/components/Footer"), { ssr: false });
import tanmaiSharma from "@/assets/team/tanmai-sharma.avif";
import sinanBiren from "@/assets/team/sinan-biren.avif";
import prashantSurana from "@/assets/team/prashant-surana.avif";
import shamaraPereira from "@/assets/team/shamara-pereira.avif";

const About = () => {
  const impactStats = [
    { value: 100, suffix: "B+", prefix: "$", label: "Assets Under Reporting" },
    { value: 100, suffix: "+", prefix: "", label: "Active Agentic AI Bots" },
    { value: 20, suffix: "+", prefix: "", label: "Wealth Manager Clients" },
    { value: 4, suffix: "", prefix: "", label: "Locations" }
  ];

  const teamMembers = [
    {
      name: "Tanmai Sharma",
      title: "Founder & CEO",
      image: tanmaiSharma.src,
      linkedin: "https://www.linkedin.com/in/tanmai-sharma-9b1777/"
    },
    {
      name: "Sinan Biren",
      title: "Chief Revenue Officer",
      image: sinanBiren.src,
      linkedin: "https://www.linkedin.com/in/sinanbiren/"
    },
    {
      name: "Prashant Surana",
      title: "Chief Technology Officer",
      image: prashantSurana.src,
      linkedin: "https://www.linkedin.com/in/prashantsurana/"
    },
    {
      name: "Shamara Pereira",
      title: "Head, Implementation",
      image: shamaraPereira.src,
      linkedin: "https://www.linkedin.com/in/shamara-pereira/"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="About Collation.AI - Agentic AI Solutions for Wealth Management"
        description="Collation.AI transforms wealth management through Agentic AI and data automation. Learn how we help RIAs, Family Offices, and wealth managers solve data challenges with our AI Bots and data warehouse solutions."
        keywords="About Collation.AI, Agentic AI company, Wealth Management technology, RIA solutions, Registered Investment Advisor, Family Office automation, SOC2 certified, Data Warehouse provider, WealthTech, AI Bots, Financial Advisors, Portfolio Management Software, Asset Management Platform, Data Aggregation, Financial Data Integration, Multi-Custodian Data, Custodian Integration, Investment Reporting, Client Reporting, Performance Analytics, Data Reconciliation, Workflow Automation, CRM Integration, Data Silos Solution, Compliance Automation, Audit-Ready Data, Financial Services AI, Wealth Management AI"
        canonical="https://www.collation.ai/about"
      />
      <Navbar />

      <main>
        {/* Hero Section */}
        <section id="hero" className="pt-20 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 px-4" aria-label="About Hero">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-4 sm:mb-6 leading-tight">
                We Empower<br />Wealth Managers.
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
                We are a Product Company! Not a SW development shop for hire. And our Mission is to simplify complex tasks, enhance productivity, & unlock new possibilities for WMs by harnessing the power of Agentic AI Bots.
              </p>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative mt-8 lg:mt-0"
            >
              <div className="aspect-[4/5] rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10 relative">
                <Image
                  src="https://framerusercontent.com/images/zfoGWwnFTLW6xy2cCF706Bm9z7I.jpg?lossless=1"
                  alt="Collation.AI Team working together in office"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Impact Numbers Section with Blue Ribbon */}
      <section className="relative py-12 sm:py-16 md:py-20 px-4 bg-primary text-white overflow-hidden">
        {/* Decorative wave at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-20 md:h-24 bg-background" style={{
          clipPath: 'polygon(0 50%, 10% 45%, 20% 50%, 30% 45%, 40% 50%, 50% 45%, 60% 50%, 70% 45%, 80% 50%, 90% 45%, 100% 50%, 100% 100%, 0 100%)'
        }} />

        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 sm:mb-12 md:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
              Impact Numbers
            </h2>
            <p className="text-base sm:text-lg md:text-xl opacity-90">
              Real results in numbers that speak for themselves
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-12">
            {impactStats.map((stat, index) => (
              <ImpactStatItem key={index} stat={stat} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Company Story Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 bg-background">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 sm:mb-12 md:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6 sm:mb-8">
              The Finance & Technology Experts
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4 sm:space-y-5 md:space-y-6 text-base sm:text-lg text-muted-foreground leading-relaxed"
          >
            <p>
              Collation.AI is a Powerful WealthTech that is specialized in reducing operational costs, improving workflow efficiencies, and increasing client retention for wealth managers by Aggregating Financial Data via Bots from their "existing technology stack" and bring it into a "fully accessible" centralized Data Warehouse. Once the Data is in the Warehouse we setup Bot-driven workflows to check, reconcile, fix, enrich that data, so that infinite Analytics can be derived from it via flexible, scalable Reports.
            </p>
            <p>
              We originated from the WealthTech provider Canopy.Cloud, which reports on over USD 170 billion in assets and is supported by many Family Offices and UBS Bank.
            </p>
            <p>
              Our CEO/Founder; Tanmai Sharma, is an entrepreneur, finance expert, and technology aficionado. He established Canopy.Cloud and engineered the core analytics platform. Prior to Canopy, he was a MD at Deutsche Bank, with 20 years of trading expertise in prominent international trading floors, focusing on analytics and arbitrage.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 bg-secondary">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 sm:mb-12 md:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
              Our Team
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
              >
                <Card className="hover:shadow-xl transition-shadow overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative w-full h-48 sm:h-56 md:h-64 bg-gradient-to-br from-primary/10 to-accent/10 overflow-hidden">
                      <Image
                        src={member.image}
                        alt={`${member.name} - ${member.title} at Collation.AI`}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover"
                        style={{ objectPosition: 'center 15%' }}
                      />
                    </div>
                    <div className="p-4 sm:p-5 md:p-6 text-center">
                      <h3 className="text-base sm:text-lg font-bold text-foreground mb-1">{member.name}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">{member.title}</p>
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#0A66C2] hover:bg-[#004182] transition-colors"
                        aria-label={`Visit ${member.name}'s LinkedIn profile`}
                      >
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 bg-background">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
              <CardContent className="p-8 md:p-12 text-center">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Ready to Transform Your Data Operations?
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Let our team show you how Collation.AI can solve your wealth management data challenges with our Agentic AI Bots.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white">
                    <Link href="/schedule-demo">Schedule a Demo</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <Link href="/case-studies">See Success Stories</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
      </main>

      <Footer />
    </div>
  );
};

const ImpactStatItem = ({ stat, index }: { stat: { value: number; suffix: string; prefix: string; label: string }; index: number }) => {
  const { count, ref } = useCounterAnimation(stat.value, 2000);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
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
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-3"
      >
        {stat.prefix}{count}{stat.suffix}
      </motion.div>
      <div className="text-xs sm:text-sm md:text-base lg:text-lg opacity-90 px-2">{stat.label}</div>
    </motion.div>
  );
};

export default About;
