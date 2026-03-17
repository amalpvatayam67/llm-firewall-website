import { Settings } from 'lucide-react';
import { Section, P, Callout, H3 } from '../DocsUI';

export function EnvironmentSetup() {
  return (
    <Section id="environment-setup" icon={<Settings size={22} />} title="Environment Setup">
      <P>
        Your deployment is configured entirely through environment variables defined in your{' '}
        <code className="bg-gray-800 text-[#00C896] text-[0.82em] font-mono px-1.5 py-0.5 rounded">
          .env
        </code>{' '}
        file. A commented{' '}
        <code className="bg-gray-800 text-[#00C896] text-[0.82em] font-mono px-1.5 py-0.5 rounded">
          .env.example
        </code>{' '}
        file is included in the repository — copy it, read the comments carefully, and fill in your
        own values.
      </P>
      <P>
        After you log in to the LaroGaurd dashboard for the first time, navigate to{' '}
        <strong className="text-white">Settings → Environment</strong> to review which variables are
        active in your running instance.
      </P>

      <H3>Required variables</H3>
      <P>Required variables cover: database connection, JWT signing, admin bootstrap credentials, and at least one LLM provider key.</P>

      <H3>Optional variables</H3>
      <P>Optional variables cover: Redis connection, SIEM export, rate limiting, ML feature flags, and tool proxy settings.</P>

      <Callout variant="warning">
        <strong>Security note:</strong> Never share your{' '}
        <code className="text-yellow-300 font-mono text-xs">.env</code> file. Never paste environment
        variable values into support tickets, GitHub issues, or chat. If a secret is exposed, rotate
        it immediately via the dashboard or by restarting the stack with a new value.
      </Callout>
    </Section>
  );
}
