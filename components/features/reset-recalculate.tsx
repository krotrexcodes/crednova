'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/glass-card';
import { AnimatedButton } from '@/components/ui/animated-button';
import { RotateCcw, Zap } from 'lucide-react';

interface ResetRecalculateProps {
  onReset?: () => void;
  onRecalculate?: () => void;
  animate?: boolean;
  delay?: number;
}

export function ResetRecalculate({
  onReset,
  onRecalculate,
  animate = true,
  delay = 0,
}: ResetRecalculateProps) {
  const [isRecalculating, setIsRecalculating] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleRecalculate = async () => {
    setIsRecalculating(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsRecalculating(false);
    onRecalculate?.();
  };

  const handleReset = () => {
    setShowConfirm(true);
  };

  const confirmReset = () => {
    onReset?.();
    setShowConfirm(false);
  };

  const variants = animate
    ? {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }
    : {};

  return (
    <motion.div
      className="w-full"
      initial={animate ? 'hidden' : undefined}
      animate={animate ? 'visible' : undefined}
      variants={variants}
      transition={{ delay, duration: 0.5 }}
    >
      <GlassCard hasGlow>
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white">Manage Your Data</h3>
          <p className="text-text-secondary text-sm">
            Reset your data or recalculate your score with latest information
          </p>

          {!showConfirm ? (
            <div className="grid sm:grid-cols-2 gap-4">
              {/* Recalculate Card */}
              <motion.div
                className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-lg p-4"
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(34, 211, 238, 0.3)' }}
              >
                <div className="flex items-start gap-3 mb-4">
                  <Zap className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-white font-semibold">Recalculate Score</p>
                    <p className="text-text-secondary text-xs mt-1">
                      Get fresh AI calculation based on your data
                    </p>
                  </div>
                </div>
                <AnimatedButton
                  variant="secondary"
                  size="sm"
                  onClick={handleRecalculate}
                  disabled={isRecalculating}
                  className="w-full"
                >
                  {isRecalculating ? 'Calculating...' : 'Recalculate'}
                </AnimatedButton>
              </motion.div>

              {/* Reset Card */}
              <motion.div
                className="bg-gradient-to-br from-red-500/20 to-pink-500/20 border border-red-500/30 rounded-lg p-4"
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(239, 68, 68, 0.3)' }}
              >
                <div className="flex items-start gap-3 mb-4">
                  <RotateCcw className="w-5 h-5 text-red-400 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-white font-semibold">Reset Data</p>
                    <p className="text-text-secondary text-xs mt-1">
                      Clear all your information and start fresh
                    </p>
                  </div>
                </div>
                <AnimatedButton
                  variant="ghost"
                  size="sm"
                  onClick={handleReset}
                  className="w-full border border-red-500/50 text-red-400 hover:text-red-300"
                >
                  Reset
                </AnimatedButton>
              </motion.div>
            </div>
          ) : (
            <motion.div
              className="bg-red-500/20 border border-red-500/50 rounded-lg p-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <p className="text-white font-semibold mb-4">Are you sure?</p>
              <p className="text-text-secondary text-sm mb-4">
                This will delete all your data including financial information and history. This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <AnimatedButton
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowConfirm(false)}
                  className="flex-1"
                >
                  Cancel
                </AnimatedButton>
                <AnimatedButton
                  variant="primary"
                  size="sm"
                  onClick={confirmReset}
                  className="flex-1 border border-red-500 bg-red-500/20"
                >
                  Yes, Reset
                </AnimatedButton>
              </div>
            </motion.div>
          )}

          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
            <p className="text-blue-300 text-xs">
              💡 Recalculate anytime to get the most up-to-date score based on your latest financial information.
            </p>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}
