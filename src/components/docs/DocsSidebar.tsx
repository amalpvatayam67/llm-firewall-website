'use client';

import { useState } from 'react';
import { Menu, X, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export interface SidebarSection {
  label: string;
  items: { id: string; label: string }[];
}

export const SIDEBAR_SECTIONS: SidebarSection[] = [
  {
    label: 'Getting Started',
    items: [
      { id: 'what-is-laroguard', label: 'What is LaroGaurd?' },
      { id: 'how-it-works', label: 'How It Works' },
      { id: 'quick-start', label: 'Quick Start Guide' },
    ],
  },
  {
    label: 'Deployment',
    items: [
      { id: 'system-requirements', label: 'System Requirements' },
      { id: 'docker-deployment', label: 'Docker Deployment' },
      { id: 'production-checklist', label: 'Production Checklist' },
    ],
  },
  {
    label: 'Configuration',
    items: [
      { id: 'environment-setup', label: 'Environment Setup' },
      { id: 'policy-configuration', label: 'Policy Configuration' },
    ],
  },
  {
    label: 'Using LaroGaurd',
    items: [
      { id: 'connecting-your-app', label: 'Connecting Your Application' },
      { id: 'sending-requests', label: 'Sending Requests' },
      { id: 'understanding-responses', label: 'Understanding Responses' },
    ],
  },
  {
    label: 'Security Features',
    items: [
      { id: 'threat-detection', label: 'Threat Detection Layers' },
      { id: 'risk-scoring', label: 'Risk Scoring' },
      { id: 'tornado-engine', label: '6AI Tornado Engine' },
    ],
  },
  {
    label: 'Integrations',
    items: [
      { id: 'llm-providers', label: 'LLM Providers' },
      { id: 'siem-alerting', label: 'SIEM & Alerting' },
      { id: 'tool-proxy', label: 'Tool Proxy' },
    ],
  },
  {
    label: 'Dashboard Guide',
    items: [
      { id: 'navigating-dashboard', label: 'Navigating the Dashboard' },
      { id: 'projects-api-keys', label: 'Projects & API Keys' },
      { id: 'logs-analytics', label: 'Logs & Analytics' },
    ],
  },
  {
    label: 'Support',
    items: [{ id: 'getting-help', label: 'Getting Help' }],
  },
];

interface DocsSidebarProps {
  activeId: string;
}

function SidebarContent({ activeId, onLinkClick }: { activeId: string; onLinkClick?: () => void }) {
  return (
    <nav className="py-6 px-3 space-y-6">
      {SIDEBAR_SECTIONS.map((section) => (
        <div key={section.label}>
          <p className="px-3 mb-1.5 text-[11px] font-semibold uppercase tracking-widest text-gray-500 select-none">
            {section.label}
          </p>
          <ul className="space-y-0.5">
            {section.items.map((item) => {
              const isActive = activeId === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={onLinkClick}
                    className={cn(
                      'block pl-3 pr-2 py-1.5 rounded-r-md text-sm transition-all duration-150 border-l-2',
                      isActive
                        ? 'border-[#00C896] text-[#00C896] font-semibold bg-[#00C896]/5'
                        : 'border-transparent text-gray-400 hover:text-white hover:border-gray-600'
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

export function DocsSidebar({ activeId }: DocsSidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-64 shrink-0 fixed top-16 left-0 bottom-0 overflow-y-auto border-r border-white/8 bg-[#0d0d0d] z-30">
        {/* Sidebar header */}
        <div className="px-4 py-4 border-b border-white/8">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#00C896]/20 text-[#00C896]">
              <Shield size={16} />
            </div>
            <span className="font-bold text-base tracking-tight text-white">
              Laro<span className="text-[#00C896]">Gaurd</span>
            </span>
          </Link>
          <p className="mt-1 text-[11px] text-gray-500">Documentation</p>
        </div>
        <div className="flex-1 overflow-y-auto">
          <SidebarContent activeId={activeId} />
        </div>
      </aside>

      {/* Mobile FAB toggle */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed bottom-5 left-5 z-50 w-11 h-11 rounded-full bg-[#00C896] text-black flex items-center justify-center shadow-lg shadow-[#00C896]/30"
        aria-label="Open docs menu"
      >
        <Menu size={20} />
      </button>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          {/* Drawer */}
          <aside className="relative w-72 max-w-[85vw] bg-[#0d0d0d] border-r border-white/10 overflow-y-auto z-10">
            <div className="flex items-center justify-between px-4 py-4 border-b border-white/8">
              <Link href="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
                <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#00C896]/20 text-[#00C896]">
                  <Shield size={16} />
                </div>
                <span className="font-bold text-base text-white">
                  Laro<span className="text-[#00C896]">Gaurd</span>
                </span>
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>
            <SidebarContent activeId={activeId} onLinkClick={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}
    </>
  );
}
