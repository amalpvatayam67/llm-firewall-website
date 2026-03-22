import { Network } from 'lucide-react';
import { Section, P, H3, CodeBlock, Callout, DocTable } from '../DocsUI';

export function IcapIntegration() {
  return (
    <Section id="icap-integration" icon={<Network size={22} />} title="ICAP Integration">
      <P>
        LaroGaurd includes a built-in ICAP server (Internet Content Adaptation Protocol, RFC 3507)
        that allows any standards-compliant network proxy or security appliance to route traffic
        through LaroGaurd&apos;s detection pipeline without modifying application code. ICAP is the
        standard protocol used by enterprise web proxies, DLP gateways, and next-generation
        firewalls to delegate content inspection to an external service.
      </P>

      <H3>How it works</H3>
      <P>
        When ICAP mode is active, your network appliance forwards HTTP requests and responses to
        LaroGaurd over a dedicated TCP connection. LaroGaurd inspects the content, applies your
        configured policies and detection rules, and returns either a pass-through signal or a
        modified response. The originating connection is held open by the appliance until LaroGaurd
        replies — the process is transparent to end users.
      </P>

      <H3>Supported ICAP methods</H3>
      <DocTable
        headers={['Method', 'Direction', 'What LaroGaurd inspects']}
        rows={[
          ['REQMOD', 'Client → Origin', 'Outbound prompts, tool calls, and request payloads sent to AI providers'],
          ['RESPMOD', 'Origin → Client', 'Inbound model responses, streamed output, and retrieved RAG content'],
          ['OPTIONS', 'Appliance → LaroGaurd', 'Capability negotiation — answered automatically, no configuration required'],
        ]}
      />

      <H3>Enabling ICAP</H3>
      <P>
        ICAP mode is disabled by default. To enable it, navigate to{' '}
        <strong className="text-white">Dashboard → Settings → Security Engines</strong> and toggle{' '}
        <strong className="text-white">Enable ICAP Mode</strong> to on. The server starts
        immediately on port <strong className="text-white">1344</strong> — no restart is required.
      </P>
      <Callout variant="info">
        ICAP runs as a separate listener alongside the main API. Enabling it does not affect traffic
        flowing through the standard API endpoint on port 8000.
      </Callout>

      <H3>Pointing your appliance at LaroGaurd</H3>
      <P>
        Once enabled, configure your proxy or appliance to forward requests to LaroGaurd using the
        service URIs below. Replace <code className="bg-gray-800 text-[#00C896] text-[0.82em] font-mono px-1.5 py-0.5 rounded">&lt;laroguard-host&gt;</code> with the IP address or hostname of
        your LaroGaurd instance.
      </P>
      <CodeBlock language="text">{`REQMOD service URI:  icap://<laroguard-host>:1344/laroguard-reqmod
RESPMOD service URI: icap://<laroguard-host>:1344/laroguard-respmod`}</CodeBlock>
      <P>
        Consult your appliance&apos;s documentation for the exact configuration syntax. For Squid
        proxy, the directives are <code className="bg-gray-800 text-[#00C896] text-[0.82em] font-mono px-1.5 py-0.5 rounded">icap_service</code> and{' '}
        <code className="bg-gray-800 text-[#00C896] text-[0.82em] font-mono px-1.5 py-0.5 rounded">adaptation_access</code>. For F5 BIG-IP and similar platforms, ICAP is configured
        under the LTM policy or AFM profile.
      </P>

      <H3>Squid example</H3>
      <CodeBlock language="squid.conf">{`icap_enable on
icap_service laroguard_req reqmod_precache icap://<laroguard-host>:1344/laroguard-reqmod
icap_service laroguard_resp respmod_precache icap://<laroguard-host>:1344/laroguard-respmod
adaptation_access laroguard_req allow all
adaptation_access laroguard_resp allow all`}</CodeBlock>
      <Callout variant="warning">
        ICAP traffic between your appliance and LaroGaurd is unencrypted by default. Deploy
        LaroGaurd within your private network or use a VPN tunnel between the appliance and the
        LaroGaurd host in production environments.
      </Callout>

      <H3>Verifying the connection</H3>
      <P>
        After configuring your appliance, send a test request through the proxy. In the LaroGaurd
        dashboard, navigate to <strong className="text-white">Logs → Network Logs</strong> and
        confirm that an ICAP entry appears with the source IP of your appliance. A green{' '}
        <strong className="text-white">allow</strong> verdict on a benign request confirms the
        integration is working correctly.
      </P>
    </Section>
  );
}
