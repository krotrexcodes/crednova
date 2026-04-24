'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface IntroScreenProps {
  onFinish: () => void;
}

export function IntroScreen({ onFinish }: IntroScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(onFinish, 500);
          return 100;
        }
        return p + 5;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-purple-900 to-black text-white overflow-hidden">
      {/* Glow background effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl opacity-50" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* App Name */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl sm:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"
        >
          CredNova
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg sm:text-xl text-gray-300 mb-12"
        >
          Building your financial identity...
        </motion.p>

        {/* Progress Bar */}
        <div className="w-72 h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        {/* Loading Text */}
        <motion.p
          key={progress}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mt-6 text-sm text-gray-400 h-6"
        >
          {progress < 40 && 'Analyzing your data...'}
          {progress >= 40 && progress < 80 && 'Calculating score...'}
          {progress >= 80 && 'Preparing dashboard...'}
        </motion.p>

        {/* Progress percentage */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mt-2 text-xs text-gray-500"
        >
          {progress}%
        </motion.p>
      </div>
    </div>
  );
}
