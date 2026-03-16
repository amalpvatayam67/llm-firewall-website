'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Shield, Loader2, XCircle } from 'lucide-react';
import Link from 'next/link';
import { smsTokenStore, smsProfile, extractApiError } from '@/services/smsApi';
import { useSubscriberAuth } from '@/auth/SubscriberAuthContext';

function OAuthCallbackInner() {
  const params = useSearchParams();
  const router = useRouter();
  const { refreshSubscriber } = useSubscriberAuth();

  const [error, setError] = useState('');

  useEffect(() => {
    const accessToken = params.get('access_token');
    const refreshToken = params.get('refresh_token');

    if (accessToken && refreshToken) {
      smsTokenStore.set(accessToken, refreshToken);
      smsProfile
        .getMe()
        .then(async () => {
          await refreshSubscriber();
          router.replace('/subscriber/profile');
        })
        .catch((err) => {
          smsTokenStore.clear();
          setError(extractApiError(err));
        });
    } else {
      const errParam = params.get('error') || params.get('detail');
      setError(
        errParam ||
          'OAuth login failed. Tokens were not returned. Please try again.',
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return (
      <div className="flex flex-col items-center gap-5 text-center py-6">
        <div className="w-14 h-14 rounded-full bg-danger/10 flex items-center justify-center">
          <XCircle size={28} className="text-danger" />
        </div>
        <h2 className="text-lg font-semibold text-foreground">
          Authentication failed
        </h2>
        <p className="text-sm text-foreground/60 max-w-sm">{error}</p>
        <Link
          href="/subscriber/login"
          className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-6 text-sm font-semibold text-background hover:bg-primary-dark transition-colors"
        >
          Back to sign in
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 py-8">
      <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      <p className="text-foreground/60 text-sm">
        Completing sign in, please wait…
      </p>
    </div>
  );
}

export default function OAuthCallbackPage() {
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

        <div className="glass rounded-2xl border border-white/10 p-8 shadow-2xl">
          <Suspense
            fallback={
              <div className="flex flex-col items-center gap-4 py-8">
                <Loader2 size={28} className="text-primary animate-spin" />
              </div>
            }
          >
            <OAuthCallbackInner />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
