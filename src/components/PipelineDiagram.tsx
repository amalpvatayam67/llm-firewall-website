"use client";

import { motion } from "framer-motion";
import { ShieldAlert, Brain, Fingerprint, Wrench, ScanLine, Layers3, ArrowRight, Radar, Server, Database, GitBranch } from "lucide-react";
import React, { useState } from "react";

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

const promptEngines = [
  {
    name: "Rule Engine",
    description: "Applies your configured detection rules to every incoming request before it is processed.",
    icon: ShieldAlert,
  },
  {
    name: "Prompt Attack Scanner",
    description: "Identifies known patterns of adversarial input designed to manipulate AI behaviour.",
    icon: Fingerprint,
  },
  {
    name: "Semantic Detector",
    description: "Evaluates the meaning and intent behind requests to surface threats that bypass surface-level rules.",
    icon: Brain,
  },
  {
    name: "AI Classifier",
    description: "Applies intelligent classification to catch subtle policy violations that pattern matching alone would miss.",
    icon: Brain,
  },
];

const outputEngines = [
  {
    name: "Output Scanner",
    description: "Reviews every model response for sensitive content before it is returned to your application.",
    icon: ScanLine,
  },
  {
    name: "PII Guard",
    description: "Detects personal information in both requests and responses and enforces your chosen action — log, redact, or block — per project.",
    icon: EyeShieldIcon,
  },
  {
    name: "Streaming Output Scanner",
    description: "Applies protection to streamed responses as they arrive, without waiting for the full output to complete.",
    icon: Radar,
  },
  {
    name: "Multimodal Scanner",
    description: "Extends content inspection to images and files submitted alongside text, screening for embedded threats.",
    icon: Layers3,
  },
  {
    name: "RAG Detector",
    description: "Screens externally retrieved content before it is added to the AI context, blocking adversarial material at the source.",
    icon: Fingerprint,
  },
];

