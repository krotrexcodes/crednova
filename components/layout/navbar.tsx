'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, LayoutDashboard, BarChart3, Zap, Settings } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { CreditProfileDropdown } from '@/components/ui/credit-profile-dropdown';

interface NavbarProps {
  user: any;
  notifications?: any[];
  onLogout: () => void;
}

export function Navbar({ user, onLogout }: NavbarProps) {
  const router = useRouter();

  const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { label: 'Insights', icon: BarChart3, href: '/insights' },
    { label: 'Simulator', icon: Zap, href: '/simulator' },
    { label: 'Settings', icon: Settings, href: '/settings' },
  ];

  return (
    <motion.header
      className="sticky top-0 z-50 backdrop-blur-md border-b border-white/10"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Row - Logo, Profile, Notifications */}
        <div className="flex items-center justify-between py-4 border-b border-white/5">
          {/* Logo */}
          <div className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
            CredNova
          </div>

          {/* Right Side - Profile & Notifications */}
          <div className="flex items-center gap-4">
            {/* Credit Profile Dropdown */}
            <CreditProfileDropdown
              userName="Rajesh Kumar"
              income={35000}
              incomeType="Self-employed"
              riskCategory="Low-Medium"
              lastUpdated="7 days ago"
            />

            {/* Logout Button */}
            <motion.button
              onClick={onLogout}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title="Logout"
            >
              <LogOut className="w-5 h-5 text-white" />
            </motion.button>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex gap-2 overflow-x-auto py-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={item.label}
                onClick={() => router.push(item.href)}
                className="px-4 py-2 rounded-lg flex items-center gap-2 whitespace-nowrap transition-all text-text-secondary hover:text-white hover:bg-white/10"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{item.label}</span>
              </motion.button>
            );
          })}
        </div>


      </div>
    </motion.header>
  );
}
