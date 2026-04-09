'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import ConceptDNav from '@/components/ConceptDNav';
import Footer from '@/components/Footer';
import { translations, locales, defaultLocale, type Locale } from '@/i18n/translations';

export default function HowItWorksPage() {
  const pathname = usePathname();
  const router = useRouter();

  const pathLocale = (pathname?.split('/')[1] || defaultLocale) as Locale;
  const validLocale = locales.includes(pathLocale) ? pathLocale : defaultLocale;

  const [locale, setLocale] = useState<Locale>(validLocale);
  const t = translations[locale];

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const handleLangChange = (newLocale: string) => {
    setLocale(newLocale as Locale);
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`) || `/${newLocale}`;
    router.push(newPath);
  };

  return (
    <div className="concept-d-layout">
      <ConceptDNav t={t} locale={locale} />

      <main id="main-content">
        <div className="concept-d-subpage">
          {/* Hero */}
          <div className="concept-d-subpage__hero">
            <div className="concept-d-subpage__badge">⚡ How It Works</div>
            <h1 className="concept-d-subpage__headline">
              Less manual work.<br />
              <span style={{ color: 'var(--concept-d-accent-light)' }}>More actual work.</span>
            </h1>
            <p className="concept-d-subpage__sub">
              Flow80 automates the repetitive tasks that eat up your team&apos;s day — so they can focus on the work that actually requires a human.
            </p>
          </div>

          {/* The Problem */}
          <div className="concept-d-subpage__section">
            <h2 className="concept-d-subpage__section-title">The manual work problem.</h2>
            <div className="concept-d-features-grid">
              {[
                { icon: '📋', label: 'Order entry', desc: 'Manually entering orders from webstores, emails, or phone into your ERP — 60–90 min/day' },
                { icon: '🧾', label: 'Invoice processing', desc: 'Reformatting supplier invoices to match your accounting system — 30–60 min/day' },
                { icon: '📊', label: 'Report generation', desc: 'Pulling data from multiple systems and building weekly reports manually — 2–3 hours/week' },
                { icon: '📬', label: 'Supplier follow-ups', desc: 'Checking if orders were received, if invoices were paid, if shipments are on track — 30 min/day' },
                { icon: '🔄', label: 'Data re-entry', desc: 'Copying the same data between systems that "should" talk to each other — Varies, always too much' },
              ].map((item) => (
                <div key={item.label} className="concept-d-card">
                  <div className="concept-d-card__icon">{item.icon}</div>
                  <div className="concept-d-card__title">{item.label}</div>
                  <div className="concept-d-card__body">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Three Steps */}
          <div className="concept-d-subpage__section">
            <h2 className="concept-d-subpage__section-title">Three steps to your first automated workflow.</h2>
            <div className="concept-d-hiw-grid">
              {[
                {
                  n: '1',
                  heading: 'Connect your systems.',
                  body: 'Tell Flow80 where your data lives — your ERP, your webstore, your database, your email. One-time setup per system.',
                },
                {
                  n: '2',
                  heading: 'Draw your workflow.',
                  body: 'Connect your steps visually. Tell Flow80: when this happens, do this. If this data looks like that, handle it differently.',
                },
                {
                  n: '3',
                  heading: 'Activate and walk away.',
                  body: 'Turn it on. Flow80 runs it. You get notified if something needs your attention — and only then.',
                },
              ].map((step) => (
                <div key={step.n} className="concept-d-hiw-step">
                  <div className="concept-d-hiw-step__number">{step.n}</div>
                  <div className="concept-d-hiw-step__heading">{step.heading}</div>
                  <div className="concept-d-hiw-step__body">{step.body}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Example: Order Processing */}
          <div className="concept-d-subpage__section">
            <h2 className="concept-d-subpage__section-title">Example: Automated order processing.</h2>
            <div className="concept-d-hiw-example">
              <div className="concept-d-hiw-example__title">Order #4821 — Processed in 2.5 seconds</div>
              <div className="concept-d-hiw-example__subtitle">What used to take 90 minutes of manual work every morning — now runs in seconds.</div>
              <div className="concept-d-hiw-example__steps">
                {[
                  { label: 'Webhook: New order from WooCommerce', meta: 'Instant', ok: true },
                  { label: 'Validate order data', meta: '0.2s · All required fields present', ok: true },
                  { label: 'Transform → SAP format', meta: '0.4s · Mapping 14 fields', ok: true },
                  { label: 'Export to SAP', meta: '1.1s · Sales order #SO-29471 created', ok: true },
                  { label: 'Send confirmation email to customer', meta: '0.8s', ok: true },
                ].map((step) => (
                  <div key={step.label} className="concept-d-hiw-example__step">
                    <svg className="concept-d-hiw-example__step-check" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <div className="concept-d-hiw-example__step-text">
                      <div className="concept-d-hiw-example__step-label">{step.label}</div>
                      <div className="concept-d-hiw-example__step-meta">{step.meta}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="concept-d-hiw-example__stats">
                <div className="concept-d-hiw-example__stat">
                  <div className="concept-d-hiw-example__stat-value">2.5s</div>
                  <div className="concept-d-hiw-example__stat-label">Total run time</div>
                </div>
                <div className="concept-d-hiw-example__stat">
                  <div className="concept-d-hiw-example__stat-value">5</div>
                  <div className="concept-d-hiw-example__stat-label">Steps completed</div>
                </div>
                <div className="concept-d-hiw-example__stat">
                  <div className="concept-d-hiw-example__stat-value">90min</div>
                  <div className="concept-d-hiw-example__stat-label">Manual time saved</div>
                </div>
              </div>
            </div>
          </div>

          {/* Before / After */}
          <div className="concept-d-subpage__section">
            <h2 className="concept-d-subpage__section-title">Before and after: Invoice processing.</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 24 }}>
              <div className="concept-d-card">
                <div className="concept-d-card__title" style={{ color: 'var(--concept-d-muted)' }}>Before Flow80 — what your team does manually</div>
                <div className="concept-d-card__body" style={{ marginTop: 12 }}>
                  <ol style={{ paddingLeft: 20, lineHeight: 2 }}>
                    <li>Receive invoice from supplier via email</li>
                    <li>Open the attached PDF or look at the email</li>
                    <li>Copy supplier name, invoice number, amount, date into a spreadsheet</li>
                    <li>Convert to your company&apos;s required format (or re-type)</li>
                    <li>Open your accounting system</li>
                    <li>Paste the data into the invoice entry form</li>
                    <li>Attach the original file</li>
                    <li>Submit for approval</li>
                    <li>Repeat for next invoice. And the next. And the next.</li>
                  </ol>
                </div>
              </div>
              <div className="concept-d-card" style={{ borderColor: 'var(--concept-d-accent)' }}>
                <div className="concept-d-card__title" style={{ color: 'var(--concept-d-accent-light)' }}>↓ With Flow80 — what happens automatically</div>
                <div className="concept-d-card__body" style={{ marginTop: 12 }}>
                  ⚡ Invoice received → Flow80 extracts the data → transforms it to your format → enters it in your accounting system → notifies the approver. <strong style={{ color: 'white' }}>Done in 4 seconds.</strong>
                </div>
              </div>
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