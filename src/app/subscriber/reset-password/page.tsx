'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Shield, Lock, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { smsAuth, extractApiError } from '@/services/smsApi';

function ResetPasswordForm() {
  const params = useSearchParams();
  const token = params.get('token') || '';
  const router = useRouter();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (!token) {
      setError('Reset token is missing. Please use the link from your email.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    setSubmitting(true);
    try {
      await smsAuth.resetPassword(token, newPassword, confirmPassword);
      setSuccess(true);
      setTimeout(() => router.push('/subscriber/login'), 3000);
    } catch (err) {
      setError(extractApiError(err));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="glass rounded-2xl border border-white/10 p-8 shadow-2xl">
      {success ? (
        <div className="flex flex-col items-center gap-4 py-4 text-center">
          <div className="w-14 h-14 rounded-full bg-primary/15 flex items-center justify-center">
            <CheckCircle2 size={28} className="text-primary" />
          </div>
          <h2 className="text-lg font-semibold text-foreground">
            Password updated!
          </h2>
          <p className="text-sm text-foreground/60">
            Your password has been reset. Redirecting to sign in…
          </p>
          <Link
            href="/subscriber/login"
            className="mt-2 inline-flex h-10 items-center justify-center rounded-lg bg-primary px-6 text-sm font-semibold text-background hover:bg-primary-dark transition-colors"
          >
            Go to sign in
          </Link>
        </div>
      ) : (
        <>
          {!token && (
            <div className="flex items-start gap-2 mb-5 px-4 py-3 rounded-lg bg-warning/10 border border-warning/30 text-warning text-sm">
              <AlertCircle size={16} className="mt-0.5 shrink-0" />
              <span>
                No reset token found. Please use the link from your email.
              </span>
            </div>
          )}
          {error && (
            <div className="flex items-start gap-2 mb-5 px-4 py-3 rounded-lg bg-danger/10 border border-danger/30 text-danger text-sm">
              <AlertCircle size={16} className="mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground/70">
                New password
              </label>
              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40"
                />
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Min. 8 characters"
                  minLength={8}
                  className="w-full pl-10 pr-4 py-2.5 bg-surface border border-white/10 rounded-lg text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/40 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground/70">
                Confirm new password
              </label>
              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40"
                />
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat password"
                  className={`w-full pl-10 pr-4 py-2.5 bg-surface border rounded-lg text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:ring-1 transition-colors ${
                    confirmPassword && newPassword !== confirmPassword
                      ? 'border-danger/60 focus:border-danger focus:ring-danger/30'
                      : 'border-white/10 focus:border-primary/60 focus:ring-primary/40'
                  }`}
                />
              </div>
              {confirmPassword && newPassword !== confirmPassword && (
                <p className="text-[11px] text-danger">
                  Passwords do not match.
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={submitting || !token}
              className="w-full flex items-center justify-center gap-2 h-11 rounded-lg bg-primary text-background text-sm font-semibold shadow-lg shadow-primary/20 hover:bg-primary-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting && <Loader2 size={16} className="animate-spin" />}
              Set new password
            </button>
          </form>
        </>
      )}
    </div>
  );
}

export default function ResetPasswordPage() {
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
          <p className="text-foreground/50 text-sm mt-1">
            Set a new password
          </p>
        </div>

        <Suspense
          fallback={
            <div className="glass rounded-2xl border border-white/10 p-8 flex justify-center">
              <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
            </div>
          }
        >
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  );
}
