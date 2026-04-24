'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { IntroScreen } from '@/components/intro-screen';
import { getStoredUser } from '@/lib/mock-data/auth';

export default function Home() {
  const router = useRouter();
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    // Check if user is authenticated, otherwise redirect to login
    const user = getStoredUser();
    if (user) {
      // Show intro for 5 seconds, then redirect to dashboard
      const timer = setTimeout(() => {
        router.push('/dashboard');
      }, 5000);
      return () => clearTimeout(timer);
    } else {
      // Show intro for 5 seconds, then redirect to login
      const timer = setTimeout(() => {
        router.push('/auth/login');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [router]);

  const handleIntroFinish = () => {
    setShowIntro(false);
    const user = getStoredUser();
    if (user) {
      router.push('/dashboard');
    } else {
      router.push('/auth/login');
    }
  };

  return showIntro ? (
    <IntroScreen onFinish={handleIntroFinish} />
  ) : null;
}
