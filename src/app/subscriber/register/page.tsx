'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Shield,
  Mail,
  Lock,
  User,
  Building2,
  AtSign,
  AlertCircle,
  CheckCircle2,
  Loader2,
} from 'lucide-react';
import { useSubscriberAuth } from '@/auth/SubscriberAuthContext';
import { smsAuth, extractApiError } from '@/services/smsApi';

export default function SubscriberRegisterPage() {
  const { isLoggedIn, loading } = useSubscriberAuth();
  const router = useRouter();

  const [form, setForm] = useState({
    username: '',
    email: '',
    full_name: '',
    company_name: '',
    password: '',
    confirm_password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && isLoggedIn) {
      router.replace('/subscriber/profile');
    }
  }, [loading, isLoggedIn, router]);

  function update(field: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirm_password) {
      setError('Passwords do not match.');
      return;
    }
    if (form.password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    setSubmitting(true);
    try {
      await smsAuth.register({
        username: form.username,
        email: form.email,
        full_name: form.full_name,
        company_name: form.company_name || undefined,
        password: form.password,
        confirm_password: form.confirm_password,
      });
      setSuccess(true);
    } catch (err) {
      setError(extractApiError(err));
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center px-4 py-20">
      <div className="pointer-events-none fixed top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -z-10" />

      <div className="w-full max-w-md mx-auto">
        {/* Brand */}
        <div className="flex flex-col items-center mb-10">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/20 text-primary mb-4">
            <Shield size={26} />
          </div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">
            LLM<span className="text-primary">Firewall</span>
          </h1>
          <p className="text-foreground/50 text-sm mt-1">
            Create your free account
          </p>
        </div>

        <div className="glass rounded-2xl border border-white/10 p-8 shadow-2xl">
          {success ? (
            <div className="flex flex-col items-center gap-4 py-4 text-center">
              <div className="w-14 h-14 rounded-full bg-primary/15 flex items-center justify-center">
                <CheckCircle2 size={28} className="text-primary" />
              </div>
              <h2 className="text-lg font-semibold text-foreground">
                Check your inbox
              </h2>
              <p className="text-sm text-foreground/60">
                We sent a verification link to{' '}
                <span className="text-foreground font-medium">{form.email}</span>
                . Verify your email to activate your account.
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
              {error && (
                <div className="flex items-start gap-2 mb-5 px-4 py-3 rounded-lg bg-danger/10 border border-danger/30 text-danger text-sm">
                  <AlertCircle size={16} className="mt-0.5 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Username */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground/70">
                    Username
                  </label>
                  <div className="relative">
                    <AtSign
                      size={15}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40"
                    />
                    <input
                      type="text"
                      required
                      value={form.username}
                      onChange={update('username')}
                      placeholder="yourhandle"
                      pattern="^[a-zA-Z0-9_\-.]+$"
                      minLength={3}
                      maxLength={30}
                      className="w-full pl-10 pr-4 py-2.5 bg-surface border border-white/10 rounded-lg text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/40 transition-colors"
                    />
                  </div>
                  <p className="text-[11px] text-foreground/35">
                    3–30 chars, letters / numbers / _ - . only. Cannot be changed later.
                  </p>
                </div>

                {/* Full name */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground/70">
                    Full name
                  </label>
                  <div className="relative">
                    <User
                      size={15}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40"
                    />
                    <input
                      type="text"
                      required
                      value={form.full_name}
                      onChange={update('full_name')}
                      placeholder="Jane Smith"
                      className="w-full pl-10 pr-4 py-2.5 bg-surface border border-white/10 rounded-lg text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/40 transition-colors"
                    />
                  </div>
                </div>

                {/* Company name */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground/70">
                    Company{' '}
                    <span className="text-foreground/35 font-normal">
                      (optional)
                    </span>
                  </label>
                  <div className="relative">
                    <Building2
                      size={15}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40"
                    />
                    <input
                      type="text"
                      value={form.company_name}
                      onChange={update('company_name')}
                      placeholder="Acme Inc."
                      className="w-full pl-10 pr-4 py-2.5 bg-surface border border-white/10 rounded-lg text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/40 transition-colors"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground/70">
                    Email
                  </label>
                  <div className="relative">
                    <Mail
                      size={15}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40"
                    />
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={update('email')}
                      placeholder="you@company.com"
                      className="w-full pl-10 pr-4 py-2.5 bg-surface border border-white/10 rounded-lg text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/40 transition-colors"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground/70">
                    Password
                  </label>
                  <div className="relative">
                    <Lock
                      size={15}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40"
                    />
                    <input
                      type="password"
                      required
                      value={form.password}
                      onChange={update('password')}
                      placeholder="Min. 8 characters"
                      minLength={8}
                      className="w-full pl-10 pr-4 py-2.5 bg-surface border border-white/10 rounded-lg text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/40 transition-colors"
                    />
                  </div>
                </div>

                {/* Confirm password */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground/70">
                    Confirm password
                  </label>
                  <div className="relative">
                    <Lock
                      size={15}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40"
                    />
                    <input
                      type="password"
                      required
                      value={form.confirm_password}
                      onChange={update('confirm_password')}
                      placeholder="Repeat password"
                      className={`w-full pl-10 pr-4 py-2.5 bg-surface border rounded-lg text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:ring-1 transition-colors ${
                        form.confirm_password &&
                        form.password !== form.confirm_password
                          ? 'border-danger/60 focus:border-danger focus:ring-danger/30'
                          : 'border-white/10 focus:border-primary/60 focus:ring-primary/40'
                      }`}
                    />
                  </div>
                  {form.confirm_password &&
                    form.password !== form.confirm_password && (
                      <p className="text-[11px] text-danger">
                        Passwords do not match.
                      </p>
                    )}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 h-11 rounded-lg bg-primary text-background text-sm font-semibold shadow-lg shadow-primary/20 hover:bg-primary-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                >
                  {submitting && <Loader2 size={16} className="animate-spin" />}
                  Create account
                </button>
              </form>

              <p className="text-center text-sm text-foreground/50 mt-6">
                Already have an account?{' '}
                <Link
                  href="/subscriber/login"
                  className="text-primary hover:text-primary-dark font-medium transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
