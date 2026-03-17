import { Bell } from 'lucide-react';
import { Section, P, H3, DocTable, Callout } from '../DocsUI';

export function SiemAlerting() {
  return (
    <Section id="siem-alerting" icon={<Bell size={22} />} title="SIEM & Alerting">
      <P>
        LaroGaurd can forward security events to your SIEM or monitoring platform in real time.
        Event delivery is asynchronous and non-blocking — SIEM export never adds latency to your
        application&apos;s requests.
      </P>

      <H3>Supported destinations</H3>
      <DocTable
        headers={['Destination', 'Description']}
        rows={[
          [
            'Webhook',
            'HTTP POST to any endpoint — Zapier, n8n, custom SIEM APIs, or any HTTP receiver',
          ],
          [
            'Syslog',
            'UDP or TCP to any syslog receiver — Wazuh, rsyslog, ELK, Graylog, and others',
          ],
          [
            'Splunk HEC',
            'Native Splunk HTTP Event Collector format for direct Splunk integration',
          ],
        ]}
      />

      <P>
        Configure integrations in{' '}
        <strong className="text-white">Dashboard → SIEM Export</strong>. Multiple destinations can
        be active simultaneously.
      </P>

      <H3>Alert rules</H3>
      <P>
        Alert rules are configured per-project in{' '}
        <strong className="text-white">Dashboard → Alerts</strong>. You can trigger alerts on any
        combination of severity, decision type (ALLOW / WARN / BLOCK), and threat category.
        Notifications are delivered to your configured channels in real time.
      </P>

      <Callout variant="info">
        SIEM export and alert delivery are fully independent. You can have alerts firing to a Slack
        webhook while also exporting all events to a Splunk HEC simultaneously.
      </Callout>
    </Section>
  );
}
