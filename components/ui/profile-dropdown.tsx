'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, LogOut, Edit3, Clock } from 'lucide-react';

interface UserData {
  name: string;
  mobileNumber: string;
  income?: number;
  incomeType?: string;
  riskCategory?: string;
}

interface ProfileDropdownProps {
  user: UserData;
  onEdit?: () => void;
  onLogout: () => void;
}

export function ProfileDropdown({ user, onEdit, onLogout }: ProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  const handleLogout = () => {
    setIsOpen(false);
    onLogout();
  };

  const handleEdit = () => {
    setIsOpen(false);
    onEdit?.();
  };

  return (
    <div className="relative">
      {/* Profile Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-all"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
          <span className="text-white font-bold text-sm">{getInitials(user.name)}</span>
        </div>
        <div className="hidden sm:flex flex-col items-start">
          <p className="text-white font-medium text-sm leading-tight">{user.name}</p>
          <p className="text-text-secondary text-xs">{user.mobileNumber}</p>
        </div>
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-72 bg-background border border-white/10 rounded-2xl shadow-2xl backdrop-blur-xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 p-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">{getInitials(user.name)}</span>
                </div>
                <div className="flex-1">
                  <p className="text-white font-bold text-sm">{user.name}</p>
                  <p className="text-text-secondary text-xs">{user.mobileNumber}</p>
                  <p className="text-xs text-text-tertiary mt-1">Active Account</p>
                </div>
              </div>
            </div>

            {/* Profile Info Section */}
            <div className="p-4 space-y-3 border-b border-white/10">
              <div>
                <p className="text-text-secondary text-xs uppercase tracking-widest font-semibold mb-1">
                  Monthly Income
                </p>
                <p className="text-white font-bold text-lg">
                  ₹{user.income ? user.income.toLocaleString() : '35,000'}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-text-secondary text-xs uppercase tracking-widest font-semibold mb-1">
                    Income Type
                  </p>
                  <p className="text-white text-sm font-medium">{user.incomeType || 'Self-employed'}</p>
                </div>
                <div>
                  <p className="text-text-secondary text-xs uppercase tracking-widest font-semibold mb-1">
                    Risk Category
                  </p>
                  <p className="text-white text-sm font-medium">{user.riskCategory || 'Low-Medium'}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="p-4 space-y-2">
              <motion.button
                onClick={handleEdit}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-white text-sm font-medium transition-all"
                whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
                whileTap={{ scale: 0.98 }}
              >
                <Edit3 className="w-4 h-4" />
                Edit Profile
              </motion.button>

              <motion.button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/30 hover:bg-red-500/20 text-red-400 text-sm font-medium transition-all"
                whileHover={{ scale: 1.02, backgroundColor: 'rgba(239, 68, 68, 0.2)' }}
                whileTap={{ scale: 0.98 }}
              >
                <LogOut className="w-4 h-4" />
                Logout
              </motion.button>
            </div>

            {/* Footer */}
            <div className="px-4 py-3 bg-white/5 border-t border-white/10 flex items-center gap-2 text-text-tertiary text-xs">
              <Clock className="w-3 h-3" />
              <span>Last updated 7 days ago</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Close when clicking outside */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
