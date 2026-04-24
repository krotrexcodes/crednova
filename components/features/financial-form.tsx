'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/glass-card';
import { AnimatedButton } from '@/components/ui/animated-button';
import { Save, RotateCcw } from 'lucide-react';

interface FinancialFormProps {
  animate?: boolean;
  delay?: number;
}

export function FinancialForm({ animate = true, delay = 0 }: FinancialFormProps) {
  const [income, setIncome] = useState('35000');
  const [expenses, setExpenses] = useState('12000');
  const [employment, setEmployment] = useState('self-employed');

  const handleSave = () => {
    console.log('[v0] Saving financial data:', { income, expenses, employment });
  };

  const handleReset = () => {
    setIncome('35000');
    setExpenses('12000');
    setEmployment('self-employed');
  };

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
          <div>
            <h3 className="text-xl font-bold text-white mb-2">Financial Information</h3>
            <p className="text-text-secondary text-sm">
              Update your financial details to get a more accurate credit score
            </p>
          </div>

          <div className="space-y-4">
            {/* Income Field */}
            <motion.div whileHover={{ scale: 1.02 }}>
              <label className="block text-sm font-medium text-white mb-2">
                Monthly Income
              </label>
              <div className="relative">
                <span className="absolute left-4 top-3.5 text-text-secondary">₹</span>
                <input
                  type="number"
                  value={income}
                  onChange={(e) => setIncome(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg pl-8 pr-4 py-3 text-white placeholder-text-secondary focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                  placeholder="0"
                />
              </div>
            </motion.div>

            {/* Expenses Field */}
            <motion.div whileHover={{ scale: 1.02 }}>
              <label className="block text-sm font-medium text-white mb-2">
                Monthly Expenses
              </label>
              <div className="relative">
                <span className="absolute left-4 top-3.5 text-text-secondary">₹</span>
                <input
                  type="number"
                  value={expenses}
                  onChange={(e) => setExpenses(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg pl-8 pr-4 py-3 text-white placeholder-text-secondary focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                  placeholder="0"
                />
              </div>
            </motion.div>

            {/* Employment Type */}
            <motion.div whileHover={{ scale: 1.02 }}>
              <label className="block text-sm font-medium text-white mb-2">
                Employment Type
              </label>
              <select
                value={employment}
                onChange={(e) => setEmployment(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
              >
                <option value="employed">Employed</option>
                <option value="self-employed">Self-Employed</option>
                <option value="freelancer">Freelancer</option>
                <option value="student">Student</option>
                <option value="unemployed">Unemployed</option>
              </select>
            </motion.div>

            {/* Savings Summary */}
            <motion.div
              className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/50 rounded-lg p-4"
              whileHover={{ backgroundColor: 'rgba(168, 85, 247, 0.3)' }}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-text-secondary text-sm mb-1">Monthly Savings</p>
                  <p className="text-white font-bold text-lg">
                    ₹{(parseInt(income) - parseInt(expenses)).toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-text-secondary text-sm mb-1">Savings Rate</p>
                  <p className="text-green-400 font-bold text-lg">
                    {income ? Math.round(((parseInt(income) - parseInt(expenses)) / parseInt(income)) * 100) : 0}%
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <AnimatedButton
              variant="primary"
              size="sm"
              icon={<Save className="w-4 h-4" />}
              onClick={handleSave}
              hasGlow
              className="flex-1"
            >
              Save Data
            </AnimatedButton>
            <AnimatedButton
              variant="ghost"
              size="sm"
              icon={<RotateCcw className="w-4 h-4" />}
              onClick={handleReset}
              className="flex-1"
            >
              Reset
            </AnimatedButton>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}
