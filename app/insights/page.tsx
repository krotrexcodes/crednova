'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { AnimatedButton } from '@/components/ui/animated-button';
import { ExplainableScore } from '@/components/features/explainable-score';
import { FinancialInsights } from '@/components/features/financial-insights';
import { SmartSuggestions } from '@/components/features/smart-suggestions';
import { pageTransition, containerVariants, itemVariants, slideUp } from '@/lib/animations';
import { ChevronLeft } from 'lucide-react';
import { getStoredUser, logout } from '@/lib/mock-data/auth';
import { useEffect, useState } from 'react';

export default function InsightsPage() {
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
            Financial Insights & Analysis
          </h1>
          <p className="text-text-secondary text-lg">
            Detailed breakdown of your credit score and financial health
          </p>
        </motion.div>

        {/* Explainable Score */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <ExplainableScore animate delay={0} />
          </motion.div>
        </motion.div>

        {/* Financial Insights */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <FinancialInsights animate delay={0.1} />
          </motion.div>
        </motion.div>

        {/* Smart Suggestions */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <SmartSuggestions animate delay={0.2} />
          </motion.div>
        </motion.div>
      </main>
    </motion.div>
  );
}
