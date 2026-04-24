'use client';

import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/glass-card';
import { AnimatedButton } from '@/components/ui/animated-button';
import { ActivityEvent } from '@/lib/mock-data/dashboard';
import { Clock, Trash2 } from 'lucide-react';

interface ActivityTimelineProps {
  activities: ActivityEvent[];
  animate?: boolean;
  delay?: number;
}

export function ActivityTimeline({
  activities,
  animate = true,
  delay = 0,
}: ActivityTimelineProps) {
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    
    return date.toLocaleDateString();
  };

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
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      className="w-full"
      initial={animate ? 'hidden' : undefined}
      animate={animate ? 'visible' : undefined}
      variants={variants}
      transition={{ delay, duration: 0.5 }}
    >
      <GlassCard hasGlow variant="lg">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">Activity Timeline</h3>
              <p className="text-text-secondary text-sm">Your recent actions and updates</p>
            </div>
            <Clock className="w-6 h-6 text-purple-500" />
          </div>

          {/* Timeline */}
          <motion.div
            className="space-y-4"
            variants={containerVariants}
            initial={animate ? 'hidden' : undefined}
            animate={animate ? 'visible' : undefined}
          >
            {activities.map((activity, index) => (
              <motion.div
                key={activity.id}
                className="relative flex gap-4 pb-4 border-b border-white/10 last:border-b-0"
                variants={itemVariants}
              >
                {/* Timeline marker */}
                <div className="relative flex flex-col items-center">
                  <motion.div
                    className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-blue-500"
                    whileHover={{ scale: 1.5 }}
                  />
                  {index !== activities.length - 1 && (
                    <div className="w-0.5 h-12 bg-gradient-to-b from-purple-500 to-transparent mt-2" />
                  )}
                </div>

                {/* Activity content */}
                <div className="flex-1 pt-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-white font-semibold">{activity.action}</p>
                      <p className="text-text-secondary text-sm mt-1">{activity.description}</p>
                    </div>
                  </div>
                  <p className="text-text-secondary text-xs mt-2">{formatTime(activity.timestamp)}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Actions */}
          <div className="flex gap-4 pt-4 border-t border-white/10">
            <AnimatedButton
              variant="secondary"
              size="sm"
              className="flex-1"
            >
              View More
            </AnimatedButton>
            <AnimatedButton
              variant="ghost"
              size="sm"
              icon={<Trash2 className="w-4 h-4" />}
              className="flex-1"
            >
              Clear History
            </AnimatedButton>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}
