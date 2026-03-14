import { Shield, FileText, Code, LayoutDashboard, Settings } from 'lucide-react';
import Link from 'next/link';
import { IntegrationExamples } from '@/components/IntegrationExamples';

export default function DocsPage() {
  return (
    <div className="flex w-full min-h-screen pt-24 pb-12 bg-surface/10">
      <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row gap-8">
        
        {/* Sidebar */}
        <aside className="w-full md:w-64 shrink-0 flex flex-col gap-6 md:sticky md:top-24 h-max">
          <div>
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <FileText size={18} className="text-primary" />
              Documentation
            </h3>
            <ul className="space-y-2 text-sm text-foreground/70">
              <li><a href="#quick-start" className="hover:text-primary transition-colors block py-1">Quick Start</a></li>
              <li><a href="#docker-services" className="hover:text-primary transition-colors block py-1">Docker Services</a></li>
              <li><a href="#env-vars" className="hover:text-primary transition-colors block py-1">Environment Variables</a></li>
              <li><a href="#api-usage" className="hover:text-primary transition-colors block py-1">API Usage Examples</a></li>
              <li><a href="#integration-examples" className="hover:text-primary transition-colors block py-1">Integration Examples</a></li>
              <li><a href="#tornado" className="hover:text-primary transition-colors block py-1">6AI Tornado Config</a></li>
            </ul>
          </div>
        </aside>
        
        {/* Main Content */}
        <article className="flex-1 space-y-12 max-w-4xl text-foreground/80 leading-relaxed font-sans">
          
          <div className="pb-8 border-b border-white/10">
            <h1 className="text-4xl font-bold text-foreground mb-4">Developer & Deployment Docs</h1>
            <p className="text-lg">Everything you need to deploy, configure, and integrate the LLM Firewall into your GenAI applications.</p>
          </div>
          
          <section id="quick-start" className="scroll-mt-24">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Shield className="text-primary" /> Quick Start
            </h2>
            <div className="glass p-6 rounded-xl border border-white/5 space-y-4">
              <p><strong>Prerequisites:</strong> Docker, Docker Compose, Git</p>
              
              <h3 className="font-semibold text-foreground mt-4">Step 1 — Clone and start:</h3>
              <pre className="bg-black/50 p-4 rounded-lg font-mono text-sm overflow-x-auto border border-white/10 text-emerald-300">
                <code>
git clone &lt;repo-url&gt;{'\n'}
cd llm-firewall{'\n'}
docker compose up -d
                </code>
              </pre>

              <h3 className="font-semibold text-foreground mt-4">Step 2 — Access:</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Dashboard UI:</strong> <Link href="http://localhost:3000" className="text-primary hover:underline">http://localhost:3000</Link></li>
                <li><strong>API Server:</strong> <Link href="http://localhost:8000" className="text-primary hover:underline">http://localhost:8000</Link></li>
                <li><strong>API Docs (Swagger):</strong> <Link href="http://localhost:8000/docs" className="text-primary hover:underline">http://localhost:8000/docs</Link></li>
                <li><strong>Default login:</strong> <code>admin / admin</code></li>
              </ul>

              <h3 className="font-semibold text-foreground mt-4">Step 3 — (Optional) Start 6AI Tornado:</h3>
              <pre className="bg-black/50 p-4 rounded-lg font-mono text-sm overflow-x-auto border border-white/10 text-emerald-300">
                <code>docker compose --profile tornado up -d</code>
              </pre>
            </div>
          </section>

          <section id="docker-services" className="scroll-mt-24">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <LayoutDashboard className="text-primary" /> Docker Services
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="border-b border-white/20 text-foreground/90">
                    <th className="py-3 px-4">Service</th>
                    <th className="py-3 px-4">Container</th>
                    <th className="py-3 px-4">Port</th>
                    <th className="py-3 px-4">Volume Mount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 align-top">
                  <tr>
                    <td className="py-3 px-4 font-mono text-emerald-400">firewall-api</td>
                    <td className="py-3 px-4">llm-firewall-app</td>
                    <td className="py-3 px-4">8000</td>
                    <td className="py-3 px-4">Source code <code>(./:/app)</code> with --reload</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-mono text-emerald-400">postgres</td>
                    <td className="py-3 px-4">llm-firewall-db</td>
                    <td className="py-3 px-4">5432</td>
                    <td className="py-3 px-4">Named volume <code>(postgres_data)</code></td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-mono text-emerald-400">dashboard-ui</td>
                    <td className="py-3 px-4">llm-firewall-dashboard-ui</td>
                    <td className="py-3 px-4">3000</td>
                    <td className="py-3 px-4">None (built into image)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-mono text-emerald-400">tornado</td>
                    <td className="py-3 px-4">6ai-tornado</td>
                    <td className="py-3 px-4">8100</td>
                    <td className="py-3 px-4">Named volume <code>(tornado_data)</code></td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-mono text-cyan-400">redis</td>
                    <td className="py-3 px-4">llm-firewall-redis</td>
                    <td className="py-3 px-4">6379</td>
                    <td className="py-3 px-4">
                      Optional. Start with{" "}
                      <code className="text-cyan-300">--profile distributed</code>. Only needed for
                      multi-node deployments.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section id="env-vars" className="scroll-mt-24">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Settings className="text-primary" /> Environment Variables
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="border-b border-white/20 text-foreground/90">
                    <th className="py-3 px-4">Variable</th>
                    <th className="py-3 px-4">Default</th>
                    <th className="py-3 px-4">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 font-mono text-xs">
                  <tr><td className="py-2 px-4 text-emerald-400">DATABASE_URL</td><td className="py-2 px-4">postgresql://...</td><td className="py-2 px-4 font-sans">PostgreSQL connection string</td></tr>
                  <tr><td className="py-2 px-4 text-emerald-400">JWT_SECRET_KEY</td><td className="py-2 px-4">change-this...</td><td className="py-2 px-4 font-sans">JWT signing secret</td></tr>
                  <tr><td className="py-2 px-4 text-emerald-400">DEFAULT_ADMIN_USERNAME</td><td className="py-2 px-4">admin</td><td className="py-2 px-4 font-sans">Bootstrap admin username</td></tr>
                  <tr><td className="py-2 px-4 text-emerald-400">OPENAI_API_KEY</td><td className="py-2 px-4">(none)</td><td className="py-2 px-4 font-sans">OpenAI API key</td></tr>
                  <tr><td className="py-2 px-4 text-emerald-400">ENABLE_TOOL_PROXY</td><td className="py-2 px-4">false</td><td className="py-2 px-4 font-sans">Enable Tool Proxy subsystem</td></tr>
                  <tr><td className="py-2 px-4 text-emerald-400">ENABLE_RAG_DETECTOR</td><td className="py-2 px-4">true</td><td className="py-2 px-4 font-sans">Enable RAG poisoning detection</td></tr>
                  <tr><td className="py-2 px-4 text-cyan-400">STATE_BACKEND</td><td className="py-2 px-4">memory</td><td className="py-2 px-4 font-sans">Set to <code className="text-cyan-300">redis</code> to enable distributed state across replicas</td></tr>
                  <tr><td className="py-2 px-4 text-cyan-400">REDIS_URL</td><td className="py-2 px-4 text-foreground/60">redis://localhost:6379/0</td><td className="py-2 px-4 font-sans">Redis connection URL (only used when <code className="text-cyan-300">STATE_BACKEND=redis</code>)</td></tr>
                  <tr><td className="py-2 px-4 text-cyan-400">SECURITY_EXECUTOR_MAX_WORKERS</td><td className="py-2 px-4">16</td><td className="py-2 px-4 font-sans">Thread pool size for CPU-bound security scanning work</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          <section id="integration-examples" className="scroll-mt-24">
            <IntegrationExamples />
          </section>
          
          <section id="api-usage" className="scroll-mt-24">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Code className="text-primary" /> API Usage Examples
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Send a chat through the firewall:</h3>
                <pre className="bg-black/50 p-4 rounded-lg font-mono text-sm overflow-x-auto border border-white/10 text-pink-300">
                  <code>
{`curl -X POST http://localhost:8000/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "X-API-Key: <your-api-key>" \\
  -d '{
    "messages": [{"role": "user", "content": "Hello, how are you?"}],
    "provider": "openai",
    "model": "gpt-4"
  }'`}
                  </code>
                </pre>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">Send a tool invocation through Tool Proxy:</h3>
                <pre className="bg-black/50 p-4 rounded-lg font-mono text-sm overflow-x-auto border border-white/10 text-cyan-300">
                  <code>
{`curl -X POST http://localhost:8000/v1/tool-proxy/run \\
  -H "Content-Type: application/json" \\
  -H "X-API-Key: <your-api-key>" \\
  -d '{
    "tool": "execute_shell_command",
    "arguments": {"command": "ls -la /tmp"},
    "origin_prompt": "List files in temp directory"
  }'`}
                  </code>
                </pre>
              </div>
            </div>
          </section>

        </article>
      </div>
    </div>
  );
}
