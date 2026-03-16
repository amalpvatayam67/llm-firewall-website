'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Shield, Mail, AlertCircle, CheckCircle2, Loader2, ArrowLeft } from 'lucide-react';
import { smsAuth, extractApiError } from '@/services/smsApi';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await smsAuth.forgotPassword(email);
      setSubmitted(true);
    } catch (err) {
      setError(extractApiError(err));
    } finally {
      setSubmitting(false);
    }
  }

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
            Reset your password
          </p>
        </div>

        <div className="glass rounded-2xl border border-white/10 p-8 shadow-2xl">
          {submitted ? (
            <div className="flex flex-col items-center gap-4 py-4 text-center">
              <div className="w-14 h-14 rounded-full bg-primary/15 flex items-center justify-center">
                <CheckCircle2 size={28} className="text-primary" />
              </div>
              <h2 className="text-lg font-semibold text-foreground">
                Check your inbox
              </h2>
              <p className="text-sm text-foreground/60">
                If an account exists for{' '}
                <span className="text-foreground font-medium">{email}</span>,
                we&apos;ve sent a password reset link.
              </p>
              <Link
                href="/subscriber/login"
                className="mt-2 inline-flex items-center gap-2 h-10 rounded-lg bg-surface border border-white/10 px-5 text-sm text-foreground/70 hover:text-foreground hover:bg-surface-hover transition-colors"
              >
                <ArrowLeft size={14} />
                Back to sign in
              </Link>
            </div>
          ) : (
            <>
              <p className="text-sm text-foreground/60 mb-6">
                Enter your account email and we&apos;ll send you a reset link.
              </p>

              {error && (
                <div className="flex items-start gap-2 mb-5 px-4 py-3 rounded-lg bg-danger/10 border border-danger/30 text-danger text-sm">
                  <AlertCircle size={16} className="mt-0.5 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground/70">
                    Email
                  </label>
                  <div className="relative">
                    <Mail
                      size={16}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40"
                    />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      className="w-full pl-10 pr-4 py-2.5 bg-surface border border-white/10 rounded-lg text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/40 transition-colors"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 h-11 rounded-lg bg-primary text-background text-sm font-semibold shadow-lg shadow-primary/20 hover:bg-primary-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting && <Loader2 size={16} className="animate-spin" />}
                  Send reset link
                </button>
              </form>

              <div className="mt-5 text-center">
                <Link
                  href="/subscriber/login"
                  className="inline-flex items-center gap-1.5 text-sm text-foreground/50 hover:text-foreground/80 transition-colors"
                >
                  <ArrowLeft size={14} />
                  Back to sign in
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
