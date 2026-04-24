'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { AnimatedButton } from '@/components/ui/animated-button';
import { GlassCard } from '@/components/ui/glass-card';
import { pageTransition, containerVariants, itemVariants, slideUp } from '@/lib/animations';
import { ChevronLeft, Bell, Shield, Eye, Volume2 } from 'lucide-react';
import { getStoredUser, logout } from '@/lib/mock-data/auth';
import { useEffect } from 'react';

export default function SettingsPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [ruralModeEnabled, setRuralModeEnabled] = useState(false);
  const [voiceGuideEnabled, setVoiceGuideEnabled] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  useEffect(() => {
    const storedUser = getStoredUser();
    if (!storedUser) {
      router.push('/auth/login');
      return;
    }
    setUser(storedUser);
  }, [router]);

  const handleLogout = () => {
    logout();
    router.push('/auth/login');
  };

  if (!user) {
    return null;
  }

  return (
    <motion.div
      className="min-h-screen bg-background"
      variants={pageTransition}
      initial="initial"
      animate="animate"
    >
      {/* Header */}
      <motion.header
        className="sticky top-0 z-50 backdrop-blur-md border-b border-white/10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.back()}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <div className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                FinCredit
              </div>
            </div>
            <AnimatedButton
              variant="ghost"
              size="sm"
              onClick={handleLogout}
            >
              Logout
            </AnimatedButton>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Page Title */}
        <motion.div
          className="space-y-2"
          variants={slideUp}
          initial="hidden"
          animate="visible"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            Settings
          </h1>
          <p className="text-text-secondary text-lg">
            Manage your preferences and account settings
          </p>
        </motion.div>

        {/* Profile Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <GlassCard variant="lg" hasGlow animate delay={0}>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Profile Information</h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="block text-text-secondary text-sm mb-2">Full Name</label>
                    <div className="px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white">
                      {user.name}
                    </div>
                  </div>
                  <div>
                    <label className="block text-text-secondary text-sm mb-2">Mobile Number</label>
                    <div className="px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white">
                      {user.mobileNumber}
                    </div>
                  </div>
                  <div>
                    <label className="block text-text-secondary text-sm mb-2">Email</label>
                    <div className="px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white">
                      {user.email}
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </motion.div>

        {/* Preferences Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <GlassCard variant="lg" hasGlow animate delay={0.1}>
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white">Preferences</h3>

                {/* Rural Mode Toggle */}
                <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
                  <div className="flex items-center gap-3">
                    <Eye className="w-5 h-5 text-purple-400" />
                    <div>
                      <p className="font-medium text-white">Rural Mode</p>
                      <p className="text-text-secondary text-sm">Simplified UI with larger fonts</p>
                    </div>
                  </div>
                  <motion.button
                    onClick={() => setRuralModeEnabled(!ruralModeEnabled)}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      ruralModeEnabled ? 'bg-purple-500' : 'bg-white/20'
                    }`}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      className="absolute top-1 left-1 w-4 h-4 rounded-full bg-white"
                      animate={{
                        x: ruralModeEnabled ? 24 : 0,
                      }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  </motion.button>
                </div>

                {/* Voice Guide Toggle */}
                <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
                  <div className="flex items-center gap-3">
                    <Volume2 className="w-5 h-5 text-cyan-400" />
                    <div>
                      <p className="font-medium text-white">Voice Guide</p>
                      <p className="text-text-secondary text-sm">Audio explanations for features</p>
                    </div>
                  </div>
                  <motion.button
                    onClick={() => setVoiceGuideEnabled(!voiceGuideEnabled)}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      voiceGuideEnabled ? 'bg-cyan-500' : 'bg-white/20'
                    }`}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      className="absolute top-1 left-1 w-4 h-4 rounded-full bg-white"
                      animate={{
                        x: voiceGuideEnabled ? 24 : 0,
                      }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  </motion.button>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </motion.div>

        {/* Notifications Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <GlassCard variant="lg" hasGlow animate delay={0.2}>
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white">Notifications</h3>

                {/* Notifications Toggle */}
                <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
                  <div className="flex items-center gap-3">
                    <Bell className="w-5 h-5 text-amber-400" />
                    <div>
                      <p className="font-medium text-white">Score Updates</p>
                      <p className="text-text-secondary text-sm">Get notified of score changes</p>
                    </div>
                  </div>
                  <motion.button
                    onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      notificationsEnabled ? 'bg-amber-500' : 'bg-white/20'
                    }`}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      className="absolute top-1 left-1 w-4 h-4 rounded-full bg-white"
                      animate={{
                        x: notificationsEnabled ? 24 : 0,
                      }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  </motion.button>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </motion.div>

        {/* Security Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <GlassCard variant="lg" hasGlow animate delay={0.3}>
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white">Security</h3>

                {/* Two-Factor Authentication */}
                <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-green-400" />
                    <div>
                      <p className="font-medium text-white">Two-Factor Authentication</p>
                      <p className="text-text-secondary text-sm">Extra security for your account</p>
                    </div>
                  </div>
                  <motion.button
                    onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      twoFactorEnabled ? 'bg-green-500' : 'bg-white/20'
                    }`}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      className="absolute top-1 left-1 w-4 h-4 rounded-full bg-white"
                      animate={{
                        x: twoFactorEnabled ? 24 : 0,
                      }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  </motion.button>
                </div>

                <div className="pt-2">
                  <AnimatedButton variant="outline" className="w-full">
                    Change Password
                  </AnimatedButton>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </motion.div>

        {/* Danger Zone */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <GlassCard variant="lg" hasGlow={false} animate delay={0.4}>
              <div className="space-y-4 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                <h3 className="text-xl font-bold text-red-400">Danger Zone</h3>
                <p className="text-text-secondary text-sm">
                  Once you delete your account, there is no going back. Please be certain.
                </p>
                <AnimatedButton
                  variant="ghost"
                  className="w-full border-red-500/50 hover:bg-red-500/10 text-red-400 hover:text-red-300"
                >
                  Delete Account
                </AnimatedButton>
              </div>
            </GlassCard>
          </motion.div>
        </motion.div>

        {/* Save Button */}
        <motion.div
          className="flex gap-4"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatedButton
            variant="primary"
            hasGlow
            className="flex-1"
          >
            Save Changes
          </AnimatedButton>
          <AnimatedButton
            variant="outline"
            className="flex-1"
            onClick={() => router.back()}
          >
            Cancel
          </AnimatedButton>
        </motion.div>
      </main>
    </motion.div>
  );
}
