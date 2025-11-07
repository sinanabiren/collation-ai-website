"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Lock, Key, FileCheck, Code2 } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import LottieAnimation from "@/components/LottieAnimation";
import VibeCodingWorkflow from "@/components/VibeCodingWorkflow";
import { motion } from "framer-motion";
import securityHero from "@/assets/animations/security-hero.json";
import security01 from "@/assets/animations/security-01.json";
import security02 from "@/assets/animations/security-02.json";
import security03 from "@/assets/animations/security-03.json";
import security04 from "@/assets/animations/security-04.json";
import security05 from "@/assets/animations/security-05.json";
import security06 from "@/assets/animations/security-06.json";
import soc2Logo from "@/assets/certifications/soc2-logo.png";
import iso27001Logo from "@/assets/certifications/iso27001-logo.avif";

const Security = () => {
  const securityFeatures = [
    {
      icon: <Shield size={40} />,
      title: "SOC 2 Certified",
      description: "Collation.AI meets international information security standards and is SOC 2 certified. We undergo regular third-party audits to ensure our security controls meet the highest industry standards for protecting sensitive financial data.",
      animation: security01
    },
    {
      icon: <Lock size={40} />,
      title: "Data Encryption",
      description: "All data is encrypted both in transit and at rest using industry-standard encryption protocols. Your financial data warehouse is hosted in secure, compliant cloud infrastructure with multiple layers of protection.",
      animation: security02
    },
    {
      icon: <Key size={40} />,
      title: "Access Control",
      description: "Strict role-based access controls ensure that only authorized personnel can access your data. Multi-factor authentication is required for all system access. We sign NDAs as standard practice before any data integration begins.",
      animation: security04
    },
    {
      icon: <FileCheck size={40} />,
      title: "Audit-Ready Data",
      description: "Our Agentic AI Bots ensure all data is audit-ready with complete audit trails, version control, and data lineage tracking. Every data transformation and reconciliation is logged and traceable for compliance and regulatory requirements.",
      animation: security05
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Security & Compliance - SOC2 Certified | Collation.AI Data Protection"
        description="Collation.AI is SOC2 certified and meets international security standards. Learn about our enterprise-grade data encryption, access controls, and compliance measures for RIAs and Family Offices."
        keywords="SOC2 certified, wealth management security, financial data encryption, RIA compliance, Family Office data security, audit-ready data, SEC compliance, FINRA compliance"
        canonical="https://www.collation.ai/security"
      />
      <Navbar />

      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Security & Compliance
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              We prioritize data security and client confidentiality above all else.
            </p>
            <div className="max-w-2xl mx-auto">
              <LottieAnimation animationData={securityHero} className="w-full h-auto" />
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {securityFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              >
                <Card className="h-full">
                  <CardContent className="p-8">
                    <div className="flex flex-col items-center text-center">
                      <div className="mb-6">
                        <LottieAnimation 
                          animationData={feature.animation} 
                          className="w-full max-w-[200px] h-auto"
                        />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-foreground mb-3">{feature.title}</h2>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

          </div>

          {/* Data Protection Guarantees - moved under Security Features */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-16"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              >
                <Card className="h-full">
                  <CardContent className="p-8">
                    <div className="flex flex-col items-center text-center">
                      <div className="mb-6">
                        <LottieAnimation 
                          animationData={security03} 
                          className="w-full max-w-[200px] h-auto"
                        />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-foreground mb-4">Two-Factor Authentication</h3>
                        <p className="text-muted-foreground">
                          Access requires something you know and something you have. This dual-verification process ensures that even if credentials are compromised, your account remains secure.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              >
                <Card className="h-full">
                  <CardContent className="p-8">
                    <div className="flex flex-col items-center text-center">
                      <div className="mb-6">
                        <LottieAnimation 
                          animationData={security04} 
                          className="w-full max-w-[200px] h-auto"
                        />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-foreground mb-4">Continuous Security Compliance</h3>
                        <p className="text-muted-foreground">
                          Our automated monitoring systems scan every line of code and system configuration around the clock, ensuring 100% compliance with the most stringent financial security standards.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.1 }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              >
                <Card>
                  <CardContent className="p-8">
                    <div className="flex flex-col items-center text-center">
                      <div className="mb-6">
                        <LottieAnimation 
                          animationData={security06} 
                          className="w-full max-w-[200px] h-auto"
                        />
                      </div>
                      <div className="max-w-2xl">
                        <h3 className="text-2xl font-bold text-foreground mb-4">End-to-End Encrypted Communication</h3>
                        <p className="text-muted-foreground">
                          Every piece of data exchanged between our servers and your browser is protected by HTTPS encryption, creating an impenetrable tunnel that shields your information from interception.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              >
                <Card className="h-full">
                  <CardContent className="p-8">
                    <div className="flex flex-col items-center text-center h-full justify-center">
                      <h3 className="text-2xl font-bold text-foreground mb-6">Security Certifications</h3>
                      <div className="flex gap-8 items-center justify-center">
                        <motion.div 
                          className="flex items-center justify-center"
                          whileHover={{ scale: 1.15, rotate: 5 }}
                          transition={{ duration: 0.3 }}
                        >
                          <img 
                            src={soc2Logo} 
                            alt="AICPA SOC 2 Certification" 
                            className="w-32 h-32 object-contain"
                          />
                        </motion.div>
                        <motion.div 
                          className="flex items-center justify-center"
                          whileHover={{ scale: 1.15, rotate: -5 }}
                          transition={{ duration: 0.3 }}
                        >
                          <img 
                            src={iso27001Logo} 
                            alt="ISO 27001 Certification" 
                            className="w-32 h-32 object-contain"
                          />
                        </motion.div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>

          {/* Your Data, Your Control - with animation */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="mt-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-12 text-center">
              Your Data, Your Control
            </h2>
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <ul className="space-y-4">
                      {[
                        "You decide where your data warehouse is hosted - your cloud or ours",
                        "No changes required to your existing technology stack",
                        "Complete data ownership and portability",
                        "Transparent data processing with full visibility",
                        "Regular security updates and monitoring"
                      ].map((item, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 1.3 + index * 0.1 }}
                          className="flex items-start gap-3"
                        >
                          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-1">
                            <div className="w-3 h-3 rounded-full bg-primary" />
                          </div>
                          <span className="text-lg text-muted-foreground">{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 p-8 flex items-center justify-center">
                    <motion.div
                      animate={{
                        scale: [1, 1.05, 1],
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <LottieAnimation 
                        animationData={security02} 
                        className="w-full max-w-md h-auto"
                      />
                    </motion.div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <div className="space-y-16 mt-16">

            {/* Vibe-Coding Security Architecture */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="mt-20"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-center">
                Vibe-Coding: Secure Development Architecture
              </h2>
              <p className="text-xl text-muted-foreground mb-12 text-center max-w-3xl mx-auto">
                From development to secure production deployment
              </p>

              {/* Data Hosting & Privacy Architecture */}
              <div className="mb-8 relative overflow-hidden rounded-xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-background to-accent/5 shadow-lg">
                <div className="relative p-8 md:p-12">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-8"
                  >
                    <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                      🔒 Data Hosting & Privacy Architecture
                    </h3>
                    <p className="text-lg text-muted-foreground">
                      Enterprise-Grade Security at Every Layer
                    </p>
                  </motion.div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="relative bg-card rounded-xl p-6 border border-border"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <Shield className="w-8 h-8 text-primary" />
                        <h4 className="text-xl font-bold text-foreground">Standard Setup</h4>
                      </div>
                      <ul className="space-y-2 text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>Vibe-coding applications store data in Supabase</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>Enterprise-grade backend infrastructure</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>Managed seamlessly alongside deployment</span>
                        </li>
                      </ul>
                    </motion.div>

                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      className="relative bg-card rounded-xl p-6 border border-border"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <Key className="w-8 h-8 text-primary" />
                        <h4 className="text-xl font-bold text-foreground">Dev Isolation</h4>
                      </div>
                      <ul className="space-y-2 text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>Separate development environments</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>Isolated PostgreSQL servers with dummy data only</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>Zero access to customer data guaranteed</span>
                        </li>
                      </ul>
                    </motion.div>

                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                      className="relative bg-card rounded-xl p-6 border border-border"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <Lock className="w-8 h-8 text-primary" />
                        <h4 className="text-xl font-bold text-foreground">Production Lock</h4>
                      </div>
                      <ul className="space-y-2 text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>We manage deployment & hosting only</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>All customer data stays on secured external servers</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>Military-grade access controls</span>
                        </li>
                      </ul>
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Collation.AI Priority */}
              <div className="mb-12 relative overflow-hidden rounded-xl border-2 border-green-500/30 bg-gradient-to-br from-green-500/10 via-emerald-500/5 to-teal-500/10 shadow-lg">
                <div className="relative p-8 md:p-12">
                  <div className="text-center mb-8">
                    <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                      🛡️ Collation.AI Priority
                    </h3>
                    <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                      Customer data sovereignty and security above everything else
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="space-y-6"
                    >
                      <div className="bg-card rounded-lg p-6 border border-border">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                            <span className="text-2xl">🔒</span>
                          </div>
                          <h4 className="text-xl font-bold text-foreground">No Client Data</h4>
                        </div>
                        <p className="text-muted-foreground">is ever shared with a Public LLM</p>
                      </div>

                      <div className="bg-card rounded-lg p-6 border border-border">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                            <span className="text-2xl">⚡</span>
                          </div>
                          <h4 className="text-xl font-bold text-foreground">Automatically Moved</h4>
                        </div>
                        <p className="text-muted-foreground">Code & UI to your secure Local Environment</p>
                      </div>

                      <div className="bg-card rounded-lg p-6 border border-border">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                            <span className="text-2xl">🔗</span>
                          </div>
                          <h4 className="text-xl font-bold text-foreground">Direct Connection</h4>
                        </div>
                        <p className="text-muted-foreground">to your Production Database only</p>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      className="flex items-center justify-center"
                    >
                      <div className="w-48 h-48 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-full flex items-center justify-center border-4 border-green-500/30">
                        <Shield className="w-24 h-24 text-green-500" />
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Vibe-Coding Workflow */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-12"
              >
                <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
                  ⚡ Vibe-Coding Workflow
                </h3>
                <p className="text-lg text-muted-foreground text-center mb-8">
                  Secure development pipeline from code to production
                </p>

                <VibeCodingWorkflow />
              </motion.div>

            </motion.div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Security;
