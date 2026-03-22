'use client';

import { useEffect, useRef, useState } from 'react';
import { NavBar } from '@/components/NavBar';
import { DocsSidebar, SIDEBAR_SECTIONS } from '@/components/docs/DocsSidebar';

// ── Section imports ───────────────────────────────────────────────────────────
import { WhatIsLaroGuard } from '@/components/docs/sections/WhatIsLaroGuard';
import { HowItWorks } from '@/components/docs/sections/HowItWorks';
import { QuickStart } from '@/components/docs/sections/QuickStart';
import { SystemRequirements } from '@/components/docs/sections/SystemRequirements';
import { DockerDeployment } from '@/components/docs/sections/DockerDeployment';
import { ProductionChecklist } from '@/components/docs/sections/ProductionChecklist';
import { EnvironmentSetup } from '@/components/docs/sections/EnvironmentSetup';
import { PolicyConfiguration } from '@/components/docs/sections/PolicyConfiguration';
import { NetworkInspection } from '@/components/docs/sections/NetworkInspection';
import { ConnectingYourApp } from '@/components/docs/sections/ConnectingYourApp';
import { SendingRequests } from '@/components/docs/sections/SendingRequests';
import { UnderstandingResponses } from '@/components/docs/sections/UnderstandingResponses';
import { ThreatDetection } from '@/components/docs/sections/ThreatDetection';
import { RiskScoring } from '@/components/docs/sections/RiskScoring';
import { TornadoEngine } from '@/components/docs/sections/TornadoEngine';
import { LLMProviders } from '@/components/docs/sections/LLMProviders';
import { SiemAlerting } from '@/components/docs/sections/SiemAlerting';
import { ToolProxy } from '@/components/docs/sections/ToolProxy';
import { IcapIntegration } from '@/components/docs/sections/IcapIntegration';
import { ForwardProxy } from '@/components/docs/sections/ForwardProxy';
import { NavigatingDashboard } from '@/components/docs/sections/NavigatingDashboard';
import { ProjectsApiKeys } from '@/components/docs/sections/ProjectsApiKeys';
import { LogsAnalytics } from '@/components/docs/sections/LogsAnalytics';
import { GettingHelp } from '@/components/docs/sections/GettingHelp';
import {
  SDKOverview,
  PythonSDKInstallation,
  PythonSDKQuickStart,
  PythonSDKChat,
  PythonSDKStreaming,
  PythonSDKRAG,
  PythonSDKTools,
  PythonSDKErrors,
  PythonSDKIDE,
  JSSDKInstallation,
  JSSDKQuickStart,
  JSSDKChat,
  JSSDKStreaming,
  JSSDKRAG,
  JSSDKTools,
  JSSDKErrors,
  JSSDKIde,
} from '@/components/docs/sections/SDK';

// Flat list of all section ids in document order
const ALL_SECTION_IDS = SIDEBAR_SECTIONS.flatMap((s) => s.items.map((i) => i.id));

export default function DocsPage() {
  const [activeId, setActiveId] = useState<string>(ALL_SECTION_IDS[0]);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const headings = ALL_SECTION_IDS.map((id) => document.getElementById(id)).filter(
      Boolean
    ) as HTMLElement[];

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: '-64px 0px -55% 0px',
        threshold: 0,
      }
    );

    headings.forEach((el) => observerRef.current?.observe(el));

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-foreground">
      <NavBar />

      {/* Page shell: sidebar + content, starts below navbar */}
      <div className="flex pt-16 min-h-screen">
        {/* Left sidebar — fixed, handled internally */}
        <DocsSidebar activeId={activeId} />

        {/* Main content area */}
        <main className="flex-1 md:ml-64 min-w-0">
          {/* Page header */}
          <div className="border-b border-white/8 bg-[#0d0d0d] px-6 md:px-12 py-8">
            <div className="max-w-3xl">
              <h1 className="text-3xl font-bold text-white tracking-tight">
                LaroGaurd{' '}
                <span className="text-[#00C896]">Documentation</span>
              </h1>
              <p className="mt-2 text-gray-400 text-base">
                The AI Security Layer for Modern Applications
              </p>
            </div>
          </div>

          {/* All doc sections */}
          <div className="px-6 md:px-12 py-10 max-w-3xl space-y-0">
            <WhatIsLaroGuard />
            <HowItWorks />
            <QuickStart />
            <SystemRequirements />
            <DockerDeployment />
            <ProductionChecklist />
            <EnvironmentSetup />
            <PolicyConfiguration />
            <NetworkInspection />
            <ConnectingYourApp />
            <SendingRequests />
            <UnderstandingResponses />
            <ThreatDetection />
            <RiskScoring />
            <TornadoEngine />
            <LLMProviders />
            <SiemAlerting />
            <ToolProxy />
            <IcapIntegration />
            <ForwardProxy />
            <NavigatingDashboard />
            <ProjectsApiKeys />
            <LogsAnalytics />
            <GettingHelp />
            <SDKOverview />
            <PythonSDKInstallation />
            <PythonSDKQuickStart />
            <PythonSDKChat />
            <PythonSDKStreaming />
            <PythonSDKRAG />
            <PythonSDKTools />
            <PythonSDKErrors />
            <PythonSDKIDE />
            <JSSDKInstallation />
            <JSSDKQuickStart />
            <JSSDKChat />
            <JSSDKStreaming />
            <JSSDKRAG />
            <JSSDKTools />
            <JSSDKErrors />
            <JSSDKIde />
          </div>

          {/* Footer */}
          <footer className="border-t border-white/8 px-6 md:px-12 py-8 mt-4">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} LaroGaurd. All rights reserved.
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
}
