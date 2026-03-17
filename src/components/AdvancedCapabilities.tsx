"use client";

import { motion } from "framer-motion";
import { TerminalSquare, Bell, Share2, Activity, Network, Cpu, Zap } from "lucide-react";

export function AdvancedCapabilities() {
  return (
    <section className="py-24 bg-surface/40 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10 space-y-12">
        <div className="max-w-3xl text-center mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-3"
          >
            Beyond a Prompt Linter
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-foreground/70 text-lg"
          >
            LaroGuard runs as a runtime security layer in front of both AI models and
            the tools they can invoke, with dedicated controls for alerting, security event
            export, and intelligent assistance via 6AI Tornado.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            className="glass rounded-2xl border border-white/10 p-6 space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-rose-500/20 flex items-center justify-center text-rose-300">
                <TerminalSquare className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-semibold">HTTP Tool Proxy</p>
                <p className="text-xs text-foreground/60">
                  Intercept, analyze, and enforce policies on LLM tool calls.
                </p>
              </div>
            </div>
            <div className="space-y-2 text-xs text-foreground/70">
              <p className="text-foreground/60">Decision distribution</p>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-foreground/50">Blocked</span>
                  <span className="font-mono text-rose-300">78.6%</span>
                </div>
                <div className="h-1.5 rounded-full bg-black/50 overflow-hidden">
                  <div className="h-full w-4/5 bg-rose-400" />
                </div>
              </div>
              <p className="text-foreground/60">
                Review every AI tool invocation against your security policy before
                it executes. Requests that do not meet your thresholds are blocked
                before any action is taken on your infrastructure.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            className="glass rounded-2xl border border-white/10 p-6 space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-300">
                <Bell className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-semibold">Alerts & SIEM Export</p>
                <p className="text-xs text-foreground/60">
                  Route high-severity events to security teams and platforms.
                </p>
              </div>
            </div>
            <div className="space-y-3 text-xs text-foreground/70">
              <div className="flex flex-wrap gap-2">
                {["Email", "Slack", "Webhook"].map((label) => (
                  <span
                    key={label}
                    className="px-2 py-0.5 rounded-full bg-black/40 border border-white/10 text-[11px]"
                  >
                    {label} channel
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2 text-[11px] text-foreground/60">
                <Share2 className="w-3.5 h-3.5" />
                <span>
                  Security events are forwarded to your monitoring platform
                  without adding latency to your application responses.
                </span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-foreground/60">
                <Network className="w-3.5 h-3.5" />
                <span>Multiple destinations can receive the same event stream simultaneously.</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            className="glass rounded-2xl border border-white/10 p-6 space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-secondary/25 flex items-center justify-center text-secondary-foreground">
                <Activity className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-semibold">6AI Tornado Integration</p>
                <p className="text-xs text-foreground/60">
                  AI-assisted engine for rule authoring and council decisions.
                </p>
              </div>
            </div>
            <div className="space-y-3 text-xs text-foreground/70">
              <div className="rounded-xl bg-black/50 border border-white/10 p-3 space-y-2">
                <p className="text-[11px] font-semibold text-emerald-300">
                  Connected · Active
                </p>
                <p className="text-[11px] text-foreground/60">
                  Deploy Tornado alongside LaroGuard or connect it remotely.
                  Manage its integration and access tokens directly from the dashboard.
                </p>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-foreground/60">
                <Cpu className="w-3.5 h-3.5" />
                <span>
                  Tornado provides intelligent analysis and recommendations;
                  all enforcement decisions remain within the LaroGuard runtime.
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            className="glass rounded-2xl border border-white/10 p-6 space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-300">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-semibold">Production-Ready Performance</p>
                <p className="text-xs text-foreground/60">
                  Built to stay fast under load.
                </p>
              </div>
            </div>
            <div className="space-y-3 text-xs text-foreground/70">
              <p className="text-foreground/60">
                Security scanning runs in a dedicated processing pool, keeping
                request handling responsive even under high traffic. Performance
                metrics are visible in the diagnostics section of the dashboard.
              </p>
              <div className="rounded-xl bg-black/50 border border-white/10 p-3 space-y-2">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-foreground/60 flex items-center gap-1">
                    <Cpu className="w-3 h-3" /> Scan Workers
                  </span>
                  <span className="font-mono text-cyan-300">High capacity</span>
                </div>
                <div className="h-1.5 rounded-full bg-black/50 overflow-hidden">
                  <div className="h-full w-full bg-gradient-to-r from-cyan-500 to-teal-400" />
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-foreground/60 flex items-center gap-1">
                    <Zap className="w-3 h-3" /> Request Handling
                  </span>
                  <span className="font-mono text-emerald-300">Unaffected by scan load</span>
                </div>
                <div className="h-1.5 rounded-full bg-black/50 overflow-hidden">
                  <div className="h-full w-1/12 bg-emerald-400" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-black/70 -z-10 pointer-events-none" />
    </section>
  );
}
