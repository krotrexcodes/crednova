'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface ScoreCircleProps {
  score: number;
  maxScore?: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
}

export const ScoreCircle: React.FC<ScoreCircleProps> = ({
  score,
  maxScore = 900,
  size = 280,
  strokeWidth = 12,
  color = 'url(#gradient)',
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / maxScore) * circumference;

  useEffect(() => {
    if (circleRef.current) {
      circleRef.current.style.strokeDashoffset = String(circumference - progress);
    }
  }, [progress, circumference]);

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <svg
        ref={svgRef}
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth={strokeWidth}
        />

        {/* Progress Circle */}
        <motion.circle
          ref={circleRef}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          filter="url(#glow)"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - progress }}
          transition={{
            duration: 2,
            ease: 'easeOut',
            type: 'tween',
          }}
        />
      </svg>

      {/* Center Text */}
      <motion.div
        className="absolute flex flex-col items-center justify-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <motion.div
          className="text-5xl font-bold text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <CountUp target={score} />
        </motion.div>
        <div className="text-text-secondary text-sm font-medium">
          Credit Score
        </div>
      </motion.div>
    </div>
  );
};

// Counter animation component
const CountUp: React.FC<{ target: number }> = ({ target }) => {
  const count = useRef(0);
  const displayRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const duration = 1.5;
    const frameCount = 30;
    const increment = target / frameCount;
    let frame = 0;

    const interval = setInterval(() => {
      frame++;
      count.current = Math.min(count.current + increment, target);

      if (displayRef.current) {
        displayRef.current.textContent = Math.round(count.current).toString();
      }

      if (frame >= frameCount) {
        clearInterval(interval);
        if (displayRef.current) {
          displayRef.current.textContent = target.toString();
        }
      }
    }, (duration * 1000) / frameCount);

    return () => clearInterval(interval);
  }, [target]);

  return <span ref={displayRef}>0</span>;
};
