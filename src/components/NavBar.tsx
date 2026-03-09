'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={cn(
      'fixed inset-x-0 top-0 w-full z-50 transition-colors duration-300 border-b',
      scrolled 
        ? 'bg-background/95 supports-[backdrop-filter]:bg-background/80 backdrop-blur-md border-white/10 shadow-lg' 
        : 'bg-background/0 border-transparent'
    )}>
      <div className="container mx-auto px-4 md:px-6 h-16 sm:h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <motion.div
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/20 text-primary"
          >
            <Shield size={20} className="group-hover:text-primary-dark transition-colors" />
          </motion.div>
          <span className="font-bold text-lg tracking-tight">LLM<span className="text-primary">Firewall</span></span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-foreground/80">
          <Link href="/#features" className="hover:text-primary transition-colors">Features</Link>
          <Link href="/#architecture" className="hover:text-primary transition-colors">Pipeline</Link>
          <Link href="/#dashboard" className="hover:text-primary transition-colors">Dashboard</Link>
          <Link href="/docs" className="hover:text-primary transition-colors">Docs</Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link 
            href="/docs"
            className="hidden md:inline-flex h-9 items-center justify-center rounded-md bg-surface px-4 py-2 text-sm font-medium text-primary shadow transition-colors hover:bg-surface-hover border border-primary/20"
          >
            Documentation
          </Link>
          <Link 
            href="/#get-started"
            className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-background shadow transition-colors hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}
