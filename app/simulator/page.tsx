'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { AnimatedButton } from '@/components/ui/animated-button';
import { WhatIfSimulator } from '@/components/features/what-if-simulator';
import { TrustScore } from '@/components/features/trust-score';
import { GlassCard } from '@/components/ui/glass-card';
import { pageTransition, containerVariants, itemVariants, slideUp } from '@/lib/animations';
import { ChevronLeft, Lightbulb } from 'lucide-react';
import { getStoredUser, logout } from '@/lib/mock-data/auth';
import { useEffect, useState } from 'react';

export default function SimulatorPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Page Title */}
        <motion.div
          className="space-y-2"
          variants={slideUp}
          initial="hidden"
          animate="visible"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            What-If Simulator
          </h1>
          <p className="text-text-secondary text-lg">
            Experiment with financial changes and see their impact on your score
          </p>
        </motion.div>

        {/* Info Card */}
        <motion.div
          className="p-4 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-start gap-3"
          variants={slideUp}
          initial="hidden"
          animate="visible"
        >
          <Lightbulb className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-cyan-400 font-medium text-sm mb-1">How it works</p>
            <p className="text-text-secondary text-sm">
              Adjust your income and expenses using the sliders below to see how different financial scenarios would impact your credit score.
            </p>
          </div>
        </motion.div>

        {/* Main Grid */}
        <motion.div
          className="grid lg:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* What-If Simulator */}
          <motion.div variants={itemVariants}>
            <WhatIfSimulator animate delay={0} />
          </motion.div>

          {/* Trust Score */}
          <motion.div variants={itemVariants}>
            <TrustScore animate delay={0.1} />
          </motion.div>
        </motion.div>

        {/* Tips Section */}
        <motion.div
          className="grid sm:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="p-6 rounded-lg bg-white/5 border border-white/10 space-y-3"
            variants={itemVariants}
          >
            <div className="text-3xl">💡</div>
            <h3 className="font-bold text-white">Increase Income</h3>
            <p className="text-text-secondary text-sm">
              A 20% increase in income can boost your score by up to 50 points.
            </p>
          </motion.div>

          <motion.div
            className="p-6 rounded-lg bg-white/5 border border-white/10 space-y-3"
            variants={itemVariants}
            transition={{ delay: 0.05 }}
          >
            <div className="text-3xl">🎯</div>
            <h3 className="font-bold text-white">Reduce Expenses</h3>
            <p className="text-text-secondary text-sm">
              Lowering expenses improves your savings rate and creditworthiness.
            </p>
          </motion.div>

          <motion.div
            className="p-6 rounded-lg bg-white/5 border border-white/10 space-y-3"
            variants={itemVariants}
            transition={{ delay: 0.1 }}
          >
            <div className="text-3xl">📈</div>
            <h3 className="font-bold text-white">Build Savings</h3>
            <p className="text-text-secondary text-sm">
              A higher savings rate demonstrates financial stability and responsibility.
            </p>
          </motion.div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="p-6 rounded-lg bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          variants={slideUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3 }}
        >
          <div>
            <p className="font-bold text-white text-lg mb-1">Ready to implement changes?</p>
            <p className="text-text-secondary text-sm">
              Get a personalized action plan based on your simulation results.
            </p>
          </div>
          <AnimatedButton
            variant="primary"
            hasGlow
          >
            Create Action Plan
          </AnimatedButton>
        </motion.div>
      </main>
    </motion.div>
  );
}
