'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/glass-card';
import { AnimatedButton } from '@/components/ui/animated-button';
import { containerVariants, itemVariants } from '@/lib/animations';
import { MOCK_SCORE_DATA } from '@/lib/mock-data/dashboard';

interface WhatIfSimulatorProps {
  animate?: boolean;
  delay?: number;
}

export const WhatIfSimulator: React.FC<WhatIfSimulatorProps> = ({
  animate = true,
  delay = 0,
}) => {
  const baseScore = MOCK_SCORE_DATA.score;
  const [monthlyIncome, setMonthlyIncome] = useState(45000);
  const [monthlyExpenses, setMonthlyExpenses] = useState(32000);
  const [savingsRate, setSavingsRate] = useState(((monthlyIncome - monthlyExpenses) / monthlyIncome) * 100);

  // Calculate projected score based on changes
  const incomeChange = ((monthlyIncome - 45000) / 45000) * 50;
  const expenseChange = ((32000 - monthlyExpenses) / 32000) * 30;
  const savingsChange = (savingsRate - 28.9) * 2;
  
  const projectedScore = Math.round(Math.min(900, Math.max(300, baseScore + incomeChange + expenseChange + savingsChange)));
  const scoreChange = projectedScore - baseScore;

  const handleIncomeChange = (value: number) => {
    setMonthlyIncome(value);
    const savings = value - monthlyExpenses;
    setSavingsRate((savings / value) * 100);
  };

  const handleExpenseChange = (value: number) => {
    setMonthlyExpenses(value);
    const savings = monthlyIncome - value;
    setSavingsRate((savings / monthlyIncome) * 100);
  };

  const handleReset = () => {
    setMonthlyIncome(45000);
    setMonthlyExpenses(32000);
    setSavingsRate(28.9);
  };

  const sliderClass = 'w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-purple-500';

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
            What-If Simulator
          </motion.h3>
          <motion.p className="text-text-secondary text-sm" variants={itemVariants}>
            See how financial changes impact your credit score
          </motion.p>
        </motion.div>

        {/* Current vs Projected Score */}
        <motion.div
          className="grid sm:grid-cols-3 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.div
            className="p-4 rounded-lg bg-white/5 border border-white/10"
            variants={itemVariants}
          >
            <p className="text-text-secondary text-sm mb-2">Current Score</p>
            <p className="text-3xl font-bold text-blue-400">{baseScore}</p>
          </motion.div>
          <motion.div
            className="p-4 rounded-lg bg-white/5 border border-white/10"
            variants={itemVariants}
          >
            <p className="text-text-secondary text-sm mb-2">Projected Score</p>
            <p className="text-3xl font-bold text-purple-400">{projectedScore}</p>
          </motion.div>
          <motion.div
            className={`p-4 rounded-lg ${
              scoreChange >= 0
                ? 'bg-green-500/10 border border-green-500/30'
                : 'bg-red-500/10 border border-red-500/30'
            }`}
            variants={itemVariants}
          >
            <p className="text-text-secondary text-sm mb-2">Change</p>
            <p className={`text-3xl font-bold ${scoreChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {scoreChange >= 0 ? '+' : ''}{scoreChange}
            </p>
          </motion.div>
        </motion.div>

        {/* Sliders */}
        <motion.div
          className="space-y-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Monthly Income */}
          <motion.div
            className="space-y-3"
            variants={itemVariants}
          >
            <div className="flex items-center justify-between">
              <label className="text-white font-medium">Monthly Income</label>
              <motion.span
                key={monthlyIncome}
                className="text-lg font-bold text-purple-400"
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
              >
                ₹{monthlyIncome.toLocaleString()}
              </motion.span>
            </div>
            <input
              type="range"
              min="25000"
              max="100000"
              step="5000"
              value={monthlyIncome}
              onChange={(e) => handleIncomeChange(Number(e.target.value))}
              className={sliderClass}
            />
            <div className="flex justify-between text-text-tertiary text-xs">
              <span>₹25,000</span>
              <span>₹100,000</span>
            </div>
          </motion.div>

          {/* Monthly Expenses */}
          <motion.div
            className="space-y-3"
            variants={itemVariants}
          >
            <div className="flex items-center justify-between">
              <label className="text-white font-medium">Monthly Expenses</label>
              <motion.span
                key={monthlyExpenses}
                className="text-lg font-bold text-orange-400"
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
              >
                ₹{monthlyExpenses.toLocaleString()}
              </motion.span>
            </div>
            <input
              type="range"
              min="15000"
              max="80000"
              step="2000"
              value={monthlyExpenses}
              onChange={(e) => handleExpenseChange(Number(e.target.value))}
              className={sliderClass}
            />
            <div className="flex justify-between text-text-tertiary text-xs">
              <span>₹15,000</span>
              <span>₹80,000</span>
            </div>
          </motion.div>

          {/* Savings Rate Display */}
          <motion.div
            className="p-4 rounded-lg bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/30"
            variants={itemVariants}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-text-secondary text-sm">Monthly Savings</span>
                <motion.span
                  key={savingsRate}
                  className="text-xl font-bold text-green-400"
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                >
                  {savingsRate.toFixed(1)}%
                </motion.span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-green-500 to-blue-500"
                  animate={{ width: `${Math.min(100, savingsRate)}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Actions */}
        <motion.div
          className="grid sm:grid-cols-2 gap-4"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <AnimatedButton
            variant="primary"
            hasGlow
            className="w-full"
          >
            Optimize Finances
          </AnimatedButton>
          <AnimatedButton
            variant="outline"
            className="w-full"
            onClick={handleReset}
          >
            Reset Values
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
          This simulation shows potential score changes based on your financial adjustments. Actual results may vary.
        </motion.p>
      </div>
    </GlassCard>
  );
};
