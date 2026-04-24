'use client';

import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/glass-card';
import { AnimatedButton } from '@/components/ui/animated-button';
import { containerVariants, itemVariants, staggeredListVariants, staggeredItemVariants } from '@/lib/animations';
import { MOCK_SUGGESTIONS } from '@/lib/mock-data/dashboard';
import { ArrowRight } from 'lucide-react';

interface SmartSuggestionsProps {
  animate?: boolean;
  delay?: number;
}

export const SmartSuggestions: React.FC<SmartSuggestionsProps> = ({
  animate = true,
  delay = 0,
}) => {
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
            Smart Suggestions
          </motion.h3>
          <motion.p className="text-text-secondary text-sm" variants={itemVariants}>
            Personalized actions to improve your credit profile
          </motion.p>
        </motion.div>

        {/* Suggestions Grid */}
        <motion.div
          className="space-y-4"
          variants={staggeredListVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {MOCK_SUGGESTIONS.map((suggestion) => (
            <motion.div
              key={suggestion.id}
              className="p-4 rounded-lg bg-white/5 border border-white/10 hover:border-purple-500/50 transition-colors group cursor-pointer"
              variants={staggeredItemVariants}
              whileHover={{ x: 4 }}
            >
              <div className="space-y-3">
                {/* Title and Icon */}
                <div className="flex items-start gap-4">
                  <div className="text-3xl flex-shrink-0">{suggestion.icon}</div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-white text-base group-hover:text-purple-400 transition-colors">
                      {suggestion.title}
                    </h4>
                    <p className="text-text-secondary text-sm mt-1 line-clamp-2">
                      {suggestion.description}
                    </p>
                  </div>
                </div>

                {/* Metadata */}
                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full ${
                        suggestion.impact === 'High'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}
                    >
                      {suggestion.impact} Impact
                    </span>
                    <span className="text-text-tertiary text-xs">
                      {suggestion.timeframe}
                    </span>
                  </div>
                  <motion.div
                    initial={{ x: 0, opacity: 0 }}
                    whileHover={{ x: 4, opacity: 1 }}
                  >
                    <ArrowRight className="w-4 h-4 text-purple-400" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="flex gap-4"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <AnimatedButton
            variant="primary"
            hasGlow
            className="flex-1"
            icon={<ArrowRight className="w-4 h-4" />}
            iconPosition="right"
          >
            Implement All
          </AnimatedButton>
          <AnimatedButton
            variant="outline"
            className="flex-1"
          >
            View Analysis
          </AnimatedButton>
        </motion.div>

        {/* Info */}
        <motion.p
          className="text-text-secondary text-xs text-center"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          These suggestions are AI-generated based on your financial profile and industry best practices.
        </motion.p>
      </div>
    </GlassCard>
  );
};
