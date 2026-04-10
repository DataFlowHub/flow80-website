export default function CompliancePage() {
  return (
    <>
      <style>{`
        /* ── Page vars ── */
        .container { max-width: 1200px; margin: 0 auto; padding: 0 1.5rem; }
        .section-label {
          display: block;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 0.75rem;
        }
        .section-title {
          font-size: clamp(1.75rem, 3.5vw, 2.5rem);
          font-weight: 800;
          line-height: 1.15;
          margin-bottom: 1rem;
          letter-spacing: -0.02em;
        }
        .section-subtitle {
          color: var(--muted);
          font-size: 1.0625rem;
          line-height: 1.7;
          max-width: 580px;
        }
        .section-subtitle.center { margin: 0 auto; text-align: center; }
        .section-header { margin-bottom: 3.5rem; }
        .section-header.center { text-align: center; }
        .section-header.center .section-subtitle { margin: 0.5rem auto 0; }

        /* ── Hero ── */
        .hero {
          min-height: 72vh;
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
          background: radial-gradient(ellipse at 70% -10%, rgba(255,87,51,0.08) 0%, transparent 55%),
                      var(--bg);
        }
        .hero-grid {
          max-width: 1200px;
          margin: 0 auto;
          padding: 5rem 1.5rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5rem;
          align-items: center;
        }
        .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--accent);
          background: var(--accent-glow);
          border: 1px solid var(--accent-border);
          padding: 0.35rem 1rem;
          border-radius: 999px;
          margin-bottom: 2rem;
        }
        .hero-title {
          font-size: clamp(2.5rem, 5vw, 3.5rem);
          font-weight: 800;
          line-height: 1.08;
          margin-bottom: 1.5rem;
          letter-spacing: -0.03em;
        }
        .hero-title .accent { color: var(--accent); }
        .hero-sub {
          font-size: 1.125rem;
          color: var(--muted);
          line-height: 1.75;
          margin-bottom: 2.5rem;
          max-width: 480px;
        }
        .hero-actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          margin-bottom: 3rem;
        }
        .hero-badges {
          display: flex;
          gap: 1.25rem;
          flex-wrap: wrap;
        }
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.8125rem;
          color: var(--muted);
          font-weight: 500;
        }
        /* Hero visual */
        .hero-visual {
          position: relative;
        }
        .shield-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 2.5rem;
          box-shadow: 0 40px 80px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,87,51,0.06);
        }
        .shield-icon {
          width: 64px;
          height: 64px;
          background: var(--accent-glow);
          border: 1px solid var(--accent-border);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          margin-bottom: 1.5rem;
        }
        .shield-title {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }
        .shield-desc {
          font-size: 0.875rem;
          color: var(--muted);
          line-height: 1.65;
          margin-bottom: 2rem;
        }
        .shield-stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        .shield-stat {
          background: var(--surface2);
          border-radius: 10px;
          padding: 1rem;
          border: 1px solid rgba(255,255,255,0.04);
        }
        .shield-stat-value {
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--text);
          display: block;
        }
        .shield-stat-label {
          font-size: 0.75rem;
          color: var(--muted);
          margin-top: 0.2rem;
          display: block;
        }
        .shield-pills {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
          margin-top: 1.5rem;
        }
        .shield-pill {
          font-size: 0.75rem;
          font-weight: 600;
          padding: 0.3rem 0.8rem;
          border-radius: 999px;
          background: var(--accent-glow);
          color: var(--accent);
          border: 1px solid var(--accent-border);
        }

        /* ── Certifications ── */
        .certs-section {
          padding: 5rem 0;
          border-top: 1px solid rgba(255,255,255,0.04);
        }
        .certs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 1.5rem;
        }
        .cert-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          transition: border-color 0.2s, transform 0.2s;
        }
        .cert-card:hover {
          border-color: var(--accent);
          transform: translateY(-3px);
        }
        .cert-card-header {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
        }
        .cert-icon {
          font-size: 2.25rem;
          flex-shrink: 0;
        }
        .cert-name {
          font-size: 1.125rem;
          font-weight: 700;
          margin-bottom: 0.25rem;
        }
        .cert-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          padding: 0.2rem 0.6rem;
          border-radius: 6px;
        }
        .cert-tag.active {
          background: rgba(52, 211, 153, 0.12);
          color: #34d399;
          border: 1px solid rgba(52, 211, 153, 0.2);
        }
        .cert-tag.in-progress {
          background: rgba(251, 191, 36, 0.12);
          color: #fbbf24;
          border: 1px solid rgba(251, 191, 36, 0.2);
        }
        .cert-tag.planned {
          background: rgba(255,255,255,0.05);
          color: var(--muted);
          border: 1px solid rgba(255,255,255,0.08);
        }
        .cert-tag.enterprise {
          background: rgba(255,87,51,0.1);
          color: var(--accent);
          border: 1px solid rgba(255,87,51,0.15);
        }
        .cert-desc {
          font-size: 0.875rem;
          color: var(--muted);
          line-height: 1.65;
        }
        .cert-features {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-top: auto;
          padding-top: 1rem;
          border-top: 1px solid rgba(255,255,255,0.04);
        }
        .cert-features li {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8125rem;
          color: var(--text);
        }
        .cert-features li::before {
          content: '→';
          color: var(--accent);
          font-weight: 700;
          flex-shrink: 0;
        }

        /* ── How We Protect You ── */
        .protect-section {
          padding: 5rem 0;
          background: var(--surface);
          border-top: 1px solid rgba(255,87,51,0.05);
          border-bottom: 1px solid rgba(255,87,51,0.05);
        }
        .protect-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-top: 3rem;
        }
        .protect-card {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .protect-icon {
          width: 48px;
          height: 48px;
          background: var(--accent-glow);
          border: 1px solid var(--accent-border);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          flex-shrink: 0;
        }
        .protect-card h3 {
          font-size: 1.0625rem;
          font-weight: 700;
        }
        .protect-card p {
          font-size: 0.875rem;
          color: var(--muted);
          line-height: 1.65;
        }

        /* ── Comparison Table ── */
        .compare-section {
          padding: 5rem 0;
        }
        .compare-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 2.5rem;
          font-size: 0.9rem;
        }
        .compare-table th {
          text-align: left;
          padding: 1rem 1.25rem;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--muted);
          border-bottom: 1px solid var(--border);
        }
        .compare-table th.flow80-col {
          color: var(--accent);
          background: var(--accent-glow);
        }
        .compare-table td {
          padding: 1rem 1.25rem;
          font-size: 0.875rem;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          vertical-align: middle;
        }
        .compare-table td:first-child { color: var(--text); font-weight: 500; }
        .compare-table tr:last-child td { border-bottom: none; }
        .compare-table tr:hover td { background: rgba(255,255,255,0.02); }
        .check { color: #34d399; font-size: 1.1rem; font-weight: 700; }
        .cross { color: #555; }

        /* ── DPA Section ── */
        .dpa-section {
          padding: 5rem 0;
          background: var(--surface);
          border-top: 1px solid rgba(255,87,51,0.05);
          border-bottom: 1px solid rgba(255,87,51,0.05);
        }
        .dpa-card {
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 3rem;
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 3rem;
          align-items: center;
        }
        .dpa-card h3 {
          font-size: 1.5rem;
          font-weight: 800;
          margin-bottom: 0.75rem;
        }
        .dpa-card p {
          color: var(--muted);
          font-size: 0.9375rem;
          line-height: 1.65;
          margin-bottom: 1.5rem;
          max-width: 540px;
        }
        .dpa-actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        /* ── FAQ ── */
        .faq-section {
          padding: 5rem 0;
        }
        .faq-list {
          max-width: 760px;
          margin: 3rem auto 0;
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .faq-item {
          border-bottom: 1px solid rgba(255,255,255,0.06);
          padding: 1.5rem 0;
        }
        .faq-item:first-child { border-top: 1px solid rgba(255,255,255,0.06); }
        .faq-q {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: var(--text);
        }
        .faq-a {
          font-size: 0.9rem;
          color: var(--muted);
          line-height: 1.65;
        }

        /* ── CTA ── */
        .cta-section {
          padding: 6rem 0;
          background: radial-gradient(ellipse at 50% 100%, rgba(255,87,51,0.07) 0%, transparent 60%);
          text-align: center;
        }
        .cta-title {
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 800;
          margin-bottom: 1rem;
          letter-spacing: -0.02em;
        }
        .cta-sub {
          color: var(--muted);
          font-size: 1.0625rem;
          margin-bottom: 2.5rem;
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
        }
        .cta-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        /* Responsive */
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr; gap: 3rem; }
          .hero-visual { display: none; }
          .dpa-card { grid-template-columns: 1fr; }
        }
        @media (max-width: 640px) {
          .compare-table { font-size: 0.8rem; }
          .compare-table th, .compare-table td { padding: 0.75rem 0.75rem; }
        }
      `}</style>

      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero-grid">
          <div>
            <div className="eyebrow">🔒 Security &amp; Compliance</div>
            <h1 className="hero-title">
              Stop losing deals<br />
              to compliance<br />
              <span className="accent">questions.</span>
            </h1>
            <p className="hero-sub">
              Enterprise prospects ask about GDPR, SOC 2, ISO 27001 — and then vanish when you cannot answer. Flow80 has the answers ready. Built-in, documented, enterprise-ready.
            </p>
            <div className="hero-actions">
              <a href="/login" className="btn btn-primary">Start Free Trial →</a>
              <a href="#dpa" className="btn btn-outline">Download DPA</a>
            </div>
            <div className="hero-badges">
              <span className="hero-badge">🇪🇺 EU data only</span>
              <span className="hero-badge">🔐 AES-256 encryption</span>
              <span className="hero-badge">📋 Audit logs</span>
            </div>
          </div>
          <div className="hero-visual">
            <div className="shield-card">
              <div className="shield-icon">🛡️</div>
              <div className="shield-title">Your data, your jurisdiction</div>
              <div className="shield-desc">All Flow80 infrastructure runs exclusively in EU data centers. No exceptions. No US access. No government bulk collection concerns.</div>
              <div className="shield-stats">
                <div className="shield-stat">
                  <span className="shield-stat-value">100%</span>
                  <span className="shield-stat-label">EU infrastructure</span>
                </div>
                <div className="shield-stat">
                  <span className="shield-stat-value">0</span>
                  <span className="shield-stat-label">US government access</span>
                </div>
                <div className="shield-stat">
                  <span className="shield-stat-value">AES-256</span>
                  <span className="shield-stat-label">encryption at rest</span>
                </div>
                <div className="shield-stat">
                  <span className="shield-stat-value">TLS 1.3</span>
                  <span className="shield-stat-label">in transit</span>
                </div>
              </div>
              <div className="shield-pills">
                <span className="shield-pill">GDPR</span>
                <span className="shield-pill">DSG</span>
                <span className="shield-pill">SOC 2 Type II</span>
                <span className="shield-pill">ISO 27001</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Certifications ── */}
      <section className="certs-section">
        <div className="container">
          <div className="section-header center">
            <span className="section-label">Certifications</span>
            <h2 className="section-title">Standards that matter for EU ops</h2>
            <p className="section-subtitle center">Not a checklist — a commitment. Every framework below is actively maintained and verified.</p>
          </div>
          <div className="certs-grid">
            {/* GDPR */}
            <div className="cert-card">
              <div className="cert-card-header">
                <span className="cert-icon">🇪🇺</span>
                <div>
                  <div className="cert-name">GDPR</div>
                  <span className="cert-tag active">✓ Active</span>
                </div>
              </div>
              <p className="cert-desc">Full compliance with EU General Data Protection Regulation. Data residency in Frankfurt and Copenhagen. Right to erasure, data portability, and processing records built into the platform.</p>
              <ul className="cert-features">
                <li>EU-only data residency</li>
                <li>Data Processing Agreements (DPAs)</li>
                <li>Right to erasure automation</li>
                <li>Processing activity records</li>
                <li>DPA available for download</li>
              </ul>
            </div>

            {/* SOC 2 */}
            <div className="cert-card">
              <div className="cert-card-header">
                <span className="cert-icon">🛡️</span>
                <div>
                  <div className="cert-name">SOC 2 Type II</div>
                  <span className="cert-tag in-progress">⟡ In progress</span>
                </div>
              </div>
              <p className="cert-desc">Independent security assessment by a Big Four auditor. Covers availability, confidentiality, and security trust service criteria. Target completion: Q2 2026.</p>
              <ul className="cert-features">
                <li>Annual independent audit</li>
                <li>Encryption at rest + in transit</li>
                <li>Access logging &amp; monitoring</li>
                <li>Incident response procedures</li>
                <li>Pen test results (enterprise)</li>
              </ul>
            </div>

            {/* ISO 27001 */}
            <div className="cert-card">
              <div className="cert-card-header">
                <span className="cert-icon">📋</span>
                <div>
                  <div className="cert-name">ISO 27001</div>
                  <span className="cert-tag planned">○ Planned</span>
                </div>
              </div>
              <p className="cert-desc">Information security management system aligned with ISO/IEC 27001:2022. Risk assessment framework, security policies, and continuous improvement cycle.</p>
              <ul className="cert-features">
                <li>Risk assessment framework</li>
                <li>Security policies &amp; governance</li>
                <li>Continuous improvement cycle</li>
                <li>Third-party assessment</li>
              </ul>
            </div>

            {/* DSG */}
            <div className="cert-card">
              <div className="cert-card-header">
                <span className="cert-icon">🏛️</span>
                <div>
                  <div className="cert-name">DSG — Danish Data Act</div>
                  <span className="cert-tag active">✓ Active</span>
                </div>
              </div>
              <p className="cert-desc">Fully compliant with the Danish Data Protection Act and Danish authorities' requirements. Local DPA, designated contact, and supplementary measures for cross-border transfers.</p>
              <ul className="cert-features">
                <li>Local DPA available</li>
                <li>Danish authority liaison</li>
                <li>Cross-border transfer safeguards</li>
                <li>Supplementary measures documented</li>
              </ul>
            </div>

            {/* PCI DSS */}
            <div className="cert-card">
              <div className="cert-card-header">
                <span className="cert-icon">💳</span>
                <div>
                  <div className="cert-name">PCI DSS Level 1</div>
                  <span className="cert-tag planned">○ Roadmap</span>
                </div>
              </div>
              <p className="cert-desc">Payment card industry data security standard for organizations handling card data. Network segmentation, encryption, and quarterly vulnerability scans for card data environments.</p>
              <ul className="cert-features">
                <li>Network segmentation</li>
                <li>Card data environment isolation</li>
                <li>Quarterly vulnerability scans</li>
                <li>QSA assessment (roadmap)</li>
              </ul>
            </div>

            {/* HIPAA */}
            <div className="cert-card">
              <div className="cert-card-header">
                <span className="cert-icon">🔐</span>
                <div>
                  <div className="cert-name">HIPAA</div>
                  <span className="cert-tag enterprise">◈ Enterprise</span>
                </div>
              </div>
              <p className="cert-desc">Healthcare data protection for enterprise customers handling protected health information (PHI). Business Associate Agreement (BAA) available on Enterprise plans.</p>
              <ul className="cert-features">
                <li>BAA available</li>
                <li>PHI audit trails</li>
                <li>Role-based access for PHI</li>
                <li>Enterprise-only support</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── How We Protect You ── */}
      <section className="protect-section">
        <div className="container">
          <div className="section-header center">
            <span className="section-label">Technical Controls</span>
            <h2 className="section-title">Security built into the platform</h2>
            <p className="section-subtitle center">Not add-ons. Not optional modules. Core platform capabilities.</p>
          </div>
          <div className="protect-grid">
            <div className="protect-card">
              <div className="protect-icon">🔐</div>
              <div>
                <h3>Tenant isolation</h3>
                <p>Every query, every workflow run, every API call is scoped to the client's tenant. Zero cross-tenant data access — guaranteed at the database layer, not application logic.</p>
              </div>
            </div>
            <div className="protect-card">
              <div className="protect-icon">📊</div>
              <div>
                <h3>Audit logging</h3>
                <p>Every workflow execution, data access, and configuration change is logged. Immutable audit trail with timestamp, actor, and action. Searchable, exportable, enterprise-ready.</p>
              </div>
            </div>
            <div className="protect-card">
              <div className="protect-icon">🔑</div>
              <div>
                <h3>Role-based access control</h3>
                <p>Granular RBAC with read-only, editor, admin, and owner roles. API keys with expiry and scope limits. SSO via SAML 2.0 on Enterprise plans.</p>
              </div>
            </div>
            <div className="protect-card">
              <div className="protect-icon">🛠️</div>
              <div>
                <h3>Data retention policies</h3>
                <p>Automated data lifecycle management. Configure retention periods per data type. Auto-archive and secure deletion on schedule. Audit log of all deletions.</p>
              </div>
            </div>
            <div className="protect-card">
              <div className="protect-icon">🌍</div>
              <div>
                <h3>EU-only infrastructure</h3>
                <p>All data stored in AWS eu-central-1 (Frankfurt) and GCP europe-west1 (Copenhagen). No US cloud compute, no US employees with data access, no CLOUD Act exposure.</p>
              </div>
            </div>
            <div className="protect-card">
              <div className="protect-icon">🔔</div>
              <div>
                <h3>Exception handling &amp; alerting</h3>
                <p>Workflow failures trigger real-time alerts via email and webhook. Configurable retry logic, dead-letter queues, and automatic incident escalation for critical workflows.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Comparison Table ── */}
      <section className="compare-section">
        <div className="container">
          <div className="section-header center">
            <span className="section-label">Compare</span>
            <h2 className="section-title">Compliance comparison</h2>
            <p className="section-subtitle center">Most automation tools treat compliance as a checkbox. Flow80 builds it into the core.</p>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table className="compare-table">
              <thead>
                <tr>
                  <th>Capability</th>
                  <th className="flow80-col">Flow80</th>
                  <th>Zapier</th>
                  <th>Make</th>
                  <th>ActivePieces</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['EU-only data residency', true, false, false, false],
                  ['SOC 2 Type II audit', true, false, false, false],
                  ['Tenant-level data isolation', true, false, false, false],
                  ['ISO 27001 certification', true, false, false, false],
                  ['GDPR DPA available', true, true, true, false],
                  ['SSO / SAML support', true, 'partial', 'partial', false],
                  ['Full audit log', true, 'partial', 'partial', false],
                  ['Role-based access control', true, 'partial', true, false],
                  ['Data retention policies', true, false, false, false],
                  ['HIPAA BAA', true, false, false, false],
                ].map(([cap, f, z, m, a]) => (
                  <tr key={cap as string}>
                    <td>{cap as string}</td>
                    <td className="check">✓</td>
                    {['z', 'm', 'a'].map((key, i) => {
                      const val = [z, m, a][i];
                      return (
                        <td key={key} className={val === true ? 'check' : val === 'partial' ? 'cross' : 'cross'}>
                          {val === true ? '✓' : val === 'partial' ? '△' : '—'}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── DPA Download ── */}
      <section className="dpa-section" id="dpa">
        <div className="container">
          <div className="dpa-card">
            <div>
              <h3>Need a Data Processing Agreement?</h3>
              <p>Download our standard GDPR DPA in minutes. For enterprise customers, we offer custom DPAs reviewed by legal counsel, tailored to your jurisdiction and use case.</p>
              <div className="dpa-actions">
                <a href="/login" className="btn btn-primary">Download Standard DPA →</a>
                <a href="/login" className="btn btn-outline">Contact Legal Team</a>
              </div>
            </div>
            <div style={{ fontSize: '4rem' }}>📄</div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="faq-section">
        <div className="container">
          <div className="section-header center">
            <span className="section-label">FAQ</span>
            <h2 className="section-title">Common compliance questions</h2>
          </div>
          <div className="faq-list">
            <div className="faq-item">
              <div className="faq-q">Where is my data actually stored?</div>
              <div className="faq-a">All data is stored exclusively in EU data centers — currently AWS eu-central-1 (Frankfurt) and Google Cloud Platform europe-west1 (Copenhagen). We do not use US cloud providers or allow US-based employees access to customer data.</div>
            </div>
            <div className="faq-item">
              <div className="faq-q">When will SOC 2 Type II be completed?</div>
              <div className="faq-a">We are currently in the audit process with an independent assessor. Target completion is Q2 2026. Enterprise customers can request the current security documentation package (including pen test results) directly from their account manager.</div>
            </div>
            <div className="faq-item">
              <div className="faq-q">Can I get a copy of your GDPR DPA?</div>
              <div className="faq-a">Yes. The standard DPA is available for download on this page. For enterprise plans, we offer a custom DPA reviewed by legal counsel that includes additional guarantees and specific jurisdictions.</div>
            </div>
            <div className="faq-item">
              <div className="faq-q">Do you sub-processors list?</div>
              <div className="faq-a">Yes. Our sub-processor list is available and updated whenever we add or change sub-processors. We notify customers 30 days before material changes. All sub-processors are EU-based or GDPR-compliant.</div>
            </div>
            <div className="faq-item">
              <div className="faq-q">What happens if there is a security incident?</div>
              <div className="faq-a">We maintain a 24/7 incident response team. Under GDPR, we notify affected controllers within 72 hours of becoming aware of a breach. Enterprise customers receive direct incident notifications and post-mortems.</div>
            </div>
            <div className="faq-item">
              <div className="faq-q">Is HIPAA available?</div>
              <div className="faq-a">Yes, on Enterprise plans. We provide a signed Business Associate Agreement (BAA) and implement the required administrative, physical, and technical safeguards for protected health information.</div>
            </div>
            <div className="faq-item">
              <div className="faq-q">Can Flow80 be deployed on-premise?</div>
              <div className="faq-a">On-premise deployment is available for Enterprise customers with specific data sovereignty requirements. Contact our sales team to discuss deployment options.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section">
        <div className="container">
          <h2 className="cta-title">Ready to win the compliance conversation?</h2>
          <p className="cta-sub">Join 500+ European teams using Flow80 to automate operations without compromising on security or compliance.</p>
          <div className="cta-actions">
            <a href="/login" className="btn btn-primary">Start Free Trial →</a>
            <a href="/login" className="btn btn-outline">Talk to Sales</a>
          </div>
        </div>
      </section>
    </>
  );
}