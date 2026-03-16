'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  CreditCard,
  CalendarDays,
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { useSubscriberAuth } from '@/auth/SubscriberAuthContext';
import { SubscriberGuard } from '@/components/SubscriberGuard';
import { smsProfile, smsCheckout, extractApiError } from '@/services/smsApi';

type PlanFeature = { key: string; label: string; enabled: boolean };

type SubscriptionData = {
  has_subscription: boolean;
  subscription?: {
    id: number;
    status: string;
    billing_interval: 'monthly' | 'yearly';
    starts_at: string;
    ends_at: string | null;
    end_date: string | null;
    renewal_date: string | null;
    auto_renew: boolean;
    plan: {
      id: number;
      name: string;
      slug: string;
      price_monthly: number;
      price_yearly: number;
      features: PlanFeature[];
      description: string;
    };
  };
};

const STATUS_STYLES: Record<string, string> = {
  active: 'bg-primary/15 text-primary border-primary/30',
  trialing: 'bg-secondary/15 text-secondary border-secondary/30',
  past_due: 'bg-warning/15 text-warning border-warning/30',
  cancelled: 'bg-danger/15 text-danger border-danger/30',
  expired: 'bg-foreground/10 text-foreground/50 border-white/10',
};

function formatDate(iso: string | null | undefined) {
  if (!iso) return '—';
  const d = new Date(iso);
  if (isNaN(d.getTime())) return '—';
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function SubscriptionContent() {
  const { subscriber, refreshSubscriber } = useSubscriberAuth();

  const [data, setData] = useState<SubscriptionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cancelling, setCancelling] = useState(false);
  const [cancelConfirm, setCancelConfirm] = useState(false);
  const [cancelError, setCancelError] = useState('');
  const [cancelSuccess, setCancelSuccess] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    setError('');
    try {
      const d = await smsProfile.getSubscription();
      setData(d);
    } catch (err) {
      setError(extractApiError(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  async function handleCancel() {
    setCancelError('');
    setCancelling(true);
    try {
      await smsCheckout.cancelSubscription();
      await fetchData();
      await refreshSubscriber();
      setCancelSuccess(true);
      setCancelConfirm(false);
    } catch (err) {
      setCancelError(extractApiError(err));
    } finally {
      setCancelling(false);
    }
  }

  const sub = data?.subscription;
  const plan = sub?.plan;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 md:px-6 pt-28 pb-16 max-w-2xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-foreground">Subscription</h1>
          <div className="flex items-center gap-2 text-sm text-foreground/50">
            <span>Signed in as</span>
            <span className="text-foreground font-medium">
              {subscriber?.email}
            </span>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 size={28} className="text-primary animate-spin" />
          </div>
        ) : error ? (
          <div className="flex flex-col items-center gap-3 py-20 text-center">
            <AlertCircle size={28} className="text-danger" />
            <p className="text-foreground/60">{error}</p>
            <button
              onClick={fetchData}
              className="text-sm text-primary hover:underline"
            >
              Retry
            </button>
          </div>
        ) : !data?.has_subscription ? (
          /* No subscription */
          <div className="glass rounded-2xl border border-white/10 p-10 flex flex-col items-center gap-5 text-center">
            <div className="w-16 h-16 rounded-full bg-foreground/5 border border-white/10 flex items-center justify-center">
              <CreditCard size={28} className="text-foreground/30" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-1">
                No active subscription
              </h2>
              <p className="text-sm text-foreground/50">
                You&apos;re currently on the free tier. Upgrade to unlock more
                features.
              </p>
            </div>
            <Link
              href="/pricing"
              className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-8 text-sm font-semibold text-background hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20"
            >
              View plans
            </Link>
          </div>
        ) : (
          /* Active subscription */
          <div className="space-y-5">
            {cancelSuccess && (
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-primary/10 border border-primary/30 text-primary text-sm">
                <CheckCircle2 size={15} />
                Subscription cancelled. You&apos;ll retain access until the end
                of the billing period.
              </div>
            )}

            {/* Plan card */}
            <div className="glass rounded-2xl border border-white/10 p-6">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-5">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-xl font-bold text-foreground">
                      {plan?.name}
                    </h2>
                    <span
                      className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold border capitalize ${
                        STATUS_STYLES[sub?.status ?? ''] ??
                        STATUS_STYLES.expired
                      }`}
                    >
                      {sub?.status}
                    </span>
                  </div>
                  <p className="text-sm text-foreground/50">{plan?.description}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-2xl font-extrabold text-foreground">
                    $
                    {sub?.billing_interval === 'monthly'
                      ? plan?.price_monthly
                      : plan?.price_yearly}
                  </p>
                  <p className="text-xs text-foreground/40 capitalize">
                    /{sub?.billing_interval}
                  </p>
                </div>
              </div>

              {/* Billing details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-5 border-t border-white/8">
                <div className="flex items-center gap-2.5">
                  <CalendarDays size={15} className="text-foreground/40" />
                  <div>
                    <p className="text-[11px] text-foreground/40 uppercase tracking-wide">
                      Period start
                    </p>
                    <p className="text-sm text-foreground/80">
                      {formatDate(sub?.starts_at)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <CalendarDays size={15} className="text-foreground/40" />
                  <div>
                    <p className="text-[11px] text-foreground/40 uppercase tracking-wide">
                      Next renewal
                    </p>
                    <p className="text-sm text-foreground/80">
                      {formatDate(sub?.renewal_date)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <RefreshCw size={15} className="text-foreground/40" />
                  <div>
                    <p className="text-[11px] text-foreground/40 uppercase tracking-wide">
                      Auto-renew
                    </p>
                    <p
                      className={`text-sm font-medium ${sub?.auto_renew ? 'text-primary' : 'text-foreground/50'}`}
                    >
                      {sub?.auto_renew ? 'On' : 'Off'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Features */}
            {plan?.features && plan.features.length > 0 && (
              <div className="glass rounded-2xl border border-white/10 p-6">
                <h3 className="text-sm font-semibold text-foreground/70 uppercase tracking-wide mb-4">
                  Included features
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {plan.features.map((feat) => (
                    <li
                      key={feat.key}
                      className={`flex items-center gap-2 text-sm ${feat.enabled ? 'text-foreground/80' : 'text-foreground/30 line-through'}`}
                    >
                      {feat.enabled ? (
                        <CheckCircle2 size={14} className="text-primary shrink-0" />
                      ) : (
                        <XCircle size={14} className="text-foreground/25 shrink-0" />
                      )}
                      {feat.label}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Cancel section */}
            {sub?.status !== 'cancelled' && (
              <div className="glass rounded-2xl border border-danger/15 p-6">
                <h3 className="text-sm font-semibold text-foreground mb-1 flex items-center gap-2">
                  <AlertTriangle size={14} className="text-danger" />
                  Cancel subscription
                </h3>
                <p className="text-xs text-foreground/45 mb-4">
                  You&apos;ll keep access until{' '}
                  {formatDate(sub?.renewal_date)}. This cannot be
                  undone.
                </p>

                {cancelError && (
                  <div className="flex items-start gap-2 mb-4 px-3 py-2.5 rounded-lg bg-danger/10 border border-danger/30 text-danger text-xs">
                    <AlertCircle size={13} className="mt-0.5 shrink-0" />
                    {cancelError}
                  </div>
                )}

                {!cancelConfirm ? (
                  <button
                    onClick={() => setCancelConfirm(true)}
                    className="h-9 px-5 rounded-lg bg-danger/10 border border-danger/30 text-danger text-sm font-medium hover:bg-danger/20 transition-colors"
                  >
                    Cancel subscription
                  </button>
                ) : (
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleCancel}
                      disabled={cancelling}
                      className="flex items-center gap-2 h-9 px-5 rounded-lg bg-danger text-white text-sm font-semibold hover:bg-red-700 transition-colors disabled:opacity-60"
                    >
                      {cancelling && (
                        <Loader2 size={14} className="animate-spin" />
                      )}
                      Yes, cancel
                    </button>
                    <button
                      onClick={() => setCancelConfirm(false)}
                      className="h-9 px-5 rounded-lg bg-surface border border-white/10 text-sm text-foreground/70 hover:bg-surface-hover transition-colors"
                    >
                      Keep subscription
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function SubscriptionPage() {
  return (
    <SubscriberGuard>
      <SubscriptionContent />
    </SubscriberGuard>
  );
}
