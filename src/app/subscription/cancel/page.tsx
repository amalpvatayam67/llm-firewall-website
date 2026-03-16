'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { XCircle, Tag, ArrowLeft } from 'lucide-react';

export default function SubscriptionCancelPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col justify-center px-4 py-20">
      <div className="pointer-events-none fixed top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-secondary/8 rounded-full blur-[140px] -z-10" />

      <div className="w-full max-w-md mx-auto text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', duration: 0.6 }}
          className="flex flex-col items-center gap-5"
        >
          <div className="w-20 h-20 rounded-full bg-foreground/5 border border-white/10 flex items-center justify-center">
            <XCircle size={38} className="text-foreground/30" />
          </div>

          <div>
            <h1 className="text-3xl font-extrabold text-foreground mb-2">
              Payment cancelled
            </h1>
            <p className="text-foreground/60">
              Your payment was not completed. Your subscription has not changed.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <Link
              href="/pricing"
              className="flex items-center justify-center gap-2 h-11 px-6 rounded-lg bg-primary text-background text-sm font-semibold hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20"
            >
              <Tag size={15} />
              Back to pricing
            </Link>
            <Link
              href="/"
              className="flex items-center justify-center gap-2 h-11 px-6 rounded-lg bg-surface border border-white/10 text-foreground/70 text-sm font-medium hover:bg-surface-hover hover:text-foreground transition-colors"
            >
              <ArrowLeft size={15} />
              Back to home
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
