import { Server } from 'lucide-react';
import { Section, P, DocTable } from '../DocsUI';

export function SystemRequirements() {
  return (
    <Section id="system-requirements" icon={<Server size={22} />} title="System Requirements">
      <DocTable
        headers={['Component', 'Minimum', 'Recommended']}
        rows={[
          ['CPU', '2 vCPU', '4+ vCPU'],
          ['RAM', '2 GB', '8 GB'],
          ['Disk', '10 GB', '40 GB SSD'],
          ['Docker', '24.x', 'Latest stable'],
          ['Docker Compose', 'v2.x', 'Latest stable'],
          ['OS', 'Linux / macOS', 'Ubuntu 22.04 LTS'],
          ['Network', 'Outbound HTTPS', 'Outbound HTTPS'],
        ]}
      />
      <P>
        For production deployments with the full ML feature set — semantic similarity detection and
        embedding-based analysis — allocate at least 8 GB RAM and 4 vCPU. The optional 6AI Tornado
        engine is computationally heavier than the base engine and benefits significantly from
        additional CPU headroom.
      </P>
    </Section>
  );
}
