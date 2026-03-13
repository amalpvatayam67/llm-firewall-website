"use client";

import { motion } from "framer-motion";
import { ShieldAlert, Brain, Fingerprint, Wrench, ScanLine, Layers3, ArrowRight, Radar } from "lucide-react";

const promptEngines = [
  {
    name: "Rule Engine",
    description: "Regex & pattern rules for prompt injection, data exfiltration, and jailbreak variants.",
    icon: ShieldAlert,
  },
  {
    name: "Prompt Attack Scanner",
    description: "Curated prompt attack datasets and runtime rules for adversarial prompts.",
    icon: Fingerprint,
  },
  {
    name: "Semantic Detector",
    description: "Embedding-based similarity against known bad prompts and semantic risk patterns.",
    icon: Brain,
  },
  {
    name: "AI Classifier",
    description: "LLM-based classifier for nuanced prompt injection and policy violations.",
    icon: Brain,
  },
];

const outputEngines = [
  {
    name: "Output Scanner",
    description: "Post-response scan for secrets, PII, and unsafe content.",
    icon: ScanLine,
  },
  {
    name: "Streaming Output Scanner",
    description: "Sliding-window streaming redaction without buffering full responses.",
    icon: Radar,
  },
  {
    name: "Multimodal Scanner",
    description: "Extensible scanner for images and files when enabled in the backend.",
    icon: Layers3,
  },
  {
    name: "RAG Detector",
    description: "Detect poisoned or adversarial documents retrieved from vector databases.",
    icon: Fingerprint,
  },
];

export function PipelineDiagram() {
  return (
    <section className="py-24 bg-surface/40 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-12">
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
            Every request flows through a multi-layer detection stack before any LLM
            or tool is called, with rich telemetry exported to your SOC.
          </motion.p>
        </div>

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
                  <code className="text-xs bg-black/40 px-2 py-1 rounded border border-white/10">
                    /v1/chat/completions
                  </code>{" "}
                  fronting OpenAI, Anthropic, Gemini, OpenRouter, Azure, and others.
                </p>
              </div>
              <div>
                <p className="font-semibold">Tool Proxy</p>
                <p className="text-foreground/60">
                  HTTP tool invocations are intercepted, scored, and optionally blocked
                  before hitting infrastructure.
                </p>
              </div>
              <div>
                <p className="font-semibold">Testing Surfaces</p>
                <p className="text-foreground/60">
                  Red Team Simulator and Streaming Output Scanner run against the same
                  engines as production traffic.
                </p>
              </div>
            </div>

            <div className="mt-auto pt-4 text-xs text-foreground/50 flex items-center gap-2">
              <ArrowRight className="w-4 h-4 text-primary" />
              <span>Requests are normalized and enriched with metadata before analysis.</span>
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
                    Lightweight context reconstruction feeds layered engines for
                    deterministic and semantic analysis.
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
                    Reconstructs recent turns in-memory to catch multi-step prompt
                    injection and jailbreak attempts without persisting chat logs.
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
                  Combine engine scores into a single risk posture and enforce
                  <span className="text-emerald-400"> allow</span>,
                  <span className="text-amber-400"> warn</span>,
                  <span className="text-rose-400"> block</span>, or
                  <span className="text-cyan-400"> redact</span> outcomes per project.
                </p>
              </div>
              <div>
                <p className="font-semibold flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-cyan-400" />
                  Providers & Tools
                </p>
                <p className="text-foreground/60">
                  Safe traffic is forwarded to configured LLM providers and HTTP
                  tools with unified latency and risk metrics.
                </p>
              </div>
              <div>
                <p className="font-semibold flex items-center gap-2">
                  <ScanLine className="w-4 h-4 text-violet-400" />
                  Alerts & SIEM Export
                </p>
                <p className="text-foreground/60">
                  All events are logged to the SOC dashboard, alert channels, and
                  exported to Webhook, Syslog, or Splunk HEC for long-term
                  analysis.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-black/60 pointer-events-none -z-10" />
    </section>
  );
}
