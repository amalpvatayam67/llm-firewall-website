import { Shield } from 'lucide-react';
import { Section, P, AsciiBlock, H3 } from '../DocsUI';

export function WhatIsLaroGuard() {
  return (
    <Section id="what-is-laroguard" icon={<Shield size={22} />} title="What is LaroGaurd?">
      <P>
        LaroGaurd is an AI security gateway that sits transparently between your application and your
        LLM providers. Instead of calling OpenAI, Anthropic, or any other provider directly, your
        application routes all prompts through LaroGaurd — which inspects, scores, and decides on
        each request before it is ever forwarded.
      </P>
      <P>
        Every prompt and every response passes through multiple independent detection layers in
        real time. Each layer runs simultaneously, analysing for prompt injection attempts,
        jailbreak patterns, PII leakage, RAG-context poisoning, data exfiltration attempts, and more.
        The highest risk signal across all layers determines the composite risk score for the request.
      </P>
      <P>
        LaroGaurd is provider-agnostic. It supports OpenAI, Anthropic, Mistral, Groq, Together AI,
        and any provider that exposes an OpenAI-compatible{' '}
        <code className="bg-gray-800 text-[#00C896] text-[0.82em] font-mono px-1.5 py-0.5 rounded">
          /v1/chat/completions
        </code>{' '}
        endpoint. You configure which provider each project routes to inside the dashboard — switching
        providers requires no code changes in your application.
      </P>
      <P>
        LaroGaurd is deployed entirely within your own infrastructure. Your prompts, responses, and
        audit logs never leave your environment and are never sent to any external LaroGaurd service.
        The product ships as a self-contained stack you run on your own hardware or cloud account.
      </P>

      <H3>Architecture Overview</H3>
      <AsciiBlock>{`
Your App  →  LaroGaurd Gateway  →  LLM Provider
                    │
          Security Engine (multi-layer)
                    │
          Risk Score + Decision (ALLOW / WARN / BLOCK)
                    │
          Logs + Alerts + SIEM Export
`}</AsciiBlock>
    </Section>
  );
}
