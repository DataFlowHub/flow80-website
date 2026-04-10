export default function FeaturesPage() {
  const features = [
    {
      icon: '🧩',
      title: 'Visual Workflow Builder',
      desc: 'Drag, drop, and connect steps. Build complex automations without writing a single line of code. The canvas adapts to the complexity of your process.',
    },
    {
      icon: '📊',
      title: 'Real-time Monitoring',
      desc: 'Watch every workflow run as it happens. See exactly where data flows, how long each step takes, and catch issues before they become problems.',
    },
    {
      icon: '🛡️',
      title: 'Exception Handling',
      desc: 'Define what happens when things go wrong. Automatic retries, fallback paths, dead-letter queues, and human escalation — covered.',
    },
    {
      icon: '🔗',
      title: '40+ Integrations',
      desc: 'Connect to databases, SaaS tools, file storage, and APIs. From PostgreSQL to Salesforce, S3 to Slack — if it has an API, Flow80 can talk to it.',
    },
    {
      icon: '📋',
      title: 'Audit Logging',
      desc: 'Every action, every run, every change — logged and searchable. Full traceability for compliance, debugging, and process improvement.',
    },
    {
      icon: '👥',
      title: 'Team Collaboration',
      desc: 'Share workflows with your team, control permissions by role, and collaborate on automation projects with version control built in.',
    },
    {
      icon: '🔑',
      title: 'API Access',
      desc: 'Trigger workflows via webhooks or our REST API. Integrate Flow80 into your existing systems or build custom frontends on top.',
    },
    {
      icon: '🔐',
      title: 'Multi-tenant Security',
      desc: 'Enterprise-grade isolation between workspaces. SSO/SAML support, role-based access, and data residency options for regulated industries.',
    },
  ];

  return (
    <>
      <style>{`
        .features-hero {
          padding: 6rem 0 4rem;
          text-align: center;
          background: radial-gradient(ellipse at 50% 0%, rgba(255,87,51,0.04) 0%, transparent 60%);
        }
        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          margin-top: 3rem;
        }
        .feature-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 1.75rem;
          transition: border-color 0.2s, transform 0.2s;
        }
        .feature-card:hover {
          border-color: var(--accent);
          transform: translateY(-3px);
        }
        .feature-icon {
          font-size: 2rem;
          margin-bottom: 1rem;
          display: block;
        }
        .feature-title {
          font-size: 1rem;
          font-weight: 700;
          margin-bottom: 0.6rem;
        }
        .feature-desc {
          font-size: 0.875rem;
          color: var(--muted);
          line-height: 1.7;
        }
        .cta-band {
          background: var(--surface);
          border-top: 1px solid rgba(255,87,51,0.06);
          border-bottom: 1px solid rgba(255,87,51,0.06);
          padding: 5rem 0;
          text-align: center;
        }
        @media (max-width: 900px) {
          .features-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .features-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <section className="features-hero">
        <div className="container">
          <span className="section-label">Features</span>
          <h1 className="section-title" style={{ marginTop: '0.75rem' }}>
            Everything you need.<br />Nothing you don't.
          </h1>
          <p className="section-subtitle" style={{ margin: '0.75rem auto 0' }}>
            Flow80 is designed for ops teams — not marketers. Every feature exists because it solves a real problem.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="features-grid">
            {features.map((f) => (
              <div key={f.title} className="feature-card">
                <span className="feature-icon">{f.icon}</span>
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="container">
          <h2 className="section-title">Ready to see it in action?</h2>
          <p style={{ color: 'var(--muted)', marginBottom: '2rem', fontSize: '1.125rem' }}>
            Start your 14-day free trial. No credit card required.
          </p>
          <a href="/login" className="btn btn-primary">Get Early Access →</a>
        </div>
      </section>
    </>
  );
}
