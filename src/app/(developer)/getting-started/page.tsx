import type { Metadata } from 'next';
import Link from 'next/link';
import CodeBlock from '@/components/DevDocs/CodeBlock';

export const metadata: Metadata = {
  title: 'Getting Started',
  description: 'Get up and running with the Flow80 API in minutes. Learn your API keys, authentication, and base URL.',
};

const BASE_URL = 'https://app.flow80.com/api/v1';

export default function GettingStartedPage() {
  return (
    <div className="doc-page">
      {/* Page header */}
      <div className="doc-page__header">
        <div className="doc-page__badge">Getting Started</div>
        <h1 className="doc-page__title">Introduction</h1>
        <p className="doc-page__lead">
          Flow80&apos;s API lets you trigger workflows, receive real-time events via webhooks,
          and manage your entire automation stack programmatically — no UI required.
        </p>
      </div>

      {/* Quick nav */}
      <div className="quick-nav">
        <a href="#prerequisites" className="quick-nav__link">Prerequisites</a>
        <a href="#your-api-key" className="quick-nav__link">Your API Key</a>
        <a href="#base-url" className="quick-nav__link">Base URL</a>
        <a href="#first-request" className="quick-nav__link">First Request</a>
        <a href="#next-steps" className="quick-nav__link">Next Steps</a>
      </div>

      {/* ── Prerequisites ── */}
      <section id="prerequisites" className="doc-section">
        <h2 className="doc-section__title">Prerequisites</h2>
        <p className="doc-section__body">
          Before making API calls you need:
        </p>
        <ul className="doc-list">
          <li>A Flow80 account — <a href="https://app.flow80.com/register" className="doc-link">sign up free</a></li>
          <li>At least one workflow created in your account</li>
          <li>An API key from <Link href="/account/settings/api-keys" className="doc-link">Settings → API Keys</Link></li>
        </ul>
      </section>

      {/* ── Your API Key ── */}
      <section id="your-api-key" className="doc-section">
        <h2 className="doc-section__title">Your API Key</h2>
        <p className="doc-section__body">
          API keys are found in{' '}
          <Link href="/account/settings/api-keys" className="doc-link">Settings → API Keys</Link>.
          Each key has a prefix indicating its environment:
        </p>
        <div className="key-type-grid">
          {[
            { prefix: 'flw_live_', label: 'Production', desc: 'Real executions, billed usage. Rate-limited per plan.', color: '#10b981' },
            { prefix: 'flw_test_', label: 'Sandbox', desc: 'Isolated environment. No billing, generous limits.', color: '#f59e0b' },
            { prefix: 'flw_dev_', label: 'Development', desc: 'Extra logging, higher limits. For internal tooling.', color: '#6366f1' },
          ].map(k => (
            <div key={k.prefix} className="key-type-card">
              <code className="key-type-card__prefix" style={{ color: k.color }}>{k.prefix}…</code>
              <strong className="key-type-card__label">{k.label}</strong>
              <p className="key-type-card__desc">{k.desc}</p>
            </div>
          ))}
        </div>
        <div className="doc-callout doc-callout--warn">
          <strong>Keep your keys secret.</strong> Never commit API keys to source control or expose them client-side.
          If a key is compromised, rotate it immediately from Settings.
        </div>
      </section>

      {/* ── Base URL ── */}
      <section id="base-url" className="doc-section">
        <h2 className="doc-section__title">Base URL</h2>
        <p className="doc-section__body">All API endpoints use this base URL:</p>
        <div className="base-url-row">
          <code className="base-url-row__val">{BASE_URL}</code>
        </div>
        <p className="doc-section__body" style={{ marginTop: '0.75rem' }}>
          Sandbox requests use the same base URL — just swap in your{' '}
          <InlineCode>flw_test_…</InlineCode> key.
        </p>
      </section>

      {/* ── First Request ── */}
      <section id="first-request" className="doc-section">
        <h2 className="doc-section__title">Your First Request</h2>
        <p className="doc-section__body">
          Verify your credentials by fetching your account info:
        </p>
        <CodeBlock
          language="cURL"
          code={`curl -X GET "${BASE_URL}/account" \\
  -H "Authorization: Bearer flw_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" \\
  -H "Content-Type: application/json"`}
        />
        <p className="doc-section__body">
          A successful response returns HTTP <InlineCode>200</InlineCode> with your account details:
        </p>
        <CodeBlock
          language="json"
          code={`{
  "id":           "acc_xxxxxxxxxxxxxxxx",
  "email":        "jane@acme.com",
  "plan":         "starter",
  "status":       "active",
  "created_at":   "2026-01-15T09:23:11Z",
  "environment":  "sandbox"
}`}
        />
      </section>

      {/* ── Next Steps ── */}
      <section id="next-steps" className="doc-section">
        <h2 className="doc-section__title">Next Steps</h2>
        <p className="doc-section__body">Now that you&apos;re authenticated, explore the docs:</p>
        <div className="next-steps-grid">
          <NextStepCard
            href="/developer/authentication"
            icon="🔑"
            title="Authentication"
            desc="Deep dive into API key management, scopes, and enterprise SSO."
          />
          <NextStepCard
            href="/developer/api-reference"
            icon="⚡"
            title="API Reference"
            desc="Full endpoint documentation with live examples in PHP, Python, Node, and more."
          />
          <NextStepCard
            href="/developer/webhooks"
            icon="🔔"
            title="Webhooks"
            desc="Receive real-time events from your workflows via outbound webhooks."
          />
          <NextStepCard
            href="/developer/code-examples"
            icon="📦"
            title="Code Examples"
            desc="Complete, copy-paste-ready integration snippets for common use cases."
          />
        </div>
      </section>

      <DocFooter
        prev={{ label: null }}
        next={{ label: 'Authentication', href: '/developer/authentication' }}
      />

      <style jsx>{`
        .doc-page__header { margin-bottom: 2.5rem; }
        .doc-page__badge {
          display: inline-block;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #6366f1;
          background: rgba(99,102,241,0.12);
          border: 1px solid rgba(99,102,241,0.25);
          padding: 3px 10px;
          border-radius: 5px;
          margin-bottom: 1rem;
        }
        .doc-page__title {
          font-size: 2.2rem;
          font-weight: 700;
          color: #f0f6fc;
          margin: 0 0 0.75rem;
          letter-spacing: -0.025em;
        }
        .doc-page__lead {
          font-size: 1.05rem;
          color: #8b949e;
          line-height: 1.75;
          margin: 0;
          max-width: 640px;
        }

        /* Quick nav */
        .quick-nav {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 2.5rem;
          padding: 1rem 1.25rem;
          background: #161b22;
          border: 1px solid #21262d;
          border-radius: 10px;
        }
        .quick-nav__link {
          font-size: 13px;
          font-weight: 500;
          color: #8b949e;
          text-decoration: none;
          padding: 4px 12px;
          border-radius: 5px;
          border: 1px solid transparent;
          transition: all 0.12s;
        }
        .quick-nav__link:hover { color: #e6edf3; background: rgba(255,255,255,0.06); border-color: #30363d; }

        /* Sections */
        .doc-section { margin-bottom: 3rem; }
        .doc-section__title {
          font-size: 1.35rem;
          font-weight: 700;
          color: #f0f6fc;
          margin: 0 0 0.85rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid #21262d;
        }
        .doc-section__body {
          font-size: 0.95rem;
          color: #8b949e;
          line-height: 1.75;
          margin: 0 0 1rem;
        }

        /* Inline code */
        .inline-code {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.85em;
          background: rgba(99,102,241,0.12);
          color: #a5b4fc;
          padding: 2px 6px;
          border-radius: 4px;
          border: 1px solid rgba(99,102,241,0.2);
        }

        /* Doc list */
        .doc-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          font-size: 0.9rem;
          color: #8b949e;
          padding: 0;
          margin: 0 0 1rem;
        }
        .doc-list li { padding-left: 1.25rem; position: relative; }
        .doc-list li::before {
          content: '→';
          position: absolute;
          left: 0;
          color: #6366f1;
          font-size: 0.8em;
          top: 2px;
        }
        .doc-link { color: #6366f1; text-decoration: underline; text-underline-offset: 2px; }
        .doc-link:hover { color: #818cf8; }

        /* Key type grid */
        .key-type-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.75rem;
          margin-bottom: 1rem;
        }
        .key-type-card {
          background: #0d1117;
          border: 1px solid #21262d;
          border-radius: 10px;
          padding: 1rem 1.1rem;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }
        .key-type-card__prefix { font-size: 11.5px; font-family: 'JetBrains Mono', monospace; }
        .key-type-card__label { font-size: 0.9rem; font-weight: 700; color: #f0f6fc; }
        .key-type-card__desc { font-size: 0.8rem; color: #8b949e; line-height: 1.5; }

        /* Callout */
        .doc-callout {
          background: rgba(99,102,241,0.06);
          border: 1px solid rgba(99,102,241,0.2);
          border-left: 3px solid #6366f1;
          border-radius: 8px;
          padding: 0.85rem 1.1rem;
          font-size: 0.875rem;
          color: #a5b4fc;
          line-height: 1.6;
          margin-top: 1rem;
        }
        .doc-callout--warn {
          background: rgba(245,158,11,0.06);
          border-color: rgba(245,158,11,0.25);
          border-left-color: #f59e0b;
          color: #fcd34d;
        }

        /* Base URL row */
        .base-url-row {
          background: #161b22;
          border: 1px solid #21262d;
          border-radius: 8px;
          padding: 0.75rem 1rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .base-url-row__val {
          font-family: 'JetBrains Mono', monospace;
          font-size: 13.5px;
          color: #e6edf3;
        }

        /* Next steps */
        .next-steps-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.75rem;
        }
        .next-step-card {
          background: #161b22;
          border: 1px solid #21262d;
          border-radius: 10px;
          padding: 1.1rem;
          text-decoration: none;
          transition: border-color 0.15s, background 0.15s;
          display: block;
        }
        .next-step-card:hover { border-color: #6366f1; background: rgba(99,102,241,0.04); }
        .next-step-card__icon { font-size: 1.4rem; margin-bottom: 0.6rem; }
        .next-step-card__title { font-size: 0.95rem; font-weight: 700; color: #f0f6fc; margin: 0 0 0.3rem; }
        .next-step-card__desc { font-size: 0.8rem; color: #8b949e; line-height: 1.55; margin: 0; }

        @media (max-width: 640px) {
          .key-type-grid { grid-template-columns: 1fr; }
          .next-steps-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}

// ── Inline code helper ──────────────────────────────────────────────────────
function InlineCode({ children }: { children: React.ReactNode }) {
  return <code className="inline-code">{children}</code>;
}

// ── Next step card ──────────────────────────────────────────────────────────
function NextStepCard({ href, icon, title, desc }: {
  href: string; icon: string; title: string; desc: string;
}) {
  return (
    <a href={href} className="next-step-card">
      <div className="next-step-card__icon">{icon}</div>
      <p className="next-step-card__title">{title}</p>
      <p className="next-step-card__desc">{desc}</p>
    </a>
  );
}

// ── Page navigation footer ───────────────────────────────────────────────────
function DocFooter({ prev, next }: { prev: { label: string | null; href?: string } | null; next: { label: string; href: string } | null }) {
  return (
    <div className="doc-footer">
      {prev?.label ? (
        <a href={prev.href} className="doc-footer__link doc-footer__link--prev">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
          {prev.label}
        </a>
      ) : <span />}
      {next?.label && (
        <a href={next.href} className="doc-footer__link doc-footer__link--next">
          {next.label}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
        </a>
      )}
      <style jsx>{`
        .doc-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 3.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid #21262d;
        }
        .doc-footer__link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.875rem;
          font-weight: 600;
          color: #8b949e;
          text-decoration: none;
          padding: 7px 14px;
          border-radius: 7px;
          border: 1px solid #21262d;
          background: #161b22;
          transition: all 0.15s;
        }
        .doc-footer__link:hover { color: #e6edf3; border-color: #6366f1; background: rgba(99,102,241,0.08); }
        .doc-footer__link--next { margin-left: auto; }
      `}</style>
    </div>
  );
}
