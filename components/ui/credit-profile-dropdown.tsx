'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from './glass-card';
import { Download, Share2, RotateCw, Trash2, QrCode, ChevronDown } from 'lucide-react';

interface CreditProfileDropdownProps {
  userName: string;
  income: number;
  incomeType: string;
  riskCategory: string;
  lastUpdated: string;
}

export function CreditProfileDropdown({
  userName,
  income,
  incomeType,
  riskCategory,
  lastUpdated,
}: CreditProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const initials = userName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white text-sm font-bold">
          {initials}
        </div>
        <span className="text-white text-sm font-medium">{userName}</span>
        <ChevronDown className={`w-4 h-4 text-white transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-96 z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <GlassCard className="p-6 space-y-6">
              {/* Profile Header */}
              <div className="space-y-4 pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white text-lg font-bold">
                    {initials}
                  </div>
                  <div>
                    <p className="text-white font-semibold">{userName}</p>
                    <p className="text-text-secondary text-sm">Last updated {lastUpdated}</p>
                  </div>
                </div>

                {/* Financial Information */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-text-secondary">Monthly Income</p>
                    <p className="text-white font-semibold">₹{income.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-text-secondary">Income Type</p>
                    <p className="text-white font-semibold">{incomeType}</p>
                  </div>
                  <div>
                    <p className="text-text-secondary">Risk Category</p>
                    <p className="text-white font-semibold">{riskCategory}</p>
                  </div>
                  <div>
                    <p className="text-text-secondary">Status</p>
                    <p className="text-green-400 font-semibold">Active</p>
                  </div>
                </div>

                <button className="w-full py-2 px-4 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-all">
                  Edit Profile
                </button>
              </div>

              {/* Share Your Success */}
              <div className="space-y-3 pb-4 border-b border-white/10">
                <h3 className="text-white font-semibold text-sm flex items-center gap-2">
                  <Share2 className="w-4 h-4 text-purple-400" />
                  Share Your Success
                </h3>
                <p className="text-text-secondary text-xs">
                  Export your credit report or share your score with others
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="py-2 px-3 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs font-medium flex items-center justify-center gap-1 hover:shadow-lg hover:shadow-purple-500/30"
                  >
                    <Download className="w-3 h-3" />
                    Download
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="py-2 px-3 rounded-lg bg-white/10 border border-white/20 text-white text-xs font-medium flex items-center justify-center gap-1 hover:bg-white/20"
                  >
                    <QrCode className="w-3 h-3" />
                    QR Code
                  </motion.button>
                </div>
                <div className="text-xs text-text-secondary space-y-1">
                  <p>📄 PDF summary of your score</p>
                  <p>👥 Share with friends & family</p>
                </div>
              </div>

              {/* Manage Your Data */}
              <div className="space-y-3">
                <h3 className="text-white font-semibold text-sm flex items-center gap-2">
                  <RotateCw className="w-4 h-4 text-blue-400" />
                  Manage Your Data
                </h3>
                <p className="text-text-secondary text-xs">
                  Reset your data or recalculate your score with latest information
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="py-2 px-3 rounded-lg bg-white/10 border border-white/20 text-white text-xs font-medium flex items-center justify-center gap-1 hover:bg-white/20"
                  >
                    <RotateCw className="w-3 h-3" />
                    Recalculate
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="py-2 px-3 rounded-lg bg-red-500/20 border border-red-500/30 text-red-300 text-xs font-medium flex items-center justify-center gap-1 hover:bg-red-500/30"
                  >
                    <Trash2 className="w-3 h-3" />
                    Reset
                  </motion.button>
                </div>
                <p className="text-xs text-blue-300">
                  💡 Recalculate anytime to get the most up-to-date score
                </p>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Close on outside click */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
