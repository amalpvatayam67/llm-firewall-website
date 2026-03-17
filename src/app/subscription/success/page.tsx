'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle2, LayoutDashboard, User } from 'lucide-react';
import { useSubscriberAuth } from '@/auth/SubscriberAuthContext';

function SuccessInner() {
  const params = useSearchParams();
  const sessionId = params.get('session_id');
  const { refreshSubscriber } = useSubscriberAuth();

  useEffect(() => {
    // Reload subscriber so the plan badge in the navbar / profile updates
    refreshSubscriber();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {sessionId && (
        <p className="text-xs text-foreground/30 font-mono mb-2">
          Session: {sessionId}
        </p>
      )}
    </>
  );
}

export default function SubscriptionSuccessPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col justify-center px-4 py-20">
      <div className="pointer-events-none fixed top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[140px] -z-10" />

      <div className="w-full max-w-md mx-auto text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', duration: 0.6 }}
          className="flex flex-col items-center gap-5"
        >
          <div className="w-20 h-20 rounded-full bg-primary/15 flex items-center justify-center border border-primary/30 shadow-lg shadow-primary/10">
            <CheckCircle2 size={38} className="text-primary" />
          </div>

          <div>
            <h1 className="text-3xl font-extrabold text-foreground mb-2">
              Payment successful! 🎉
            </h1>
            <p className="text-foreground/60">
              Your subscription is now active. Welcome to LaroGuard.
            </p>
          </div>

          <Suspense fallback={null}>
            <SuccessInner />
          </Suspense>

          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <Link
              href="/subscriber/profile"
              className="flex items-center justify-center gap-2 h-11 px-6 rounded-lg bg-primary text-background text-sm font-semibold hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20"
            >
              <User size={15} />
              Go to profile
            </Link>
            <Link
              href="/subscriber/subscription"
              className="flex items-center justify-center gap-2 h-11 px-6 rounded-lg bg-surface border border-white/10 text-foreground/70 text-sm font-medium hover:bg-surface-hover hover:text-foreground transition-colors"
            >
              <LayoutDashboard size={15} />
              View subscription
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
