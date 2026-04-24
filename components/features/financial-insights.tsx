'use client';

import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/glass-card';
import { containerVariants, itemVariants } from '@/lib/animations';
import { MOCK_INCOME_VS_EXPENSES, MOCK_SCORE_HISTORY } from '@/lib/mock-data/dashboard';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

interface FinancialInsightsProps {
  animate?: boolean;
  delay?: number;
}

export const FinancialInsights: React.FC<FinancialInsightsProps> = ({
  animate = true,
  delay = 0,
}) => {
  const totalIncome = MOCK_INCOME_VS_EXPENSES.reduce((sum, d) => sum + d.income, 0);
  const totalExpenses = MOCK_INCOME_VS_EXPENSES.reduce((sum, d) => sum + d.expenses, 0);
  const totalSavings = totalIncome - totalExpenses;
  const avgIncome = Math.round(totalIncome / MOCK_INCOME_VS_EXPENSES.length);
  const avgExpenses = Math.round(totalExpenses / MOCK_INCOME_VS_EXPENSES.length);

  const tooltipStyle = {
    backgroundColor: 'rgba(26, 26, 46, 0.9)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
  };

  return (
    <GlassCard variant="lg" hasGlow animate={animate} delay={delay}>
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          className="space-y-2"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.h3 className="text-2xl font-bold text-white" variants={itemVariants}>
            Financial Insights
          </motion.h3>
          <motion.p className="text-text-secondary text-sm" variants={itemVariants}>
            Your income, expenses, and savings trends over the last 6 months
          </motion.p>
        </motion.div>

        {/* Summary Stats */}
        <motion.div
          className="grid sm:grid-cols-4 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.div
            className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30"
            variants={itemVariants}
          >
            <p className="text-text-secondary text-xs mb-1">Total Income</p>
            <p className="text-xl font-bold text-blue-400">
              ₹{(totalIncome / 100000).toFixed(1)}L
            </p>
            <p className="text-text-tertiary text-xs mt-1">Avg: ₹{avgIncome.toLocaleString()}</p>
          </motion.div>

          <motion.div
            className="p-4 rounded-lg bg-red-500/10 border border-red-500/30"
            variants={itemVariants}
          >
            <p className="text-text-secondary text-xs mb-1">Total Expenses</p>
            <p className="text-xl font-bold text-red-400">
              ₹{(totalExpenses / 100000).toFixed(1)}L
            </p>
            <p className="text-text-tertiary text-xs mt-1">Avg: ₹{avgExpenses.toLocaleString()}</p>
          </motion.div>

          <motion.div
            className="p-4 rounded-lg bg-green-500/10 border border-green-500/30"
            variants={itemVariants}
          >
            <p className="text-text-secondary text-xs mb-1">Total Savings</p>
            <p className="text-xl font-bold text-green-400">
              ₹{(totalSavings / 100000).toFixed(1)}L
            </p>
            <p className="text-text-tertiary text-xs mt-1">
              {((totalSavings / totalIncome) * 100).toFixed(1)}% rate
            </p>
          </motion.div>

          <motion.div
            className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/30"
            variants={itemVariants}
          >
            <p className="text-text-secondary text-xs mb-1">Expense Ratio</p>
            <p className="text-xl font-bold text-purple-400">
              {((totalExpenses / totalIncome) * 100).toFixed(1)}%
            </p>
            <p className="text-text-tertiary text-xs mt-1">Of income</p>
          </motion.div>
        </motion.div>

        {/* Income vs Expenses Chart */}
        <motion.div
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.h4 className="text-lg font-bold text-white" variants={itemVariants}>
            Income vs Expenses
          </motion.h4>
          <motion.div
            className="h-80 -mx-4 sm:mx-0"
            variants={itemVariants}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={MOCK_INCOME_VS_EXPENSES}
                margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="month" stroke="rgba(160, 174, 192, 0.5)" style={{ fontSize: 12 }} />
                <YAxis stroke="rgba(160, 174, 192, 0.5)" style={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={tooltipStyle}
                  labelStyle={{ color: '#ffffff' }}
                  formatter={(value) => `₹${Number(value).toLocaleString()}`}
                />
                <Legend wrapperStyle={{ color: 'rgba(160, 174, 192, 0.7)' }} />
                <Bar dataKey="income" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                <Bar dataKey="expenses" fill="#ef4444" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </motion.div>

        {/* Score Trend Chart */}
        <motion.div
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.h4 className="text-lg font-bold text-white" variants={itemVariants}>
            Credit Score Trend
          </motion.h4>
          <motion.div
            className="h-80 -mx-4 sm:mx-0"
            variants={itemVariants}
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={MOCK_SCORE_HISTORY}
                margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="month" stroke="rgba(160, 174, 192, 0.5)" style={{ fontSize: 12 }} />
                <YAxis
                  stroke="rgba(160, 174, 192, 0.5)"
                  style={{ fontSize: 12 }}
                  domain={[300, 900]}
                />
                <Tooltip
                  contentStyle={tooltipStyle}
                  labelStyle={{ color: '#ffffff' }}
                />
                <Legend wrapperStyle={{ color: 'rgba(160, 174, 192, 0.7)' }} />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#a855f7"
                  dot={{ fill: '#a855f7', r: 5 }}
                  activeDot={{ r: 7 }}
                  strokeWidth={3}
                  isAnimationActive={true}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </motion.div>

        {/* Insights Text */}
        <motion.div
          className="p-4 rounded-lg bg-cyan-500/10 border border-cyan-500/30"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <p className="text-cyan-400 text-sm font-medium mb-2">Key Insight</p>
          <p className="text-text-secondary text-sm">
            Your savings rate of 28.9% is above average! Continue maintaining consistent savings and controlled spending to improve your credit score further.
          </p>
        </motion.div>
      </div>
    </GlassCard>
  );
};
