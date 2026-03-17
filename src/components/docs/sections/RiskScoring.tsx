import { BarChart3 } from 'lucide-react';
import { Section, P, DocTable, Callout } from '../DocsUI';

export function RiskScoring() {
  return (
    <Section id="risk-scoring" icon={<BarChart3 size={22} />} title="Risk Scoring">
      <P>
        Every request processed by LaroGaurd receives a composite risk score from{' '}
        <strong className="text-white">0</strong> (clean) to{' '}
        <strong className="text-white">100</strong> (critical threat). The score is computed from
        the combined signals of all active detection layers — the highest-severity signal wins.
      </P>

      <DocTable
        headers={['Score Range', 'Classification', 'Default Action']}
        rows={[
          ['0 – 29', 'Low', 'ALLOW'],
          ['30 – 59', 'Medium', 'ALLOW (logged)'],
          ['60 – 79', 'High', 'WARN'],
          ['80 – 100', 'Critical', 'BLOCK'],
        ]}
      />

      <Callout variant="info">
        These thresholds are the factory defaults. You set your own thresholds per project in your
        policy settings. A financial services project might BLOCK at 60; an internal chatbot might
        WARN at 80. Threshold changes take effect immediately — no restart required.
      </Callout>

      <P>
        Use the Red Team tab in the dashboard to test your policy with known-bad prompts before
        changing thresholds in a live project. This lets you see the risk scores for adversarial
        inputs against your current policy without affecting production traffic.
      </P>
    </Section>
  );
}
