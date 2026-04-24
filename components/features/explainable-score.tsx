'use client';

import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/glass-card';
import { containerVariants, itemVariants, barAnimationVariants, staggeredListVariants, staggeredItemVariants } from '@/lib/animations';
import { MOCK_SCORE_FACTORS } from '@/lib/mock-data/dashboard';

interface FactorDisplayProps {
  factor: string;
  weight: number;
  impact: number;
  isPositive: boolean;
}

const FactorBar: React.FC<FactorDisplayProps> = ({ factor, weight, impact, isPositive }) => {
  const maxWeight = 25;
  const percentage = (Math.abs(weight) / maxWeight) * 100;

  return (
    <motion.div
      className="space-y-2"
      variants={staggeredItemVariants}
    >
      <div className="flex items-center justify-between">
        <span className="text-text-secondary text-sm">{factor}</span>
        <span className={`text-sm font-bold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
          {isPositive ? '+' : ''}{impact}
        </span>
      </div>
      <div className="relative h-2 rounded-full bg-white/10 overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${
            isPositive
              ? 'bg-gradient-to-r from-green-500 to-emerald-500'
              : 'bg-gradient-to-r from-red-500 to-orange-500'
          }`}
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  );
};

interface ExplainableScoreProps {
  animate?: boolean;
  delay?: number;
}

export const ExplainableScore: React.FC<ExplainableScoreProps> = ({
  animate = true,
  delay = 0,
}) => {
  const positiveCount = MOCK_SCORE_FACTORS.positive.length;
  const positiveImpact = MOCK_SCORE_FACTORS.positive.reduce((sum, f) => sum + f.impact, 0);
  const negativeImpact = MOCK_SCORE_FACTORS.negative.reduce((sum, f) => sum + f.impact, 0);
  const netImpact = positiveImpact + negativeImpact;

  return (
    <GlassCard variant="lg" hasGlow animate={animate} delay={delay}>
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          className="space-y-2"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.h3 className="text-2xl font-bold text-white" variants={itemVariants}>
            Score Breakdown
          </motion.h3>
          <motion.p className="text-text-secondary text-sm" variants={itemVariants}>
            Understand what drives your credit score
          </motion.p>
        </motion.div>

        {/* Net Impact Summary */}
        <motion.div
          className="grid sm:grid-cols-3 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.div
            className="p-4 rounded-lg bg-green-500/10 border border-green-500/30"
            variants={itemVariants}
          >
            <p className="text-text-secondary text-sm mb-1">Positive Factors</p>
            <p className="text-2xl font-bold text-green-400">+{positiveImpact}</p>
          </motion.div>
          <motion.div
            className="p-4 rounded-lg bg-red-500/10 border border-red-500/30"
            variants={itemVariants}
          >
            <p className="text-text-secondary text-sm mb-1">Negative Factors</p>
            <p className="text-2xl font-bold text-red-400">{negativeImpact}</p>
          </motion.div>
          <motion.div
            className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30"
            variants={itemVariants}
          >
            <p className="text-text-secondary text-sm mb-1">Net Impact</p>
            <p className="text-2xl font-bold text-blue-400">+{netImpact}</p>
          </motion.div>
        </motion.div>

        {/* Positive Factors */}
        <motion.div
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.h4 className="text-lg font-bold text-green-400" variants={itemVariants}>
            ✓ Positive Factors
          </motion.h4>
          <motion.div
            className="space-y-4"
            variants={staggeredListVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {MOCK_SCORE_FACTORS.positive.map((factor, index) => (
              <FactorBar
                key={factor.factor}
                factor={factor.factor}
                weight={factor.weight}
                impact={factor.impact}
                isPositive
              />
            ))}
          </motion.div>
        </motion.div>

        {/* Negative Factors */}
        <motion.div
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.h4 className="text-lg font-bold text-red-400" variants={itemVariants}>
            ✗ Areas for Improvement
          </motion.h4>
          <motion.div
            className="space-y-4"
            variants={staggeredListVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {MOCK_SCORE_FACTORS.negative.map((factor, index) => (
              <FactorBar
                key={factor.factor}
                factor={factor.factor}
                weight={factor.weight}
                impact={factor.impact}
                isPositive={false}
              />
            ))}
          </motion.div>
        </motion.div>

        {/* Action Button */}
        <motion.button
          className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          View Detailed Analysis
        </motion.button>
      </div>
    </GlassCard>
  );
};
