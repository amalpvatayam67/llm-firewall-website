import { LayoutDashboard } from 'lucide-react';
import { Section, P, DocTable } from '../DocsUI';

export function NavigatingDashboard() {
  return (
    <Section id="navigating-dashboard" icon={<LayoutDashboard size={22} />} title="Navigating the Dashboard">
      <P>
        The LaroGaurd dashboard is your control plane for all security operations, configuration,
        and monitoring. Every feature of LaroGaurd is accessible from the dashboard — no CLI or
        config file editing required after initial setup.
      </P>

      <DocTable
        headers={['Section', 'Purpose']}
        rows={[
          ['Overview', 'Real-time traffic summary, risk trends, and recent decisions'],
          [
            'Projects',
            'Create and manage isolated API key namespaces, each with their own policy',
          ],
          [
            'Logs',
            'Full audit trail of every request — searchable, filterable, and exportable',
          ],
          [
            'Alerts',
            'Triggered alert history and notification channel management',
          ],
          ['SIEM Export', 'Configure forwarding destinations for security events'],
          [
            'Tool Proxy',
            'Manage tool invocation policies and review invocation logs',
          ],
          [
            'Red Team',
            'Built-in adversarial prompt testing against your live project policy',
          ],
          ['Settings', 'System configuration, environment review, and user management'],
        ]}
      />
    </Section>
  );
}
