import { Globe } from 'lucide-react';
import { Section, P, H3, CodeBlock, Callout } from '../DocsUI';

export function ForwardProxy() {
  return (
    <Section id="forward-proxy" icon={<Globe size={22} />} title="Forward Proxy">
      <P>
        LaroGaurd includes a built-in transparent forward proxy that intercepts outbound HTTP and
        HTTPS traffic at the network level. Unlike the application-layer API endpoint, the forward
        proxy requires no code changes — you redirect traffic to it by configuring your operating
        system, container runtime, or network gateway. Every request passing through is inspected
        against your active policies before it reaches its destination.
      </P>

      <H3>When to use the forward proxy</H3>
      <P>
        The forward proxy is suited for environments where you cannot or do not want to modify the
        applications making AI requests. Common use cases include: routing traffic from third-party
        tools and agents that call AI providers directly, enforcing AI security policy across an
        entire server or container without touching application code, and adding inspection coverage
        to legacy systems that pre-date LaroGaurd&apos;s API layer.
      </P>

      <H3>Enabling the forward proxy</H3>
      <P>
        The forward proxy is disabled by default. Enable it in{' '}
        <strong className="text-white">Dashboard → Settings → Security Engines</strong> by toggling{' '}
        <strong className="text-white">Enable Forward Proxy</strong> to on. Once enabled, the proxy
        listens on port <strong className="text-white">8080</strong>. No restart is required.
      </P>

      <H3>Pointing traffic at the proxy</H3>
      <P>
        To route traffic through LaroGaurd, configure the standard{' '}
        <code className="bg-gray-800 text-[#00C896] text-[0.82em] font-mono px-1.5 py-0.5 rounded">HTTP_PROXY</code> and{' '}
        <code className="bg-gray-800 text-[#00C896] text-[0.82em] font-mono px-1.5 py-0.5 rounded">HTTPS_PROXY</code> environment variables in your application or shell
        environment. Replace{' '}
        <code className="bg-gray-800 text-[#00C896] text-[0.82em] font-mono px-1.5 py-0.5 rounded">&lt;laroguard-host&gt;</code> with the IP address or hostname of your LaroGaurd
        instance.
      </P>
      <CodeBlock language="bash">{`export HTTP_PROXY=http://<laroguard-host>:8080
export HTTPS_PROXY=http://<laroguard-host>:8080`}</CodeBlock>
      <P>
        For Docker containers, pass these as environment variables in your{' '}
        <code className="bg-gray-800 text-[#00C896] text-[0.82em] font-mono px-1.5 py-0.5 rounded">docker-compose.yml</code> or container definition. For system-wide routing on
        Linux, set them in{' '}
        <code className="bg-gray-800 text-[#00C896] text-[0.82em] font-mono px-1.5 py-0.5 rounded">/etc/environment</code> or your shell profile.
      </P>

      <H3>HTTPS inspection</H3>
      <P>
        For HTTPS traffic, LaroGaurd uses a CONNECT tunnel. When TLS interception is enabled,
        LaroGaurd performs a man-in-the-middle inspection using a locally-issued certificate — this
        requires you to install LaroGaurd&apos;s CA certificate as a trusted root in your
        environment. When TLS interception is not configured, HTTPS connections are forwarded as
        opaque tunnels without content inspection.
      </P>
      <Callout variant="info">
        TLS interception is optional. If your deployment does not require HTTPS content inspection,
        the proxy still provides full inspection coverage for plain HTTP traffic and connection
        metadata logging for all tunnelled connections.
      </Callout>

      <H3>Configuring TLS interception (optional)</H3>
      <P>
        To enable TLS interception, navigate to{' '}
        <strong className="text-white">
          Dashboard → Settings → Security Engines → Forward Proxy TLS Certificate Directory
        </strong>{' '}
        and provide the path to a directory containing your CA certificate and private key.
        LaroGaurd will use these to issue leaf certificates on-the-fly for inspected connections.
        Distribute the CA certificate to any clients that will use the proxy — most tools and
        operating systems have a trusted root store where it can be installed.
      </P>

      <H3>Viewing proxy logs</H3>
      <P>
        All connections handled by the forward proxy — whether inspected or tunnelled — are recorded
        in <strong className="text-white">Dashboard → Logs → Proxy Logs</strong>. Each entry shows
        the client IP, destination host, HTTP method, verdict, risk score, and latency. Blocked
        connections are highlighted and include the detection rule that triggered the block.
      </P>
      <Callout variant="warning">
        If your LaroGaurd API layer (port 8000) sends outbound requests to AI providers, and your
        network routes all traffic through the forward proxy, those outbound requests will be
        intercepted by the proxy as well. See <strong>Network Inspection</strong> in the
        Configuration section for how to prevent this.
      </Callout>
    </Section>
  );
}
