'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/glass-card';
import { AnimatedButton } from '@/components/ui/animated-button';
import { Notification } from '@/lib/mock-data/dashboard';
import { Bell, Check, X } from 'lucide-react';

interface NotificationPanelProps {
  notifications: Notification[];
  animate?: boolean;
  delay?: number;
}

export function NotificationPanel({
  notifications,
  animate = true,
  delay = 0,
}: NotificationPanelProps) {
  const [items, setItems] = useState(notifications);

  const markAsRead = (id: string) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, read: true } : item
      )
    );
  };

  const removeNotification = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const unreadCount = items.filter((item) => !item.read).length;

  const getIconColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'text-green-400';
      case 'warning':
        return 'text-yellow-400';
      case 'info':
        return 'text-blue-400';
      default:
        return 'text-purple-400';
    }
  };

  const variants = animate
    ? {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }
    : {};

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      className="w-full"
      initial={animate ? 'hidden' : undefined}
      animate={animate ? 'visible' : undefined}
      variants={variants}
      transition={{ delay, duration: 0.5 }}
    >
      <GlassCard hasGlow variant="lg">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">Notifications</h3>
              {unreadCount > 0 && (
                <p className="text-purple-400 text-sm">{unreadCount} unread notification{unreadCount > 1 ? 's' : ''}</p>
              )}
            </div>
            <div className="relative">
              <Bell className="w-6 h-6 text-purple-500" />
              {unreadCount > 0 && (
                <motion.span
                  className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center font-bold"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  {unreadCount}
                </motion.span>
              )}
            </div>
          </div>

          {/* Notifications List */}
          {items.length > 0 ? (
            <motion.div
              className="space-y-3"
              variants={containerVariants}
              initial={animate ? 'hidden' : undefined}
              animate={animate ? 'visible' : undefined}
            >
              {items.map((notification) => (
                <motion.div
                  key={notification.id}
                  className={`p-4 rounded-lg border transition-all ${
                    notification.read
                      ? 'bg-white/5 border-white/10'
                      : 'bg-white/10 border-white/20'
                  }`}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
                >
                  <div className="flex items-start gap-4">
                    <div className={`mt-1 ${getIconColor(notification.type)}`}>
                      <div className="w-2 h-2 rounded-full bg-current" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-semibold text-sm">{notification.title}</p>
                      <p className="text-text-secondary text-xs mt-1">{notification.message}</p>
                      <p className="text-text-tertiary text-xs mt-2">
                        {new Date(notification.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                    {!notification.read && (
                      <motion.button
                        onClick={() => markAsRead(notification.id)}
                        className="text-purple-500 hover:text-purple-400 transition-colors"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Check className="w-4 h-4" />
                      </motion.button>
                    )}
                    <motion.button
                      onClick={() => removeNotification(notification.id)}
                      className="text-text-secondary hover:text-red-400 transition-colors"
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <X className="w-4 h-4" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-8">
              <Bell className="w-12 h-12 text-text-tertiary mx-auto mb-4 opacity-50" />
              <p className="text-text-secondary">No notifications yet</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-4 pt-4 border-t border-white/10">
            <AnimatedButton
              variant="secondary"
              size="sm"
              className="flex-1"
            >
              View Notifications
            </AnimatedButton>
            <AnimatedButton
              variant="ghost"
              size="sm"
              className="flex-1"
            >
              Mark as Read
            </AnimatedButton>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}
