import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Workflow, Database, Mail, BarChart3, Search, Calendar, Code2, Activity, CheckCircle, Clock } from "lucide-react";

const WorkflowShowcase = () => {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  // Phases of workflow creation and monitoring
  const phases = [
    {
      phase: "search",
      title: "Building Workflow",
      description: "Search for Addepar node",
      view: "palette",
      searchText: "Addepar",
      highlightNode: "addepar"
    },
    {
      phase: "build",
      title: "Building Workflow",
      description: "Pull data from Addepar via APIs",
      view: "canvas",
      nodes: ["addepar"],
      status: "Connecting to Addepar API..."
    },
    {
      phase: "build",
      title: "Building Workflow",
      description: "Bring data into Data Warehouse",
      view: "canvas",
      nodes: ["addepar", "warehouse"],
      status: "Ingesting data into warehouse..."
    },
    {
      phase: "build",
      title: "Building Workflow",
      description: "Get data from Archway via web scraping",
      view: "canvas",
      nodes: ["addepar", "warehouse", "archway"],
      status: "Scraping Archway data..."
    },
    {
      phase: "build",
      title: "Building Workflow",
      description: "Build reconciliation report",
      view: "canvas",
      nodes: ["addepar", "warehouse", "archway", "report"],
      status: "Generating reconciliation report..."
    },
    {
      phase: "build",
      title: "Building Workflow",
      description: "Send completion email to client",
      view: "canvas",
      nodes: ["addepar", "warehouse", "archway", "report", "email"],
      status: "Workflow complete - Ready to run"
    },
    {
      phase: "monitor",
      title: "Monitoring Workflow",
      description: "View execution schedule",
      view: "calendar",
      schedule: "Daily at 6:00 AM EST"
    },
    {
      phase: "monitor",
      title: "Monitoring Workflow",
      description: "Review generated code",
      view: "code",
      codePreview: "def reconcile_data():\n  addepar = fetch_api()\n  archway = scrape_web()\n  compare(addepar, archway)"
    },
    {
      phase: "monitor",
      title: "Monitoring Workflow",
      description: "Track execution progress",
      view: "progress",
      executionStats: { completed: 847, failed: 3, running: 1 }
    }
  ];

  // Start animation
  useEffect(() => {
    setShouldAnimate(true);
  }, []);

  // Typewriter effect
  useEffect(() => {
    if (!shouldAnimate) return;

    setIsTyping(true);
    setDisplayedText("");
    let currentIndex = 0;
    const currentText = phases[currentPhase].description;

    const typeInterval = setInterval(() => {
      if (currentIndex < currentText.length) {
        setDisplayedText(currentText.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        setIsTyping(false);
        clearInterval(typeInterval);
      }
    }, 35);

    return () => clearInterval(typeInterval);
  }, [currentPhase, shouldAnimate]);

  // Auto-cycle through phases
  useEffect(() => {
    if (!shouldAnimate) return;

    const cycleInterval = setInterval(() => {
      setCurrentPhase((prev) => (prev + 1) % phases.length);
    }, 1500);
    return () => clearInterval(cycleInterval);
  }, [shouldAnimate]);

  const currentData = phases[currentPhase];

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative bg-card/80 backdrop-blur-sm rounded-lg shadow-xl border border-border overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-2 px-3 py-2 bg-secondary/30 border-b border-border">
          <Workflow className="w-3 h-3 text-primary" />
          <h3 className="text-xs font-semibold text-foreground">{currentData.title}</h3>
          <div className="ml-auto flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] text-muted-foreground">
              {currentData.phase === "search" && "Searching..."}
              {currentData.phase === "build" && "Building..."}
              {currentData.phase === "monitor" && "Monitoring..."}
            </span>
          </div>
        </div>

        {/* Action Description */}
        <div className="px-4 py-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-b border-border">
          <p className="text-sm text-foreground font-medium leading-relaxed">
            {displayedText}
            {isTyping && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="inline-block w-0.5 h-3 bg-primary ml-1 align-middle"
              />
            )}
          </p>
        </div>

        {/* Main Content Area */}
        <div className="h-[280px] bg-gradient-to-br from-blue-50/50 to-purple-50/50">
          <AnimatePresence mode="wait">
            {/* Search/Palette View */}
            {currentData.view === "palette" && (
              <motion.div
                key="palette"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-4 h-full"
              >
                <div className="bg-white rounded-lg border border-border h-full p-3">
                  <div className="flex items-center gap-2 mb-3 p-2 bg-gray-50 rounded-lg border border-gray-200">
                    <Search className="w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={currentData.searchText}
                      readOnly
                      className="flex-1 bg-transparent text-sm outline-none"
                      placeholder="Search nodes..."
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="text-xs font-semibold text-gray-500 mb-2">Data Sources</div>
                    <motion.div
                      animate={{
                        borderColor: currentData.highlightNode === "addepar" ? "#3b82f6" : "#e5e7eb",
                        backgroundColor: currentData.highlightNode === "addepar" ? "#eff6ff" : "#ffffff"
                      }}
                      className="flex items-center gap-3 p-3 border rounded-lg"
                    >
                      <div className="w-8 h-8 bg-orange-100 rounded flex items-center justify-center">
                        <Database className="w-4 h-4 text-orange-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-900">Addepar API</p>
                        <p className="text-xs text-gray-600">Pull portfolio data via REST API</p>
                      </div>
                    </motion.div>
                    <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg opacity-50">
                      <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                        <Database className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-900">Orion API</p>
                        <p className="text-xs text-gray-600">Connect to Orion portfolio data</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Canvas View */}
            {currentData.view === "canvas" && (
              <motion.div
                key="canvas"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-4 h-full flex flex-col"
              >
                <div className="flex-1 bg-white rounded-lg border border-border p-4 relative overflow-hidden">
                  {/* Connection Lines - Edge to edge connections */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ minWidth: '100%', minHeight: '100%' }}>
                    {/* Flow: Addepar → Warehouse, Archway → Warehouse, Warehouse → Report, Report → Email */}

                    {/* Addepar right edge to Warehouse LEFT EDGE - MUST TOUCH */}
                    {currentData.nodes?.includes("warehouse") && (
                      <motion.line
                        x1="11%" y1="10%" x2="46%" y2="50%"
                        stroke="#3b82f6" strokeWidth="3"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.25 }}
                      />
                    )}

                    {/* Archway right edge to Warehouse LEFT EDGE - MUST TOUCH */}
                    {currentData.nodes?.includes("archway") && (
                      <motion.line
                        x1="11%" y1="90%" x2="46%" y2="50%"
                        stroke="#3b82f6" strokeWidth="3"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.25 }}
                      />
                    )}

                    {/* Warehouse to Report - same gap as incoming lines */}
                    {currentData.nodes?.includes("report") && (
                      <motion.line
                        x1="62%" y1="50%" x2="89%" y2="10%"
                        stroke="#3b82f6" strokeWidth="3"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.25 }}
                      />
                    )}

                    {/* Report to Email - LINE between boxes with proper gap */}
                    {currentData.nodes?.includes("email") && (
                      <motion.line
                        x1="93%" y1="25%" x2="93%" y2="85%"
                        stroke="#3b82f6" strokeWidth="3"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.25 }}
                      />
                    )}
                  </svg>

                  {/* Nodes - Better spaced */}
                  {currentData.nodes?.includes("addepar") && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-4 left-4"
                    >
                      <div className="flex flex-col items-center gap-1">
                        <div className="w-12 h-12 bg-orange-500 rounded-lg shadow-lg flex items-center justify-center">
                          <Database className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-[9px] font-semibold whitespace-nowrap">Addepar</span>
                      </div>
                    </motion.div>
                  )}

                  {currentData.nodes?.includes("archway") && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute bottom-4 left-4"
                    >
                      <div className="flex flex-col items-center gap-1">
                        <div className="w-12 h-12 bg-teal-500 rounded-lg shadow-lg flex items-center justify-center">
                          <Database className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-[9px] font-semibold whitespace-nowrap">Archway</span>
                      </div>
                    </motion.div>
                  )}

                  {currentData.nodes?.includes("warehouse") && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    >
                      <div className="flex flex-col items-center gap-1">
                        <div className="w-16 h-16 bg-purple-600 rounded-xl shadow-2xl flex items-center justify-center">
                          <Database className="w-8 h-8 text-white" />
                        </div>
                        <span className="text-[10px] font-bold text-purple-600 whitespace-nowrap">Warehouse</span>
                      </div>
                    </motion.div>
                  )}

                  {currentData.nodes?.includes("report") && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-4 right-4"
                    >
                      <div className="flex flex-col items-center gap-1">
                        <div className="w-12 h-12 bg-green-500 rounded-lg shadow-lg flex items-center justify-center">
                          <BarChart3 className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-[9px] font-semibold whitespace-nowrap">Report</span>
                      </div>
                    </motion.div>
                  )}

                  {currentData.nodes?.includes("email") && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute bottom-2 right-4"
                    >
                      <div className="flex flex-col items-center gap-1">
                        <div className="w-12 h-12 bg-pink-500 rounded-lg shadow-lg flex items-center justify-center">
                          <Mail className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-[9px] font-semibold whitespace-nowrap">Email</span>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Status Bar - Dynamic Color Based on Node */}
                <div className={`mt-2 px-5 py-4 rounded-lg border-2 shadow-2xl ${
                  currentData.nodes?.includes("email") ? "bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 border-pink-600" :
                  currentData.nodes?.includes("report") ? "bg-gradient-to-r from-green-400 via-green-500 to-green-600 border-green-600" :
                  currentData.nodes?.includes("archway") ? "bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 border-teal-600" :
                  currentData.nodes?.includes("warehouse") ? "bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 border-purple-600" :
                  currentData.nodes?.includes("addepar") ? "bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 border-orange-600" :
                  "bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 border-blue-600"
                }`}>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse shadow-xl border-2 border-green-300" />
                    <span className="text-base font-bold text-white drop-shadow-lg">{currentData.status}</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Calendar View */}
            {currentData.view === "calendar" && (
              <motion.div
                key="calendar"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-4 h-full"
              >
                <div className="bg-white rounded-lg border border-border h-full p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <h4 className="text-sm font-semibold">Execution Schedule</h4>
                  </div>
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center gap-2 mb-1">
                        <Clock className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-semibold text-blue-900">Daily at 6:00 AM EST</span>
                      </div>
                      <p className="text-xs text-blue-700">Automated reconciliation workflow</p>
                    </div>
                    <div className="grid grid-cols-7 gap-1 mt-4">
                      {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
                        <div key={i} className="text-center text-xs font-semibold text-gray-500">{day}</div>
                      ))}
                      {Array.from({ length: 28 }).map((_, i) => (
                        <div
                          key={i}
                          className={`aspect-square flex items-center justify-center text-xs rounded ${
                            [1, 2, 3, 4, 5, 8, 9, 10, 11, 12].includes(i)
                              ? "bg-green-100 text-green-700 font-semibold"
                              : "bg-gray-50 text-gray-400"
                          }`}
                        >
                          {i + 1}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Code View */}
            {currentData.view === "code" && (
              <motion.div
                key="code"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-4 h-full"
              >
                <div className="bg-gray-900 rounded-lg border border-gray-700 h-full p-4 font-mono">
                  <div className="flex items-center gap-2 mb-3">
                    <Code2 className="w-4 h-4 text-green-400" />
                    <span className="text-xs font-semibold text-green-400">workflow.py</span>
                  </div>
                  <pre className="text-xs text-green-300 leading-relaxed">
                    <code>{currentData.codePreview}</code>
                  </pre>
                  <div className="mt-4 text-xs text-gray-500">
                    # Auto-generated workflow code
                  </div>
                </div>
              </motion.div>
            )}

            {/* Progress View */}
            {currentData.view === "progress" && (
              <motion.div
                key="progress"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-4 h-full"
              >
                <div className="bg-white rounded-lg border border-border h-full p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Activity className="w-4 h-4 text-purple-600" />
                    <h4 className="text-sm font-semibold">Execution Stats</h4>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center gap-2 mb-1">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-xs text-green-700 font-medium">Completed</span>
                      </div>
                      <p className="text-2xl font-bold text-green-700">{currentData.executionStats?.completed}</p>
                    </div>
                    <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-red-700 font-medium">Failed</span>
                      </div>
                      <p className="text-2xl font-bold text-red-700">{currentData.executionStats?.failed}</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-blue-700 font-medium">Running</span>
                      </div>
                      <p className="text-2xl font-bold text-blue-700">{currentData.executionStats?.running}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-600">Success Rate</span>
                      <span className="font-semibold text-gray-900">99.6%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-green-500"
                        initial={{ width: "0%" }}
                        animate={{ width: "99.6%" }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="px-3 py-2 bg-secondary/30 border-t border-border">
          <p className="text-[10px] text-center text-muted-foreground">
            Build, deploy, and monitor data workflows end-to-end
          </p>
        </div>
      </div>
    </div>
  );
};

export default WorkflowShowcase;
