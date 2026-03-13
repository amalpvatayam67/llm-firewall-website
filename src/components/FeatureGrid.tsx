'use client';

import { motion } from 'framer-motion';
import { Shield, Server, Box, Fingerprint, Activity, Key, Database, Bell, BringToFront, Flame, Settings, Lock, ShieldCheck, PlayCircle, GitMerge } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FeatureCard } from './FeatureCard';

const features = [
  {
    title: "LLM Firewall Core",
    description: "10-layer detection pipeline including Rule Engine, Prompt Attack Scanner, Semantic Detector, AI Classifier, Output Scanner, Streaming Output Scanner, Multimodal Scanner, RAG Detector, Tool Guard, and Risk Aggregator.",
    icon: Shield,
    color: "from-emerald-400 to-primary",
    delay: 0.1
  },
  {
    title: "Context Resolver",
    description: "Automatically reconstructs conversation context to detect multi-turn prompt injection and jailbreak attempts. Uses a lightweight in-memory session cache to analyze recent messages without storing sensitive conversation data.",
    icon: GitMerge,
    color: "from-teal-400 to-cyan-600",
    delay: 0.2
  },
  {
    title: "HTTP Tool Proxy",
    description: "Intercept, analyze, and block dangerous LLM tool invocations before they execute on your infrastructure.",
    icon: WrenchIcon,
    color: "from-orange-400 to-orange-600",
    delay: 0.2
  },
  {
    title: "Multi-Provider Gateway",
    description: "Unified OpenAI-compatible API gateway routing to OpenAI, Anthropic, Gemini, OpenRouter, Ollama, and Azure.",
    icon: Server,
    color: "from-blue-400 to-indigo-500",
    delay: 0.3
  },
  {
    title: "RAG Poisoning Detector",
    description: "Scan documents retrieved from vector DBs before they hit the LLM. Detects embedded prompt injections.",
    icon: Fingerprint,
    color: "from-rose-400 to-red-500",
    delay: 0.4
  },
  {
    title: "Real-Time SOC Dashboard",
    description: "React/TypeScript UI with live traffic timelines, latency stats, and threat distribution charts.",
    icon: Activity,
    color: "from-cyan-400 to-blue-500",
    delay: 0.1
  },
  {
    title: "Project & Key Rules",
    description: "Multi-tenant project isolation. Generate API keys per project and track precise traffic analytics.",
    icon: Key,
    color: "from-violet-400 to-purple-600",
    delay: 0.2
  },
  {
    title: "Regex & Semantic Rules",
    description: "CRUD interface for rules and curated prompt attack datasets with JSON import/export.",
    icon: Database,
    color: "from-fuchsia-400 to-pink-500",
    delay: 0.3
  },
  {
    title: "Alert Engine",
    description: "Real-time notifications via Email, Slack, and Webhooks when critical threats are detected.",
    icon: Bell,
    color: "from-yellow-400 to-amber-500",
    delay: 0.4
  },
  {
    title: "SIEM Integration",
    description: "Async export of firewall events to Webhooks, Syslog, and Splunk HEC automatically.",
    icon: BringToFront,
    color: "from-teal-400 to-emerald-500",
    delay: 0.1
  },
  {
    title: "6AI Tornado Utility",
    description: "AI-assisted rule authoring engine built into the dashboard. Proposes rules, explains decisions, and verifies prompts using a multi-model council — without replacing the firewall's deterministic runtime.",
    icon: Flame,
    color: "from-red-400 to-orange-500",
    delay: 0.2
  },
  {
    title: "Live Configuration",
    description: "Update thresholds, active proxies, and providers via UI without restarting the system.",
    icon: Settings,
    color: "from-gray-400 to-slate-500",
    delay: 0.3
  },
  {
    title: "Request Visualizer",
    description: "Trace specific requests layer-by-layer to see exactly why it was flagged or allowed.",
    icon: PlayCircle,
    color: "from-indigo-400 to-cyan-500",
    delay: 0.4
  },
  {
    title: "Streaming Output Scanner",
    description: "Sliding-window streaming redaction that inspects LLM output token-by-token without buffering the full response. Sensitive patterns are redacted inline as the stream flows.",
    icon: Activity,
    color: "from-cyan-400 to-emerald-500",
    delay: 0.1
  },
  {
    title: "Multimodal Scanner",
    description: "Extensible scanner for images and files submitted alongside prompts. Detects embedded text via OCR, EXIF metadata anomalies, and QR-encoded payloads.",
    icon: Box,
    color: "from-purple-400 to-fuchsia-500",
    delay: 0.2
  },
  {
    title: "Red Team Simulator",
    description: "Built-in prompt battery tester. Run curated attack suites against the detection pipeline with no provider cost — measure bypass rates and fine-tune rules before going to production.",
    icon: TargetIcon,
    color: "from-rose-400 to-amber-500",
    delay: 0.3
  }
];

// Helper icon component since Wrench isn't imported from lucide above directly
function WrenchIcon(props: any) {
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

function TargetIcon(props: any) {
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

export function FeatureGrid() {
  return (
    <section id="features" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 z-10 relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-6"
          >
            Comprehensive <span className="text-primary">Protection</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-foreground/70 text-lg"
          >
            End-to-end security designed natively for Generative AI applications. Everything you need to deploy LLMs to production with confidence.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <FeatureCard key={idx} {...feature} />
          ))}
        </div>
      </div>
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl bg-primary/5 rounded-full blur-[100px] pointer-events-none -z-10" />
    </section>
  );
}
