'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/glass-card';
import { AnimatedButton } from '@/components/ui/animated-button';
import { slideUp, fadeIn } from '@/lib/animations';
import { mockLoginResponse } from '@/lib/mock-data/auth';

export default function LoginPage() {
  const router = useRouter();
  const [mobileNumber, setMobileNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate mobile number
    if (!mobileNumber.trim() || mobileNumber.length < 10) {
      setError('Please enter a valid mobile number');
      return;
    }

    setIsLoading(true);

    try {
      const response = await mockLoginResponse(mobileNumber);
      if (response.success) {
        // Store mobile number for next step
        localStorage.setItem('tempMobileNumber', mobileNumber);
        // Redirect to verify page
        router.push('/auth/verify');
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      className="space-y-8"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      {/* Logo/Title */}
      <motion.div
        className="text-center space-y-2"
        variants={slideUp}
      >
        <div className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
          CredNova
        </div>
        <p className="text-text-secondary text-sm">
          Unlock your financial potential
        </p>
      </motion.div>

      {/* Login Card */}
      <GlassCard variant="lg" hasGlow animate delay={0.1}>
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-text-primary">
              Welcome Back
            </h1>
            <p className="text-text-secondary text-sm">
              Enter your mobile number to continue
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Mobile Number Input */}
            <motion.div
              className="space-y-2"
              variants={slideUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
            >
              <label className="block text-sm font-medium text-text-primary">
                Mobile Number
              </label>
              <input
                type="tel"
                inputMode="numeric"
                value={mobileNumber}
                onChange={(e) => {
                  // Only allow digits and +
                  const val = e.target.value.replace(/[^\d+]/g, '');
                  setMobileNumber(val);
                }}
                placeholder="+91 98765 43210"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-text-tertiary focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all"
              />
            </motion.div>

            {/* Error Message */}
            {error && (
              <motion.div
                className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {error}
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.div
              variants={slideUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.3 }}
            >
              <AnimatedButton
                type="submit"
                isLoading={isLoading}
                hasGlow
                className="w-full"
                disabled={!mobileNumber.trim()}
              >
                Send OTP
              </AnimatedButton>
            </motion.div>
          </form>

          {/* Info Text */}
          <motion.p
            className="text-center text-xs text-text-tertiary"
            variants={fadeIn}
            transition={{ delay: 0.4 }}
          >
            We&apos;ll send you a one-time password to verify your number
          </motion.p>
        </div>
      </GlassCard>

      {/* Demo Info */}
      <motion.div
        className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs text-center space-y-1"
        variants={slideUp}
        transition={{ delay: 0.5 }}
      >
        <p className="font-medium">Demo Mode Active</p>
        <p>Use any mobile number to continue</p>
      </motion.div>
    </motion.div>
  );
}
