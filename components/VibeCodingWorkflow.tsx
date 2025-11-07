import { motion } from "framer-motion";
import { Database, FileCode, Server, Monitor, ArrowRight, ArrowDown, Github, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

const VibeCodingWorkflow = () => {
  const [displayedText, setDisplayedText] = useState("");
  const [displayedCode, setDisplayedCode] = useState("");
  const [fileStates, setFileStates] = useState<{ name: string; done: boolean }[]>([]);
  const [dashboardValues, setDashboardValues] = useState({ profit: 18, loss: 6, net: 14 });
  
  const fullText = '"Build me a Dashboard that calculates PnL and displays results in a Table chart."';
  const codeTemplate = "import Dashboard from './Dashboard';\nconst Chart = () => {\n  return <Table data={pnl} />;\n};";
  const allFiles = ["src/", "dashboard.tsx", "components/Table.tsx", "hooks/usePnL.ts"];
  
  // Typing animation for the prompt
  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50);
    
    return () => clearInterval(typingInterval);
  }, []);

  // Code generation animation (character-by-character)
  useEffect(() => {
    const start = setTimeout(() => {
      let i = 0;
      const typer = setInterval(() => {
        if (i <= codeTemplate.length) {
          setDisplayedCode(codeTemplate.slice(0, i));
          i++;
        } else {
          clearInterval(typer);
        }
      }, 35);
    }, 1200);
    return () => clearTimeout(start);
  }, []);

  // Files syncing animation (spinner then checkmark)
  useEffect(() => {
    const start = setTimeout(() => {
      allFiles.forEach((name, idx) => {
        setTimeout(() => {
          // Push file as pending
          setFileStates(prev => [...prev, { name, done: false }]);
          // Mark as done shortly after
          setTimeout(() => {
            setFileStates(prev => prev.map(f => f.name === name ? { ...f, done: true } : f));
          }, 500);
        }, idx * 600);
      });
    }, 2500);
    return () => clearTimeout(start);
  }, []);

  // Dashboard numbers changing animation
  useEffect(() => {
    const interval = setInterval(() => {
      setDashboardValues({
        profit: 15 + Math.floor(Math.random() * 8),
        loss: 4 + Math.floor(Math.random() * 5),
        net: 10 + Math.floor(Math.random() * 8)
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative bg-white dark:bg-slate-950 rounded-2xl p-6 md:p-10 border-2 border-border shadow-lg">
      {/* Flow Arrows - Desktop Only */}
      <div className="hidden lg:block">
        {/* Development to GitHub Arrow */}
        <motion.div
          className="absolute top-1/2 left-[31%] transform -translate-y-1/2 z-10"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <motion.div
            animate={{ x: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex items-center gap-1"
          >
            <ArrowRight className="w-8 h-8 text-blue-500" strokeWidth={3} />
            <ArrowRight className="w-8 h-8 text-blue-500 -ml-5" strokeWidth={3} style={{ opacity: 0.5 }} />
          </motion.div>
        </motion.div>
        
        {/* GitHub to Collation.AI Arrow */}
        <motion.div
          className="absolute top-1/2 left-[64%] transform -translate-y-1/2 z-10"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <motion.div
            animate={{ x: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="flex items-center gap-1"
          >
            <ArrowRight className="w-8 h-8 text-green-500" strokeWidth={3} />
            <ArrowRight className="w-8 h-8 text-green-500 -ml-5" strokeWidth={3} style={{ opacity: 0.5 }} />
          </motion.div>
        </motion.div>

        {/* Animated dashed connectors */}
        <svg className="absolute inset-0 pointer-events-none" preserveAspectRatio="none">
          <defs>
            <linearGradient id="gradBlue" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="rgb(59,130,246)" />
              <stop offset="100%" stopColor="rgb(147,197,253)" />
            </linearGradient>
            <linearGradient id="gradGreen" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="rgb(34,197,94)" />
              <stop offset="100%" stopColor="rgb(134,239,172)" />
            </linearGradient>
          </defs>
          <motion.line
            x1="30%" y1="50%" x2="63%" y2="50%"
            stroke="url(#gradBlue)" strokeWidth="3" strokeDasharray="6 8"
            animate={{ strokeDashoffset: [0, -60] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          <motion.line
            x1="63%" y1="50%" x2="95%" y2="50%"
            stroke="url(#gradGreen)" strokeWidth="3" strokeDasharray="6 8"
            animate={{ strokeDashoffset: [0, -60] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 0.5 }}
          />
        </svg>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        
        {/* Left Column - Development Environment */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-blue-600 dark:text-blue-400 text-center mb-4">Development Environment</h4>
          
          {/* Text prompts from user */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg p-3 shadow-sm"
          >
            <div className="flex items-center gap-2 mb-2">
              <FileCode className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
              <span className="text-xs font-medium text-slate-600 dark:text-slate-400">Text prompts from user</span>
            </div>
            <p className="text-sm md:text-base font-mono text-slate-900 dark:text-slate-100 leading-relaxed">
              {displayedText}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="inline-block w-0.5 h-4 bg-blue-600 dark:bg-blue-400 ml-0.5 align-middle"
              />
            </p>
          </motion.div>

          <div className="flex justify-center py-1">
            <motion.div
              animate={{ y: [0, 3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.svg 
                className="w-5 h-5 text-blue-500" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <motion.path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.svg>
            </motion.div>
          </div>

          {/* Vibe coding */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-blue-50 dark:bg-blue-950/30 border border-blue-300 dark:border-blue-800 rounded-lg p-3 shadow-sm"
          >
            <div className="flex items-center gap-2 mb-2">
              <motion.div 
                className="w-5 h-5 bg-blue-600 dark:bg-blue-500 rounded flex items-center justify-center"
                animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="text-white text-xs font-bold">V</span>
              </motion.div>
              <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">Vibe coding</span>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded border border-slate-300 dark:border-slate-700 p-2.5 space-y-1.5 min-h-[120px]">
              <div className="flex items-center gap-2 bg-blue-600 dark:bg-blue-500 text-white px-2 py-1 rounded text-xs font-medium">
                <span>⚡ Lovable Editor</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                <Loader2 className="w-3 h-3 animate-spin text-blue-600 dark:text-blue-400" />
                <span>Building...</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {/* Code being generated */}
                <div className="text-[10px] text-slate-700 dark:text-slate-300 font-mono">
                  <div className="relative">
                    <pre className="whitespace-pre-wrap leading-4">
{displayedCode}
                    </pre>
                    <motion.div
                      className="absolute top-0 left-0 h-full w-10 bg-gradient-to-r from-blue-200/40 to-transparent"
                      animate={{ x: ['-10%', '120%'] }}
                      transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
                    />
                  </div>
                </div>
                {/* Live preview box */}
                <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded p-2">
                  <div className="text-[10px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Live Preview</div>
                  <div className="h-10 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded mb-1" />
                  <div className="h-1.5 bg-slate-200 dark:bg-slate-800 rounded overflow-hidden">
                    <motion.div 
                      className="h-full bg-blue-500"
                      animate={{ x: ['-100%', '0%'], width: ['30%', '100%'] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="flex justify-center py-1">
            <motion.div
              animate={{ y: [0, 3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
            >
              <ArrowDown className="w-5 h-5 text-blue-500" />
            </motion.div>
          </div>

          {/* PUBLIC LLM */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-blue-100 dark:bg-blue-950/50 border border-blue-400 dark:border-blue-700 rounded-lg p-3 shadow-sm"
          >
            <div className="text-center mb-2">
              <div className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-0.5">PUBLIC LLM</div>
              <div className="text-[10px] text-slate-600 dark:text-slate-400">Server hosted by Lovable USA</div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded p-2 text-center">
                <Monitor className="w-5 h-5 mx-auto mb-1 text-blue-600 dark:text-blue-400" />
                <div className="text-xs font-semibold text-slate-900 dark:text-slate-100">UI (test)</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-500">Environment</div>
              </div>
              <div className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded p-2 text-center">
                <Database className="w-5 h-5 mx-auto mb-1 text-blue-600 dark:text-blue-400" />
                <div className="text-xs font-semibold text-slate-900 dark:text-slate-100">Dummy DB</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-500">Sample Data</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Middle Column - GitHub */}
        <div className="space-y-4 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg p-5 shadow-sm"
          >
            <div className="flex items-center justify-center gap-2.5 mb-4">
              <Github className="w-7 h-7 text-slate-900 dark:text-slate-100" />
              <span className="text-lg font-bold text-slate-900 dark:text-slate-100">GitHub</span>
            </div>

            <div className="space-y-3">
              <motion.div 
                className="flex items-center gap-2 text-green-600 dark:text-green-400"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <motion.div 
                  className="w-2 h-2 bg-green-600 dark:bg-green-400 rounded-full"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <span className="text-sm font-semibold">Syncing...</span>
                <Loader2 className="w-4 h-4 animate-spin" />
              </motion.div>

              <motion.div 
                className="bg-slate-50 dark:bg-slate-950 rounded border border-slate-200 dark:border-slate-800 p-2.5 space-y-1 font-mono text-xs min-h-[90px]"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
              >
                <motion.div 
                  className="flex items-center gap-2 text-slate-600 dark:text-slate-400"
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <span>✓</span>
                  <span>Pushing files...</span>
                </motion.div>
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 pl-3">
                  <span>📁</span>
                  <span>src/</span>
                </div>
                {fileStates.map((file, idx) => (
                  <motion.div
                    key={file.name + idx}
                    initial={{ opacity: 0, x: -10, height: 0 }}
                    animate={{ opacity: 1, x: 0, height: 'auto' }}
                    transition={{ duration: 0.4 }}
                    className="flex items-center gap-2 text-slate-900 dark:text-slate-100 pl-6"
                  >
                    {file.done ? (
                      <span>✓</span>
                    ) : (
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-green-600" />
                    )}
                    <span>{file.name}</span>
                  </motion.div>
                ))}
              </motion.div>

              <div className="border-t border-slate-200 dark:border-slate-800 pt-2.5 space-y-1">
                <div className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-2">
                  <span>•</span>
                  <span>Real-time commits</span>
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-2">
                  <span>•</span>
                  <span>Version control</span>
                </div>
              </div>

              <motion.div 
                className="bg-blue-50 dark:bg-blue-950/30 border border-blue-300 dark:border-blue-800 rounded p-2 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.7 }}
              >
                <div className="text-xs font-semibold text-blue-600 dark:text-blue-400">Collation creates dummy data</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-500">(same schema)</div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Right Column - Collation.AI's Secure Infrastructure */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-green-600 dark:text-green-400 text-center mb-4">
            Collation.AI's Secure Infrastructure
          </h4>

          {/* collation.ai */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="bg-green-100 dark:bg-green-950/30 border border-green-400 dark:border-green-700 rounded-lg p-3 shadow-sm"
          >
            <div className="flex items-center gap-2 mb-1.5">
              <motion.div 
                className="w-2.5 h-2.5 bg-green-500 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-sm font-bold text-slate-900 dark:text-slate-100">collation.ai</span>
            </div>
            <div className="space-y-0.5">
              <div className="text-xs font-semibold text-green-600 dark:text-green-400">Collation.AI Secure Storage</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-500">Code deployment</div>
            </div>
          </motion.div>

          <div className="flex justify-center py-1">
            <motion.div
              animate={{ y: [0, 3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
            >
              <ArrowDown className="w-5 h-5 text-green-500" />
            </motion.div>
          </div>

          {/* Server and UI (prod) */}
          <div className="grid grid-cols-2 gap-2">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 text-center shadow-sm"
            >
              <Server className="w-6 h-6 mx-auto mb-1.5 text-green-600 dark:text-green-400" />
              <div className="text-xs font-semibold text-slate-900 dark:text-slate-100">Server</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-500">Real API access</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 text-center shadow-sm"
            >
              <Monitor className="w-6 h-6 mx-auto mb-1.5 text-green-600 dark:text-green-400" />
              <div className="text-xs font-semibold text-slate-900 dark:text-slate-100">UI (prod)</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-500">Real UI</div>
            </motion.div>
          </div>

          <div className="flex justify-center py-1">
            <motion.div
              animate={{ y: [0, 3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}
            >
              <ArrowDown className="w-5 h-5 text-green-500" />
            </motion.div>
          </div>

          {/* Real Database */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="bg-white dark:bg-slate-900 border border-green-400 dark:border-green-700 rounded-lg p-3 text-center shadow-sm"
          >
            <Database className="w-7 h-7 mx-auto mb-1.5 text-green-600 dark:text-green-400" />
            <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">Real Database</div>
            <div className="text-xs text-slate-500 dark:text-slate-500">(secure environment)</div>
          </motion.div>

          <div className="flex justify-center py-1">
            <motion.div
              animate={{ y: [0, 3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
            >
              <ArrowDown className="w-5 h-5 text-green-500" />
            </motion.div>
          </div>

          {/* Live Dashboard */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            className="bg-green-100 dark:bg-green-950/30 border border-green-400 dark:border-green-700 rounded-lg p-3 shadow-sm"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <motion.div 
                  className="w-2 h-2 bg-green-500 rounded-full"
                  animate={{ opacity: [1, 0.3, 1], scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-sm font-bold text-slate-900 dark:text-slate-100">Live Dashboard</span>
              </div>
              <motion.div 
                className="bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1"
                animate={{ boxShadow: ["0 0 0px rgba(34, 197, 94, 0.5)", "0 0 10px rgba(34, 197, 94, 0.8)", "0 0 0px rgba(34, 197, 94, 0.5)"] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span>•</span>
                <span>Live</span>
              </motion.div>
            </div>
            <div className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded p-2.5">
              <div className="text-xs font-semibold text-slate-900 dark:text-slate-100 mb-2">📊 P&L Dashboard</div>
              <motion.div 
                className="flex justify-between items-center text-base md:text-lg"
                key={`${dashboardValues.profit}-${dashboardValues.loss}-${dashboardValues.net}`}
              >
                <motion.span 
                  className="text-green-600 dark:text-green-400 font-bold"
                  initial={{ y: -8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.25 }}
                >
                  +${dashboardValues.profit}K
                </motion.span>
                <motion.span 
                  className="text-red-600 dark:text-red-400 font-bold"
                  initial={{ y: -8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.25 }}
                >
                  -${dashboardValues.loss}K
                </motion.span>
                <motion.span 
                  className="text-blue-600 dark:text-blue-400 font-bold"
                  initial={{ y: -8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.25 }}
                >
                  ${dashboardValues.net}K
                </motion.span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default VibeCodingWorkflow;
