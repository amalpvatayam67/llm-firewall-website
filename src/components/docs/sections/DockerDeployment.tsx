import { Server } from 'lucide-react';
import { Section, P, H3, CodeBlock, Callout, DocTable } from '../DocsUI';

export function DockerDeployment() {
  return (
    <Section id="docker-deployment" icon={<Server size={22} />} title="Docker Deployment">
      <P>
        LaroGaurd ships as a fully self-contained Docker Compose stack. All services start together
        with a single command. Profiles allow you to opt in to optional subsystems without modifying
        the base configuration.
      </P>

      <H3>Starting the core stack</H3>
      <CodeBlock language="bash">{`docker compose up -d`}</CodeBlock>

      <H3>Checking service health</H3>
      <CodeBlock language="bash">{`docker compose ps`}</CodeBlock>
      <P>
        All services should show <code className="bg-gray-800 text-[#00C896] text-[0.82em] font-mono px-1.5 py-0.5 rounded">healthy</code> status before you log in to the dashboard.
        If a service shows <code className="bg-gray-800 text-[#00C896] text-[0.82em] font-mono px-1.5 py-0.5 rounded">starting</code>, wait a few seconds and check again.
      </P>

      <H3>Starting with distributed state (multi-replica)</H3>
      <CodeBlock language="bash">{`STATE_BACKEND=redis docker compose --profile distributed up -d`}</CodeBlock>
      <P>
        This enables a Redis-backed state layer for horizontal scaling. Only needed when running
        multiple API replicas behind a load balancer.
      </P>

      <H3>Starting the 6AI Tornado engine</H3>
      <CodeBlock language="bash">{`docker compose --profile tornado up -d`}</CodeBlock>

      <H3>Stopping everything</H3>
      <CodeBlock language="bash">{`docker compose down`}</CodeBlock>

      <H3>Services in the stack</H3>
      <DocTable
        headers={['Service', 'Role', 'Port']}
        rows={[
          ['API Gateway', 'Core security engine and REST API', '8000'],
          ['Dashboard UI', 'Admin and monitoring interface', '3000'],
          ['Database', 'Persistent storage (PostgreSQL)', 'Internal only'],
          ['Tornado (optional)', '6AI intelligence engine', '8100'],
          ['Redis (optional)', 'Distributed state backend', 'Internal only'],
        ]}
      />
      <Callout variant="info">
        Internal-only ports are not exposed to the host. They are reachable only within the Docker
        network and are not accessible from outside the stack.
      </Callout>
    </Section>
  );
}
