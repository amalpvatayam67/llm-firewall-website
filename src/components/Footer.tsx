import Link from 'next/link';
import { Shield } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-surface/50 py-12 px-4 md:px-6 mt-20">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="flex flex-col gap-4 md:col-span-2">
          <Link href="/" className="flex items-center gap-2">
            <Shield className="text-primary" size={24} />
            <span className="font-bold text-xl">LLM<span className="text-primary">Firewall</span></span>
          </Link>
          <p className="text-sm text-foreground/60 max-w-sm">
            The ultimate multi-layer security pipeline for LLM applications. Protect against prompt injection, data exfiltration, and malicious tool usage.
          </p>
        </div>
        
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-foreground">Product</h3>
          <Link href="/#features" className="text-sm text-foreground/60 hover:text-primary">Features</Link>
          <Link href="/#architecture" className="text-sm text-foreground/60 hover:text-primary">Architecture</Link>
          <Link href="/#dashboard" className="text-sm text-foreground/60 hover:text-primary">Dashboard</Link>
        </div>
        
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-foreground">Resources</h3>
          <Link href="/docs" className="text-sm text-foreground/60 hover:text-primary">Documentation</Link>
          <Link href="/docs#deployment" className="text-sm text-foreground/60 hover:text-primary">Deployment Guide</Link>
          <a href="https://github.com/your-username/laroguard" target="_blank" rel="noreferrer" className="text-sm text-foreground/60 hover:text-primary">GitHub</a>
        </div>
      </div>
      
      <div className="container mx-auto mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-foreground/50">
          © {new Date().getFullYear()} LaroGuard. All rights reserved.
        </p>
        <div className="flex gap-4">
          <Link href="#" className="text-xs text-foreground/50 hover:text-primary">Privacy Policy</Link>
          <Link href="#" className="text-xs text-foreground/50 hover:text-primary">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
