'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search } from 'lucide-react';
import VibeCodingShowcase from './VibeCodingShowcase';
import WorkflowShowcase from './WorkflowShowcase';

type ZoomType = 'workflow' | 'reporting' | null;

interface HeroZoomOverlayProps {
  onHover?: (type: ZoomType) => void;
  heroAnimationComplete?: boolean;
}

export default function HeroZoomOverlay({ onHover, heroAnimationComplete = false }: HeroZoomOverlayProps) {
  const [activeZoom, setActiveZoom] = useState<ZoomType>(null);

  const handleZoomIn = (type: ZoomType) => {
    setActiveZoom(type);
    onHover?.(type);
  };

  const handleZoomOut = () => {
    setActiveZoom(null);
    onHover?.(null);
  };

  // Don't show magnifying glasses until hero animation is complete
  if (!heroAnimationComplete) {
    return null;
  }

  return (
    <>
      {/* Workflow Automation Hotspot - Under workflow box */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
        className="absolute cursor-pointer z-20"
        style={{
          // UNDER workflow automation box (3rd box) - positioned under blue robot icon
          top: '56%',
          left: '48.5%',
          width: '70px',
          height: '70px',
        }}
        onClick={() => handleZoomIn('workflow')}
      >
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="relative w-full h-full group"
        >
          {/* Outer glow ring */}
          <div className="absolute inset-0 rounded-full bg-blue-400/30 blur-md" />

          {/* Pulsing ring */}
          <motion.div
            animate={{
              scale: [1, 1.3],
              opacity: [0.6, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeOut',
            }}
            className="absolute inset-0 rounded-full border-4 border-blue-400"
          />

          {/* Main circle */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 shadow-2xl group-hover:from-blue-500 group-hover:via-blue-600 group-hover:to-blue-700 transition-all duration-300" />

          {/* Inner highlight */}
          <div className="absolute inset-[3px] rounded-full bg-gradient-to-br from-white/30 to-transparent" />

          {/* Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Search className="w-9 h-9 text-white drop-shadow-lg" strokeWidth={2.5} />
          </div>

          {/* Tooltip */}
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            <div className="bg-blue-600 text-white px-3 py-1.5 rounded-lg shadow-xl text-xs font-semibold">
              Workflow Automation
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-blue-600 rotate-45" />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Reporting/VibeCoding Hotspot - Bottom-right corner of last box (reporting) */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7, type: 'spring', stiffness: 200 }}
        className="absolute cursor-pointer z-20"
        style={{
          // Bottom-right corner of reporting box (last box)
          top: '65%',
          right: '8%',
          width: '70px',
          height: '70px',
        }}
        onClick={() => handleZoomIn('reporting')}
      >
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.5,
          }}
          className="relative w-full h-full group"
        >
          {/* Outer glow ring */}
          <div className="absolute inset-0 rounded-full bg-blue-400/30 blur-md" />

          {/* Pulsing ring */}
          <motion.div
            animate={{
              scale: [1, 1.3],
              opacity: [0.6, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeOut',
              delay: 0.5,
            }}
            className="absolute inset-0 rounded-full border-4 border-blue-400"
          />

          {/* Main circle */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 shadow-2xl group-hover:from-blue-500 group-hover:via-blue-600 group-hover:to-blue-700 transition-all duration-300" />

          {/* Inner highlight */}
          <div className="absolute inset-[3px] rounded-full bg-gradient-to-br from-white/30 to-transparent" />

          {/* Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Search className="w-9 h-9 text-white drop-shadow-lg" strokeWidth={2.5} />
          </div>

          {/* Tooltip */}
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            <div className="bg-blue-600 text-white px-3 py-1.5 rounded-lg shadow-xl text-xs font-semibold">
              VibeCoding Reports
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-blue-600 rotate-45" />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Zoom Overlay Modal */}
      <AnimatePresence>
        {activeZoom && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={handleZoomOut}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={handleZoomOut}
                className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>

              {/* Content */}
              <div className="p-8">
                {activeZoom === 'workflow' && <WorkflowMechanics />}
                {activeZoom === 'reporting' && <ReportingMechanics />}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


// Workflow Automation Showcase
function WorkflowMechanics() {
  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-3xl font-bold text-gray-900 mb-2">
          Workflow Automation
        </h3>
        <p className="text-gray-600 text-lg">
          Build powerful data workflows with drag-and-drop automation
        </p>
      </div>

      {/* Workflow Showcase */}
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
        <WorkflowShowcase />
      </div>
    </div>
  );
}

// Reporting Mechanics - VibeCoding Showcase
function ReportingMechanics() {
  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-3xl font-bold text-gray-900 mb-2">
          VibeCoding - AI Report Builder
        </h3>
        <p className="text-gray-600 text-lg">
          Talk to your data and build custom reports with simple prompts
        </p>
      </div>

      {/* VibeCoding Live Showcase */}
      <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6">
        <VibeCodingShowcase />
      </div>
    </div>
  );
}

