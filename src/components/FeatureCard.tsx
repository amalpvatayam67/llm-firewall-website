'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ElementType } from 'react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: ElementType;
  color: string;
  delay?: number;
  badge?: string;
}

export function FeatureCard({ title, description, icon: Icon, color, delay = 0, badge }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5 }}
      className="group relative p-6 rounded-2xl glass border border-white/5 overflow-hidden shadow-lg transition-all hover:shadow-primary/10 hover:border-primary/30"
    >
      <div className={cn(
        "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none",
        color
      )} />
      
      <div className={cn(
        "w-12 h-12 rounded-lg flex items-center justify-center mb-6 bg-gradient-to-br shadow-inner transition-transform duration-300 group-hover:scale-110",
        color
      )}>
        <Icon className="w-6 h-6 text-white" />
      </div>

      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
          {title}
        </h3>
        {badge && (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide uppercase border border-teal-400/40 bg-teal-400/10 text-teal-300">
            {badge}
          </span>
        )}
      </div>
      
      <p className="text-sm text-foreground/60 leading-relaxed font-medium">
        {description}
      </p>
    </motion.div>
  );
}
