import { Eye } from 'lucide-react';
import { Section, P, H3, CodeBlock } from '../DocsUI';

export function UnderstandingResponses() {
  return (
    <Section id="understanding-responses" icon={<Eye size={22} />} title="Understanding Responses">
      <H3>ALLOWED requests</H3>
      <P>
        When a request is ALLOWED, LaroGaurd returns the provider&apos;s response transparently.
        Your application receives exactly what the provider returned — no modification, no wrapper.
        The response is indistinguishable from a direct provider call.
      </P>

      <H3>BLOCKED requests</H3>
      <P>
        When a request is BLOCKED, LaroGaurd returns a structured error response and the request
        never reaches the LLM provider:
      </P>
      <CodeBlock language="json">{`{
  "blocked": true,
  "decision": "BLOCK",
  "risk_score": 91,
  "reason": "Prompt injection pattern detected",
  "request_id": "<uuid>"
}`}</CodeBlock>

      <H3>WARNED requests</H3>
      <P>
        When a request is WARNED, the provider response passes through normally. However, LaroGaurd
        sets the{' '}
        <code className="bg-gray-800 text-[#00C896] text-[0.82em] font-mono px-1.5 py-0.5 rounded">
          X-LaroGaurd-Warning
        </code>{' '}
        response header containing the risk score and threat category. Your application can inspect
        this header and apply additional handling if needed.
      </P>

      <H3>Audit log</H3>
      <P>
        Every request — allowed, warned, or blocked — is logged with its full context and is visible
        in <strong className="text-white">Dashboard → Logs</strong>. Use the{' '}
        <code className="bg-gray-800 text-[#00C896] text-[0.82em] font-mono px-1.5 py-0.5 rounded">
          request_id
        </code>{' '}
        field to correlate LaroGaurd log entries with your own application logs.
      </P>
    </Section>
  );
}
