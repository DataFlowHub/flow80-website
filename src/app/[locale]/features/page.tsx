'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import ConceptDNav from '@/components/ConceptDNav';
import Footer from '@/components/Footer';
import { translations, locales, defaultLocale, type Locale } from '@/i18n/translations';

const INTEGRATIONS = [
  { icon: '🔌', label: 'REST API', desc: 'Connect to any HTTP API with API keys, Bearer tokens, or OAuth 2.0.' },
  { icon: '🪝', label: 'Webhooks', desc: 'Receive real-time events from any system. Instantly trigger workflows.' },
  { icon: '🗄️', label: 'Databases', desc: 'Connect to MySQL, PostgreSQL, SQL Server, or MongoDB.' },
  { icon: '📧', label: 'Email', desc: 'Send via SMTP or Microsoft Graph. Trigger on inbound emails.' },
  { icon: '📁', label: 'File Storage', desc: 'AWS S3, Google Cloud Storage, Azure Blob, or SFTP servers.' },
  { icon: '📊', label: 'Power BI & BI', desc: 'Push workflow results directly to BI datasets.' },
  { icon: '📦', label: 'WooCommerce', desc: 'Incoming orders → validate → transform → push to ERP.' },
  { icon: '🛒', label: 'Shopify', desc: 'Full order-to-fulfillment pipeline automation.' },
  { icon: '📄', label: 'PDF Processing', desc: 'Process CSV, XML, JSON, and PDF files in workflows.' },
];

const TEMPLATES = [
  { icon: '📦', label: 'Order Processing', desc: 'Incoming orders from Shopify, WooCommerce, or any API → validate → transform → push to ERP. Automate the full order-to-fulfillment pipeline.' },
  { icon: '🧾', label: 'Invoice Processing', desc: 'Receive invoices via email or webhook → extract data with transforms → export to SAP, E-conomic, or any accounting system.' },
  { icon: '🔔', label: 'Alert & Notification', desc: 'Monitor any data source and send alerts when thresholds are breached. Route via email, Slack, Teams, or SMS.' },
  { icon: '🔄', label: 'Data Synchronization', desc: 'Keep two systems in sync automatically. Run on schedule or trigger on change. Handle conflicts gracefully.' },
  { icon: '📈', label: 'Reporting Pipelines', desc: 'Combine data from multiple sources, transform it, and push to your BI tool on a schedule. Fully automated reporting.' },
  { icon: '🛡️', label: 'Compliance & Audit', desc: 'Automated audit logs for every workflow run. Export run history with full input/output data. GDPR-ready from day one.' },
];

