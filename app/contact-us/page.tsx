"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import SEOHead from "@/components/SEOHead";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

const Contact = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"form" | "call">("form");
  const [agreedToPolicy, setAgreedToPolicy] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedToPolicy) {
      toast({
        title: "Privacy Policy",
        description: "Please agree to our privacy policy to continue.",
        variant: "destructive"
      });
      return;
    }
    toast({
      title: "Thank you for contacting us!",
      description: "Our team will get back to you within 24 hours.",
    });
    setFormData({ firstName: "", lastName: "", email: "", phone: "", message: "" });
    setAgreedToPolicy(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <SEOHead
        title="Contact Collation.AI - Request Demo | Agentic AI for Wealth Management"
        description="Schedule a free consultation with Collation.AI. Learn how our Agentic AI Bots can solve your wealth management data challenges. Free Proof of Concept available for RIAs and Family Offices."
        keywords="contact Collation.AI, request demo, wealth management consultation, Agentic AI demo, RIA solutions contact, Family Office consultation, data warehouse demo"
        canonical="https://www.collation.ai/contact"
      />
      <Navbar />

      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Get In Touch
            </h1>
            <p className="text-xl text-muted-foreground">
              Our friendly team would love to hear from you.
            </p>
          </motion.div>

          {/* Main Content - Side by Side */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
          >
            {/* Left Side - Form */}
            <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-lg">
              {/* Tab Navigation */}
              <div className="flex gap-4 mb-8">
                <button
                  onClick={() => setActiveTab("form")}
                  className={`flex-1 py-3 px-6 rounded-full font-medium transition-all ${
                    activeTab === "form"
                      ? "bg-[#1e3a5f] text-white"
                      : "bg-white text-foreground border-2 border-gray-200 hover:border-gray-300"
                  }`}
                >
                  Inquiry Form
                </button>
                <button
                  onClick={() => setActiveTab("call")}
                  className={`flex-1 py-3 px-6 rounded-full font-medium transition-all ${
                    activeTab === "call"
                      ? "bg-[#1e3a5f] text-white"
                      : "bg-white text-foreground border-2 border-gray-200 hover:border-gray-300"
                  }`}
                >
                  Book a Call
                </button>
              </div>

              {/* Form Content */}
              {activeTab === "form" ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* First Name and Last Name */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-foreground mb-2">
                        First Name
                      </label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        placeholder="Ex. John"
                        className="bg-white"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-foreground mb-2">
                        Last Name
                      </label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        placeholder="Ex. Doe"
                        className="bg-white"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="you@company.com"
                      className="bg-white"
                    />
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                      Phone Number
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      className="bg-white"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      placeholder="Tell us about your data challenges and how we can help..."
                      className="bg-white resize-none"
                    />
                  </div>

                  {/* Privacy Policy Checkbox */}
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="privacy"
                      checked={agreedToPolicy}
                      onCheckedChange={(checked) => setAgreedToPolicy(checked as boolean)}
                      className="mt-1"
                    />
                    <label htmlFor="privacy" className="text-sm text-muted-foreground cursor-pointer">
                      You agree to our{" "}
                      <a href="/privacy-policy" className="font-medium text-foreground hover:underline">
                        friendly privacy policy
                      </a>
                      .
                    </label>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white"
                  >
                    Submit <Send className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              ) : (
                <div className="py-12 text-center">
                  <h3 className="text-2xl font-bold mb-4">Book a Call</h3>
                  <p className="text-muted-foreground mb-8">
                    Schedule a personalized consultation with our team
                  </p>
                  <Button
                    size="lg"
                    className="bg-[#2563eb] hover:bg-[#1d4ed8]"
                    onClick={() => window.open("https://calendly.com/collation-ai", "_blank")}
                  >
                    Schedule Now
                  </Button>
                </div>
              )}
            </div>

            {/* Right Side - Hero Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative h-full min-h-[600px] rounded-3xl overflow-hidden bg-gradient-to-br from-gray-300 to-gray-400 shadow-lg"
            >
              <img
                src="https://framerusercontent.com/images/iRyCN7w7M46aEc6qkL4UpIxY.jpg"
                alt="AI Robot - Collation.AI Contact"
                className="w-full h-full object-cover"
              />
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  className="w-24 h-24 bg-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform"
                  aria-label="Play video"
                >
                  <div className="w-0 h-0 border-l-[20px] border-l-gray-700 border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent ml-2"></div>
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
