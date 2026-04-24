'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/glass-card';
import { AnimatedButton } from '@/components/ui/animated-button';
import { slideUp, fadeIn } from '@/lib/animations';
import { mockVerifyOTPResponse, storeUser, MOCK_OTP } from '@/lib/mock-data/auth';

export default function VerifyPage() {
  const router = useRouter();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendTimer, setResendTimer] = useState(30);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const mobileNumber = typeof window !== 'undefined'
    ? localStorage.getItem('tempMobileNumber') || '+91 XXXXX XXXXX'
    : '+91 XXXXX XXXXX';

  // Countdown timer for resend
  useEffect(() => {
    if (resendTimer <= 0) return;
    const timer = setInterval(() => setResendTimer((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [resendTimer]);

  const handleOtpChange = (index: number, value: string) => {
    // Only allow single digit
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Backspace - go to previous input
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    // Arrow keys
    if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const otpString = otp.join('');
    if (otpString.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    setIsLoading(true);

    try {
      const response = await mockVerifyOTPResponse(otpString);
      if (response.success && response.data?.user) {
        // Store user data
        storeUser(response.data.user);
        // Clear temporary data
        localStorage.removeItem('tempMobileNumber');
        // Redirect to dashboard
        router.push('/dashboard');
      } else {
        setError(response.message);
        setOtp(['', '', '', '', '', '']);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setResendTimer(30);
    setOtp(['', '', '', '', '', '']);
    setError('');
    // In a real app, this would trigger a new OTP send
    inputRefs.current[0]?.focus();
  };

  return (
    <motion.div
      className="space-y-8"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      {/* Back Button */}
      <motion.button
        onClick={() => router.back()}
        className="text-text-secondary hover:text-text-primary text-sm font-medium transition-colors"
        variants={slideUp}
      >
        ← Back
      </motion.button>

      {/* Logo/Title */}
      <motion.div
        className="text-center space-y-2"
        variants={slideUp}
        transition={{ delay: 0.1 }}
      >
        <div className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
          CredNova
        </div>
        <p className="text-text-secondary text-sm">
          Verify your identity
        </p>
      </motion.div>

      {/* Verify Card */}
      <GlassCard variant="lg" hasGlow animate delay={0.15}>
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-text-primary">
              Enter OTP
            </h1>
            <p className="text-text-secondary text-sm">
              We&apos;ve sent a code to{' '}
              <span className="font-medium text-text-primary">{mobileNumber}</span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* OTP Input */}
            <motion.div
              className="flex gap-2 justify-center"
              variants={slideUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
            >
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 text-white text-center text-lg font-semibold focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all"
                  aria-label={`OTP digit ${index + 1}`}
                />
              ))}
            </motion.div>

            {/* Error Message */}
            {error && (
              <motion.div
                className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm text-center"
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
                disabled={otp.join('').length !== 6}
              >
                Verify & Continue
              </AnimatedButton>
            </motion.div>
          </form>

          {/* Resend Option */}
          <motion.div
            className="text-center space-y-2"
            variants={fadeIn}
            transition={{ delay: 0.4 }}
          >
            <p className="text-text-secondary text-sm">
              Didn&apos;t receive the code?
            </p>
            {resendTimer > 0 ? (
              <p className="text-text-tertiary text-sm">
                Resend in {resendTimer}s
              </p>
            ) : (
              <button
                onClick={handleResend}
                className="text-purple-400 hover:text-purple-300 font-medium text-sm transition-colors"
              >
                Resend OTP
              </button>
            )}
          </motion.div>
        </div>
      </GlassCard>

      {/* Demo Info */}
      <motion.div
        className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs text-center space-y-1"
        variants={slideUp}
        transition={{ delay: 0.5 }}
      >
        <p className="font-medium">Demo Mode - OTP: {MOCK_OTP}</p>
        <p>Use the code above to verify</p>
      </motion.div>
    </motion.div>
  );
}
