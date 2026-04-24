'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, LogOut, LayoutDashboard, BarChart3, Zap, Settings, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { NotificationPanel } from '@/components/features/notification-panel';
import { Notification } from '@/lib/mock-data/dashboard';

interface NavbarProps {
  user: any;
  notifications: Notification[];
  onLogout: () => void;
}

export function Navbar({ user, notifications, onLogout }: NavbarProps) {
  const router = useRouter();
  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

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
            {/* Notification Bell */}
            <motion.button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-lg hover:bg-white/10 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Bell className="w-5 h-5 text-white" />
              {unreadCount > 0 && (
                <motion.span
                  className="absolute top-1 right-1 w-5 h-5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {unreadCount > 9 ? '9+' : unreadCount}
                </motion.span>
              )}
            </motion.button>

            {/* Profile Section */}
            <motion.div
              className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              whileHover={{ scale: 1.02 }}
            >
              {/* Avatar */}
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-sm">
                  {user.name
                    .split(' ')
                    .map((n: string) => n[0])
                    .join('')}
                </span>
              </div>
              {/* Profile Info */}
              <div className="hidden sm:flex flex-col">
                <p className="text-white font-medium text-sm">{user.name}</p>
                <p className="text-text-secondary text-xs">{user.mobileNumber}</p>
              </div>
            </motion.div>

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

        {/* Notification Panel Dropdown */}
        <AnimatePresence>
          {showNotifications && (
            <motion.div
              className="py-4 border-t border-white/5"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold">Notifications</h3>
                <motion.button
                  onClick={() => setShowNotifications(false)}
                  className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X className="w-4 h-4 text-text-secondary" />
                </motion.button>
              </div>
              <NotificationPanel notifications={notifications} animate={false} delay={0} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
