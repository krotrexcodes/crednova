'use client';

import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/glass-card';
import { AnimatedButton } from '@/components/ui/animated-button';
import { Download, Share2, FileText, QrCode } from 'lucide-react';

interface ExportShareProps {
  score: number;
  animate?: boolean;
  delay?: number;
}

export function ExportShare({ score, animate = true, delay = 0 }: ExportShareProps) {
  const handleDownload = () => {
    console.log('[v0] Downloading report...');
    // Simulate download
    const content = `
Financial Report - FinCredit
============================
Credit Score: ${score}
Generated: ${new Date().toLocaleDateString()}
    `;
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', `credit-score-${Date.now()}.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleShare = () => {
    console.log('[v0] Sharing score...');
    if (navigator.share) {
      navigator.share({
        title: 'My Credit Score',
        text: `I just checked my AI credit score: ${score}/900`,
        url: window.location.href,
      });
    }
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
      <GlassCard hasGlow>
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white">Share Your Success</h3>
          <p className="text-text-secondary text-sm">
            Export your credit report or share your score with others
          </p>

          <div className="grid sm:grid-cols-2 gap-3">
            {/* Download Option */}
            <motion.div
              className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-lg p-4 cursor-pointer"
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(59, 130, 246, 0.3)' }}
              onClick={handleDownload}
            >
              <div className="flex items-start gap-3">
                <Download className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-white font-semibold text-sm">Download Report</p>
                  <p className="text-text-secondary text-xs mt-1">PDF summary of your score</p>
                </div>
              </div>
            </motion.div>

            {/* Share Option */}
            <motion.div
              className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg p-4 cursor-pointer"
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(168, 85, 247, 0.3)' }}
              onClick={handleShare}
            >
              <div className="flex items-start gap-3">
                <Share2 className="w-5 h-5 text-purple-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-white font-semibold text-sm">Share Score</p>
                  <p className="text-text-secondary text-xs mt-1">Send to friends & family</p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            {/* Features Grid */}
            <motion.div
              className="bg-white/5 rounded-lg p-3 border border-white/10"
              whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
            >
              <FileText className="w-4 h-4 text-blue-400 mb-2" />
              <p className="text-white text-xs font-semibold">Full Report</p>
              <p className="text-text-secondary text-xs mt-1">Complete analysis</p>
            </motion.div>

            <motion.div
              className="bg-white/5 rounded-lg p-3 border border-white/10"
              whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
            >
              <QrCode className="w-4 h-4 text-purple-400 mb-2" />
              <p className="text-white text-xs font-semibold">QR Code</p>
              <p className="text-text-secondary text-xs mt-1">Share digitally</p>
            </motion.div>
          </div>

          <div className="flex gap-3 pt-2">
            <AnimatedButton
              variant="primary"
              size="sm"
              icon={<Download className="w-4 h-4" />}
              onClick={handleDownload}
              hasGlow
              className="flex-1"
            >
              Download
            </AnimatedButton>
            <AnimatedButton
              variant="secondary"
              size="sm"
              icon={<Share2 className="w-4 h-4" />}
              onClick={handleShare}
              className="flex-1"
            >
              Share
            </AnimatedButton>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}
