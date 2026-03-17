import { Shield } from 'lucide-react';
import { Section, P, DocTable } from '../DocsUI';

export function ThreatDetection() {
  return (
    <Section id="threat-detection" icon={<Shield size={22} />} title="Threat Detection Layers">
      <P>
        LaroGaurd runs multiple detection layers in parallel on every request. They do not run
        sequentially — all layers execute simultaneously, and the highest risk score across all
        layers determines the final decision.
      </P>

      <DocTable
        headers={['Layer', 'What It Detects']}
        rows={[
          [
            'Prompt Injection Scanner',
            'Attempts to override system prompts or hijack instruction context',
          ],
          [
            'Jailbreak Detector',
            'Patterns designed to bypass safety guidelines and content policies',
          ],
          [
            'PII Guard',
            'Personally identifiable information in both prompts and responses',
          ],
          [
            'RAG Poisoning Detector',
            'Malicious content injected via retrieval-augmented generation context',
          ],
          [
            'Image Injection Scanner',
            'Hostile payloads embedded in multimodal (vision) inputs',
          ],
          [
            'Data Exfiltration Monitor',
            'Responses attempting to leak sensitive or confidential data',
          ],
          [
            'OWASP LLM Top-10 Mapper',
            'Maps detected threats to the OWASP LLM Application Security risk categories',
          ],
        ]}
      />

      <P>
        Each layer can be independently enabled or disabled per project in your policy settings.
        Disabling a layer reduces computational overhead but removes that coverage — use with care
        in production.
      </P>
    </Section>
  );
}
