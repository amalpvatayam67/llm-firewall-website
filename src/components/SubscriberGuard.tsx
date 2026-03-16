'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSubscriberAuth } from '@/auth/SubscriberAuthContext';
import type { ReactNode } from 'react';

/**
 * Wraps subscriber-protected pages. Redirects to /subscriber/login if not
 * authenticated, shows a fullscreen loader while the auth state is resolving.
 */
export function SubscriberGuard({ children }: { children: ReactNode }) {
  const { isLoggedIn, loading } = useSubscriberAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      router.replace('/subscriber/login');
    }
  }, [loading, isLoggedIn, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          <p className="text-foreground/50 text-sm">Loading…</p>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) return null;

  return <>{children}</>;
}
