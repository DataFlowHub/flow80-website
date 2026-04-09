'use client';

import Link from 'next/link';
import CodeBlock from '@/components/DevDocs/CodeBlock';


function InlineCode({ children }: { children: React.ReactNode }) {
  return <code className="inline-code">{children}</code>;
}

const BASE_URL = 'https://app.flow80.com/api/v1';

export default function AuthenticationPage() {
  return (
    <div className="doc-page">
      <div className="doc-page__header">
        <div className="doc-page__badge">Authentication</div>
        <h1 className="doc-page__title">Authentication</h1>
        <p className="doc-page__lead">
          The Flow80 API uses Bearer token authentication with API keys.
          This page covers key types, scopes, rotation, and enterprise options.
        </p>
      </div>

      {/* ── API Key Types ── */}
      <section className="doc-section">
        <h2 className="doc-section__title">API Key Types</h2>
        <p className="doc-section__body">
          Each API key has a prefix that identifies its environment:
        </p>
        <div className="key-comparison">
          {[
            {
              prefix: 'flw_live_',
              label: 'Production',
              badgeColor: '#10b981',
              desc: 'Real executions, billed usage. Use for all production integrations.',
              limits: 'Rate-limited per plan',
              scopes: 'Full API access',
            },
            {
              prefix: 'flw_test_',
              label: 'Sandbox',
              badgeColor: '#f59e0b',
              desc: 'Isolated environment. No billing. Use for development and testing.',
              limits: '10× production limits',
              scopes: 'Full API access (sandbox data only)',
            },
            {
              prefix: 'flw_dev_',
              label: 'Development',
              badgeColor: '#6366f1',
              desc: 'Internal tooling. Enhanced logging. Higher limits than test.',
              limits: 'No enforced rate limits',
              scopes: 'Full API access + debug metadata',
            },
          ].map(k => (
            <div key={k.prefix} className="key-comparison__row">
              <div className="key-comparison__left">
                <code className="key-comparison__prefix" style={{ color: k.badgeColor }}>{k.prefix}…</code>
                <strong className="key-comparison__label">{k.label}</strong>
              </div>
              <div className="key-comparison__right">
                <p className="key-comparison__desc">{k.desc}</p>
                <div className="key-comparison__meta">
                  <span className="key-comparison__meta-item">
                    <strong>Rate limits:</strong> {k.limits}
                  </span>
                  <span className="key-comparison__meta-item">
                    <strong>Scopes:</strong> {k.scopes}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Using API Keys ── */}
      <section className="doc-section">
        <h2 className="doc-section__title">Using API Keys</h2>
        <p className="doc-section__body">
          Pass your API key in every request using the{' '}
          <InlineCode>Authorization</InlineCode> header with Bearer scheme:
        </p>
        <CodeBlock
          language="http"
          code={`Authorization: Bearer flw_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`}
        />
        <p className="doc-section__body">
          API keys must never appear in URL query strings — those are logged by browsers
          and proxies. Always use request headers.
        </p>
      </section>

      {/* ── Key Scopes ── */}
      <section className="doc-section">
        <h2 className="doc-section__title">Key Scopes (Coming Soon)</h2>
        <p className="doc-section__body">
          Fine-grained scopes will allow you to create keys with limited permissions —
          for example, a key that can only trigger workflows and not read account data.
        </p>
        <div className="scopes-preview">
          {[
            ['flows:read', 'Read workflow definitions and run history.'],
            ['flows:write', 'Create, update, and delete workflows.'],
            ['flows:execute', 'Trigger workflow executions.'],
            ['webhooks:manage', 'Create and delete webhook endpoints.'],
            ['account:read', 'Read account and billing information.'],
            ['usage:read', 'Read usage statistics.'],
          ].map(([scope, desc]) => (
            <div key={scope} className="scope-row">
              <code className="scope-row__name">{scope}</code>
              <span className="scope-row__desc">{desc}</span>
              <span className="scope-row__badge">Soon</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Key Rotation ── */}
      <section className="doc-section">
        <h2 className="doc-section__title">Key Rotation</h2>
        <p className="doc-section__body">
          Rotate API keys regularly or immediately if compromised.
          Flow80 supports zero-downtime rotation:
        </p>
        <ol className="rotation-steps">
          <li>Generate a new key in <Link href="/account/settings/api-keys" className="doc-link">Settings → API Keys</Link></li>
          <li>Update your integration to use the new key</li>
          <li>Verify requests succeed with the new key</li>
          <li>Revoke the old key</li>
        </ol>
        <div className="doc-callout doc-callout--info">
          <strong>Multiple keys.</strong> You can have up to 5 active API keys simultaneously.
          Use this to rotate without downtime or to separate keys across integrations.
        </div>
      </section>

      {/* ── Security Best Practices ── */}
      <section className="doc-section">
        <h2 className="doc-section__title">Security Best Practices</h2>
        <div className="best-practices">
          {[
            ['🔒', 'Never commit API keys', 'Store keys in environment variables or a secrets manager (AWS Secrets Manager, HashiCorp Vault, etc.). Never hardcode or commit them.'],
            ['🌐', 'Use HTTPS only', 'All API requests must use HTTPS. HTTP requests are rejected with 301 redirect.'],
            ['👤', 'Least-privilege keys', 'Use the key type with the minimum permissions for each integration. Sandbox keys for testing, production keys for production.'],
            ['🔄', 'Rotate regularly', 'Rotate API keys every 90 days or immediately upon any suspicion of exposure.'],
            ['📊', 'Monitor usage', 'Check the /api/v1/usage endpoint regularly for unexpected spikes — a spike may indicate key compromise.'],
            ['🚫', 'Validate signatures', 'Always verify webhook HMAC signatures. Never trust a webhook payload without verification.'],
          ].map(([icon, title, desc]) => (
            <div key={String(title)} className="best-practice">
              <span className="best-practice__icon">{icon}</span>
              <div>
                <strong className="best-practice__title">{title}</strong>
                <p className="best-practice__desc">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Enterprise: SSO/SAML ── */}
      <section className="doc-section">
        <h2 className="doc-section__title">Enterprise: SSO / SAML 2.0</h2>
        <p className="doc-section__body">
          Enterprise accounts can enforce SSO so that API keys are tied to
          identity provider accounts. When an employee leaves, their API access
          is revoked automatically via your IdP.
        </p>
        <div className="enterprise-features">
          {[
            ['SAML 2.0', 'Works with Okta, Azure AD, Google Workspace, and any SAML 2.0-compliant IdP.'],
            ['SCIM Provisioning', 'Automatic key creation and revocation based on group membership.'],
            ['Audit Logs', 'Every API call tagged with the authenticated user identity.'],
            ['IP Allowlisting', 'Restrict API access to known IP ranges or corporate VPN exits.'],
          ].map(([title, desc]) => (
            <div key={String(title)} className="enterprise-feature">
              <strong className="enterprise-feature__title">{title}</strong>
              <p className="enterprise-feature__desc">{desc}</p>
            </div>
          ))}
        </div>
        <p className="doc-section__body">
          Contact <a href="mailto:enterprise@flow80.com" className="doc-link">enterprise@flow80.com</a> to
          discuss SSO setup for your organization.
        </p>
      </section>

      <DocFooter
        prev={{ label: 'Getting Started', href: '/developer/getting-started' }}
        next={{ label: 'API Reference', href: '/developer/api-reference' }}
      />

      <style jsx>{`
        .doc-page__header { margin-bottom: 2rem; }
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
          font-size: 0.95rem;
          color: #8b949e;
          line-height: 1.75;
          margin: 0;
        }
        .inline-code {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.85em;
          background: rgba(99,102,241,0.12);
          color: #a5b4fc;
          padding: 2px 6px;
          border-radius: 4px;
          border: 1px solid rgba(99,102,241,0.2);
        }
        .doc-link { color: #6366f1; text-decoration: underline; text-underline-offset: 2px; }
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
          font-size: 0.9rem;
          color: #8b949e;
          line-height: 1.75;
          margin: 0 0 1rem;
        }

        /* Key comparison */
        .key-comparison {
          background: #0d1117;
          border: 1px solid #21262d;
          border-radius: 10px;
          overflow: hidden;
        }
        .key-comparison__row {
          display: flex;
          gap: 1.5rem;
          padding: 1.1rem 1.25rem;
          border-bottom: 1px solid #21262d;
        }
        .key-comparison__row:last-child { border-bottom: none; }
        .key-comparison__left {
          min-width: 160px;
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }
        .key-comparison__prefix { font-size: 12px; font-family: 'JetBrains Mono', monospace; }
        .key-comparison__label { font-size: 0.9rem; font-weight: 700; color: #f0f6fc; }
        .key-comparison__desc { font-size: 0.85rem; color: #8b949e; margin: 0 0 0.5rem; line-height: 1.6; }
        .key-comparison__meta { display: flex; flex-direction: column; gap: 0.2rem; }
        .key-comparison__meta-item { font-size: 0.8rem; color: #64748b; }
        .key-comparison__meta-item strong { color: #8b949e; }

        /* Scopes preview */
        .scopes-preview {
          background: #0d1117;
          border: 1px solid #21262d;
          border-radius: 10px;
          overflow: hidden;
        }
        .scope-row {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.65rem 1.1rem;
          border-bottom: 1px solid #21262d;
          font-size: 0.85rem;
        }
        .scope-row:last-child { border-bottom: none; }
        .scope-row__name { font-family: 'JetBrains Mono', monospace; font-size: 12.5px; color: #e6edf3; min-width: 160px; }
        .scope-row__desc { color: #8b949e; flex: 1; }
        .scope-row__badge {
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #10b981;
          background: rgba(16,185,129,0.1);
          border: 1px solid rgba(16,185,129,0.2);
          padding: 2px 8px;
          border-radius: 4px;
        }

        /* Rotation steps */
        .rotation-steps {
          list-style: none;
          counter-reset: steps;
          padding: 0;
          margin: 0 0 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .rotation-steps li {
          counter-increment: steps;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.875rem;
          color: #8b949e;
          padding: 0.6rem 1rem;
          background: #161b22;
          border: 1px solid #21262d;
          border-radius: 7px;
        }
        .rotation-steps li::before {
          content: counter(steps);
          min-width: 22px;
          height: 22px;
          background: rgba(99,102,241,0.15);
          border: 1px solid rgba(99,102,241,0.3);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 700;
          color: #818cf8;
        }

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
          margin-top: 0.75rem;
        }
        .doc-callout--info {
          background: rgba(99,102,241,0.06);
          border-color: rgba(99,102,241,0.2);
          border-left-color: #6366f1;
          color: #a5b4fc;
        }

        /* Best practices */
        .best-practices { display: flex; flex-direction: column; gap: 0.75rem; }
        .best-practice {
          display: flex;
          gap: 1rem;
          align-items: flex-start;
          background: #161b22;
          border: 1px solid #21262d;
          border-radius: 10px;
          padding: 1rem 1.2rem;
        }
        .best-practice__icon { font-size: 1.2rem; flex-shrink: 0; margin-top: 1px; }
        .best-practice__title { font-size: 0.9rem; font-weight: 700; color: #f0f6fc; }
        .best-practice__desc { font-size: 0.82rem; color: #8b949e; margin: 0.2rem 0 0; line-height: 1.55; }

        /* Enterprise */
        .enterprise-features {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.75rem;
          margin-bottom: 1rem;
        }
        .enterprise-feature {
          background: rgba(99,102,241,0.05);
          border: 1px solid rgba(99,102,241,0.15);
          border-radius: 10px;
          padding: 1rem 1.2rem;
        }
        .enterprise-feature__title { font-size: 0.9rem; font-weight: 700; color: #a5b4fc; }
        .enterprise-feature__desc { font-size: 0.8rem; color: #8b949e; margin: 0.25rem 0 0; line-height: 1.55; }
        @media (max-width: 640px) { .enterprise-features { grid-template-columns: 1fr; } .key-comparison__row { flex-direction: column; } }
      `}</style>
    </div>
  );
}

function DocFooter({ prev, next }: { prev: { label: string; href: string }; next: { label: string; href: string } }) {
  return (
    <div className="doc-footer">
      <a href={prev.href} className="doc-footer__link doc-footer__link--prev">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
        {prev.label}
      </a>
      <a href={next.href} className="doc-footer__link doc-footer__link--next">
        {next.label}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
      </a>
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
