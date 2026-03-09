'use client';

import { motion } from 'framer-motion';
import { ShieldAlert, Activity, BarChart3, Terminal, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

export function DashboardPreview() {
  const [logs, setLogs] = useState<string[]>([]);
  
  useEffect(() => {
    const mockLogs = [
      "Detected SQL Injection in payload. Blocked.",
      "Tool 'execute_shell' blocked (High Risk).",
      "Semantic similarity match: DAN 12.0 Prompt.",
      "Outbound payload scanned. PII Redacted.",
      "API request routed to OpenAI GPT-4.",
      "Cache hit: Known clean prompt.",
      "RAG Detector: Poisoned document dropped."
    ];
    
    let i = 0;
    const interval = setInterval(() => {
      setLogs(prev => {
        const newLogs = [mockLogs[i % mockLogs.length], ...prev].slice(0, 5);
        return newLogs;
      });
      i++;
    }, 2500);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="dashboard" className="py-24 relative overflow-hidden bg-surface/30">
      <div className="container mx-auto px-4 md:px-6 z-10 relative">
        <div className="flex flex-col md:flex-row items-center gap-12">
          
          <div className="flex-1 space-y-6">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold"
            >
              Real-Time <br/><span className="text-primary">SOC Dashboard</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-foreground/70 text-lg text-balance"
            >
              Gain complete visibility into your LLM traffic. Monitor latency, track blocked threats, trace individual requests, and manage access rules without restarting the engine.
            </motion.p>
            
            <motion.ul 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-4 pt-4"
            >
              {[
                { icon: BarChart3, text: "Live traffic timelines & latency stats" },
                { icon: ShieldAlert, text: "Top threat categories & blocked users" },
                { icon: Terminal, text: "Step-by-step request flow visualization" }
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    <item.icon size={16} />
                  </div>
                  <span className="font-medium text-foreground/90">{item.text}</span>
                </li>
              ))}
            </motion.ul>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, rotateY: 10 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex-1 w-full max-w-2xl relative perspective-1000"
          >
            {/* Dashboard Mockup UI */}
            <div className="relative rounded-2xl border border-white/10 bg-[#111] overflow-hidden shadow-2xl shadow-primary/20 flex flex-col h-[400px]">
              {/* Header */}
              <div className="h-12 border-b border-white/5 bg-[#1a1a1a] flex items-center px-4 gap-4">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                </div>
                <div className="text-xs text-foreground/40 font-mono ml-4 flex items-center gap-2">
                  <Lock size={12} /> soc-dashboard.local
                </div>
              </div>
              
              {/* Body */}
              <div className="flex-1 p-4 flex gap-4">
                {/* Sidebar */}
                <div className="w-32 hidden sm:flex flex-col gap-2 border-r border-white/5 pr-4">
                  <div className="h-8 rounded bg-primary/20 w-full mb-4"></div>
                  <div className="h-6 rounded bg-surface w-full"></div>
                  <div className="h-6 rounded bg-surface w-4/5"></div>
                  <div className="h-6 rounded bg-surface w-full"></div>
                </div>
                
                {/* Main content */}
                <div className="flex-1 flex flex-col gap-4">
                  {/* Top stats */}
                  <div className="flex gap-4 h-24">
                    <div className="flex-1 rounded-xl bg-surface border border-white/5 p-3 flex flex-col justify-between">
                      <span className="text-xs text-foreground/50">Total Blocks</span>
                      <span className="text-2xl font-bold text-rose-400">1,204</span>
                    </div>
                    <div className="flex-1 rounded-xl bg-surface border border-white/5 p-3 flex flex-col justify-between">
                      <span className="text-xs text-foreground/50">Avg Latency</span>
                      <span className="text-2xl font-bold text-emerald-400">84ms</span>
                    </div>
                    <div className="flex-1 rounded-xl bg-surface border border-white/5 p-3 flex flex-col justify-between">
                      <span className="text-xs text-foreground/50">Active Users</span>
                      <span className="text-2xl font-bold text-cyan-400">23</span>
                    </div>
                  </div>
                  
                  {/* Activity Log */}
                  <div className="flex-1 rounded-xl bg-surface border border-white/5 p-4 flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-semibold">Live Traffic Log</span>
                      <Activity className="w-4 h-4 text-primary animate-pulse" />
                    </div>
                    <div className="flex-1 flex flex-col gap-2 overflow-hidden">
                      {logs.map((log, index) => (
                        <div key={index} className="flex gap-3 items-center p-2 rounded bg-black/40 border border-white/5 font-mono text-xs animate-in slide-in-from-top-2 fade-in">
                          <span className={cn(
                            "w-2 h-2 rounded-full",
                            log.includes("Blocked") || log.includes("Poisoned") ? "bg-rose-500" :
                            log.includes("Redacted") || log.includes("DAN") ? "bg-amber-500" :
                            "bg-emerald-500"
                          )}></span>
                          <span className={cn(
                            log.includes("Blocked") ? "text-rose-400" :
                            log.includes("Redacted") ? "text-amber-400" :
                            "text-emerald-400"
                          )}>{log}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Glow effect under the mockup */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[80%] h-20 bg-primary/20 blur-3xl rounded-full -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
