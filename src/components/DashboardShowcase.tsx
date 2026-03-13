"use client";

import { motion } from "framer-motion";
import { Activity, LayoutDashboard, TerminalSquare, Bell } from "lucide-react";
import { DashboardPreview } from "./DashboardPreview";

interface DashboardPanelProps {
  title: string;
  subtitle: string;
  icon: React.ElementType;
  children: React.ReactNode;
}

function DashboardPanel({ title, subtitle, icon: Icon, children }: DashboardPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.4 }}
      className="group relative rounded-2xl glass border border-white/10 overflow-hidden shadow-lg"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10 p-4 border-b border-white/5 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
          <Icon className="w-4 h-4" />
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">{title}</p>
          <p className="text-[11px] text-foreground/60">{subtitle}</p>
        </div>
      </div>
      <div className="relative z-10 bg-black/40 p-4">{children}</div>
    </motion.div>
  );
}

export function DashboardShowcase() {
  return (
    <section className="py-24" aria-labelledby="control-plane-heading">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div className="max-w-2xl space-y-3">
            <h2
              id="control-plane-heading"
              className="text-3xl md:text-5xl font-bold"
            >
              Centralized <span className="text-primary">Firewall Control Plane</span>
            </h2>
            <p className="text-foreground/70 text-lg">
              Operate your LLM firewall like a production security platform: rules,
              testing, tool proxy, alerts, SIEM export, and AI-assisted rule
              authoring.
            </p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="order-1">
            <DashboardPreview />
          </div>

          <div className="order-2 grid sm:grid-cols-2 gap-6">
            <DashboardPanel
              title="Dataset & Rules Management"
              subtitle="Curate prompt patterns, runtime rules, and AI-assisted suggestions."
              icon={LayoutDashboard}
            >
              <div className="space-y-3 text-xs text-foreground/70">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="uppercase tracking-wide text-foreground/50">Totals</span>
                  <span className="text-emerald-400 font-mono">15 rules
                    <span className="text-foreground/50"> · 15 enabled</span>
                  </span>
                </div>
                <div className="rounded-xl bg-surface border border-white/10 p-3 space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-foreground/60">
                    <span>Prompt Patterns</span>
                    <span className="rounded-full px-2 py-0.5 bg-primary/10 text-primary font-mono text-[10px]">
                      LLM01
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-black/40 overflow-hidden">
                    <div className="h-full w-4/5 bg-gradient-to-r from-primary to-emerald-400" />
                  </div>
                  <p className="text-[11px] text-foreground/50">
                    Tabs for output patterns, prompt attacks, prompt injection
                    patterns, and runtime rules.
                  </p>
                </div>
              </div>
            </DashboardPanel>

            <DashboardPanel
              title="Tool Proxy Dashboard"
              subtitle="Firewall for HTTP tools with enforcement and risk posture."
              icon={TerminalSquare}
            >
              <div className="space-y-4 text-xs text-foreground/70">
                <div className="rounded-lg bg-rose-500/10 border border-rose-500/40 px-3 py-2 flex items-center justify-between">
                  <span className="text-rose-200 text-[11px] font-medium">
                    ENFORCE · Dangerous tool calls are blocked
                  </span>
                  <span className="text-[11px]">14 invocations</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-[11px]">
                  <div className="space-y-1">
                    <p className="text-foreground/60">Allowed</p>
                    <div className="h-1.5 rounded-full bg-black/40 overflow-hidden">
                      <div className="h-full w-0 bg-emerald-400" />
                    </div>
                    <p className="font-mono text-emerald-400">0</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-foreground/60">Warned</p>
                    <div className="h-1.5 rounded-full bg-black/40 overflow-hidden">
                      <div className="h-full w-1/4 bg-amber-400" />
                    </div>
                    <p className="font-mono text-amber-300">3</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-foreground/60">Blocked</p>
                    <div className="h-1.5 rounded-full bg-black/40 overflow-hidden">
                      <div className="h-full w-4/5 bg-rose-400" />
                    </div>
                    <p className="font-mono text-rose-300">11</p>
                  </div>
                </div>
              </div>
            </DashboardPanel>

            <DashboardPanel
              title="Alerts & SIEM Export"
              subtitle="Notify teams and stream events to existing monitoring."
              icon={Bell}
            >
              <div className="space-y-3 text-xs text-foreground/70">
                <div className="flex gap-2 text-[11px]">
                  <span className="px-2 py-0.5 rounded-full bg-primary/15 border border-primary/30 text-primary">
                    Email
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-sky-500/10 border border-sky-500/40 text-sky-300">
                    Slack
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/40 text-purple-200">
                    Webhook
                  </span>
                </div>
                <div className="rounded-lg bg-surface border border-white/10 p-3 space-y-2">
                  <p className="text-[11px] text-foreground/60">SIEM Export</p>
                  <div className="flex flex-wrap gap-1 text-[10px]">
                    <span className="px-2 py-0.5 rounded-full bg-black/40 border border-white/10">
                      Webhook HTTP
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-black/40 border border-white/10">
                      Syslog UDP/TCP
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-black/40 border border-white/10">
                      Splunk HEC
                    </span>
                  </div>
                  <p className="text-[11px] text-foreground/60">
                    Non-blocking async export with retries and multi-destination
                    support.
                  </p>
                </div>
              </div>
            </DashboardPanel>

            <DashboardPanel
              title="6AI Tornado Council"
              subtitle="AI-assisted rule creation and verification service."
              icon={Activity}
            >
              <div className="space-y-3 text-xs text-foreground/70">
                <div className="rounded-lg bg-secondary/20 border border-secondary/40 px-3 py-2 flex items-center justify-between">
                  <span className="text-[11px] font-medium text-secondary-foreground">
                    Council Analysis in Progress
                  </span>
                  <span className="text-[11px] text-foreground/60">1.2s elapsed</span>
                </div>
                <div className="rounded-lg bg-black/40 border border-white/10 p-3 space-y-2">
                  <p className="text-[11px] font-semibold text-emerald-300">
                    Not Harmful — Likely Safe
                  </p>
                  <p className="text-[11px] text-foreground/60">
                    Multiple AI analysts independently score the interaction, then a
                    council consolidates the recommendation and generates a runtime
                    rule.
                  </p>
                  <pre className="text-[10px] bg-black/70 border border-white/10 rounded px-2 py-1 overflow-x-auto font-mono text-emerald-300">
{`pattern: token_repetition_ratio > 0.95 && token_entropy < 0.1
category: anomalous_input
severity: low`}
                  </pre>
                </div>
              </div>
            </DashboardPanel>
          </div>
        </div>
      </div>
    </section>
  );
}
