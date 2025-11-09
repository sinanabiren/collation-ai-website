"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import SEOHead from "@/components/SEOHead";
import { motion } from "framer-motion";
import { useCounterAnimation } from "@/hooks/use-counter-animation";
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
      title: "CTO",
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
        keywords="About Collation.AI, Agentic AI company, Wealth Management technology, RIA solutions, Family Office automation, SOC2 certified, Data Warehouse provider"
        canonical="https://www.collation.ai/about"
      />
      <Navbar />

      {/* Hero Section */}
      <section id="hero" className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
                We Empower<br />Wealth Managers.
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                We are a Product Company! Not a SW development shop for hire. And our Mission is to simplify complex tasks, enhance productivity, & unlock new possibilities for WMs by harnessing the power of Agentic AI Bots.
              </p>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10">
                <img 
                  src="https://framerusercontent.com/images/zfoGWwnFTLW6xy2cCF706Bm9z7I.jpg?lossless=1" 
                  alt="Collation.AI Team" 
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Impact Numbers Section with Blue Ribbon */}
      <section className="relative py-20 px-4 bg-primary text-white overflow-hidden">
        {/* Decorative wave at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-background" style={{
          clipPath: 'polygon(0 50%, 10% 45%, 20% 50%, 30% 45%, 40% 50%, 50% 45%, 60% 50%, 70% 45%, 80% 50%, 90% 45%, 100% 50%, 100% 100%, 0 100%)'
        }} />
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
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

      {/* Company Story Section */}
      <section className="py-20 px-4 bg-background">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
              The Finance & Technology Experts
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6 text-lg text-muted-foreground leading-relaxed"
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
      <section className="py-20 px-4 bg-secondary">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Our Team
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
                    <div className="aspect-square bg-gradient-to-br from-primary/10 to-accent/10 overflow-hidden">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover object-center"
                        style={{ aspectRatio: '1/1' }}
                      />
                    </div>
                    <div className="p-6 text-center">
                      <h3 className="text-lg font-bold text-foreground mb-1">{member.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{member.title}</p>
                      <a 
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-[#0A66C2] hover:bg-[#004182] transition-colors"
                        aria-label={`Visit ${member.name}'s LinkedIn profile`}
                      >
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
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
        className="text-4xl md:text-6xl font-bold mb-3"
      >
        {stat.prefix}{count}{stat.suffix}
      </motion.div>
      <div className="text-base md:text-lg opacity-90">{stat.label}</div>
    </motion.div>
  );
};

export default About;
