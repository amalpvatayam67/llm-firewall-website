'use client';

import { motion } from 'framer-motion';
import { SecurityPipeline } from './SecurityPipeline';
import { PixelAgents } from './PixelAgents';
import { ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import Link from 'next/link';

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center pt-24 pb-12 overflow-hidden">
      {/* Background Pixel Agents (behind everything) */}
      <PixelAgents />

      {/* Background decorations */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -z-10 mix-blend-screen opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-secondary/20 rounded-full blur-[150px] -z-10 mix-blend-screen opacity-50 pointer-events-none" />
      
      <div className="container relative mx-auto px-4 md:px-6 z-10 pointer-events-none">
        <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto pointer-events-auto">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium"
          >
            <ShieldCheck size={16} />
            <span>The Ultimate Generative AI Firewall</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight text-balance leading-tight"
          >
            Secure Your AI from <br className="hidden md:block" />
            <span className="text-gradient bg-gradient-to-r from-primary via-emerald-400 to-cyan-400">
              Prompt to Output
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-foreground/70 max-w-2xl text-balance"
          >
            A runtime security proxy that inspects, redacts, and enforces policy across every LLM request, tool call, and streamed response — before threats reach your infrastructure.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 pt-4"
          >
            <Link 
              href="#get-started"
              className="inline-flex h-12 items-center justify-center rounded-lg bg-primary px-8 text-sm font-medium text-background shadow-lg shadow-primary/25 transition-all hover:bg-primary-dark hover:scale-105"
            >
              Start Protecting Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link 
              href="/#architecture"
              className="inline-flex h-12 items-center justify-center rounded-lg glass border-white/10 px-8 text-sm font-medium text-foreground transition-all hover:bg-white/5"
            >
              <Zap className="mr-2 h-4 w-4 text-emerald-400" />
              View Architecture
            </Link>
          </motion.div>
        </div>

        <motion.div 
          id="architecture"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-20 w-full scroll-mt-24"
        >
          <div className="text-center mb-6">
            <h3 className="text-sm font-semibold tracking-wider text-foreground/50 uppercase">
              Multi-Layer Detection Pipeline
            </h3>
          </div>
          <SecurityPipeline />
        </motion.div>
      </div>
    </section>
  );
}
