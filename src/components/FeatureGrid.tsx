'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Shield, Server, Box, Fingerprint, Activity, Key, Database, Bell,
  BringToFront, Flame, Settings, PlayCircle, GitMerge, Network,
  ShieldAlert, Lock, Eye, BarChart3, AlertTriangle, ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { FeatureCard } from './FeatureCard';

// ── Section 1 — Security Objectives ──────────────────────────────────────────

const securityObjectives = [
  {
    title: 'AI Governance',
    description:
      'Define and enforce policies controlling how models, prompts, and tool integrations are used across projects and environments. Per-project API keys let you scope detection rules, PII policies, and rate limits independently.',
    icon: ShieldAlert,
    color: 'from-violet-400 to-purple-600',
    accent: 'border-violet-500/30 bg-violet-500/5',
    accentText: 'text-violet-400',
  },
  {
    title: 'Risk Management',
    description:
      'Identify and mitigate risks such as prompt injection, model abuse, tool misuse, and unsafe agent execution. The Risk Aggregator scores each request across all pipeline layers before forwarding.',
    icon: AlertTriangle,
    color: 'from-amber-400 to-orange-500',
    accent: 'border-amber-500/30 bg-amber-500/5',
    accentText: 'text-amber-400',
  },
  {
    title: 'Threat Detection',
    description:
      'Continuously analyze prompts, outputs, and retrieved context to detect malicious patterns and abnormal model interactions. Multi-turn context reconstruction catches jailbreaks that span several conversation turns.',
    icon: Fingerprint,
    color: 'from-rose-400 to-red-600',
    accent: 'border-rose-500/30 bg-rose-500/5',
    accentText: 'text-rose-400',
  },
  {
    title: 'Data Protection',
    description:
      'Prevent leakage of sensitive information including credentials, API keys, and personal data within prompts or responses. Streaming redaction removes sensitive tokens inline — no buffering required.',
    icon: Lock,
    color: 'from-cyan-400 to-blue-600',
    accent: 'border-cyan-500/30 bg-cyan-500/5',
    accentText: 'text-cyan-400',
  },
  {
    title: 'Security Monitoring',
    description:
      'Real-time visibility into AI traffic, threat activity, and security posture across deployed LLM systems. Live traffic timelines, latency histograms, and threat distribution charts surface in the SOC Dashboard instantly.',
    icon: BarChart3,
    color: 'from-emerald-400 to-teal-600',
    accent: 'border-emerald-500/30 bg-emerald-500/5',
    accentText: 'text-emerald-400',
  },
  {
    title: 'Privacy Enforcement',
    description:
      'Apply privacy controls to detect and redact PII in both user input and model output streams. Three enforcement modes — detect, mask, or block — with per-project overrides for SSNs, credit cards, emails, and API keys.',
    icon: Eye,
    color: 'from-teal-400 to-cyan-500',
    accent: 'border-teal-500/30 bg-teal-500/5',
    accentText: 'text-teal-400',
  },
];

// ── Section 2 — Platform Capabilities (grouped) ───────────────────────────────