export function PipelineDiagram() {
  const [activeTab, setActiveTab] = useState<"detection" | "deployment">("detection");

  return (
    <section className="py-24 bg-surface/40 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-4"
          >
            End-to-End <span className="text-primary">Runtime Firewall</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-foreground/70 text-lg"
          >
            Every request is evaluated across multiple protection layers before reaching
            your AI provider, with all decisions recorded and available to your team.
          </motion.p>
        </div>

        {/* Tab switcher — same pill style as TestingShowcase */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex rounded-full bg-black/40 border border-white/10 p-1 text-xs">
            <button
              type="button"
              onClick={() => setActiveTab("detection")}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full transition-colors ${
                activeTab === "detection"
                  ? "bg-primary text-background"
                  : "text-foreground/60 hover:text-foreground"
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" /> Detection Stack
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("deployment")}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full transition-colors ${
                activeTab === "deployment"
                  ? "bg-primary text-background"
                  : "text-foreground/60 hover:text-foreground"
              }`}
            >
              <GitBranch className="w-3.5 h-3.5" /> Deployment Architecture
            </button>
          </div>
        </div>

        {activeTab === "detection" ? (
          <DetectionStack />
        ) : (
          <DeploymentArchitecture />
        )}
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-black/60 pointer-events-none -z-10" />
    </section>
  );
}

/* ── Detection Stack (original content, unchanged) ── */
function DetectionStack() {
  return (
    <div className="grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.4fr)_minmax(0,1.1fr)] gap-8 items-stretch">
          {/* Inputs */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl border border-white/10 p-6 h-full flex flex-col gap-4"
          >
            <h3 className="text-sm font-semibold text-primary uppercase tracking-wide">
              Entry Points
            </h3>
            <div className="space-y-4 text-sm text-foreground/80">
              <div>
                <p className="font-semibold">Chat Gateway</p>
                <p className="text-foreground/60">
                  Your application routes AI requests through LaroGuard, which sits in front of
                  all supported LLM providers without requiring any changes to your request format.
                </p>
              </div>
              <div>
                <p className="font-semibold">Tool Proxy</p>
                <p className="text-foreground/60">
                  AI agent tool calls are reviewed and scored against your policy before
                  any action is taken on your infrastructure.
                </p>
              </div>
              <div>
                <p className="font-semibold">Testing Surfaces</p>
                <p className="text-foreground/60">
                  Validate your security policies against adversarial inputs using
                  the same protection stack that runs in production.
                </p>
              </div>
            </div>

            <div className="mt-auto pt-4 text-xs text-foreground/50 flex items-center gap-2">
              <ArrowRight className="w-4 h-4 text-primary" />
              <span>Every request is prepared and validated before the protection pipeline runs.</span>
            </div>
          </motion.div>

          {/* Detection stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative glass rounded-2xl border border-white/10 p-6 lg:p-8 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-70" />
            <div className="relative z-10 space-y-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold tracking-wide text-foreground/60 uppercase">
                    Context & Detection Stack
                  </p>
                  <p className="text-sm text-foreground/70">
                    Conversation context is tracked and fed into layered protection
                    engines that work together to reach a decision on each request.
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-black/40 border border-primary/30 px-3 py-1 text-xs text-primary">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Live evaluation in &lt; 100ms (typical)</span>
                </div>
              </div>

              {/* Context resolver */}
              <div className="rounded-xl bg-black/40 border border-emerald-500/40 px-4 py-3 flex items-center gap-3 shadow-[0_0_25px_rgba(16,185,129,0.35)]">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Layers3 className="w-4 h-4" />
                </div>
                <div className="text-xs md:text-sm">
                  <p className="font-semibold text-foreground">Context Resolver</p>
                  <p className="text-foreground/60">
                    Tracks recent conversation turns to detect threats that span
                    multiple messages, without storing sensitive content.
                  </p>
                </div>
              </div>

              {/* Prompt engines */}
              <div className="grid md:grid-cols-2 gap-4">
                {promptEngines.map((engine) => (
                  <div
                    key={engine.name}
                    className="rounded-lg bg-black/30 border border-white/10 px-3 py-3 flex gap-3 items-start text-xs md:text-sm"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <engine.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-xs md:text-sm">
                        {engine.name}
                      </p>
                      <p className="text-foreground/60 leading-snug">
                        {engine.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Output & streaming engines */}
              <div className="pt-2 border-t border-white/10 mt-2">
                <p className="text-xs font-semibold tracking-wide text-foreground/60 uppercase mb-3">
                  Output, Streaming & Multimodal
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  {outputEngines.map((engine) => (
                    <div
                      key={engine.name}
                      className="rounded-lg bg-black/25 border border-white/10 px-3 py-3 flex gap-3 items-start text-xs md:text-sm"
                    >
                      <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                        <engine.icon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground text-xs md:text-sm">
                          {engine.name}
                        </p>
                        <p className="text-foreground/60 leading-snug">
                          {engine.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Outcomes */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl border border-white/10 p-6 h-full flex flex-col gap-4"
          >
            <h3 className="text-sm font-semibold text-primary uppercase tracking-wide">
              Decisions & Telemetry
            </h3>
            <div className="space-y-4 text-sm text-foreground/80">
              <div>
                <p className="font-semibold flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-amber-400" />
                  Runtime Decisions
                </p>
                <p className="text-foreground/60">
                  All protection signals are combined into one risk decision, enforcing your configured
                  <span className="text-emerald-400"> allow</span>,
                  <span className="text-amber-400"> warn</span>,
                  <span className="text-rose-400"> block</span>, or
                  <span className="text-cyan-400"> redact</span> outcome per project.
                </p>
              </div>
              <div>
                <p className="font-semibold flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-cyan-400" />
                  Providers & Tools
                </p>
                <p className="text-foreground/60">
                  Approved requests are forwarded to your configured AI provider or
                  tool endpoint, with performance metrics captured throughout.
                </p>
              </div>
              <div>
                <p className="font-semibold flex items-center gap-2">
                  <ScanLine className="w-4 h-4 text-violet-400" />
                  Alerts & SIEM Export
                </p>
                <p className="text-foreground/60">
                  Every decision is recorded in the dashboard and can be forwarded
                  to your security monitoring platform in real time.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
  );
}

/* ── Deployment Architecture tab ── */
function DeploymentArchitecture() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      <div className="grid md:grid-cols-2 gap-8">
        {/* Single-node */}
        <div className="glass rounded-2xl border border-emerald-500/20 p-6 space-y-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-foreground">Single-Node Mode</p>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wide uppercase border border-emerald-500/40 bg-emerald-500/10 text-emerald-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Zero Config
            </span>
          </div>
          <p className="text-xs text-foreground/60">Default mode — works out of the box with no additional infrastructure.</p>

          {/* SVG diagram */}
          <svg viewBox="0 0 320 110" className="w-full" aria-label="Single-node deployment diagram">
            {/* Firewall box */}
            <rect x="10" y="30" width="110" height="50" rx="10" className="fill-primary/15 stroke-primary/50" strokeWidth="1.5" />
            <text x="65" y="51" textAnchor="middle" className="fill-current text-foreground" style={{fontSize: 10, fill: "rgba(255,255,255,0.85)", fontWeight: 600}}>LaroGuard</text>
            <text x="65" y="66" textAnchor="middle" style={{fontSize: 8, fill: "rgba(255,255,255,0.45)"}}>single node</text>
            {/* Arrow */}
            <line x1="120" y1="55" x2="195" y2="55" stroke="rgba(16,185,129,0.5)" strokeWidth="1.5" strokeDasharray="4 3" />
            <polygon points="195,51 205,55 195,59" fill="rgba(16,185,129,0.6)" />
            {/* Provider box */}
            <rect x="205" y="30" width="105" height="50" rx="10" className="fill-blue-500/10 stroke-blue-500/40" strokeWidth="1.5" />
            <text x="257" y="51" textAnchor="middle" style={{fontSize: 10, fill: "rgba(255,255,255,0.85)", fontWeight: 600}}>LLM Provider</text>
            <text x="257" y="66" textAnchor="middle" style={{fontSize: 8, fill: "rgba(255,255,255,0.45)"}}>OpenAI / Anthropic…</text>
          </svg>
        </div>

        {/* Multi-node */}
        <div className="glass rounded-2xl border border-cyan-500/20 p-6 space-y-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-foreground">Multi-Node Mode</p>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wide uppercase border border-cyan-400/40 bg-cyan-400/10 text-cyan-300">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              Opt-In
            </span>
          </div>
          <p className="text-xs text-foreground/60">Distributed mode — shared state keeps all nodes consistent as you scale.</p>

          <svg viewBox="0 0 340 140" className="w-full" aria-label="Multi-node deployment diagram">
            {/* 3 replica boxes */}
            {[0, 1, 2].map((i) => (
              <g key={i}>
                <rect x="8" y={10 + i * 40} width="88" height="28" rx="7" style={{fill:"rgba(16,185,129,0.12)", stroke:"rgba(16,185,129,0.4)", strokeWidth:1.2}} />
                <text x="52" y={28 + i * 40} textAnchor="middle" style={{fontSize:8, fill:"rgba(255,255,255,0.8)", fontWeight:600}}>Firewall Replica {i + 1}</text>
                {/* line to redis */}
                <line x1="96" y1={24 + i * 40} x2="148" y2="70" stroke="rgba(34,211,238,0.35)" strokeWidth="1" strokeDasharray="3 3" />
              </g>
            ))}
            {/* Redis cylinder */}
            <ellipse cx="168" cy="60" rx="22" ry="9" style={{fill:"rgba(34,211,238,0.15)", stroke:"rgba(34,211,238,0.5)", strokeWidth:1.5}} />
            <rect x="146" y="60" width="44" height="30" style={{fill:"rgba(34,211,238,0.1)", stroke:"rgba(34,211,238,0.5)", strokeWidth:1.5}} />
            <ellipse cx="168" cy="90" rx="22" ry="9" style={{fill:"rgba(34,211,238,0.15)", stroke:"rgba(34,211,238,0.5)", strokeWidth:1.5}} />
            <text x="168" y="77" textAnchor="middle" style={{fontSize:8, fill:"rgba(34,211,238,0.9)", fontWeight:700}}>State</text>
            {/* Arrow redis to provider */}
            <line x1="192" y1="75" x2="248" y2="75" stroke="rgba(99,102,241,0.5)" strokeWidth="1.5" strokeDasharray="4 3" />
            <polygon points="248,71 258,75 248,79" fill="rgba(99,102,241,0.6)" />
            {/* Provider */}
            <rect x="258" y="57" width="76" height="36" rx="8" style={{fill:"rgba(99,102,241,0.12)", stroke:"rgba(99,102,241,0.4)", strokeWidth:1.2}} />
            <text x="296" y="73" textAnchor="middle" style={{fontSize:8, fill:"rgba(255,255,255,0.85)", fontWeight:600}}>LLM Providers</text>
            <text x="296" y="84" textAnchor="middle" style={{fontSize:7, fill:"rgba(255,255,255,0.45)"}}>all providers</text>
          </svg>
        </div>
      </div>

      {/* Activation snippet */}
      <div className="glass rounded-2xl border border-white/10 p-6 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p className="text-sm font-semibold text-foreground">Activation</p>
          <p className="text-xs text-foreground/60 italic">Enable distributed mode when you are ready to scale — no code changes required.</p>
        </div>
        <pre className="bg-black/60 border border-white/10 rounded-xl p-4 font-mono text-[12px] text-emerald-300 overflow-x-auto">
          <code>docker compose --profile distributed up -d</code>
        </pre>
        <div className="grid sm:grid-cols-3 gap-3 text-xs text-foreground/60 pt-1">
          <div className="flex gap-2 items-start">
            <Server className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
            <span>Rate-limit counters stay consistent across all nodes, preventing bypass through replica switching.</span>
          </div>
          <div className="flex gap-2 items-start">
            <Database className="w-3.5 h-3.5 text-cyan-400 mt-0.5 shrink-0" />
            <span>Conversation context is shared across nodes so multi-turn protection works regardless of which node handles each request.</span>
          </div>
          <div className="flex gap-2 items-start">
            <ArrowRight className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
            <span>Single-node deployments are unaffected — distributed mode is opt-in and requires no changes to your base setup.</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
