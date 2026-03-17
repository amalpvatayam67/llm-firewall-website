import { Plug } from 'lucide-react';
import { Section, P, H3, CodeBlock, Callout } from '../DocsUI';

export function ConnectingYourApp() {
  return (
    <Section id="connecting-your-app" icon={<Plug size={22} />} title="Connecting Your Application">
      <P>
        Route your application&apos;s LLM calls through LaroGaurd instead of calling the provider
        directly. Change only one thing in your application: replace the provider URL with the
        LaroGaurd gateway URL, and add your LaroGaurd API key as the{' '}
        <code className="bg-gray-800 text-[#00C896] text-[0.82em] font-mono px-1.5 py-0.5 rounded">
          X-API-Key
        </code>{' '}
        header.
      </P>

      <H3>Python example</H3>
      <CodeBlock language="python">{`import httpx

LAROGUARD_URL = "http://<your-laroguard-host>/v1/chat/completions"

response = httpx.post(
    LAROGUARD_URL,
    headers={"X-API-Key": "<your-project-api-key>"},
    json={
        "messages": [{"role": "user", "content": user_input}],
        "provider": "openai",
        "model": "gpt-4o"
    }
)`}</CodeBlock>

      <H3>Node.js example</H3>
      <CodeBlock language="javascript">{`const response = await fetch(
  "http://<your-laroguard-host>/v1/chat/completions",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": "<your-project-api-key>"
    },
    body: JSON.stringify({
      messages: [{ role: "user", content: userInput }],
      provider: "openai",
      model: "gpt-4o"
    })
  }
);`}</CodeBlock>

      <P>
        Replace{' '}
        <code className="bg-gray-800 text-[#00C896] text-[0.82em] font-mono px-1.5 py-0.5 rounded">
          &lt;your-laroguard-host&gt;
        </code>{' '}
        with your deployment address and{' '}
        <code className="bg-gray-800 text-[#00C896] text-[0.82em] font-mono px-1.5 py-0.5 rounded">
          &lt;your-project-api-key&gt;
        </code>{' '}
        with the key generated in the dashboard.
      </P>

      <Callout variant="warning">
        Do not hardcode API keys in your application source code. Use environment variables or a
        secrets manager in your own application.
      </Callout>
    </Section>
  );
}
