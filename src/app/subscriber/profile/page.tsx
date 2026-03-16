'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  User,
  Building2,
  Globe,
  Clock,
  Lock,
  LogOut,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Shield,
} from 'lucide-react';
import { useSubscriberAuth } from '@/auth/SubscriberAuthContext';
import { SubscriberGuard } from '@/components/SubscriberGuard';
import { smsProfile, extractApiError } from '@/services/smsApi';

const COMMON_TIMEZONES = [
  'UTC',
  'America/New_York',
  'America/Chicago',
  'America/Denver',
  'America/Los_Angeles',
  'Europe/London',
  'Europe/Paris',
  'Europe/Berlin',
  'Asia/Kolkata',
  'Asia/Singapore',
  'Asia/Tokyo',
  'Australia/Sydney',
];

function ProviderBadge({ provider }: { provider: string }) {
  const map: Record<string, { label: string; color: string }> = {
    local: { label: 'Email', color: 'bg-primary/15 text-primary border-primary/30' },
    google: { label: 'Google', color: 'bg-blue-500/15 text-blue-400 border-blue-500/30' },
    github: { label: 'GitHub', color: 'bg-secondary/15 text-secondary border-secondary/30' },
  };
  const style = map[provider] || {
    label: provider,
    color: 'bg-foreground/10 text-foreground/60 border-white/10',
  };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${style.color}`}
    >
      {style.label}
    </span>
  );
}

function ProfileContent() {
  const { subscriber, logout, refreshSubscriber } = useSubscriberAuth();
  const router = useRouter();

  const [profileForm, setProfileForm] = useState({
    full_name: subscriber?.full_name ?? '',
    company_name: subscriber?.company_name ?? '',
    country: subscriber?.country ?? '',
    timezone: subscriber?.timezone ?? 'UTC',
  });
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState(false);
  const [profileError, setProfileError] = useState('');

  const [pwForm, setPwForm] = useState({
    current_password: '',
    new_password: '',
    confirm_password: '',
  });
  const [pwSaving, setPwSaving] = useState(false);
  const [pwSuccess, setPwSuccess] = useState(false);
  const [pwError, setPwError] = useState('');

  // Sync form when subscriber loads
  useEffect(() => {
    if (subscriber) {
      setProfileForm({
        full_name: subscriber.full_name,
        company_name: subscriber.company_name ?? '',
        country: subscriber.country ?? '',
        timezone: subscriber.timezone,
      });
    }
  }, [subscriber]);

  async function saveProfile(e: React.FormEvent) {
    e.preventDefault();
    setProfileError('');
    setProfileSuccess(false);
    setProfileSaving(true);
    try {
      await smsProfile.updateMe({
        full_name: profileForm.full_name || undefined,
        company_name: profileForm.company_name || undefined,
        country: profileForm.country || undefined,
        timezone: profileForm.timezone || undefined,
      });
      await refreshSubscriber();
      setProfileSuccess(true);
      setTimeout(() => setProfileSuccess(false), 3000);
    } catch (err) {
      setProfileError(extractApiError(err));
    } finally {
      setProfileSaving(false);
    }
  }

  async function changePassword(e: React.FormEvent) {
    e.preventDefault();
    setPwError('');
    setPwSuccess(false);

    if (pwForm.new_password !== pwForm.confirm_password) {
      setPwError('Passwords do not match.');
      return;
    }
    if (pwForm.new_password.length < 8) {
      setPwError('Password must be at least 8 characters.');
      return;
    }

    setPwSaving(true);
    try {
      await smsProfile.changePassword({
        current_password:
          subscriber?.has_local_password
            ? pwForm.current_password
            : undefined,
        new_password: pwForm.new_password,
        confirm_password: pwForm.confirm_password,
      });
      setPwSuccess(true);
      setPwForm({ current_password: '', new_password: '', confirm_password: '' });
      setTimeout(() => setPwSuccess(false), 3000);
    } catch (err) {
      setPwError(extractApiError(err));
    } finally {
      setPwSaving(false);
    }
  }

  function handleLogout() {
    logout();
    router.push('/');
  }

  const initials = subscriber?.full_name
    ? subscriber.full_name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : subscriber?.username?.slice(0, 2).toUpperCase() ?? '?';

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 md:px-6 pt-28 pb-16 max-w-3xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
          <div className="flex items-center gap-4">
            {subscriber?.avatar_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={subscriber.avatar_url}
                alt={subscriber.full_name}
                className="w-14 h-14 rounded-full border border-white/10 object-cover"
              />
            ) : (
              <div className="w-14 h-14 rounded-full bg-primary/20 text-primary text-lg font-bold flex items-center justify-center border border-primary/20">
                {initials}
              </div>
            )}
            <div>
              <h1 className="text-xl font-bold text-foreground">
                {subscriber?.full_name || subscriber?.username}
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm text-foreground/50">
                  @{subscriber?.username}
                </span>
                <ProviderBadge
                  provider={subscriber?.identity_provider ?? 'local'}
                />
                {!subscriber?.is_email_verified && (
                  <span className="text-[10px] text-warning border border-warning/30 bg-warning/10 px-2 py-0.5 rounded-full">
                    Unverified
                  </span>
                )}
              </div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 h-9 px-4 rounded-lg bg-surface border border-white/10 text-sm text-foreground/60 hover:text-foreground hover:bg-surface-hover transition-colors"
          >
            <LogOut size={14} />
            Log out
          </button>
        </div>

        {/* Active plan card */}
        <div className="glass rounded-2xl border border-white/10 p-5 mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary/15 flex items-center justify-center">
              <Shield size={18} className="text-primary" />
            </div>
            <div>
              <p className="text-xs text-foreground/50 uppercase tracking-wide font-medium">
                Active plan
              </p>
              <p className="text-sm font-semibold text-foreground">
                {subscriber?.active_plan_name || 'No active plan'}
              </p>
            </div>
          </div>
          <Link
            href="/subscriber/subscription"
            className="flex items-center gap-2 h-9 px-4 rounded-lg bg-surface border border-white/10 text-sm text-foreground/70 hover:text-primary hover:border-primary/30 transition-colors"
          >
            <CreditCard size={14} />
            Manage subscription
          </Link>
        </div>

        {/* Profile form */}
        <div className="glass rounded-2xl border border-white/10 p-6 mb-6">
          <h2 className="text-base font-semibold text-foreground mb-5 flex items-center gap-2">
            <User size={16} className="text-primary" />
            Profile details
          </h2>

          {profileSuccess && (
            <div className="flex items-center gap-2 mb-4 px-4 py-2.5 rounded-lg bg-primary/10 border border-primary/30 text-primary text-sm">
              <CheckCircle2 size={15} />
              Profile saved successfully.
            </div>
          )}
          {profileError && (
            <div className="flex items-start gap-2 mb-4 px-4 py-2.5 rounded-lg bg-danger/10 border border-danger/30 text-danger text-sm">
              <AlertCircle size={15} className="mt-0.5 shrink-0" />
              {profileError}
            </div>
          )}

          <form onSubmit={saveProfile} className="space-y-4">
            {/* Email (read-only) */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground/60">
                Email{' '}
                <span className="text-foreground/30 font-normal">(read-only)</span>
              </label>
              <input
                type="email"
                value={subscriber?.email ?? ''}
                disabled
                className="w-full px-4 py-2.5 bg-black/30 border border-white/5 rounded-lg text-sm text-foreground/40 cursor-not-allowed"
              />
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
                  value={profileForm.full_name}
                  onChange={(e) =>
                    setProfileForm((p) => ({ ...p, full_name: e.target.value }))
                  }
                  placeholder="Jane Smith"
                  className="w-full pl-10 pr-4 py-2.5 bg-surface border border-white/10 rounded-lg text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/40 transition-colors"
                />
              </div>
            </div>

            {/* Company */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground/70">
                Company
              </label>
              <div className="relative">
                <Building2
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40"
                />
                <input
                  type="text"
                  value={profileForm.company_name}
                  onChange={(e) =>
                    setProfileForm((p) => ({
                      ...p,
                      company_name: e.target.value,
                    }))
                  }
                  placeholder="Acme Inc."
                  className="w-full pl-10 pr-4 py-2.5 bg-surface border border-white/10 rounded-lg text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/40 transition-colors"
                />
              </div>
            </div>

            {/* Country */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground/70">
                Country
              </label>
              <div className="relative">
                <Globe
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40"
                />
                <input
                  type="text"
                  value={profileForm.country}
                  onChange={(e) =>
                    setProfileForm((p) => ({ ...p, country: e.target.value }))
                  }
                  placeholder="United States"
                  className="w-full pl-10 pr-4 py-2.5 bg-surface border border-white/10 rounded-lg text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/40 transition-colors"
                />
              </div>
            </div>

            {/* Timezone */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground/70">
                Timezone
              </label>
              <div className="relative">
                <Clock
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40"
                />
                <select
                  value={profileForm.timezone}
                  onChange={(e) =>
                    setProfileForm((p) => ({ ...p, timezone: e.target.value }))
                  }
                  className="w-full pl-10 pr-4 py-2.5 bg-surface border border-white/10 rounded-lg text-sm text-foreground focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/40 transition-colors appearance-none"
                >
                  {COMMON_TIMEZONES.map((tz) => (
                    <option key={tz} value={tz} className="bg-surface">
                      {tz}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={profileSaving}
              className="flex items-center gap-2 h-10 px-6 rounded-lg bg-primary text-background text-sm font-semibold hover:bg-primary-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed shadow-md shadow-primary/20"
            >
              {profileSaving && <Loader2 size={14} className="animate-spin" />}
              Save profile
            </button>
          </form>
        </div>

        {/* Change password */}
        <div className="glass rounded-2xl border border-white/10 p-6">
          <h2 className="text-base font-semibold text-foreground mb-1 flex items-center gap-2">
            <Lock size={16} className="text-secondary" />
            {subscriber?.has_local_password
              ? 'Change password'
              : 'Set a local password'}
          </h2>
          {!subscriber?.has_local_password && (
            <p className="text-xs text-foreground/45 mb-5">
              You signed in with {subscriber?.identity_provider}. You can set a
              local password to also log in with email + password.
            </p>
          )}
          {subscriber?.has_local_password && (
            <p className="text-xs text-foreground/45 mb-5">
              Leave &quot;Current password&quot; blank if you&apos;re setting
              your password for the first time.
            </p>
          )}

          {pwSuccess && (
            <div className="flex items-center gap-2 mb-4 px-4 py-2.5 rounded-lg bg-primary/10 border border-primary/30 text-primary text-sm">
              <CheckCircle2 size={15} />
              Password updated successfully.
            </div>
          )}
          {pwError && (
            <div className="flex items-start gap-2 mb-4 px-4 py-2.5 rounded-lg bg-danger/10 border border-danger/30 text-danger text-sm">
              <AlertCircle size={15} className="mt-0.5 shrink-0" />
              {pwError}
            </div>
          )}

          <form onSubmit={changePassword} className="space-y-4">
            {subscriber?.has_local_password && (
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground/70">
                  Current password
                </label>
                <input
                  type="password"
                  value={pwForm.current_password}
                  onChange={(e) =>
                    setPwForm((p) => ({
                      ...p,
                      current_password: e.target.value,
                    }))
                  }
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 bg-surface border border-white/10 rounded-lg text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/40 transition-colors"
                />
              </div>
            )}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground/70">
                New password
              </label>
              <input
                type="password"
                required
                value={pwForm.new_password}
                onChange={(e) =>
                  setPwForm((p) => ({ ...p, new_password: e.target.value }))
                }
                placeholder="Min. 8 characters"
                minLength={8}
                className="w-full px-4 py-2.5 bg-surface border border-white/10 rounded-lg text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/40 transition-colors"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground/70">
                Confirm new password
              </label>
              <input
                type="password"
                required
                value={pwForm.confirm_password}
                onChange={(e) =>
                  setPwForm((p) => ({
                    ...p,
                    confirm_password: e.target.value,
                  }))
                }
                placeholder="Repeat password"
                className={`w-full px-4 py-2.5 bg-surface border rounded-lg text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:ring-1 transition-colors ${
                  pwForm.confirm_password &&
                  pwForm.new_password !== pwForm.confirm_password
                    ? 'border-danger/60 focus:border-danger focus:ring-danger/30'
                    : 'border-white/10 focus:border-primary/60 focus:ring-primary/40'
                }`}
              />
              {pwForm.confirm_password &&
                pwForm.new_password !== pwForm.confirm_password && (
                  <p className="text-[11px] text-danger">
                    Passwords do not match.
                  </p>
                )}
            </div>

            <button
              type="submit"
              disabled={pwSaving}
              className="flex items-center gap-2 h-10 px-6 rounded-lg bg-secondary/80 text-white text-sm font-semibold hover:bg-secondary transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {pwSaving && <Loader2 size={14} className="animate-spin" />}
              {subscriber?.has_local_password
                ? 'Update password'
                : 'Set password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function SubscriberProfilePage() {
  return (
    <SubscriberGuard>
      <ProfileContent />
    </SubscriberGuard>
  );
}
