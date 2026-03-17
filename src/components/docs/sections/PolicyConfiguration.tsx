import { Settings } from 'lucide-react';
import { Section, P, H3 } from '../DocsUI';

export function PolicyConfiguration() {
  return (
    <Section id="policy-configuration" icon={<Settings size={22} />} title="Policy Configuration">
      <P>
        Policies in LaroGaurd define what happens when a threat is detected. Each project has its
        own independent policy, so you can have different risk tolerances for different applications
        within the same LaroGaurd instance.
      </P>

      <H3>Policy fields</H3>
      <ul className="space-y-4 mt-2">
        {[
          {
            term: 'Block threshold',
            def: 'Risk score above this value causes the request to be BLOCKED before it reaches the LLM provider. No response is returned to the caller.',
          },
          {
            term: 'Warn threshold',
            def: 'Risk score above this value causes the request to be flagged with a WARNING. The request still passes through to the provider, but the warning is logged and the X-LaroGaurd-Warning response header is set.',
          },
          {
            term: 'Enabled detectors',
            def: 'Which detection modules run for this project — prompt injection, PII, jailbreak, RAG poisoning, image injection, data exfiltration, and others. Each can be toggled independently.',
          },
          {
            term: 'Alert rules',
            def: 'Which severities and threat categories trigger real-time alerts. Alerts are delivered to your configured notification channels.',
          },
        ].map(({ term, def }) => (
          <li key={term} className="flex flex-col gap-1">
            <span className="text-white font-semibold text-sm">{term}</span>
            <span className="text-gray-400 text-sm leading-6">{def}</span>
          </li>
        ))}
      </ul>

      <P className="mt-6">
        Policies are managed per-project inside{' '}
        <strong className="text-white">Dashboard → Projects → Policy</strong>. Changes take effect
        immediately — no restart required.
      </P>
    </Section>
  );
}
