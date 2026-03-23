"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const FRAMEWORKS = [
  { name: "GDPR",        initial: 19, color: "text-blue-400",   dotColor: "bg-blue-400"   },
  { name: "HIPAA",       initial: 22, color: "text-emerald-400", dotColor: "bg-emerald-400" },
  { name: "PCI DSS",     initial: 14, color: "text-yellow-400",  dotColor: "bg-yellow-400"  },
  { name: "NIST 800-53", initial: 31, color: "text-violet-400",  dotColor: "bg-violet-400"  },
  { name: "SOC 2",       initial: 18, color: "text-rose-400",    dotColor: "bg-rose-400"    },
] as const;

const SUPPORTING_POINTS = [
  "Automated enforcement across GDPR, HIPAA, PCI DSS, NIST 800-53, and SOC 2",
  "Per-request audit trail with masked fields and violation classification",
  "Configurable enforcement mode per framework: Monitor, Mask, or Block",
  "Evidence-ready event log for audit and legal review",
  "No manual tagging. No post-processing. Enforcement happens inline.",
];

function formatUTC(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())} UTC`;
}

function CompliancePanel() {
  const [counts, setCounts] = useState<number[]>(FRAMEWORKS.map((f) => f.initial));
  const [timestamp, setTimestamp] = useState<string>(() => formatUTC(new Date()));
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const nextTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Live clock — every second
  useEffect(() => {
    tickRef.current = setInterval(() => {
      setTimestamp(formatUTC(new Date()));
    }, 1000);
    return () => {
      if (tickRef.current) clearInterval(tickRef.current);
    };
  }, []);

  // Increment a random framework counter every 4–6 seconds
  useEffect(() => {
    function scheduleNext() {
      const delay = 4000 + Math.floor(Math.random() * 2000);
      nextTimeoutRef.current = setTimeout(() => {
        const idx = Math.floor(Math.random() * FRAMEWORKS.length);
        setCounts((prev) => prev.map((c, i) => (i === idx ? c + 1 : c)));
        scheduleNext();
      }, delay);
    }
    scheduleNext();
    return () => {
      if (nextTimeoutRef.current) clearTimeout(nextTimeoutRef.current);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay: 0.15 }}
      className="glass rounded-2xl border border-white/10 overflow-hidden shadow-xl"
    >
      {/* Panel header */}
      <div className="px-5 py-4 border-b border-white/8 flex items-center gap-2.5">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
        </span>
        <p className="text-sm font-semibold text-foreground tracking-tight">
          Active Framework Enforcement
        </p>
      </div>

      {/* Framework rows */}
      <div className="divide-y divide-white/5">
        {FRAMEWORKS.map((fw, i) => (
          <div
            key={fw.name}
            className="flex items-center justify-between px-5 py-3.5 gap-4"
          >
            <div className="flex items-center gap-3 min-w-0">
              {/* Pulsing dot */}
              <span className="relative flex h-2 w-2 shrink-0">
                <span
                  className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-50 ${fw.dotColor}`}
                />
                <span
                  className={`relative inline-flex rounded-full h-2 w-2 ${fw.dotColor}`}
                />
              </span>
              <span className={`text-sm font-semibold tracking-tight ${fw.color}`}>
                {fw.name}
              </span>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              {/* Status badge */}
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide uppercase border border-emerald-400/30 bg-emerald-400/10 text-emerald-300">
                Enforcing
              </span>
              {/* Live counter */}
              <span className="font-mono text-xs text-foreground/50 w-20 text-right tabular-nums">
                {counts[i].toLocaleString()} today
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-white/8 space-y-1.5 bg-black/20">
        <p className="font-mono text-[11px] text-foreground/40 tabular-nums">
          Last evaluated:{" "}
          <span className="text-emerald-400/80">{timestamp}</span>
        </p>
        <p className="text-[11px] text-foreground/30 leading-relaxed">
          All evaluations occur synchronously within the request lifecycle.
        </p>
      </div>
    </motion.div>
  );
}

export function ComplianceSection() {
  return (
    <section
      id="compliance"
      className="py-24 relative overflow-hidden"
      aria-labelledby="compliance-heading"
    >
      {/* Subtle background gradient accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-950/30 via-transparent to-violet-950/20"
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── Left: Messaging ─────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55 }}
            className="space-y-7"
          >
            <div className="space-y-4">
              <h2
                id="compliance-heading"
                className="text-3xl md:text-5xl font-bold leading-tight"
              >
                Compliance Built In,{" "}
                <span className="text-primary">Not Bolted On</span>
              </h2>
              <p className="text-foreground/70 text-lg leading-relaxed">
                Every request through LaroGuard is evaluated against active
                regulatory frameworks in real time — before it reaches your model,
                and again before it leaves.
              </p>
            </div>

            {/* Supporting points */}
            <ul className="space-y-3.5">
              {SUPPORTING_POINTS.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-foreground/80 text-sm leading-relaxed">
                    {point}
                  </span>
                </li>
              ))}
            </ul>

            {/* Trust line */}
            <p className="text-foreground/35 text-xs leading-relaxed border-t border-white/8 pt-4">
              Frameworks are applied independently. A single request may trigger
              multiple frameworks simultaneously.
            </p>
          </motion.div>

          {/* ── Right: Live panel ────────────────────────────────────────── */}
          <CompliancePanel />
        </div>
      </div>
    </section>
  );
}
