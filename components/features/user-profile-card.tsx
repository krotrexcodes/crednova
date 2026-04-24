'use client';

import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/glass-card';
import { AnimatedButton } from '@/components/ui/animated-button';
import { UserProfile } from '@/lib/mock-data/dashboard';
import { User, Pencil, RefreshCw } from 'lucide-react';

interface UserProfileCardProps {
  profile: UserProfile;
  onEdit?: () => void;
  onUpdate?: () => void;
  animate?: boolean;
  delay?: number;
}

export function UserProfileCard({
  profile,
  onEdit,
  onUpdate,
  animate = true,
  delay = 0,
}: UserProfileCardProps) {
  const lastUpdatedDate = new Date(profile.lastUpdated);
  const daysAgo = Math.floor(
    (Date.now() - lastUpdatedDate.getTime()) / (1000 * 60 * 60 * 24)
  );

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
      <GlassCard hasGlow variant="lg">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white">{profile.name}</h3>
              <p className="text-text-secondary text-sm">
                Last updated {daysAgo > 0 ? `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago` : 'today'}
              </p>
            </div>
          </div>

          {/* Profile Details Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <motion.div
              className="bg-white/5 rounded-lg p-4 border border-white/10"
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
            >
              <p className="text-text-secondary text-xs mb-2">Income</p>
              <p className="text-white font-bold text-lg">₹{profile.income.toLocaleString()}</p>
            </motion.div>

            <motion.div
              className="bg-white/5 rounded-lg p-4 border border-white/10"
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
            >
              <p className="text-text-secondary text-xs mb-2">Income Type</p>
              <p className="text-white font-bold text-sm">{profile.incomeType}</p>
            </motion.div>

            <motion.div
              className="bg-white/5 rounded-lg p-4 border border-white/10"
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
            >
              <p className="text-text-secondary text-xs mb-2">Risk Category</p>
              <p className="text-white font-bold text-sm">{profile.riskCategory}</p>
            </motion.div>

            <motion.div
              className="bg-white/5 rounded-lg p-4 border border-white/10"
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
            >
              <p className="text-text-secondary text-xs mb-2">Status</p>
              <p className="text-green-400 font-bold text-sm">Active</p>
            </motion.div>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <AnimatedButton
              variant="primary"
              size="sm"
              icon={<Pencil className="w-4 h-4" />}
              onClick={onEdit}
              hasGlow
              className="flex-1"
            >
              Edit Profile
            </AnimatedButton>
            <AnimatedButton
              variant="secondary"
              size="sm"
              icon={<RefreshCw className="w-4 h-4" />}
              onClick={onUpdate}
              className="flex-1"
            >
              Update Details
            </AnimatedButton>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}
