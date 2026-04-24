'use client';

import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/glass-card';
import { AnimatedButton } from '@/components/ui/animated-button';
import { ScoreCircle } from './score-circle';
import { slideUp, containerVariants, itemVariants } from '@/lib/animations';
import { MOCK_SCORE_DATA, getRiskLevelColor, getRiskLevelEmoji } from '@/lib/mock-data/dashboard';
import { RefreshCw } from 'lucide-react';

interface ScoreDisplayProps {
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

export const ScoreDisplay: React.FC<ScoreDisplayProps> = ({
  onRefresh,
  isRefreshing = false,
}) => {
  const riskColor = getRiskLevelColor(MOCK_SCORE_DATA.riskLevel);
  const riskEmoji = getRiskLevelEmoji(MOCK_SCORE_DATA.riskLevel);

  return (
    <motion.div
      className="w-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <GlassCard variant="lg" hasGlow animate delay={0}>
        <div className="space-y-8">
          {/* Header */}
          <motion.div
            className="flex items-center justify-between"
            variants={itemVariants}
          >
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">
                Your Credit Score
              </h2>
              <p className="text-text-secondary text-sm">
                Last updated: {new Date(MOCK_SCORE_DATA.lastUpdated).toLocaleDateString()}
              </p>
            </div>
            <AnimatedButton
              onClick={onRefresh}
              isLoading={isRefreshing}
              variant="secondary"
              size="sm"
              icon={<RefreshCw className="w-4 h-4" />}
            >
              Refresh
            </AnimatedButton>
          </motion.div>

          {/* Score Circle Section */}
          <motion.div
            className="flex flex-col items-center justify-center space-y-6"
            variants={itemVariants}
          >
            <div className="relative">
              <ScoreCircle
                score={MOCK_SCORE_DATA.score}
                maxScore={MOCK_SCORE_DATA.range.max}
                size={280}
              />
            </div>

            {/* Score Details */}
            <div className="grid grid-cols-3 gap-4 w-full">
              {/* Risk Level */}
              <motion.div
                className="text-center p-4 rounded-lg bg-white/5 border border-white/10"
                variants={slideUp}
                transition={{ delay: 0.6 }}
              >
                <div className="text-2xl mb-1">{riskEmoji}</div>
                <p className="text-text-secondary text-xs mb-2">Risk Level</p>
                <p
                  className="font-bold text-lg"
                  style={{ color: riskColor }}
                >
                  {MOCK_SCORE_DATA.riskLevel}
                </p>
              </motion.div>

              {/* Score Range */}
              <motion.div
                className="text-center p-4 rounded-lg bg-white/5 border border-white/10"
                variants={slideUp}
                transition={{ delay: 0.65 }}
              >
                <div className="text-2xl mb-1">📊</div>
                <p className="text-text-secondary text-xs mb-2">Score Range</p>
                <p className="font-bold text-lg text-text-primary">
                  {MOCK_SCORE_DATA.range.min}-{MOCK_SCORE_DATA.range.max}
                </p>
              </motion.div>

              {/* AI Confidence */}
              <motion.div
                className="text-center p-4 rounded-lg bg-white/5 border border-white/10"
                variants={slideUp}
                transition={{ delay: 0.7 }}
              >
                <div className="text-2xl mb-1">🤖</div>
                <p className="text-text-secondary text-xs mb-2">AI Confidence</p>
                <p className="font-bold text-lg text-text-primary">
                  {MOCK_SCORE_DATA.aiConfidence}%
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="grid grid-cols-2 gap-4"
            variants={itemVariants}
          >
            <AnimatedButton
              variant="primary"
              hasGlow
              className="w-full"
            >
              View Details
            </AnimatedButton>
            <AnimatedButton
              variant="outline"
              className="w-full"
            >
              Download Report
            </AnimatedButton>
          </motion.div>

          {/* Info Text */}
          <motion.p
            className="text-center text-text-secondary text-xs"
            variants={itemVariants}
          >
            Your credit score is calculated using advanced AI algorithms analyzing your financial behavior, payment history, and creditworthiness patterns.
          </motion.p>
        </div>
      </GlassCard>
    </motion.div>
  );
};
