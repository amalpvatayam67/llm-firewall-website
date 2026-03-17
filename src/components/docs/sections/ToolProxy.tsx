import { Wrench } from 'lucide-react';
import { Section, P, H3, Steps, Callout } from '../DocsUI';

export function ToolProxy() {
  return (
    <Section id="tool-proxy" icon={<Wrench size={22} />} title="Tool Proxy">
      <P>
        The Tool Proxy is an optional subsystem that intercepts AI agent tool calls before they
        execute. It is designed to prevent prompt-injected tool abuse — a scenario where a malicious
        prompt tricks your agent into executing a dangerous command.
      </P>

      <H3>How it works</H3>
      <P>
        When an AI agent invokes a tool — a shell command, file operation, database query, or
        external API call — the Tool Proxy intercepts the invocation before it runs:
      </P>
      <Steps
        steps={[
          {
            title: 'Inspect',
            body: 'The tool name and arguments are inspected against your configured security policies.',
          },
          {
            title: 'Score',
            body: 'The invocation is scored for risk using the same risk scoring engine as the main gateway.',
          },
          {
            title: 'Decide',
            body: 'The invocation is ALLOWED, flagged with a WARNING, or BLOCKED based on your project\'s policy thresholds. Blocked tool calls return an error to the agent without executing.',
          },
        ]}
      />

      <H3>Enabling the Tool Proxy</H3>
      <P>
        Enable the Tool Proxy per-project in{' '}
        <strong className="text-white">Dashboard → Projects → Settings</strong>.
      </P>

      <Callout variant="info">
        Tool invocation logs are separate from chat completion logs and are visible in{' '}
        <strong className="text-[#00C896]/90">Dashboard → Tool Proxy</strong>. You can review every
        intercepted invocation and see which were allowed, warned, or blocked.
      </Callout>
    </Section>
  );
}