export default function FeaturesPage() {
  const pathname = usePathname();
  const router = useRouter();

  const pathLocale = (pathname?.split('/')[1] || defaultLocale) as Locale;
  const validLocale = locales.includes(pathLocale) ? pathLocale : defaultLocale;

  const [locale, setLocale] = useState<Locale>(validLocale);
  const t = translations[locale];

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <div className="concept-d-layout">
      <ConceptDNav t={t} locale={locale} />

      <main id="main-content">
        <div className="concept-d-subpage">
          {/* Hero */}
          <div className="concept-d-subpage__hero">
            <div className="concept-d-subpage__badge">🧩 What&apos;s Inside</div>
            <h1 className="concept-d-subpage__headline">
              Everything you need to<br />
              <span style={{ color: 'var(--concept-d-accent-light)' }}>automate your operations.</span>
            </h1>
            <p className="concept-d-subpage__sub">
              Flow80 ships with every tool your ops team needs to build, run, and monitor automated workflows — without writing a single line of code.
            </p>
          </div>

          {/* Core Platform */}
          <div className="concept-d-subpage__section">
            <div className="concept-d-features-section-label">Core Platform</div>
            <h2 className="concept-d-subpage__section-title" style={{ fontSize: 22, marginBottom: 20 }}>Built for real operations work.</h2>
            <div className="concept-d-features-grid">
              <div className="concept-d-card">
                <div className="concept-d-card__icon">🎨</div>
                <div className="concept-d-card__title">Visual workflow builder.</div>
                <div className="concept-d-card__body">
                  Build automated workflows by connecting steps visually. No code required. See your entire process at a glance, spot bottlenecks, and adjust in seconds.
                  <ul style={{ marginTop: 12, paddingLeft: 20, lineHeight: 2 }}>
                    <li>Drag-and-drop step connection</li>
                    <li>Conditional branching — different steps for different conditions</li>
                    <li>Parallel execution — steps run simultaneously when possible</li>
                    <li>Version history — revert any workflow to a previous version</li>
                  </ul>
                </div>
              </div>
              <div className="concept-d-card">
                <div className="concept-d-card__icon">⚡</div>
                <div className="concept-d-card__title">Smart error handling.</div>
                <div className="concept-d-card__body">
                  When something fails, Flow80 doesn&apos;t just stop. It evaluates the error, retries intelligently, and escalates to you only when it genuinely needs human input.
                  <ul style={{ marginTop: 12, paddingLeft: 20, lineHeight: 2 }}>
                    <li>Automatic retry with exponential backoff</li>
                    <li>Dead letter queue — failed jobs wait for you to decide</li>
                    <li>Custom fallback paths — route around broken steps</li>
                    <li>Smart alerting — notified only when action is needed</li>
                  </ul>
                </div>
              </div>
              <div className="concept-d-card">
                <div className="concept-d-card__icon">📊</div>
                <div className="concept-d-card__title">Real-time monitoring.</div>
                <div className="concept-d-card__body">
                  See every workflow run as it happens. Know exactly what data moved, what succeeded, and what needs attention — before it becomes a customer problem.
                  <ul style={{ marginTop: 12, paddingLeft: 20, lineHeight: 2 }}>
                    <li>Live run dashboard with step-by-step progress</li>
                    <li>Input/output data inspection for every step</li>
                    <li>Success ratio tracking over time</li>
                    <li>Exportable run logs for compliance and audits</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Integrations */}
          <div className="concept-d-subpage__section">
            <h2 className="concept-d-subpage__section-title" style={{ fontSize: 22, marginBottom: 8 }}>
              Connects with the tools you already use.
            </h2>
            <p style={{ color: 'var(--concept-d-muted)', marginBottom: 32, fontSize: 15 }}>
              Connect everything your team already uses — no limited "integrations" locked behind paid plans.
            </p>
            <div className="concept-d-integrations-grid">
              {INTEGRATIONS.map((inv) => (
                <div key={inv.label} className="concept-d-integration-chip">
                  <span style={{ fontSize: 20 }}>{inv.icon}</span>
                  <div>
                    <div style={{ fontWeight: 600, color: 'white', marginBottom: 2 }}>{inv.label}</div>
                    <div style={{ fontSize: 12, color: 'var(--concept-d-muted)' }}>{inv.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Templates */}
          <div className="concept-d-subpage__section">
            <div className="concept-d-features-section-label">Templates & Getting Started</div>
            <h2 className="concept-d-subpage__section-title" style={{ fontSize: 22, marginBottom: 8 }}>
              Start from something that already works.
            </h2>
            <p style={{ color: 'var(--concept-d-muted)', marginBottom: 32, fontSize: 15 }}>
              Not sure where to begin? Choose from a library of proven workflow templates for common ops scenarios.
            </p>
            <div className="concept-d-features-grid">
              {TEMPLATES.map((tmpl) => (
                <div key={tmpl.label} className="concept-d-card">
                  <div className="concept-d-card__icon">{tmpl.icon}</div>
                  <div className="concept-d-card__title">{tmpl.label}</div>
                  <div className="concept-d-card__body">{tmpl.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <Link href={`/${locale}/pricing`} className="concept-d-hero__cta-primary" style={{ display: 'inline-block' }}>
              Request Early Access →
            </Link>
            <p style={{ fontSize: 14, color: 'var(--concept-d-muted)', marginTop: 16 }}>
              Tell us about your team and we&apos;ll get you set up before launch.
            </p>
          </div>
        </div>
      </main>

      <Footer t={t} locale={locale} />
    </div>
  );
}