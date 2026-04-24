'use client';

import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/glass-card';
import { AnimatedButton } from '@/components/ui/animated-button';
import { containerVariants, itemVariants } from '@/lib/animations';
import { MOCK_GAMIFICATION } from '@/lib/mock-data/dashboard';
import { Star, Trophy } from 'lucide-react';

interface GamificationProps {
  animate?: boolean;
  delay?: number;
}

export const Gamification: React.FC<GamificationProps> = ({
  animate = true,
  delay = 0,
}) => {
  const currentLevel = MOCK_GAMIFICATION.levels[MOCK_GAMIFICATION.currentLevel - 1];
  const nextLevel = MOCK_GAMIFICATION.levels[MOCK_GAMIFICATION.currentLevel];
  const xpProgress = (MOCK_GAMIFICATION.currentXP / nextLevel.xp) * 100;

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
            Gamification & Rewards
          </motion.h3>
          <motion.p className="text-text-secondary text-sm" variants={itemVariants}>
            Level up your financial game and unlock rewards
          </motion.p>
        </motion.div>

        {/* Current Level */}
        <motion.div
          className="p-6 rounded-lg bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border border-amber-500/30"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-secondary text-sm mb-1">Current Level</p>
                <div className="flex items-center gap-2">
                  <span className="text-4xl">{currentLevel.badge}</span>
                  <div>
                    <p className="text-2xl font-bold text-amber-400">
                      Level {MOCK_GAMIFICATION.currentLevel}
                    </p>
                    <p className="text-text-secondary text-sm">{currentLevel.title}</p>
                  </div>
                </div>
              </div>
              <Trophy className="w-12 h-12 text-amber-400" />
            </div>

            {/* XP Progress */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-text-secondary text-sm">Experience Points</span>
                <motion.span
                  className="text-sm font-bold text-amber-400"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: '-100px' }}
                >
                  {MOCK_GAMIFICATION.currentXP} / {nextLevel.xp} XP
                </motion.span>
              </div>
              <div className="relative h-3 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-amber-500 to-yellow-500"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${xpProgress}%` }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                />
              </div>
            </div>

            {/* Next Level Preview */}
            <div className="p-3 rounded-lg bg-white/5 border border-white/10">
              <p className="text-text-secondary text-xs mb-1">Next Level</p>
              <div className="flex items-center gap-2">
                <span className="text-2xl">{nextLevel.badge}</span>
                <div className="flex-1">
                  <p className="font-bold text-white text-sm">{nextLevel.title}</p>
                  <p className="text-text-tertiary text-xs">
                    {nextLevel.xp - MOCK_GAMIFICATION.currentXP} XP to unlock
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* All Levels */}
        <motion.div
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.h4 className="text-lg font-bold text-white" variants={itemVariants}>
            Level Progression
          </motion.h4>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {MOCK_GAMIFICATION.levels.map((level, index) => (
              <motion.div
                key={level.level}
                className={`p-4 rounded-lg text-center transition-all ${
                  index < MOCK_GAMIFICATION.currentLevel
                    ? 'bg-green-500/10 border border-green-500/30'
                    : index === MOCK_GAMIFICATION.currentLevel
                    ? 'bg-purple-500/10 border border-purple-500/50 ring-2 ring-purple-500/50'
                    : 'bg-white/5 border border-white/10 opacity-50'
                }`}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
                transition={{ delay: 0.05 * (index + 1) }}
              >
                <div className="text-3xl mb-2">{level.badge}</div>
                <p className="text-white font-bold text-sm mb-1">Level {level.level}</p>
                <p className="text-text-secondary text-xs mb-2">{level.title}</p>
                <p className="text-text-tertiary text-xs">{level.xp} XP</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.h4 className="text-lg font-bold text-white" variants={itemVariants}>
            Achievements
          </motion.h4>

          <div className="space-y-2">
            {MOCK_GAMIFICATION.achievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                className={`p-3 rounded-lg flex items-start gap-3 ${
                  achievement.unlocked
                    ? 'bg-green-500/10 border border-green-500/30'
                    : 'bg-white/5 border border-white/10 opacity-60'
                }`}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
                transition={{ delay: 0.05 * (index + 1) }}
              >
                <Star
                  className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                    achievement.unlocked ? 'text-yellow-400' : 'text-text-tertiary'
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <p className={`font-bold text-sm ${achievement.unlocked ? 'text-white' : 'text-text-secondary'}`}>
                    {achievement.title}
                  </p>
                  <p className="text-text-secondary text-xs">{achievement.description}</p>
                </div>
                {achievement.unlocked && (
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-500/20 text-green-400 flex-shrink-0">
                    Unlocked
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Action */}
        <AnimatedButton
          variant="primary"
          hasGlow
          className="w-full"
          icon={<Star className="w-4 h-4" />}
          iconPosition="left"
        >
          Earn More Points
        </AnimatedButton>
      </div>
    </GlassCard>
  );
};
