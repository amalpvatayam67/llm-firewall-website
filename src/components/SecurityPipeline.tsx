'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Fingerprint, Brain, Wrench, ShieldCheck, ArrowRight, Server, CheckCircle, Database, GitMerge } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

const pipelineStages = [
  { id: 'gateway', name: 'API Gateway', icon: Server, color: 'text-indigo-400', bg: 'bg-indigo-400/20' },
  { id: 'context', name: 'Context Resolver', icon: GitMerge, color: 'text-teal-400', bg: 'bg-teal-400/20' },
  { id: 'rule', name: 'Rule Engine', icon: ShieldAlert, color: 'text-rose-400', bg: 'bg-rose-400/20' },
  { id: 'attack', name: 'Attack Scanner', icon: Fingerprint, color: 'text-amber-400', bg: 'bg-amber-400/20' },
  { id: 'semantic', name: 'Semantic Detector', icon: Brain, color: 'text-violet-400', bg: 'bg-violet-400/20' },
  { id: 'classifier', name: 'AI Classifier', icon: Brain, color: 'text-cyan-400', bg: 'bg-cyan-400/20' },
  { id: 'tool', name: 'Tool Guard', icon: Wrench, color: 'text-orange-400', bg: 'bg-orange-400/20' },
  { id: 'aggregator', name: 'Risk Aggregator', icon: ShieldCheck, color: 'text-emerald-400', bg: 'bg-emerald-400/20' },
  { id: 'provider', name: 'LLM Provider', icon: Database, color: 'text-blue-400', bg: 'bg-blue-400/20' },
  { id: 'output', name: 'Output Scanner', icon: CheckCircle, color: 'text-emerald-500', bg: 'bg-emerald-500/20' },
  { id: 'pii', name: 'PII Guard', icon: EyeShieldIcon, color: 'text-teal-300', bg: 'bg-teal-400/20' }
];

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

export function SecurityPipeline() {
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % pipelineStages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto py-12">
      <div className="relative glass rounded-2xl p-8 overflow-hidden border border-white/10 shadow-2xl shadow-primary/5">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-50"></div>
        
        <div className="relative z-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {pipelineStages.map((stage, index) => {
            const isActive = index === activeStage;
            const isPast = index < activeStage;
            const Icon = stage.icon;

            const tooltips: Record<string, string> = {
              gateway: 'Normalizes and routes incoming requests',
              context: 'Reconstructs multi-turn context to catch chained jailbreaks',
              rule: 'Regex & pattern-based threat rules',
              attack: 'Curated prompt attack dataset matching',
              semantic: 'Embedding similarity against known bad prompts',
              classifier: 'LLM-based nuanced policy classifier',
              tool: 'Intercepts and scores LLM tool invocations',
              aggregator: 'Combines engine scores into a single risk posture',
              provider: 'Forwards safe traffic to configured LLM providers',
              output: 'Post-response scan for secrets and unsafe content',
              pii: 'Bidirectional PII enforcement — detect, mask, or block sensitive data in both inputs and outputs',
            };

            return (
              <div key={stage.id} className="relative flex flex-col items-center" title={tooltips[stage.id]}>
                <motion.div
                  animate={{
                    scale: isActive ? 1.1 : 1,
                    boxShadow: isActive ? '0 0 20px rgba(16, 185, 129, 0.4)' : 'none',
                    borderColor: isActive ? 'rgba(16, 185, 129, 0.5)' : 'rgba(255, 255, 255, 0.1)',
                  }}
                  className={cn(
                    "w-16 h-16 rounded-xl flex items-center justify-center border transition-colors duration-500",
                    isActive ? stage.bg : isPast ? "bg-surface border-white/10" : "bg-surface/50 border-white/5",
                    isActive || isPast ? "opacity-100" : "opacity-40"
                  )}
                >
                  <Icon className={cn("w-8 h-8", isActive ? stage.color : isPast ? "text-foreground/80" : "text-foreground/30")} />
                </motion.div>
                
                <span className={cn(
                  "mt-3 text-xs font-medium text-center transition-colors duration-300",
                  isActive ? "text-primary" : "text-foreground/60"
                )}>
                  {stage.name}
                </span>

                {/* Arrow to next item */}
                {index < pipelineStages.length - 1 && (
                  <div className="absolute top-8 left-full w-full -translate-y-1/2 -ml-3 hidden lg:block z-0 pointer-events-none">
                    <motion.div 
                      className="h-0.5 bg-gradient-to-r from-primary/50 to-transparent"
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{ 
                        scaleX: isPast ? 1 : 0, 
                        opacity: isPast ? 1 : 0.2 
                      }}
                      transition={{ duration: 0.5 }}
                      style={{ transformOrigin: "left" }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        {/* Animated pulse representing data flow */}
        <motion.div 
          className="absolute top-0 bottom-0 w-32 bg-gradient-to-r from-transparent via-primary/10 to-transparent blur-xl pointer-events-none"
          animate={{
            x: ['-100%', '800%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>
    </div>
  );
}
