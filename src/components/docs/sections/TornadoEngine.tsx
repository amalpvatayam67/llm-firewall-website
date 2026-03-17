import { Zap } from 'lucide-react';
import { Section, P, H3, CodeBlock } from '../DocsUI';

export function TornadoEngine() {
  return (
    <Section id="tornado-engine" icon={<Zap size={22} />} title="6AI Tornado Engine">
      <P>
        The 6AI Tornado engine is an optional intelligence layer that adds semantic and behavioural
        analysis on top of the base pattern-matching detectors. It is designed for production
        deployments handling sensitive data where maximum detection coverage is required.
      </P>

      <H3>What Tornado adds</H3>
      <ul className="space-y-3 mt-2">
        {[
          {
            title: 'Semantic similarity detection',
            desc: 'Catches prompt injection attempts that evade regex-based rules by using embedding-based semantic analysis to identify intent rather than matching patterns.',
          },
          {
            title: 'Behavioural profiling',
            desc: 'Detects anomalous usage patterns across a project\'s session history. Unusual sequences of requests are flagged even if each individual request appears benign.',
          },
          {
            title: 'Council-based reasoning',
            desc: 'Multiple specialised agents independently review borderline requests and vote on the final decision. The consensus result is used, reducing both false positives and false negatives on ambiguous inputs.',
          },
        ].map(({ title, desc }) => (
          <li key={title} className="flex flex-col gap-1">
            <span className="text-white font-semibold text-sm">{title}</span>
            <span className="text-gray-400 text-sm leading-6">{desc}</span>
          </li>
        ))}
      </ul>

      <H3>Starting Tornado</H3>
      <CodeBlock language="bash">{`docker compose --profile tornado up -d`}</CodeBlock>
      <P>
        Once running, enable Tornado analysis per-project in{' '}
        <strong className="text-white">Dashboard → Projects → Settings → Enable Tornado Analysis</strong>.
      </P>

      <P>
        Tornado is computationally heavier than the base engine. It is recommended for production
        deployments handling sensitive data. For development environments or low-risk deployments,
        the base engine alone is sufficient.
      </P>
    </Section>
  );
}
