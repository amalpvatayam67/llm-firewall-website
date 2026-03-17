import { FileText } from 'lucide-react';
import { Section, P, H3 } from '../DocsUI';

export function LogsAnalytics() {
  return (
    <Section id="logs-analytics" icon={<FileText size={22} />} title="Logs & Analytics">
      <P>
        Every request processed by LaroGaurd is logged with full context. The log is immutable and
        scoped per project.
      </P>

      <H3>What is logged per request</H3>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 mb-4">
        {[
          'Timestamp',
          'Project',
          'Risk score and decision (ALLOW / WARN / BLOCK)',
          'Triggered threat categories',
          'Request ID (for correlation with your application logs)',
          'Prompt and response content (if retention is enabled)',
        ].map((item) => (
          <li
            key={item}
            className="flex items-center gap-2 text-sm text-gray-300 bg-gray-900 border border-gray-700/50 rounded-lg px-3 py-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00C896] shrink-0" />
            {item}
          </li>
        ))}
      </ul>

      <P>
        The Logs view supports full-text search, date range filtering, severity filtering, and
        project filtering. Logs can be exported as CSV or forwarded continuously to your SIEM.
      </P>

      <H3>Analytics</H3>
      <P>The Analytics tab on the Overview page shows:</P>
      <ul className="space-y-1.5 mt-2 text-sm text-gray-300 ml-1">
        <li>• Request volume over time</li>
        <li>• Decision distribution — ALLOW / WARN / BLOCK ratio</li>
        <li>• Top threat categories detected across all projects</li>
        <li>• Risk score distribution histogram</li>
      </ul>

      <P className="mt-4">
        Retention of prompt and response content is controlled per-project in your policy settings.
        Disabling retention still logs the risk score, decision, and metadata for every request —
        only the raw content is excluded.
      </P>
    </Section>
  );
}
