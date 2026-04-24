'use client';

import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/glass-card';
import { containerVariants, itemVariants, circleProgressVariants } from '@/lib/animations';
import { MOCK_TRUST_SCORE } from '@/lib/mock-data/dashboard';

interface TrustScoreProps {
  animate?: boolean;
  delay?: number;
}

export const TrustScore: React.FC<TrustScoreProps> = ({
  animate = true,
  delay = 0,
}) => {
  const size = 240;
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (MOCK_TRUST_SCORE.score / 100) * circumference;

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
            Trust Score
          </motion.h3>
          <motion.p className="text-text-secondary text-sm" variants={itemVariants}>
            Your platform reliability rating
          </motion.p>
        </motion.div>

        {/* Score Circle */}
        <motion.div
          className="flex flex-col items-center justify-center space-y-4"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <div className="relative flex items-center justify-center">
            <svg
              width={size}
              height={size}
              className="transform -rotate-90"
            >
              <defs>
                <linearGradient id="trust-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>

              {/* Background Circle */}
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth={strokeWidth}
              />

              {/* Progress Circle */}
              <motion.circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke="url(#trust-gradient)"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={circumference}
                initial={{ strokeDashoffset: circumference }}
                whileInView={{ strokeDashoffset: circumference - progress }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{
                  duration: 1.5,
                  ease: 'easeOut',
                  type: 'tween',
                }}
              />
            </svg>

            {/* Center Text */}
            <motion.div
              className="absolute flex flex-col items-center justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <div className="text-4xl font-bold text-cyan-400">
                {MOCK_TRUST_SCORE.score}
              </div>
              <div className="text-text-secondary text-sm">out of 100</div>
            </motion.div>
          </div>

          {/* Trust Level Indicator */}
          <motion.div
            className="text-center space-y-2"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <p className="text-lg font-bold text-cyan-400">High Trust Level</p>
            <p className="text-text-secondary text-sm">
              You maintain excellent standards in our platform
            </p>
          </motion.div>
        </motion.div>

        {/* Trust Factors */}
        <motion.div
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.h4 className="text-lg font-bold text-white" variants={itemVariants}>
            Trust Factors
          </motion.h4>

          <div className="space-y-3">
            {MOCK_TRUST_SCORE.factors.map((factor, index) => (
              <motion.div
                key={factor.label}
                className="space-y-2"
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
                transition={{ delay: 0.05 * (index + 1) }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary text-sm">{factor.label}</span>
                  <motion.span
                    className="text-sm font-bold text-cyan-400"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ delay: 0.8 + 0.1 * (index + 1) }}
                  >
                    {factor.value}%
                  </motion.span>
                </div>
                <motion.div
                  className="relative h-2 rounded-full bg-white/10 overflow-hidden"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: '-100px' }}
                >
                  <motion.div
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${factor.percentage}%` }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{
                      duration: 0.8,
                      ease: 'easeOut',
                      delay: 0.05 * (index + 1),
                    }}
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Action */}
        <motion.button
          className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          View Trust Details
        </motion.button>
      </div>
    </GlassCard>
  );
};
