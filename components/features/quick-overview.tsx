'use client';

import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/glass-card';
import { TrendingUp, Shield, Zap } from 'lucide-react';

interface QuickOverviewProps {
  score: number;
  loanEligibility: string;
  trustLevel: string;
  animate?: boolean;
  delay?: number;
}

export function QuickOverview({
  score,
  loanEligibility,
  trustLevel,
  animate = true,
  delay = 0,
}: QuickOverviewProps) {
  const scorePercentage = (score / 900) * 100;
  const riskLevel = score > 700 ? 'Low Risk' : score > 600 ? 'Medium Risk' : 'High Risk';
  const riskColor = score > 700 ? 'from-green-500 to-cyan-500' : score > 600 ? 'from-yellow-500 to-orange-500' : 'from-red-500 to-pink-500';

  const variants = animate
    ? {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }
    : {};

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <motion.div
      className="w-full"
      initial={animate ? 'hidden' : undefined}
      animate={animate ? 'visible' : undefined}
      variants={variants}
      transition={{ delay, duration: 0.5 }}
    >
      <motion.div
        className="grid sm:grid-cols-3 gap-4"
        variants={containerVariants}
        initial={animate ? 'hidden' : undefined}
        animate={animate ? 'visible' : undefined}
      >
        {/* Score Card */}
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
        >
          <GlassCard hasGlow>
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-text-secondary text-sm mb-1">Credit Score</p>
                  <p className="text-2xl font-bold text-white">{score}</p>
                  <p className={`text-xs mt-2 bg-gradient-to-r ${riskColor} bg-clip-text text-transparent font-semibold`}>
                    {riskLevel}
                  </p>
                </div>
                <TrendingUp className="w-6 h-6 text-green-400" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-text-secondary">Score Progress</span>
                  <span className="text-white font-semibold">{Math.round(scorePercentage)}%</span>
                </div>
                <motion.div
                  className="w-full h-2 bg-white/10 rounded-full overflow-hidden"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: delay + 0.3, duration: 0.8 }}
                >
                  <motion.div
                    className={`h-full bg-gradient-to-r ${riskColor}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${scorePercentage}%` }}
                    transition={{ delay: delay + 0.3, duration: 1 }}
                  />
                </motion.div>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Loan Eligibility Card */}
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
        >
          <GlassCard hasGlow>
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-text-secondary text-sm mb-1">Loan Eligibility</p>
                  <p className="text-xl font-bold text-white">{loanEligibility}</p>
                  <p className="text-xs text-green-400 mt-2">✓ Eligible</p>
                </div>
                <Zap className="w-6 h-6 text-purple-400" />
              </div>
              <div className="bg-white/5 rounded p-2 text-xs text-text-secondary">
                <p>Max Loan Amount</p>
                <p className="text-white font-bold mt-1">₹50,000</p>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Trust Score Card */}
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
        >
          <GlassCard hasGlow>
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-text-secondary text-sm mb-1">Trust Level</p>
                  <p className="text-2xl font-bold text-white">{trustLevel}</p>
                  <p className="text-xs text-blue-400 mt-2">▲ Improving</p>
                </div>
                <Shield className="w-6 h-6 text-blue-400" />
              </div>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <motion.div
                    key={i}
                    className={`flex-1 h-1 rounded-full ${
                      i <= 4 ? 'bg-gradient-to-r from-blue-500 to-cyan-500' : 'bg-white/20'
                    }`}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ delay: delay + 0.1 + i * 0.05, duration: 0.4 }}
                  />
                ))}
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
