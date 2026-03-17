import { Rocket } from 'lucide-react';
import { Section, P, H3, CodeBlock, Callout } from '../DocsUI';

export function QuickStart() {
  return (
    <Section id="quick-start" icon={<Rocket size={22} />} title="Quick Start Guide">
      <H3>Prerequisites</H3>
      <ul className="list-disc list-inside space-y-1.5 text-sm text-gray-300 ml-1">
        <li>Docker 24+ and Docker Compose v2</li>
        <li>Git</li>
        <li>A valid API key for at least one LLM provider (OpenAI, Anthropic, or compatible)</li>
        <li>Minimum 2 GB RAM, 2 vCPU</li>
      </ul>

      <H3>Step 1 — Clone the repository</H3>
      <CodeBlock language="bash">{`git clone <your-repo-url>
cd laroguard`}</CodeBlock>

      <H3>Step 2 — Configure your environment</H3>
      <CodeBlock language="bash">{`cp .env.example .env
# Open .env and fill in your values — see Environment Setup section`}</CodeBlock>
      <Callout variant="warning">
        Never commit your <code className="text-yellow-300 font-mono text-xs">.env</code> file.
        Add it to <code className="text-yellow-300 font-mono text-xs">.gitignore</code> before
        your first commit.
      </Callout>

      <H3>Step 3 — Start the stack</H3>
      <CodeBlock language="bash">{`docker compose up -d`}</CodeBlock>

      <H3>Step 4 — Access the dashboard</H3>
      <P>Once all containers are healthy, open your browser:</P>
      <ul className="space-y-1.5 text-sm text-gray-300 ml-1 mt-2">
        <li>
          <span className="text-white font-semibold">Dashboard:</span>{' '}
          <code className="bg-gray-800 text-[#00C896] text-[0.82em] font-mono px-1.5 py-0.5 rounded">
            http://localhost:3000
          </code>
        </li>
        <li>
          <span className="text-white font-semibold">API:</span>{' '}
          <code className="bg-gray-800 text-[#00C896] text-[0.82em] font-mono px-1.5 py-0.5 rounded">
            http://localhost:8000
          </code>
        </li>
      </ul>
      <P className="mt-3">
        Log in with the admin credentials you configured in your{' '}
        <code className="bg-gray-800 text-[#00C896] text-[0.82em] font-mono px-1.5 py-0.5 rounded">
          .env
        </code>{' '}
        file.
      </P>

      <H3>Step 5 — Create your first project</H3>
      <P>
        From the dashboard, create a new project and generate an API key. Use that key in your
        application as the{' '}
        <code className="bg-gray-800 text-[#00C896] text-[0.82em] font-mono px-1.5 py-0.5 rounded">
          X-API-Key
        </code>{' '}
        header on all requests routed through LaroGaurd.
      </P>

      <Callout variant="info">
        The optional 6AI Tornado intelligence engine can be started separately after your base setup
        is complete — see the{' '}
        <a href="#tornado-engine" className="underline text-[#00C896] hover:opacity-80">
          6AI Tornado Engine
        </a>{' '}
        section.
      </Callout>
    </Section>
  );
}
