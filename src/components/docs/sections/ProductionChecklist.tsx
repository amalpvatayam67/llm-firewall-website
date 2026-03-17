import { CheckCircle2 } from 'lucide-react';
import { Section, P, Checklist } from '../DocsUI';

export function ProductionChecklist() {
  return (
    <Section id="production-checklist" icon={<CheckCircle2 size={22} />} title="Production Checklist">
      <P>
        Before going live, verify every item in this checklist. These are the most common
        misconfigurations that weaken your security posture or risk exposing your deployment.
      </P>
      <Checklist
        items={[
          'Set a strong, unique JWT_SECRET_KEY — minimum 32 random characters',
          'Set strong admin credentials — do not use default or placeholder values',
          'Put LaroGaurd behind a reverse proxy (nginx / Caddy / Traefik) with TLS',
          'Restrict dashboard port (3000) to internal network only — never expose to the public internet',
          'Set up log rotation or external log shipping to prevent disk exhaustion',
          'Configure SIEM export if your organisation has a SIEM',
          'Test your project policies with known-bad prompts using the Red Team tab before going live',
          'Add .env to .gitignore before the first commit',
          'Back up your database before any version upgrade',
        ]}
      />
    </Section>
  );
}
