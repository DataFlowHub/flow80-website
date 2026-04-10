export default function HowItWorksPage() {
  return (
    <>
      <style>{`
        .hiw-hero {
          padding: 6rem 0 4rem;
          text-align: center;
          background: radial-gradient(ellipse at 50% 0%, rgba(255,87,51,0.05) 0%, transparent 60%);
        }
        .step-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 2.5rem;
          position: relative;
          transition: border-color 0.2s;
        }
        .step-card:hover { border-color: var(--accent); }
        .step-num {
          font-size: 5rem;
          font-weight: 800;
          color: var(--accent);
          opacity: 0.15;
          position: absolute;
          top: 1rem;
          right: 1.5rem;
          line-height: 1;
          user-select: none;
        }
        .step-icon {
          font-size: 3rem;
          margin-bottom: 1.25rem;
          display: block;
        }
        .step-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.75rem;
        }
        .step-desc {
          font-size: 1rem;
          color: var(--muted);
          line-height: 1.75;
          margin-bottom: 1.25rem;
        }
        .step-details {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .step-details li {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          color: var(--text);
        }
        .step-details li::before {
          content: '→';
          color: var(--accent);
          font-weight: 700;
        }
        .steps-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          margin-top: 3rem;
        }
        .cta-band {
          background: var(--surface);
          border-top: 1px solid rgba(255,87,51,0.06);
          border-bottom: 1px solid rgba(255,87,51,0.06);
          padding: 5rem 0;
          text-align: center;
        }
        @media (max-width: 900px) {
          .steps-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* Hero */}
      <section className="hiw-hero">
        <div className="container">
          <span className="section-label">No Code Required</span>
          <h1 className="section-title" style={{ marginTop: '0.75rem' }}>
            How Flow80 works
          </h1>
          <p className="section-subtitle" style={{ margin: '0.75rem auto 0' }}>
            From idea to live workflow in three straightforward steps. No developers, no waiting, no complexity.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="section">
        <div className="container">
          <div className="steps-grid">
            <div className="step-card">
              <span className="step-num">01</span>
              <span className="step-icon">🔌</span>
              <h2 className="step-title">Connect</h2>
              <p className="step-desc">
                Bring all your tools together. Flow80 connects to databases, SaaS applications, file storage, and custom APIs — no code needed.
              </p>
              <ul className="step-details">
                <li>PostgreSQL, MySQL, MongoDB</li>
                <li>Salesforce, HubSpot, Slack</li>
                <li>AWS S3, Google Drive, Dropbox</li>
                <li>REST & GraphQL APIs</li>
                <li>EDI (X12, EDIFACT)</li>
              </ul>
            </div>

            <div className="step-card">
              <span className="step-num">02</span>
              <span className="step-icon">🧩</span>
              <h2 className="step-title">Build</h2>
              <p className="step-desc">
                Design your workflow visually. Chain actions, add conditions, define branches, and handle exceptions — all with a drag-and-drop interface.
              </p>
              <ul className="step-details">
                <li>Visual drag-and-drop builder</li>
                <li>Conditional logic & branching</li>
                <li>Built-in exception handling</li>
                <li>Data transformation tools</li>
                <li>Reusable workflow templates</li>
              </ul>
            </div>

            <div className="step-card">
              <span className="step-num">03</span>
              <span className="step-icon">⚡</span>
              <h2 className="step-title">Automate</h2>
              <p className="step-desc">
                Activate your workflow and let Flow80 handle the rest. Monitor every run in real time, with instant alerts if anything needs attention.
              </p>
              <ul className="step-details">
                <li>Real-time execution logs</li>
                <li>Automatic retries on failure</li>
                <li>Smart alerts (email, Slack, webhook)</li>
                <li>Full audit trail</li>
                <li>Run history & replay</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-band">
        <div className="container">
          <h2 className="section-title">Start building your first workflow →</h2>
          <p style={{ color: 'var(--muted)', marginBottom: '2rem', fontSize: '1.125rem' }}>
            No credit card. No setup fee. 14-day free trial.
          </p>
          <a href="/login" className="btn btn-primary">Start Free Trial →</a>
        </div>
      </section>
    </>
  );
}
