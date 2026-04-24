'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ScoreDisplay } from '@/components/dashboard/score-display';
import { LoadingState } from '@/components/dashboard/loading-state';
import { GlassCard } from '@/components/ui/glass-card';
import { AnimatedButton } from '@/components/ui/animated-button';
import { ExplainableScore } from '@/components/features/explainable-score';
import { WhatIfSimulator } from '@/components/features/what-if-simulator';
import { FinancialInsights } from '@/components/features/financial-insights';
import { TrustScore } from '@/components/features/trust-score';
import { SmartSuggestions } from '@/components/features/smart-suggestions';
import { LoanEligibility } from '@/components/features/loan-eligibility';
import { Gamification } from '@/components/features/gamification';
import { UserProfileCard } from '@/components/features/user-profile-card';
import { FinancialForm } from '@/components/features/financial-form';
import { ActivityTimeline } from '@/components/features/activity-timeline';
import { NotificationPanel } from '@/components/features/notification-panel';
import { ExportShare } from '@/components/features/export-share';
import { ResetRecalculate } from '@/components/features/reset-recalculate';
import { QuickOverview } from '@/components/features/quick-overview';
import { containerVariants, itemVariants, slideUp } from '@/lib/animations';
import { getStoredUser, logout } from '@/lib/mock-data/auth';
import { MOCK_SCORE_HISTORY, MOCK_SUGGESTIONS, MOCK_SCORE_DATA, MOCK_USER_PROFILE, MOCK_ACTIVITY, MOCK_NOTIFICATIONS } from '@/lib/mock-data/dashboard';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { LogOut, LayoutDashboard, BarChart3, Zap, Settings } from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Check authentication on mount
  useEffect(() => {
    const storedUser = getStoredUser();
    if (!storedUser) {
      router.push('/auth/login');
      return;
    }
    setUser(storedUser);
    // Simulate initial loading
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, [router]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate refresh delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsRefreshing(false);
  };

  const handleLogout = () => {
    logout();
    router.push('/auth/login');
  };

  if (!user) {
    return null;
  }

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header
        className="sticky top-0 z-50 backdrop-blur-md border-b border-white/10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4 border-b border-white/5">
            <div className="flex items-center gap-4">
              <div className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                FinCredit
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex flex-col items-end">
                <p className="text-white font-medium">{user.name}</p>
                <p className="text-text-secondary text-sm">{user.mobileNumber}</p>
              </div>
              <AnimatedButton
                variant="ghost"
                size="sm"
                icon={<LogOut className="w-4 h-4" />}
                onClick={handleLogout}
              >
                Logout
              </AnimatedButton>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex gap-2 overflow-x-auto py-4">
            {[
              { label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
              { label: 'Insights', icon: BarChart3, href: '/insights' },
              { label: 'Simulator', icon: Zap, href: '/simulator' },
              { label: 'Settings', icon: Settings, href: '/settings' },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = router.pathname === item.href || (item.href === '/dashboard' && router.pathname === '/');
              return (
                <motion.button
                  key={item.label}
                  onClick={() => router.push(item.href)}
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                      : 'text-text-secondary hover:text-white hover:bg-white/10'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Welcome Section */}
        <motion.div
          className="space-y-2"
          initial="hidden"
          animate="visible"
          variants={slideUp}
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            Welcome, {user.name.split(' ')[0]}! 👋
          </h1>
          <p className="text-text-secondary text-lg">
            Here&apos;s your AI-powered credit analysis dashboard
          </p>
        </motion.div>

        {/* Main Grid */}
        <motion.div
          className="grid lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Score Display - Takes up 2 cols on large screens */}
          <motion.div
            className="lg:col-span-2"
            variants={itemVariants}
          >
            <ScoreDisplay onRefresh={handleRefresh} isRefreshing={isRefreshing} />
          </motion.div>

          {/* Quick Stats - Right sidebar */}
          <motion.div
            className="space-y-4"
            variants={itemVariants}
          >
            {/* Score Trend */}
            <GlassCard variant="md" hasGlow animate delay={0.2}>
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white">Score Trend</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={MOCK_SCORE_HISTORY}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="month" stroke="rgba(160, 174, 192, 0.5)" style={{ fontSize: 12 }} />
                    <YAxis stroke="rgba(160, 174, 192, 0.5)" style={{ fontSize: 12 }} domain={[300, 900]} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(26, 26, 46, 0.8)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '8px',
                      }}
                      labelStyle={{ color: '#ffffff' }}
                    />
                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke="#a855f7"
                      dot={{ fill: '#a855f7', r: 4 }}
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
                <p className="text-text-secondary text-sm">
                  ↑ +65 points in 6 months
                </p>
              </div>
            </GlassCard>

            {/* Key Metrics */}
            <GlassCard variant="md" hasGlow animate delay={0.25}>
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white">Key Metrics</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary text-sm">Trust Score</span>
                    <span className="font-bold text-white">78/100</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/10">
                    <div className="w-[78%] h-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary text-sm">Debt Ratio</span>
                    <span className="font-bold text-white">32%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/10">
                    <div className="w-[32%] h-full rounded-full bg-green-500" />
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </motion.div>

        {/* Suggestions Section */}
        <motion.div
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2
            className="text-2xl font-bold text-white"
            variants={itemVariants}
          >
            Personalized Suggestions
          </motion.h2>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
            variants={containerVariants}
          >
            {MOCK_SUGGESTIONS.map((suggestion, index) => (
              <motion.div
                key={suggestion.id}
                variants={itemVariants}
              >
                <GlassCard variant="sm" hasGlow animate delay={0.1 * (index + 1)}>
                  <div className="space-y-2">
                    <div className="text-3xl">{suggestion.icon}</div>
                    <h4 className="font-bold text-white text-sm">
                      {suggestion.title}
                    </h4>
                    <p className="text-text-secondary text-xs line-clamp-2">
                      {suggestion.description}
                    </p>
                    <div className="flex items-center justify-between pt-2">
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded ${
                          suggestion.impact === 'High'
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-yellow-500/20 text-yellow-400'
                        }`}
                      >
                        {suggestion.impact}
                      </span>
                      <span className="text-xs text-text-tertiary">
                        {suggestion.timeframe}
                      </span>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Quick Overview - New Cards */}
        <motion.div
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2
            className="text-2xl font-bold text-white"
            variants={itemVariants}
          >
            Quick Overview
          </motion.h2>
          <motion.div variants={itemVariants}>
            <QuickOverview 
              score={MOCK_SCORE_DATA.score}
              loanEligibility="₹50,000"
              trustLevel="High"
              animate
              delay={0}
            />
          </motion.div>
        </motion.div>

        {/* User Profile & Financial Form */}
        <motion.div
          className="grid lg:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <UserProfileCard 
              profile={MOCK_USER_PROFILE}
              animate
              delay={0}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <FinancialForm animate delay={0.1} />
          </motion.div>
        </motion.div>

        {/* Activity & Notifications */}
        <motion.div
          className="grid lg:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <ActivityTimeline 
              activities={MOCK_ACTIVITY}
              animate
              delay={0}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <NotificationPanel 
              notifications={MOCK_NOTIFICATIONS}
              animate
              delay={0.1}
            />
          </motion.div>
        </motion.div>

        {/* Export & Reset Management */}
        <motion.div
          className="grid lg:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <ExportShare 
              score={MOCK_SCORE_DATA.score}
              animate
              delay={0}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <ResetRecalculate animate delay={0.1} />
          </motion.div>
        </motion.div>

        {/* Advanced Features Section */}
        <motion.div
          className="space-y-8 pt-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2
            className="text-2xl font-bold text-white"
            variants={itemVariants}
          >
            Explore More Features
          </motion.h2>

          {/* Features Grid */}
          <motion.div
            className="grid lg:grid-cols-2 gap-8"
            variants={containerVariants}
          >
            {/* Trust Score and Loan Eligibility */}
            <motion.div variants={itemVariants}>
              <TrustScore animate delay={0.1} />
            </motion.div>
            <motion.div variants={itemVariants}>
              <Gamification animate delay={0.2} />
            </motion.div>
          </motion.div>

          {/* Explainable Score */}
          <motion.div variants={itemVariants}>
            <ExplainableScore animate delay={0.3} />
          </motion.div>

          {/* What-If Simulator */}
          <motion.div variants={itemVariants}>
            <WhatIfSimulator animate delay={0.4} />
          </motion.div>

          {/* Loan Eligibility */}
          <motion.div variants={itemVariants}>
            <LoanEligibility animate delay={0.5} />
          </motion.div>

          {/* Smart Suggestions */}
          <motion.div variants={itemVariants}>
            <SmartSuggestions animate delay={0.6} />
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
