import { Key } from 'lucide-react';
import { Section, P, H3, Steps, Callout } from '../DocsUI';

export function ProjectsApiKeys() {
  return (
    <Section id="projects-api-keys" icon={<Key size={22} />} title="Projects & API Keys">
      <P>
        Every application that talks to LaroGaurd is registered as a{' '}
        <strong className="text-white">Project</strong>. Projects provide complete isolation between
        applications — each project has its own key, policy, provider routing, and log namespace.
      </P>

      <H3>What a project contains</H3>
      <ul className="space-y-3 mt-2">
        {[
          {
            title: 'API key',
            desc: 'Used in the X-API-Key header. Uniquely identifies the project on every request.',
          },
          {
            title: 'Security policy',
            desc: 'Detection thresholds, enabled layers, and alert rules — all scoped to this project.',
          },
          {
            title: 'Provider routing',
            desc: 'Which LLM provider this project forwards requests to, and with which model defaults.',
          },
          {
            title: 'Log namespace',
            desc: 'All audit log entries are scoped to the project for clean separation between applications.',
          },
        ].map(({ title, desc }) => (
          <li key={title} className="flex flex-col gap-1">
            <span className="text-white font-semibold text-sm">{title}</span>
            <span className="text-gray-400 text-sm leading-6">{desc}</span>
          </li>
        ))}
      </ul>

      <H3>Creating a project</H3>
      <Steps
        steps={[
          { title: 'Go to Dashboard → Projects → New Project', body: null },
          { title: 'Fill in the project name and select a provider', body: null },
          {
            title: 'Save and copy the generated API key',
            body: 'Store it securely immediately — it is shown only once at creation.',
          },
        ]}
      />

      <Callout variant="warning">
        API keys are shown only once at creation. If you lose a key, you must rotate it from the
        project settings. All previously issued requests using the old key will continue to be
        visible in logs.
      </Callout>
    </Section>
  );
}