const capabilityGroups = [
  {
    category: 'Core Protection Engine',
    categoryColor: 'text-emerald-400',
    categoryBorder: 'border-emerald-400/20',
    categoryBg: 'bg-emerald-400/8',
    features: [
      {
        title: 'LLM Firewall Core',
        description:
          '11-layer detection pipeline: Rule Engine, Prompt Attack Scanner, Semantic Detector, AI Classifier, Output Scanner, Streaming Output Scanner, Multimodal Scanner, RAG Detector, Tool Guard, Risk Aggregator, and PII Guard.',
        icon: Shield,
        color: 'from-emerald-400 to-primary',
        delay: 0.05,
      },
      {
        title: 'Streaming Output Scanner',
        description:
          'Sliding-window streaming redaction that inspects LLM output token-by-token without buffering the full response. Sensitive patterns are redacted inline as the stream flows.',
        icon: Activity,
        color: 'from-cyan-400 to-emerald-500',
        delay: 0.1,
      },
      {
        title: 'Multimodal Scanner',
        description:
          'Scans images and files submitted alongside prompts. Detects embedded text via OCR, extracts EXIF metadata anomalies, and decodes QR-encoded payloads — catching steganographic and image-injection attack vectors.',
        icon: Box,
        color: 'from-purple-400 to-fuchsia-500',
        delay: 0.15,
      },
      {
        title: 'PII Guard',
        description:
          'Bidirectional PII enforcement on inputs and outputs. Three modes: detect (log only), mask (redact inline), or block (reject). Per-project overrides let you configure different PII policies for each API key.',
        icon: EyeShieldIcon,
        color: 'from-teal-400 to-cyan-500',
        delay: 0.2,
        badge: 'Privacy',
      },
    ],
  },
  {
    category: 'Attack Detection',
    categoryColor: 'text-rose-400',
    categoryBorder: 'border-rose-400/20',
    categoryBg: 'bg-rose-400/8',
    features: [
      {
        title: 'Context Resolver',
        description:
          'Automatically reconstructs conversation context to detect multi-turn prompt injection and jailbreak attempts. Uses a lightweight in-memory session cache to analyze recent messages without storing sensitive data.',
        icon: GitMerge,
        color: 'from-teal-400 to-cyan-600',
        delay: 0.05,
      },
      {
        title: 'RAG Poisoning Detector',
        description:
          'Scan documents retrieved from vector DBs before they hit the LLM. Detects embedded prompt injections and adversarial payloads hiding inside retrieved context chunks.',
        icon: Fingerprint,
        color: 'from-rose-400 to-red-500',
        delay: 0.1,
      },
    ],
  },
  {
    category: 'AI Runtime Infrastructure',
    categoryColor: 'text-blue-400',
    categoryBorder: 'border-blue-400/20',
    categoryBg: 'bg-blue-400/8',
    features: [
      {
        title: 'HTTP Tool Proxy',
        description:
          'Intercept, analyze, and block dangerous LLM tool invocations before they execute on your infrastructure. Every tool call passes through policy enforcement before reaching external services.',
        icon: WrenchIcon,
        color: 'from-orange-400 to-orange-600',
        delay: 0.05,
      },
      {
        title: 'Multi-Provider Gateway',
        description:
          'Unified OpenAI-compatible API gateway routing to OpenAI, Anthropic, Gemini, OpenRouter, Ollama, and Azure. Switch providers without changing application code.',
        icon: Server,
        color: 'from-blue-400 to-indigo-500',
        delay: 0.1,
      },
      {
        title: 'Horizontal Scaling',
        description:
          'Run multiple firewall replicas with shared state. Plug in Redis for distributed rate-limit counters and session cache across all nodes — or stay single-node with zero configuration.',
        icon: Network,
        color: 'from-cyan-400 to-teal-500',
        delay: 0.15,
        badge: 'Scale',
      },
    ],
  },
  {
    category: 'Security Operations',
    categoryColor: 'text-violet-400',
    categoryBorder: 'border-violet-400/20',
    categoryBg: 'bg-violet-400/8',
    features: [
      {
        title: 'Real-Time SOC Dashboard',
        description:
          'React/TypeScript UI with live traffic timelines, latency stats, and threat distribution charts. Built for security teams who need instant situational awareness across deployed LLM systems.',
        icon: Activity,
        color: 'from-cyan-400 to-blue-500',
        delay: 0.05,
      },
      {
        title: 'Request Visualizer',
        description:
          'Trace specific requests layer-by-layer to see exactly which pipeline stage flagged or allowed the request. Full inspection of scores, matched rules, and risk aggregation output.',
        icon: PlayCircle,
        color: 'from-indigo-400 to-cyan-500',
        delay: 0.1,
      },
      {
        title: 'Alert Engine',
        description:
          'Real-time notifications via Email, Slack, and Webhooks when critical threats are detected. Configurable severity thresholds and per-project routing rules.',
        icon: Bell,
        color: 'from-yellow-400 to-amber-500',
        delay: 0.15,
      },
      {
        title: 'SIEM Integration',
        description:
          'Async export of firewall events to Webhooks, Syslog, and Splunk HEC automatically. Every detection event is schema-normalized and ready for correlation in your SIEM.',
        icon: BringToFront,
        color: 'from-teal-400 to-emerald-500',
        delay: 0.2,
      },
      {
        title: 'Red Team Simulator',
        description:
          'Built-in prompt battery tester. Run curated attack suites against the detection pipeline with no provider cost — measure bypass rates and fine-tune rules before going to production.',
        icon: TargetIcon,
        color: 'from-rose-400 to-amber-500',
        delay: 0.25,
      },
      {
        title: 'Project & Key Rules',
        description:
          'Multi-tenant project isolation. Generate API keys per project and track precise per-key traffic analytics, rule overrides, and independent PII policies.',
        icon: Key,
        color: 'from-violet-400 to-purple-600',
        delay: 0.3,
      },
      {
        title: 'Regex & Semantic Rules',
        description:
          'CRUD interface for custom detection rules and curated prompt attack datasets. JSON import/export for rule versioning and promotion across environments.',
        icon: Database,
        color: 'from-fuchsia-400 to-pink-500',
        delay: 0.35,
      },
      {
        title: 'Live Configuration',
        description:
          'Update detection thresholds, active proxies, and provider routing via UI without restarting the system. Changes propagate instantly across all replicas.',
        icon: Settings,
        color: 'from-gray-400 to-slate-500',
        delay: 0.4,
      },
    ],
  },
];

// ── SVG Icon Helpers ──────────────────────────────────────────────────────────

function WrenchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  );
}

function TargetIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
      <path d="M22 12h-4" />
      <path d="M6 12H2" />
      <path d="M12 2v4" />
      <path d="M12 18v4" />
    </svg>
  );
}

function EyeShieldIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M2.5 9.5C4.5 11.5 7.5 13 12 13s7.5-1.5 9.5-3.5" />
      <circle cx="12" cy="10" r="2" />
    </svg>
  );
}

// ── ObjectiveCard ─────────────────────────────────────────────────────────────

function ObjectiveCard({
  title,
  description,
  icon: Icon,
  color,
  accent,
  accentText,
  index,
}: (typeof securityObjectives)[number] & { index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      whileHover={{ y: -4 }}
      className={cn(
        'group relative rounded-2xl border p-6 flex flex-col gap-4 overflow-hidden transition-all duration-300 hover:shadow-lg',
        accent,
      )}
    >
      {/* Corner accent line */}
      <div
        className={cn(
          'absolute top-0 left-0 w-14 h-0.5 rounded-br-full bg-gradient-to-r opacity-60 group-hover:opacity-100 transition-opacity',
          color,
        )}
      />

      <div className="flex items-start gap-4">
        <div
          className={cn(
            'w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-gradient-to-br shadow-inner',
            color,
          )}
        >
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className={cn('text-base font-bold mb-1 transition-colors group-hover:brightness-110', accentText)}>
            {title}
          </h3>
          <p className="text-sm text-foreground/55 leading-relaxed">{description}</p>
        </div>
      </div>
    </motion.div>
  );
}

// ── CategoryHeader ────────────────────────────────────────────────────────────

function CategoryHeader({
  label,
  color,
  border,
  bg,
  delay,
}: {
  label: string;
  color: string;
  border: string;
  bg: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className="col-span-full flex items-center gap-3 mb-1 mt-4 first:mt-0"
    >
      <span
        className={cn(
          'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase border',
          color,
          border,
          bg,
        )}
      >
        <ChevronRight className="w-3 h-3 opacity-60" />
        {label}
      </span>
      <div className={cn('flex-1 h-px opacity-20', `bg-current ${color}`)} />
    </motion.div>
  );
}

// ── Main Export ───────────────────────────────────────────────────────────────

export function FeatureGrid() {
  return (
    <section id="features" className="py-28 relative overflow-hidden">

      {/* ── ambient glows ── */}
      <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-primary/6 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-secondary/6 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="container mx-auto px-4 md:px-6 relative z-10 space-y-28">

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 1 — Security Objectives
        ══════════════════════════════════════════════════════════════════ */}
        <div>
          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 mb-6"
          >
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-primary/60" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary/80">
              01 &nbsp;/&nbsp; Security Framework
            </span>
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-primary/60" />
          </motion.div>

          <div className="text-center max-w-3xl mx-auto mb-14">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold mb-5"
            >
              Security Objectives of the{' '}
              <span className="text-gradient bg-gradient-to-r from-primary via-emerald-400 to-cyan-400">
                LLM Firewall
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-foreground/60 text-lg"
            >
              Security principles guiding protection of generative AI systems
              and model interactions.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {securityObjectives.map((obj, i) => (
              <ObjectiveCard key={obj.title} {...obj} index={i} />
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="relative z-10 flex items-center gap-3 px-6 py-2 rounded-full glass border border-white/8">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-medium text-foreground/40 tracking-widest uppercase">Platform</span>
            <div className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" style={{ animationDelay: '0.5s' }} />
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 2 — Platform Capabilities
        ══════════════════════════════════════════════════════════════════ */}
        <div>
          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 mb-6"
          >
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-secondary/60" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-secondary/80">
              02 &nbsp;/&nbsp; Capabilities
            </span>
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-secondary/60" />
          </motion.div>

          <div className="text-center max-w-3xl mx-auto mb-14">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold mb-5"
            >
              Platform{' '}
              <span className="text-gradient bg-gradient-to-r from-secondary via-violet-400 to-fuchsia-400">
                Capabilities
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-foreground/60 text-lg"
            >
              Security capabilities powering the LLM Firewall detection and
              protection pipeline.
            </motion.p>
          </div>

          {/* Grouped capability cards */}
          <div className="space-y-10">
            {capabilityGroups.map((group, gi) => (
              <div key={group.category}>
                {/* Category header */}
                <motion.div
                  initial={{ opacity: 0, x: -14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: gi * 0.06 }}
                  className="flex items-center gap-3 mb-5"
                >
                  <span
                    className={cn(
                      'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase border',
                      group.categoryColor,
                      group.categoryBorder,
                      group.categoryBg,
                    )}
                  >
                    <ChevronRight className="w-3 h-3 opacity-60" />
                    {group.category}
                  </span>
                  <div className={cn('flex-1 h-px', group.categoryBorder, 'border-t')} />
                </motion.div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                  {group.features.map((feature, fi) => (
                    <FeatureCard
                      key={feature.title}
                      {...feature}
                      delay={gi * 0.05 + fi * 0.06}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
