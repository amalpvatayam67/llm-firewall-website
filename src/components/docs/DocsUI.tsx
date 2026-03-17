import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

// ─── Section wrapper ──────────────────────────────────────────────────────────
export function Section({
  id,
  icon,
  title,
  children,
}: {
  id: string;
  icon: ReactNode;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-24 pb-16 border-b border-white/8 last:border-0"
    >
      <div className="flex items-center gap-3 mb-6">
        <span className="text-[#00C896]">{icon}</span>
        <h2 className="text-2xl font-bold text-white">{title}</h2>
      </div>
      <div className="space-y-4 text-gray-300 leading-relaxed">{children}</div>
    </section>
  );
}

// ─── Sub-heading ──────────────────────────────────────────────────────────────
export function H3({ children }: { children: ReactNode }) {
  return (
    <h3 className="text-lg font-semibold text-white mt-8 mb-3">{children}</h3>
  );
}

// ─── Paragraph ───────────────────────────────────────────────────────────────
export function P({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn('text-gray-300 leading-7', className)}>{children}</p>;
}

// ─── Code block ──────────────────────────────────────────────────────────────
export function CodeBlock({
  language,
  children,
}: {
  language?: string;
  children: string;
}) {
  return (
    <div className="relative my-4">
      {language && (
        <span className="absolute top-2.5 right-3 text-[10px] font-mono text-gray-500 uppercase tracking-wider">
          {language}
        </span>
      )}
      <pre className="bg-gray-950 border border-gray-700/60 rounded-lg p-4 pr-16 font-mono text-sm text-green-400 overflow-x-auto whitespace-pre leading-6">
        <code>{children.trim()}</code>
      </pre>
    </div>
  );
}

// ─── Architecture / ASCII pre block ──────────────────────────────────────────
export function AsciiBlock({ children }: { children: string }) {
  return (
    <pre className="bg-gray-950 border border-gray-700/60 rounded-lg p-5 font-mono text-sm text-[#00C896]/90 overflow-x-auto whitespace-pre leading-7 my-4">
      {children.trim()}
    </pre>
  );
}

// ─── Warning / info callout ───────────────────────────────────────────────────
export function Callout({
  variant = 'warning',
  children,
}: {
  variant?: 'warning' | 'info' | 'danger';
  children: ReactNode;
}) {
  const styles = {
    warning: 'border-yellow-500 bg-yellow-500/10 text-yellow-200',
    info: 'border-[#00C896] bg-[#00C896]/10 text-[#00C896]/90',
    danger: 'border-red-500 bg-red-500/10 text-red-200',
  };
  return (
    <div className={cn('border-l-4 p-4 rounded-r-lg my-4 text-sm leading-6', styles[variant])}>
      {children}
    </div>
  );
}

// ─── Table ───────────────────────────────────────────────────────────────────
export function DocTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: (string | ReactNode)[][];
}) {
  return (
    <div className="overflow-x-auto my-4 rounded-lg border border-gray-700/60">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-gray-900">
            {headers.map((h) => (
              <th
                key={h}
                className="text-left px-4 py-3 text-gray-300 font-semibold border-b border-gray-700/60 whitespace-nowrap"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr
              key={ri}
              className={cn(
                'border-b border-gray-800/60 last:border-0',
                ri % 2 === 0 ? 'bg-gray-950' : 'bg-[#0d0d0d]'
              )}
            >
              {row.map((cell, ci) => (
                <td key={ci} className="px-4 py-3 text-gray-300 align-top">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Checklist item ───────────────────────────────────────────────────────────
export function Checklist({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5 my-4">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
          <span className="text-[#00C896] mt-0.5 shrink-0">✅</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

// ─── Numbered step ────────────────────────────────────────────────────────────
export function Steps({ steps }: { steps: { title: string; body: ReactNode }[] }) {
  return (
    <ol className="space-y-6 my-4">
      {steps.map((step, i) => (
        <li key={i} className="flex gap-4">
          <div className="shrink-0 w-8 h-8 rounded-full bg-[#00C896]/15 border border-[#00C896]/30 text-[#00C896] font-bold text-sm flex items-center justify-center">
            {i + 1}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-white mb-1">{step.title}</p>
            <div className="text-gray-300 text-sm leading-6">{step.body}</div>
          </div>
        </li>
      ))}
    </ol>
  );
}

// ─── Inline code ─────────────────────────────────────────────────────────────
export function InlineCode({ children }: { children: ReactNode }) {
  return (
    <code className="bg-gray-800 text-[#00C896] text-[0.82em] font-mono px-1.5 py-0.5 rounded">
      {children}
    </code>
  );
}
