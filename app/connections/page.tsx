"use client";

import { useState, useMemo } from "react";
import { Search, Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Load data with logos
import { integrationData, logoData } from "./data";

export default function ConnectionsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<"all" | "direct" | "partner">("all");
  const [selectedLetter, setSelectedLetter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  // Filter integrations
  const filteredIntegrations = useMemo(() => {
    let filtered = integrationData.direct.concat(integrationData.partner);

    // Filter by category
    if (selectedFilter === "direct") {
      filtered = filtered.filter((item) => item.category === "Collation.ai Direct");
    } else if (selectedFilter === "partner") {
      filtered = filtered.filter((item) => item.category === "Via Partner Network");
    }

    // Filter by search
    if (searchTerm) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by letter
    if (selectedLetter !== "all") {
      filtered = filtered.filter(
        (item) => item.name.charAt(0).toUpperCase() === selectedLetter
      );
    }

    // Sort alphabetically
    filtered.sort((a, b) => a.name.localeCompare(b.name));

    return filtered;
  }, [searchTerm, selectedFilter, selectedLetter]);

  const stats = {
    total: 11273,
    direct: 83,
    partner: 11190,
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <Navbar />

      <div className="pt-32 pb-12 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Header - Clean design matching rest of site */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Integration Ecosystem
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto">
              Comprehensive Financial Data Connections
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-12 md:gap-20">
              <div>
                <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-2">
                  {stats.total.toLocaleString()}
                </div>
                <div className="text-sm md:text-base text-muted-foreground uppercase tracking-wider">
                  Total Connections
                </div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-2">
                  {stats.direct}
                </div>
                <div className="text-sm md:text-base text-muted-foreground uppercase tracking-wider">
                  Collation.ai Direct
                </div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-2">
                  {stats.partner.toLocaleString()}
                </div>
                <div className="text-sm md:text-base text-muted-foreground uppercase tracking-wider">
                  Via Partner Network
                </div>
              </div>
            </div>
          </div>

          {/* Controls Card */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-border overflow-hidden">
            <div className="p-6 md:p-8 bg-muted/50 border-b border-border">
              {/* Search */}
              <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
                <Input
                  type="text"
                  placeholder="Search integrations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-14 text-lg"
                />
              </div>

              {/* Filter Buttons */}
              <div className="flex flex-wrap gap-3 mb-6">
                <Button
                  onClick={() => setSelectedFilter("all")}
                  variant={selectedFilter === "all" ? "default" : "outline"}
                  className="flex-1 min-w-[120px]"
                >
                  All ({stats.total.toLocaleString()})
                </Button>
                <Button
                  onClick={() => setSelectedFilter("direct")}
                  variant={selectedFilter === "direct" ? "default" : "outline"}
                  className="flex-1 min-w-[120px]"
                >
                  Direct ({stats.direct})
                </Button>
                <Button
                  onClick={() => setSelectedFilter("partner")}
                  variant={selectedFilter === "partner" ? "default" : "outline"}
                  className="flex-1 min-w-[120px]"
                >
                  Partner ({stats.partner.toLocaleString()})
                </Button>
              </div>

              {/* Alphabet Filter */}
              <div className="flex flex-wrap gap-2 mb-6">
                <Button
                  size="sm"
                  onClick={() => setSelectedLetter("all")}
                  variant={selectedLetter === "all" ? "default" : "outline"}
                >
                  All
                </Button>
                {alphabet.map((letter) => (
                  <Button
                    key={letter}
                    size="sm"
                    onClick={() => setSelectedLetter(letter)}
                    variant={selectedLetter === letter ? "default" : "outline"}
                    className="w-10 h-10"
                  >
                    {letter}
                  </Button>
                ))}
              </div>

              {/* View Controls */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="text-lg font-semibold">
                  Showing {filteredIntegrations.length.toLocaleString()}{" "}
                  integration{filteredIntegrations.length !== 1 ? "s" : ""}
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    variant={viewMode === "grid" ? "default" : "outline"}
                  >
                    <Grid size={16} className="mr-2" />
                    Grid
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => setViewMode("list")}
                    variant={viewMode === "list" ? "default" : "outline"}
                  >
                    <List size={16} className="mr-2" />
                    List
                  </Button>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="p-6 md:p-8 min-h-[400px]">
              {filteredIntegrations.length === 0 ? (
                <div className="text-center text-muted-foreground py-12">
                  <p className="text-xl">No integrations found</p>
                  <p className="mt-2">Try adjusting your search or filters</p>
                </div>
              ) : viewMode === "grid" ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                  {filteredIntegrations.map((integration, index) => {
                    const logoKey = integration.logo_category && integration.logo
                      ? `${integration.logo_category}/${integration.logo}`
                      : null;
                    const logoSrc = logoKey && logoData[logoKey] ? logoData[logoKey] : null;

                    return (
                      <div
                        key={index}
                        className="bg-card border-2 border-border rounded-lg p-4 hover:shadow-lg transition-all hover:border-primary flex flex-col items-center justify-center text-center min-h-[140px]"
                      >
                        {logoSrc && (
                          <div className="mb-3 w-16 h-16 relative flex items-center justify-center">
                            <img
                              src={logoSrc}
                              alt={integration.name}
                              className="max-w-full max-h-full object-contain"
                            />
                          </div>
                        )}
                        <div className="font-semibold text-sm mb-2 line-clamp-2">
                          {integration.name}
                        </div>
                        <div className="text-xs text-muted-foreground mt-auto">
                          {integration.category === "Collation.ai Direct" ? "Direct" : "Partner"}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredIntegrations.map((integration, index) => {
                    const logoKey = integration.logo_category && integration.logo
                      ? `${integration.logo_category}/${integration.logo}`
                      : null;
                    const logoSrc = logoKey && logoData[logoKey] ? logoData[logoKey] : null;

                    return (
                      <div
                        key={index}
                        className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-all hover:border-primary flex items-center gap-4"
                      >
                        {logoSrc && (
                          <div className="w-12 h-12 relative flex-shrink-0 flex items-center justify-center">
                            <img
                              src={logoSrc}
                              alt={integration.name}
                              className="max-w-full max-h-full object-contain"
                            />
                          </div>
                        )}
                        <div className="flex-1">
                          <div className="font-semibold">{integration.name}</div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {integration.category === "Collation.ai Direct" ? "Direct" : "Partner"}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
