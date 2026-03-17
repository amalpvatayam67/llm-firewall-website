import { Terminal } from 'lucide-react';
import { Section, P, H3, CodeBlock } from '../DocsUI';

export function SendingRequests() {
  return (
    <Section id="sending-requests" icon={<Terminal size={22} />} title="Sending Requests">
      <P>
        LaroGaurd accepts OpenAI-compatible chat completion requests. The required fields are{' '}
        <code className="bg-gray-800 text-[#00C896] text-[0.82em] font-mono px-1.5 py-0.5 rounded">messages</code>,{' '}
        <code className="bg-gray-800 text-[#00C896] text-[0.82em] font-mono px-1.5 py-0.5 rounded">provider</code>, and{' '}
        <code className="bg-gray-800 text-[#00C896] text-[0.82em] font-mono px-1.5 py-0.5 rounded">model</code>.
      </P>

      <H3>Request shape</H3>
      <CodeBlock language="json">{`{
  "messages": [
    { "role": "system", "content": "You are a helpful assistant." },
    { "role": "user",   "content": "..." }
  ],
  "provider": "openai",
  "model": "gpt-4o",
  "stream": false
}`}</CodeBlock>

      <H3>Supported providers</H3>
      <P>
        Supported{' '}
        <code className="bg-gray-800 text-[#00C896] text-[0.82em] font-mono px-1.5 py-0.5 rounded">
          provider
        </code>{' '}
        values:{' '}
        {['openai', 'anthropic', 'mistral', 'groq', 'together'].map((p, i, arr) => (
          <span key={p}>
            <code className="bg-gray-800 text-[#00C896] text-[0.82em] font-mono px-1.5 py-0.5 rounded">
              {p}
            </code>
            {i < arr.length - 1 ? ', ' : ''}
          </span>
        ))}{' '}
        and any custom OpenAI-compatible endpoint configured in your project settings.
      </P>

      <H3>Streaming</H3>
      <P>
        Streaming (
        <code className="bg-gray-800 text-[#00C896] text-[0.82em] font-mono px-1.5 py-0.5 rounded">
          &quot;stream&quot;: true
        </code>
        ) is supported. Responses are forwarded as Server-Sent Events (SSE) in the same format the
        provider returns them. Note that BLOCK decisions on streamed requests are returned
        immediately as a non-streaming JSON error before any tokens are forwarded.
      </P>
    </Section>
  );
}
