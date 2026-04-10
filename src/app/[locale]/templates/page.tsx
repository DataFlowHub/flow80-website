export default function TemplatesPage() {
  const templates = [
    {
      icon: '🧾',
      title: 'Order to Invoice',
      desc: 'Automatically generate invoices when orders are placed. Sync order data, calculate totals, apply discounts, and deliver via email — fully automated.',
      tags: ['e-commerce', 'finance', 'email'],
    },
    {
      icon: '🔄',
      title: 'Data Sync Between Systems',
      desc: 'Keep two systems in sync automatically. When data changes in one place, Flow80 updates the other — with conflict resolution and audit logging.',
      tags: ['database', 'sync', 'integration'],
    },
    {
      icon: '🚨',
      title: 'Exception Alert Handler',
      desc: 'When a critical workflow fails, Flow80 alerts the right person immediately — with context, logs, and one-click retry or rollback options.',
      tags: ['monitoring', 'alerts', 'operations'],
    },
    {
      icon: '📬',
      title: 'Custom Template',
      desc: "Can't find what you need? Tell us your workflow and we'll build a custom template tailored to your process — at no extra cost.",
      tags: ['custom', 'on-demand'],
      comingSoon: true,
    },
  ];

  return (
    <>
      <style>{`
        .templates-hero {
          padding: 6rem 0 4rem;
          text-align: center;
          background: radial-gradient(ellipse at 50% 0%, rgba(255,87,51,0.04) 0%, transparent 60%);
        }
        .templates-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          margin-top: 3rem;
        }
        .template-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          transition: border-color 0.2s, transform 0.2s;
        }
        .template-card:hover:not(.coming-soon) {
          border-color: var(--accent);
          transform: translateY(-3px);
        }
        .template-card.coming-soon {
          opacity: 0.6;
          border-style: dashed;
        }
        .template-icon {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          display: block;
        }
        .template-title {
          font-size: 1.125rem;
          font-weight: 700;
          margin-bottom: 0.75rem;
        }
        .template-desc {
          font-size: 0.875rem;
          color: var(--muted);
          line-height: 1.7;
          flex: 1;
          margin-bottom: 1.25rem;
        }
        .template-tags {
          display: flex;
          gap: 0.4rem;
          flex-wrap: wrap;
          margin-bottom: 1.25rem;
        }
        .template-tag {
          font-size: 0.7rem;
          padding: 0.2rem 0.6rem;
          border-radius: 999px;
          background: var(--surface2);
          color: var(--muted);
          border: 1px solid rgba(255,255,255,0.08);
          font-weight: 500;
        }
        .template-link {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--accent);
          text-decoration: none;
          transition: opacity 0.2s;
        }
        .template-link:hover { opacity: 0.75; }
        .custom-request {
          margin-top: 3rem;
          text-align: center;
          padding: 2.5rem;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 12px;
        }
        .custom-request p {
          color: var(--muted);
          margin-bottom: 1.25rem;
          font-size: 1rem;
        }
        @media (max-width: 900px) {
          .templates-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <section className="templates-hero">
        <div className="container">
          <span className="section-label">Templates</span>
          <h1 className="section-title" style={{ marginTop: '0.75rem' }}>
            Don't start from scratch.
          </h1>
          <p className="section-subtitle" style={{ margin: '0.75rem auto 0' }}>
            Pick a proven starting point. Deploy in minutes, customize in hours.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="templates-grid">
            {templates.map((t) => (
              <div key={t.title} className={`template-card${t.comingSoon ? ' coming-soon' : ''}`}>
                <span className="template-icon">{t.icon}</span>
                <h3 className="template-title">{t.title}</h3>
                <p className="template-desc">{t.desc}</p>
                <div className="template-tags">
                  {t.tags.map((tag) => (
                    <span key={tag} className="template-tag">{tag}</span>
                  ))}
                </div>
                {!t.comingSoon ? (
                  <a href="/login" className="template-link">
                    Use this template → <span style={{ opacity: 0.6 }}>(login required)</span>
                  </a>
                ) : (
                  <span className="template-link" style={{ cursor: 'default', color: 'var(--muted)' }}>
                    More coming soon
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="custom-request">
            <h3 style={{ marginBottom: '0.75rem', fontSize: '1.25rem' }}>Need something specific?</h3>
            <p>We'll build a custom template for your exact workflow — free of charge for Pro and Scale customers.</p>
            <a href="mailto:hello@flow80.io" className="btn btn-outline">Request a Custom Template →</a>
          </div>
        </div>
      </section>
    </>
  );
}
