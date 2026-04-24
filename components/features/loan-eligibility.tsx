'use client';

import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/glass-card';
import { AnimatedButton } from '@/components/ui/animated-button';
import { containerVariants, itemVariants } from '@/lib/animations';
import { MOCK_LOAN_ELIGIBILITY } from '@/lib/mock-data/dashboard';
import { CheckCircle2 } from 'lucide-react';

interface LoanEligibilityProps {
  animate?: boolean;
  delay?: number;
}

export const LoanEligibility: React.FC<LoanEligibilityProps> = ({
  animate = true,
  delay = 0,
}) => {
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
            Loan Eligibility
          </motion.h3>
          <motion.p className="text-text-secondary text-sm" variants={itemVariants}>
            Loans tailored for your credit profile and financial situation
          </motion.p>
        </motion.div>

        {/* Max Eligibility */}
        <motion.div
          className="p-6 rounded-lg bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-secondary text-sm mb-1">Max Loan Amount</p>
              <p className="text-3xl font-bold text-green-400">
                ₹{(MOCK_LOAN_ELIGIBILITY.maxAmount / 100000).toFixed(1)}L
              </p>
            </div>
            <CheckCircle2 className="w-12 h-12 text-green-400" />
          </div>
        </motion.div>

        {/* Loan Options */}
        <motion.div
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.h4 className="text-lg font-bold text-white" variants={itemVariants}>
            Suggested Options
          </motion.h4>

          <div className="space-y-3">
            {MOCK_LOAN_ELIGIBILITY.suggestedLoans.map((loan, index) => (
              <motion.div
                key={loan.id}
                className="p-4 rounded-lg bg-white/5 border border-white/10 hover:border-blue-500/50 transition-all group"
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
                transition={{ delay: 0.05 * (index + 1) }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="grid sm:grid-cols-5 gap-4">
                  {/* Loan Amount */}
                  <div className="sm:col-span-2">
                    <p className="text-text-secondary text-xs mb-1">Loan Amount</p>
                    <p className="text-xl font-bold text-blue-400">
                      ₹{(loan.amount / 100000).toFixed(1)}L
                    </p>
                  </div>

                  {/* Tenure */}
                  <div>
                    <p className="text-text-secondary text-xs mb-1">Tenure</p>
                    <p className="font-bold text-white">{loan.tenure}</p>
                  </div>

                  {/* EMI */}
                  <div>
                    <p className="text-text-secondary text-xs mb-1">Monthly EMI</p>
                    <p className="text-xl font-bold text-purple-400">
                      ₹{loan.emi.toLocaleString()}
                    </p>
                  </div>

                  {/* Interest Rate */}
                  <div>
                    <p className="text-text-secondary text-xs mb-1">Interest Rate</p>
                    <p className="font-bold text-white">{loan.interestRate}%</p>
                  </div>
                </div>

                {/* Status Badge and Button */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                  <span className="text-xs font-medium px-3 py-1 rounded-full bg-green-500/20 text-green-400">
                    ✓ Eligible
                  </span>
                  <AnimatedButton
                    variant="ghost"
                    size="sm"
                  >
                    Apply Now
                  </AnimatedButton>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <p className="text-yellow-400 text-xs font-medium mb-1">Important Information</p>
          <p className="text-text-secondary text-xs">
            Final loan approval depends on complete document verification and additional due diligence by our lending partners.
          </p>
        </motion.div>

        {/* Action */}
        <AnimatedButton
          variant="primary"
          hasGlow
          className="w-full"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          Compare All Loans
        </AnimatedButton>
      </div>
    </GlassCard>
  );
};
