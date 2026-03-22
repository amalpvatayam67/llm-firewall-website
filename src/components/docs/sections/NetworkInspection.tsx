import { SlidersHorizontal } from 'lucide-react';
import { Section, P, H3, CodeBlock, Callout, DocTable, AsciiBlock } from '../DocsUI';

export function NetworkInspection() {
  return (
    <Section id="network-inspection" icon={<SlidersHorizontal size={22} />} title="Network Inspection">
      <P>
        When both the application-layer API (port 8000) and a network-layer component — the Forward
        Proxy (port 8080) or ICAP server (port 1344) — are active in the same deployment, the same
        outbound request can pass through both layers in sequence. LaroGaurd provides a bypass
        control in the dashboard to prevent this from happening.
      </P>

      <H3>The double-scan scenario</H3>
      <AsciiBlock>{`Your App
  └─▶ LaroGaurd API :8000  ──[SCAN 1]──▶ forwards to AI provider
                                              │
                              network routes outbound traffic
                                              │
                              ◀── Forward Proxy :8080 ──[SCAN 2]`}</AsciiBlock>
      <P>
        In environments where all outbound traffic is routed through the forward proxy — such as a
        Docker deployment where the container gateway directs egress through port 8080 — LaroGaurd&apos;s
        own API layer becomes a proxy client. This means outbound LLM calls are scanned once by the
        API layer and again by the proxy, doubling latency and generating duplicate log entries for
        the same request.
      </P>

      <H3>Configuring the bypass list</H3>
      <P>
        To prevent double-scanning, navigate to{' '}
        <strong className="text-white">
          Dashboard → Settings → Network Inspection → Proxy Bypass IPs
        </strong>
        . Enter the IP addresses of any hosts whose outbound traffic should skip network-layer
        inspection. Traffic from these addresses passes through the Forward Proxy and ICAP server
        transparently — it is not inspected or logged at the network layer.
      </P>
      <P>
        The loopback addresses{' '}
        <code className="bg-gray-800 text-[#00C896] text-[0.82em] font-mono px-1.5 py-0.5 rounded">127.0.0.1</code> and{' '}
        <code className="bg-gray-800 text-[#00C896] text-[0.82em] font-mono px-1.5 py-0.5 rounded">::1</code> are always included in the bypass list by default and cannot be
        removed.
      </P>
      <Callout variant="info">
        Changes to the bypass list take effect immediately. No restart of the proxy, ICAP server,
        or API is required.
      </Callout>

      <H3>Docker deployments</H3>
      <P>
        In a standard Docker deployment, the LaroGaurd API container&apos;s outbound traffic exits
        via the Docker bridge network gateway. This gateway IP is typically{' '}
        <code className="bg-gray-800 text-[#00C896] text-[0.82em] font-mono px-1.5 py-0.5 rounded">172.17.0.1</code> but may differ depending on your network configuration. To find
        the correct address, run:
      </P>
      <CodeBlock language="bash">{`docker network inspect bridge --format '{{range .IPAM.Config}}{{.Gateway}}{{end}}'`}</CodeBlock>
      <P>
        Add the output of this command to the bypass list. If you are using a custom Docker
        network, inspect that network instead.
      </P>

      <H3>Bypass list scope</H3>
      <DocTable
        headers={['Component', 'Effect of bypass']}
        rows={[
          [
            'Forward Proxy (port 8080)',
            'Connection is tunnelled transparently to the destination without content inspection or proxy log entry',
          ],
          [
            'ICAP Server (port 1344)',
            'Request is passed through immediately with a 204 No Content response — no detection rules are evaluated',
          ],
        ]}
      />
      <Callout variant="warning">
        Only add IP addresses that represent trusted internal infrastructure — such as the LaroGaurd
        API container itself or other known internal services. Do not add addresses belonging to
        external clients or unknown sources. The application-layer API (port 8000) continues to
        inspect all traffic regardless of this setting.
      </Callout>
    </Section>
  );
}
