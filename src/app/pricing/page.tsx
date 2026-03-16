'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Loader2, AlertCircle, Zap, Mail } from 'lucide-react';
import { useSubscriberAuth } from '@/auth/SubscriberAuthContext';
import { smsPlans, smsCheckout, extractApiError } from '@/services/smsApi';

type PlanFeature = {
  key: string;
  label: string;
  enabled: boolean;
  strike: boolean;
};

type Plan = {
  id: number;
  name: string;
  slug: string;
  description: string;
  price_hidden: boolean;
  price_monthly: number;
  price_yearly: number;
  features: PlanFeature[];
  sort_order: number;
};

type BillingInterval = 'monthly' | 'yearly';

export default function PricingPage() {
  const { isLoggedIn, loading: authLoading } = useSubscriberAuth();
  const router = useRouter();

  const [plans, setPlans] = useState<Plan[]>([]);
  const [plansLoading, setPlansLoading] = useState(true);
  const [plansError, setPlansError] = useState('');
  const [billing, setBilling] = useState<BillingInterval>('monthly');
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null);
  const [checkoutError, setCheckoutError] = useState('');

  useEffect(() => {
    smsPlans
      .list()
      .then((data: Plan[]) => {
        const normalized = data.map((plan) => {
          let features: PlanFeature[] = [];
          if (Array.isArray(plan.features)) {
            features = plan.features;
          } else if (typeof plan.features === 'string') {
            try { features = JSON.parse(plan.features as unknown as string); } catch { features = []; }
          }
          // Backfill strike if backend omits it
          features = features.map((f) => ({ ...f, strike: f.strike ?? false }));
          return { ...plan, features };
        });
        setPlans([...normalized].sort((a, b) => a.sort_order - b.sort_order));
      })
      .catch((err) => setPlansError(extractApiError(err)))
      .finally(() => setPlansLoading(false));
  }, []);

  async function handleGetStarted(plan: Plan) {
    if (!isLoggedIn) {
      router.push('/subscriber/login');
      return;
    }
    // Free plan — no Stripe
    if (plan.price_monthly === 0) {
      router.push('/subscriber/subscription');
      return;
    }
    setCheckoutError('');
    setCheckoutLoading(plan.slug);
    try {
      const data = await smsCheckout.createSession(plan.slug, billing);
      const url = data.checkout_url;
      // Navigate to Stripe checkout
      if (typeof window !== 'undefined') {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).location.assign(url);
      }
    } catch (err) {
      setCheckoutError(extractApiError(err));
      setCheckoutLoading(null);
    }
  }

  const yearlyDiscount = (monthly: number, yearly: number) => {
    if (monthly === 0) return 0;
    return Math.round(((monthly * 12 - yearly) / (monthly * 12)) * 100);
  };

  function FeatureItem({ feature }: { feature: PlanFeature }) {
    return (
      <li className="flex items-start gap-2.5 text-sm">
        {feature.enabled ? (
          <CheckCircle2 size={15} className="text-primary mt-0.5 shrink-0" />
        ) : (
          <XCircle size={15} className="text-foreground/25 mt-0.5 shrink-0" />
        )}
        <span
          className={[
            feature.enabled ? 'text-foreground/80' : 'text-foreground/30',
            feature.strike ? 'line-through' : '',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {feature.label}
        </span>
      </li>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Background decoration */}
      <div className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/8 rounded-full blur-[160px] -z-10" />

      <div className="container mx-auto px-4 md:px-6 pt-32 pb-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-medium mb-5">
            <Zap size={13} />
            Simple, transparent pricing
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Choose your plan
          </h1>
          <p className="text-foreground/60 max-w-xl mx-auto text-lg">
            Protect your AI applications at every layer. Start free, scale as
            you grow.
          </p>

          {/* Billing toggle */}
          <div className="inline-flex items-center mt-8 rounded-full bg-surface border border-white/10 p-1">
            <button
              onClick={() => setBilling('monthly')}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                billing === 'monthly'
                  ? 'bg-primary text-background shadow'
                  : 'text-foreground/60 hover:text-foreground'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling('yearly')}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
                billing === 'yearly'
                  ? 'bg-primary text-background shadow'
                  : 'text-foreground/60 hover:text-foreground'
              }`}
            >
              Yearly
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${
                  billing === 'yearly'
                    ? 'bg-background/20 text-background'
                    : 'bg-primary/20 text-primary'
                }`}
              >
                Save up to 17%
              </span>
            </button>
          </div>
        </motion.div>

        {/* Error banner */}
        {checkoutError && (
          <div className="flex items-start gap-2 mb-8 mx-auto max-w-2xl px-4 py-3 rounded-xl bg-danger/10 border border-danger/30 text-danger text-sm">
            <AlertCircle size={16} className="mt-0.5 shrink-0" />
            <span>{checkoutError}</span>
          </div>
        )}

        {/* Plans */}
        {plansLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 size={32} className="text-primary animate-spin" />
          </div>
        ) : plansError ? (
          <div className="flex flex-col items-center gap-3 py-20 text-center">
            <AlertCircle size={28} className="text-danger" />
            <p className="text-foreground/60">{plansError}</p>
            <button
              onClick={() => window.location.reload()}
              className="text-sm text-primary hover:underline"
            >
              Retry
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch">
            {plans.map((plan, i) => {
              const isEnterprise = plan.price_hidden;
              const isFree = plan.price_monthly === 0 && !isEnterprise;
              const price =
                billing === 'monthly' ? plan.price_monthly : plan.price_yearly;
              const discount = yearlyDiscount(
                plan.price_monthly,
                plan.price_yearly,
              );
              const isHighlighted = i === 2; // Pro tier highlight

              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className={`relative flex flex-col rounded-2xl border p-6 ${
                    isHighlighted
                      ? 'border-primary/50 bg-primary/5 shadow-lg shadow-primary/10'
                      : isEnterprise
                        ? 'border-warning/30 bg-warning/5'
                        : 'border-white/10 bg-surface/50'
                  }`}
                >
                  {isHighlighted && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="px-3 py-1 rounded-full bg-primary text-background text-[11px] font-bold tracking-wide uppercase shadow">
                        Most Popular
                      </span>
                    </div>
                  )}

                  {/* Plan header */}
                  <div className="mb-5">
                    <h2
                      className={`text-xl font-bold mb-1 ${isHighlighted ? 'text-primary' : isEnterprise ? 'text-warning' : 'text-foreground'}`}
                    >
                      {plan.name}
                    </h2>
                    <p className="text-sm text-foreground/50">
                      {plan.description}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    {isEnterprise ? (
                      <p className="text-3xl font-extrabold text-foreground">
                        Custom
                      </p>
                    ) : isFree ? (
                      <p className="text-3xl font-extrabold text-foreground">
                        Free
                        <span className="text-sm font-normal text-foreground/50 ml-1">
                          forever
                        </span>
                      </p>
                    ) : (
                      <div>
                        <div className="flex items-end gap-2">
                          <span className="text-3xl font-extrabold text-foreground">
                            ${billing === 'monthly' ? price : (price / 12).toFixed(0)}
                          </span>
                          <span className="text-sm text-foreground/50 mb-1">
                            /mo
                          </span>
                          {billing === 'yearly' && (
                            <span className="text-xs text-foreground/40 mb-1 line-through">
                              ${plan.price_monthly}/mo
                            </span>
                          )}
                        </div>
                        {billing === 'yearly' && discount > 0 && (
                          <p className="text-xs text-primary mt-1">
                            ${plan.price_yearly}/yr — save {discount}%
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* CTA button */}
                  {isEnterprise ? (
                    <a
                      href="mailto:sales@llmfirewall.com"
                      className="flex items-center justify-center gap-2 h-11 rounded-lg bg-warning text-gray-900 text-sm font-semibold hover:bg-amber-400 transition-colors mb-6"
                    >
                      <Mail size={15} />
                      Contact Us
                    </a>
                  ) : (
                    <button
                      onClick={() => handleGetStarted(plan)}
                      disabled={checkoutLoading === plan.slug || authLoading}
                      className={`flex items-center justify-center gap-2 h-11 rounded-lg text-sm font-semibold transition-colors mb-6 disabled:opacity-60 disabled:cursor-not-allowed ${
                        isHighlighted
                          ? 'bg-primary text-background hover:bg-primary-dark shadow-lg shadow-primary/20'
                          : 'bg-surface-hover border border-white/15 text-foreground hover:bg-white/10'
                      }`}
                    >
                      {checkoutLoading === plan.slug && (
                        <Loader2 size={15} className="animate-spin" />
                      )}
                      {isFree ? 'Get started free' : 'Get started'}
                    </button>
                  )}

                  {/* Divider */}
                  <div className="h-px bg-white/8 mb-5" />

                  {/* Features */}
                  <ul className="space-y-3 flex-1">
                    {plan.features.map((feat) => (
                      <FeatureItem key={feat.key} feature={feat} />
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Footer note */}
        <p className="text-center text-sm text-foreground/35 mt-12">
          All plans include a{' '}
          <span className="text-foreground/50">30-day money-back guarantee</span>
          . No credit card required for the free tier.{' '}
          <Link
            href="/docs"
            className="text-primary hover:underline"
          >
            Read the docs
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
