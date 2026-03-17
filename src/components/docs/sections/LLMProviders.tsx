import { Globe } from 'lucide-react';
import { Section, P, H3, Steps } from '../DocsUI';

export function LLMProviders() {
  return (
    <Section id="llm-providers" icon={<Globe size={22} />} title="LLM Providers">
      <P>
        LaroGaurd supports all major LLM providers. Provider API keys are stored encrypted at rest
        and are never returned in API responses or log entries.
      </P>

      <H3>Supported providers</H3>
      <div className="flex flex-wrap gap-2 mt-2 mb-4">
        {['OpenAI', 'Anthropic', 'Mistral', 'Groq', 'Together AI', 'Custom (OpenAI-compatible)'].map(
          (p) => (
            <span
              key={p}
              className="px-3 py-1 rounded-full text-xs font-medium bg-[#00C896]/10 text-[#00C896] border border-[#00C896]/20"
            >
              {p}
            </span>
          )
        )}
      </div>
      <P>
        Any provider that exposes an OpenAI-compatible{' '}
        <code className="bg-gray-800 text-[#00C896] text-[0.82em] font-mono px-1.5 py-0.5 rounded">
          /v1/chat/completions
        </code>{' '}
        endpoint can be added as a custom provider.
      </P>

      <H3>Adding a provider</H3>
      <Steps
        steps={[
          { title: 'Go to Dashboard → Providers', body: null },
          { title: 'Click Add Provider', body: null },
          {
            title: 'Select provider type and enter your API key',
            body: 'The key is encrypted at rest immediately on save.',
          },
        ]}
      />
      <P>
        You can configure multiple providers and route different projects to different providers.
        Switching a project&apos;s provider requires no code changes in your application.
      </P>
    </Section>
  );
}
