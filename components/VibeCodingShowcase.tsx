import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Code2, Sparkles } from "lucide-react";

const PerformanceChart = () => (
  <div className="bg-card rounded-md p-2 border border-border h-16 flex items-end gap-0.5">
    {[40, 65, 45, 80, 55, 90, 70].map((height, i) => (
      <div key={i} className="flex-1 bg-primary/60 rounded-t" style={{ height: `${height}%` }} />
    ))}
  </div>
);

const PortfolioAllocation = () => (
  <div className="bg-card rounded-md p-2 border border-border h-16 flex items-center justify-center gap-2">
    <div className="relative w-10 h-10 rounded-full overflow-hidden">
      <div className="absolute inset-0 bg-primary" style={{ clipPath: "polygon(50% 50%, 50% 0%, 100% 0%, 100% 50%)" }} />
      <div className="absolute inset-0 bg-secondary" style={{ clipPath: "polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%)" }} />
      <div className="absolute inset-0 bg-accent" style={{ clipPath: "polygon(50% 50%, 50% 100%, 0% 100%, 0% 0%, 50% 0%)" }} />
    </div>
    <div className="flex flex-col gap-0.5 text-[9px]">
      <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 bg-primary rounded" /><span className="text-muted-foreground">Stocks 45%</span></div>
      <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 bg-secondary rounded" /><span className="text-muted-foreground">Bonds 30%</span></div>
      <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 bg-accent rounded" /><span className="text-muted-foreground">Cash 25%</span></div>
    </div>
  </div>
);

const RiskMetrics = () => (
  <div className="bg-card rounded-md p-2 border border-border h-16 grid grid-cols-2 gap-1">
    <div className="bg-muted/30 rounded p-1.5">
      <div className="text-[9px] text-muted-foreground">Volatility</div>
      <div className="text-sm font-semibold text-foreground">12.4%</div>
    </div>
    <div className="bg-muted/30 rounded p-1.5">
      <div className="text-[9px] text-muted-foreground">Sharpe Ratio</div>
      <div className="text-sm font-semibold text-foreground">1.8</div>
    </div>
  </div>
);

const ReturnAnalysis = () => (
  <div className="bg-card rounded-md p-1.5 border border-border h-16 overflow-hidden">
    <div className="text-[9px] grid grid-cols-3 gap-1 font-medium text-muted-foreground mb-0.5">
      <div>Period</div><div>Return</div><div>Change</div>
    </div>
    {["YTD", "1Y", "3Y"].map((period, i) => (
      <div key={i} className="text-[9px] grid grid-cols-3 gap-1 py-0.5 border-t border-border text-foreground">
        <div>{period}</div>
        <div className="text-green-500">+{8 + i * 2}.{i}%</div>
        <div className="text-green-500">↑</div>
      </div>
    ))}
  </div>
);

const VibeCodingShowcase = () => {
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [visibleElements, setVisibleElements] = useState<number[]>([]);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  const prompts = [
    { text: "Add a performance chart", elements: [0] },
    { text: "Show portfolio allocation", elements: [0, 1] },
    { text: "Include risk metrics", elements: [0, 1, 2] },
    { text: "Add return analysis", elements: [0, 1, 2, 3] },
  ];

  const uiElements = [
    { label: "Performance Chart", code: "LineChart component={data}", Component: PerformanceChart },
    { label: "Portfolio Allocation", code: "PieChart holdings={portfolio}", Component: PortfolioAllocation },
    { label: "Risk Metrics", code: "Card metrics={riskData}", Component: RiskMetrics },
    { label: "Return Analysis", code: "Table data={returns}", Component: ReturnAnalysis },
  ];

  // Start immediately when component mounts
  useEffect(() => {
    setShouldAnimate(true);
  }, []);

  // Typewriter effect
  useEffect(() => {
    if (!shouldAnimate) return;
    
    setIsTyping(true);
    setDisplayedText("");
    let currentIndex = 0;
    const currentPrompt = prompts[currentPromptIndex].text;

    const typeInterval = setInterval(() => {
      if (currentIndex < currentPrompt.length) {
        setDisplayedText(currentPrompt.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        setIsTyping(false);
        clearInterval(typeInterval);
        // Show new elements after typing completes
        setTimeout(() => {
          setVisibleElements(prompts[currentPromptIndex].elements);
        }, 300);
      }
    }, 60);

    return () => clearInterval(typeInterval);
  }, [currentPromptIndex, shouldAnimate]);

  // Auto-cycle through prompts
  useEffect(() => {
    if (!shouldAnimate) return;
    
    const cycleInterval = setInterval(() => {
      setCurrentPromptIndex((prev) => (prev + 1) % prompts.length);
    }, 4000);
    return () => clearInterval(cycleInterval);
  }, [shouldAnimate]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative bg-card/80 backdrop-blur-sm rounded-lg shadow-xl border border-border overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-2 px-3 py-2 bg-secondary/30 border-b border-border">
          <Code2 className="w-3 h-3 text-primary" />
          <h3 className="text-xs font-semibold text-foreground">Vibe-Coding Live</h3>
          <div className="ml-auto flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
            <span className="text-[10px] text-muted-foreground">Building...</span>
          </div>
        </div>

        {/* Prompt Input */}
        <div className="px-4 py-4 bg-gradient-to-r from-primary/10 to-primary/5 border-b border-border">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-foreground">Prompt</span>
          </div>
          <p className="text-base text-foreground font-medium leading-relaxed">
            {displayedText}
            {isTyping && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="inline-block w-0.5 h-4 bg-primary ml-1 align-middle"
              />
            )}
          </p>
        </div>

        {/* Side by Side: UI Preview & Code */}
        <div className="grid grid-cols-2 divide-x divide-border">
          {/* Left: UI Preview */}
          <div className="p-3 bg-background/40">
            <div className="flex items-center gap-1.5 mb-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="text-[10px] font-medium text-muted-foreground">UI Preview</span>
            </div>
            <div className="space-y-2 min-h-[250px]">
              {uiElements.map((element, index) => {
                const VisualComponent = element.Component;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95, height: 0 }}
                    animate={{
                      opacity: visibleElements.includes(index) ? 1 : 0,
                      scale: visibleElements.includes(index) ? 1 : 0.95,
                      height: visibleElements.includes(index) ? "auto" : 0,
                    }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <VisualComponent />
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right: Generated Code */}
          <div className="p-3 bg-muted/20">
            <div className="flex items-center gap-1.5 mb-2">
              <Code2 className="w-3 h-3 text-primary" />
              <span className="text-[10px] font-medium text-muted-foreground">Generated Code</span>
            </div>
            <div className="space-y-2 min-h-[250px] font-mono text-[10px]">
              {uiElements.map((element, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{
                    opacity: visibleElements.includes(index) ? 1 : 0,
                    y: visibleElements.includes(index) ? 0 : -10,
                    height: visibleElements.includes(index) ? "auto" : 0,
                  }}
                  transition={{ duration: 0.4, ease: "easeOut", delay: 0.15 }}
                  className="overflow-hidden"
                >
                  <div className="bg-background/80 rounded-md p-2 border border-border">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-medium text-foreground">{element.label}</span>
                      <div className="w-1 h-1 rounded-full bg-green-500" />
                    </div>
                    <code className="text-[10px] text-muted-foreground block">
                      &lt;{element.code} /&gt;
                    </code>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-3 py-2 bg-secondary/30 border-t border-border">
          <p className="text-[10px] text-center text-muted-foreground">
            Build custom UIs from your data warehouse in plain English
          </p>
        </div>
      </div>
    </div>
  );
};

export default VibeCodingShowcase;
