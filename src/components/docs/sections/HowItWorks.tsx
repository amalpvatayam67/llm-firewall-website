import { Zap } from 'lucide-react';
import { Section, P, Steps } from '../DocsUI';

export function HowItWorks() {
  return (
    <Section id="how-it-works" icon={<Zap size={22} />} title="How It Works">
      <P>
        LaroGaurd sits inline on every LLM request your application makes. The flow from your
        application to the LLM provider passes through five sequential stages, all completing
        within a single synchronous request lifecycle.
      </P>
      <Steps
        steps={[
          {
            title: 'Intercept',
            body: 'Every outbound LLM request from your application is routed through LaroGaurd. Your application calls the LaroGaurd endpoint instead of the provider directly — the request shape is identical to the provider\'s native API.',
          },
          {
            title: 'Inspect',
            body: 'The multi-layer security engine runs prompt injection detection, PII scanning, RAG poisoning detection, and jailbreak analysis simultaneously. All detection layers execute in parallel — there is no sequential bottleneck.',
          },
          {
            title: 'Score',
            body: 'A composite risk score from 0 to 100 is computed from the combined signals of all detection layers. The highest-severity signal across all layers determines the final score. You configure block and warn thresholds per project in your policy settings.',
          },
          {
            title: 'Decide',
            body: 'Based on your project\'s policy, the request is ALLOWED (forwarded to the LLM provider), flagged with a WARNING (forwarded but logged with elevated severity), or BLOCKED (rejected before it ever reaches the provider). Blocked requests never leave your LaroGaurd instance.',
          },
          {
            title: 'Log & Alert',
            body: 'Every decision — allowed, warned, or blocked — is stored with full context in the audit log. Alert rules fire immediately for critical events. All decisions can be exported continuously to your SIEM in real time via webhook, syslog, or Splunk HEC.',
          },
        ]}
      />
    </Section>
  );
}
