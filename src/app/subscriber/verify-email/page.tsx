'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Shield, CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { smsAuth, extractApiError } from '@/services/smsApi';

function VerifyEmailInner() {
  const params = useSearchParams();
  const token = params.get('token') || '';

  const [status, setStatus] = useState<'loading' | 'success' | 'error'>(
    'loading',
  );
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!token) {
      Promise.resolve().then(() => {
        setStatus('error');
        setMessage('Verification token is missing from the URL.');
      });
      return;
    }

    smsAuth
      .verifyEmail(token)
      .then(() => setStatus('success'))
      .catch((err) => {
        setStatus('error');
        setMessage(extractApiError(err));
      });
  }, [token]);

  return (
    <div className="glass rounded-2xl border border-white/10 p-10 shadow-2xl flex flex-col items-center gap-5 text-center">
      {status === 'loading' && (
        <>
          <Loader2 size={36} className="text-primary animate-spin" />
          <p className="text-foreground/70 text-sm">
            Verifying your email address…
          </p>
        </>
      )}

      {status === 'success' && (
        <>
          <div className="w-16 h-16 rounded-full bg-primary/15 flex items-center justify-center">
            <CheckCircle2 size={32} className="text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">
            Email verified!
          </h2>
          <p className="text-sm text-foreground/60">
            Your account is now active. You can sign in and start using LLM
            Firewall.
          </p>
          <Link
            href="/subscriber/login"
            className="mt-1 inline-flex h-11 items-center justify-center rounded-lg bg-primary px-8 text-sm font-semibold text-background hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20"
          >
            Sign in
          </Link>
        </>
      )}

      {status === 'error' && (
        <>
          <div className="w-16 h-16 rounded-full bg-danger/10 flex items-center justify-center">
            <XCircle size={32} className="text-danger" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">
            Verification failed
          </h2>
          <p className="text-sm text-foreground/60">
            {message || 'The link may have expired or already been used.'}
          </p>
          <Link
            href="/subscriber/login"
            className="mt-1 inline-flex h-10 items-center justify-center rounded-lg bg-surface border border-white/10 px-6 text-sm text-foreground/70 hover:text-foreground hover:bg-surface-hover transition-colors"
          >
            Back to sign in
          </Link>
        </>
      )}
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col justify-center px-4 py-20">
      <div className="pointer-events-none fixed top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -z-10" />

      <div className="w-full max-w-md mx-auto">
        <div className="flex flex-col items-center mb-10">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/20 text-primary mb-4">
            <Shield size={26} />
          </div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">
            LLM<span className="text-primary">Firewall</span>
          </h1>
        </div>

        <Suspense
          fallback={
            <div className="glass rounded-2xl border border-white/10 p-10 flex justify-center">
              <Loader2 size={28} className="text-primary animate-spin" />
            </div>
          }
        >
          <VerifyEmailInner />
        </Suspense>
      </div>
    </div>
  );
}
