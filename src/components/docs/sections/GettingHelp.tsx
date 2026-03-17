import { HelpCircle } from 'lucide-react';
import { Section, P, H3, Callout } from '../DocsUI';

export function GettingHelp() {
  return (
    <Section id="getting-help" icon={<HelpCircle size={22} />} title="Getting Help">
      <P>
        Use the appropriate channel based on the nature of your issue. This helps you get the
        fastest resolution and keeps sensitive information out of public forums.
      </P>

      <H3>By issue type</H3>
      <ul className="space-y-4 mt-2">
        {[
          {
            title: 'Setup issues',
            desc: (
              <>
                Check the production checklist and Docker health status first (
                <code className="bg-gray-800 text-[#00C896] text-[0.82em] font-mono px-1.5 py-0.5 rounded">
                  docker compose ps
                </code>
                ). Most setup issues are caused by missing environment variables or unhealthy
                containers.
              </>
            ),
          },
          {
            title: 'Policy tuning',
            desc: 'Use the Red Team tab in the dashboard to test your policy with adversarial prompts before changing thresholds on a live project.',
          },
          {
            title: 'Security incidents',
            desc: 'Rotate your API keys immediately via Dashboard → Projects, then contact support with the incident details. Do not paste API keys or log content into public channels.',
          },
          {
            title: 'Enterprise support',
            desc: 'Contact your account manager directly, or reach out through the website contact form for escalated or SLA-covered support.',
          },
        ].map(({ title, desc }) => (
          <li key={title} className="flex flex-col gap-1.5 pb-4 border-b border-white/5 last:border-0">
            <span className="text-white font-semibold text-sm">{title}</span>
            <span className="text-gray-400 text-sm leading-6">{desc}</span>
          </li>
        ))}
      </ul>

      <Callout variant="danger">
        Do not paste logs, <code className="text-red-300 font-mono text-xs">.env</code> files, or
        API keys into public support channels, GitHub issues, or community forums. If a secret is
        exposed, rotate it immediately.
      </Callout>
    </Section>
  );
}
