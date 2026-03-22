'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Shield, Server, Box, Fingerprint, Activity, Key, Database, Bell,
  BringToFront, Flame, Settings, PlayCircle, GitMerge, Network, Globe,
  ShieldAlert, Lock, Eye, BarChart3, AlertTriangle, ChevronRight, Layers, Filter,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { FeatureCard } from './FeatureCard';

// ── Section 1 — Security Objectives ──────────────────────────────────────────

const securityObjectives = [
  {
    title: 'AI Governance',
    description:
      'Set and enforce policies that control how AI models are used across your projects and teams. Each project operates under its own independent ruleset, giving you precise control over what is allowed and what is not.',
    icon: ShieldAlert,
    color: 'from-violet-400 to-purple-600',
    accent: 'border-violet-500/30 bg-violet-500/5',
    accentText: 'text-violet-400',
  },
  {
    title: 'Risk Management',
    description:
      'Identify and contain risks in every AI interaction before they reach your systems. Each request is evaluated across multiple dimensions and assigned a risk score, enabling consistent enforcement of your security thresholds.',
    icon: AlertTriangle,
    color: 'from-amber-400 to-orange-500',
    accent: 'border-amber-500/30 bg-amber-500/5',
    accentText: 'text-amber-400',
  },
  {
    title: 'Threat Detection',
    description:
      'Continuously screen all AI interactions for signs of manipulation, abuse, or policy violations. LaroGuard monitors both individual requests and conversational patterns to catch threats that evolve across multiple turns.',
    icon: Fingerprint,
    color: 'from-rose-400 to-red-600',
    accent: 'border-rose-500/30 bg-rose-500/5',
    accentText: 'text-rose-400',
  },
  {
    title: 'Data Protection',
    description:
      'Prevent sensitive information from entering or leaving your AI systems. LaroGuard screens both what users send and what models return, ensuring confidential data stays protected throughout every interaction.',
    icon: Lock,
    color: 'from-cyan-400 to-blue-600',
    accent: 'border-cyan-500/30 bg-cyan-500/5',
    accentText: 'text-cyan-400',
  },
  {
    title: 'Security Monitoring',
    description:
      'Get real-time visibility into your AI traffic, security decisions, and risk trends. The built-in dashboard surfaces what matters immediately so your team always has an accurate picture of your AI security posture.',
    icon: BarChart3,
    color: 'from-emerald-400 to-teal-600',
    accent: 'border-emerald-500/30 bg-emerald-500/5',
    accentText: 'text-emerald-400',
  },
  {
    title: 'Privacy Enforcement',
    description:
      'Apply privacy controls to both user inputs and model outputs. Choose how LaroGuard responds when personal data is detected — log it, redact it, or block the request entirely — with independent settings per project.',
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
        title: 'LaroGuard Core',
        description:
          'A multi-layer detection engine that evaluates every AI request across several independent protection modules simultaneously, combining their signals into a single risk decision before any response is returned.',
        icon: Shield,
        color: 'from-emerald-400 to-primary',
        delay: 0.05,
      },
      {
        title: 'Streaming Output Scanner',
        description:
          'Inspects model responses as they are generated, applying protection rules in real time without waiting for the full output. Sensitive content is handled inline so your users never see it.',
        icon: Activity,
        color: 'from-cyan-400 to-emerald-500',
        delay: 0.1,
      },
      {
        title: 'Multimodal Scanner',
        description:
          'Extends protection beyond text to cover images and files submitted alongside prompts. Analyzes visual content for embedded threats and policy violations before they reach your AI system.',
        icon: Box,
        color: 'from-purple-400 to-fuchsia-500',
        delay: 0.15,
      },
      {
        title: 'PII Guard',
        description:
          'Screens both what users send and what models return for personally identifiable information. Configure the response per project — log, redact, or block — independently for inputs and outputs.',
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
          'Tracks the flow of a conversation to detect attacks that unfold across multiple turns rather than a single message. Identifies manipulation attempts that would be invisible when looking at any one message in isolation.',
        icon: GitMerge,
        color: 'from-teal-400 to-cyan-600',
        delay: 0.05,
      },
      {
        title: 'RAG Poisoning Detector',
        description:
          'Screens external content retrieved to augment AI responses before it is included in the model context. Catches adversarial material that could redirect or manipulate the AI through its own knowledge sources.',
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
          'Sits between your AI agents and the tools they are allowed to use. Every tool invocation is reviewed against your security policy before it executes, preventing AI-driven actions your policy does not permit.',
        icon: WrenchIcon,
        color: 'from-orange-400 to-orange-600',
        delay: 0.05,
      },
      {
        title: 'Multi-Provider Gateway',
        description:
          'A single integration point that works with all major AI providers. Connect once and route traffic to whichever provider each project is configured to use — no changes to your application required.',
        icon: Server,
        color: 'from-blue-400 to-indigo-500',
        delay: 0.1,
      },
      {
        title: 'Horizontal Scaling',
        description:
          'Deploy as a single node or scale across multiple instances as your traffic grows. Shared state is handled automatically so all replicas enforce the same policies consistently.',
        icon: Layers,
        color: 'from-cyan-400 to-teal-500',
        delay: 0.15,
        badge: 'Scale',
      },
    ],
  },
  {
    category: 'Network-Layer Protection',
    categoryColor: 'text-sky-400',
    categoryBorder: 'border-sky-400/20',
    categoryBg: 'bg-sky-400/8',
    features: [
      {
        title: 'ICAP Content Inspection',
        description:
          'Connects directly to your existing network proxy or security appliance via the ICAP protocol. Inspects both outbound requests and inbound model responses at the network layer without requiring any changes to your applications.',
        icon: Filter,
        color: 'from-sky-400 to-cyan-500',
        delay: 0.05,
      },
      {
        title: 'Transparent Forward Proxy',
        description:
          'Intercepts outbound HTTP and HTTPS traffic at the network level. Route traffic from any tool, agent, or server through LaroGaurd by setting a single environment variable — no SDK integration required.',
        icon: Globe,
        color: 'from-indigo-400 to-sky-500',
        delay: 0.1,
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
          'A live operations view that gives your security team instant visibility into AI traffic, active threats, and system health. Everything your team needs to monitor and respond is in one place.',
        icon: Activity,
        color: 'from-cyan-400 to-blue-500',
        delay: 0.05,
      },
      {
        title: 'Request Visualizer',
        description:
          'Drill into any individual request to understand exactly what LaroGuard detected and why it made the decision it did. Useful for tuning your policies and investigating flagged events.',
        icon: PlayCircle,
        color: 'from-indigo-400 to-cyan-500',
        delay: 0.1,
      },
      {
        title: 'Alert Engine',
        description:
          'Sends real-time notifications to your team when threats are detected. Configure which severity levels trigger alerts, which channels receive them, and which projects they apply to.',
        icon: Bell,
        color: 'from-yellow-400 to-amber-500',
        delay: 0.15,
      },
      {
        title: 'SIEM Integration',
        description:
          'Forwards security events to your existing monitoring and alerting infrastructure automatically. All events are structured for immediate ingestion without additional transformation.',
        icon: BringToFront,
        color: 'from-teal-400 to-emerald-500',
        delay: 0.2,
      },
      {
        title: 'Red Team Simulator',
        description:
          'Test your security policies against adversarial inputs before they appear in production traffic. Validate your configuration and adjust thresholds with confidence before going live.',
        icon: TargetIcon,
        color: 'from-rose-400 to-amber-500',
        delay: 0.25,
      },
      {
        title: 'Project & Key Rules',
        description:
          'Each project gets its own API key, its own policy settings, and its own traffic analytics. Isolate applications from one another and manage access without shared configuration.',
        icon: Key,
        color: 'from-violet-400 to-purple-600',
        delay: 0.3,
      },
      {
        title: 'Regex & Semantic Rules',
        description:
          'Define custom detection rules tailored to your application and use case. Rules can be created, updated, and promoted across environments through the dashboard without any code changes.',
        icon: Database,
        color: 'from-fuchsia-400 to-pink-500',
        delay: 0.35,
      },
      {
        title: 'Live Configuration',
        description:
          'Adjust policies, thresholds, and routing settings through the dashboard at any time. Updates take effect immediately across your deployment with no downtime or restart required.',
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
                LaroGuard
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
              Security capabilities powering the LaroGuard detection and
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
