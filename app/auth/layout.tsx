import { redirect } from 'next/navigation';
import { isAuthenticated } from '@/lib/mock-data/auth';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // If user is already authenticated, redirect to dashboard
  // Note: This is a client-side check workaround since we're using mock data
  // In a real app, this would be a server-side check with proper auth tokens

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {children}
      </div>
    </div>
  );
}
