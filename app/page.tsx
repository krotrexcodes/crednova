'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { getStoredUser } from '@/lib/mock-data/auth';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated, otherwise redirect to login
    const user = getStoredUser();
    if (user) {
      router.push('/dashboard');
    } else {
      router.push('/auth/login');
    }
  }, [router]);

  // Show loading state while redirecting
  return (
    <motion.div
      className="min-h-screen bg-background flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="text-center space-y-4"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
          CredNova
        </div>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="flex justify-center"
        >
          <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
