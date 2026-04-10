export default function SignupPage() {
  return (
    <>
      <style>{`
        .signup-root {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg);
          background-image: radial-gradient(ellipse at 50% 40%, rgba(255,87,51,0.06) 0%, transparent 60%);
          padding: 2rem 1.5rem;
        }
        .signup-card {
          width: 100%;
          max-width: 480px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 3rem;
          text-align: center;
        }
        .signup-icon {
          width: 64px;
          height: 64px;
          background: var(--accent-glow);
          border: 1px solid var(--accent-border);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          margin: 0 auto 1.5rem;
        }
        .signup-title {
          font-size: 1.75rem;
          font-weight: 800;
          margin-bottom: 0.75rem;
          letter-spacing: -0.02em;
        }
        .signup-sub {
          color: var(--muted);
          font-size: 0.9375rem;
          line-height: 1.65;
          margin-bottom: 2.5rem;
        }
        .signup-actions {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 2rem;
        }
        .btn-signup {
          display: block;
          width: 100%;
          padding: 0.875rem 1.5rem;
          border-radius: 10px;
          font-family: var(--font);
          font-size: 1rem;
          font-weight: 600;
          text-decoration: none;
          text-align: center;
          transition: all 0.2s;
          cursor: pointer;
          border: none;
        }
        .btn-signup.primary {
          background: var(--accent);
          color: #0d0d0d;
        }
        .btn-signup.primary:hover {
          background: #ff7048;
          box-shadow: 0 0 24px rgba(255,87,51,0.35);
        }
        .btn-signup.outline {
          background: transparent;
          color: var(--text);
          border: 1px solid var(--border);
        }
        .btn-signup.outline:hover {
          border-color: var(--accent);
          color: var(--accent);
        }
        .signup-divider {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin: 1.5rem 0;
          color: var(--muted);
          font-size: 0.8125rem;
        }
        .signup-divider::before,
        .signup-divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: var(--border);
        }
        .signup-trust {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-top: 2rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255,255,255,0.05);
        }
        .trust-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8125rem;
          color: var(--muted);
        }
        .trust-item::before {
          content: '✓';
          color: var(--accent);
          font-weight: 700;
        }
        .login-link {
          margin-top: 1.5rem;
          font-size: 0.875rem;
          color: var(--muted);
        }
        .login-link a {
          color: var(--accent);
          font-weight: 600;
        }
        .pricing-note {
          background: var(--surface2);
          border: 1px solid rgba(255,255,255,0.04);
          border-radius: 10px;
          padding: 1rem;
          margin-top: 1.5rem;
          font-size: 0.8125rem;
          color: var(--muted);
          line-height: 1.6;
        }
        .pricing-note strong { color: var(--text); }
      `}</style>

      <div className="signup-root">
        <div className="signup-card">
          <div className="signup-icon">⚡</div>
          <h1 className="signup-title">Start for free</h1>
          <p className="signup-sub">No credit card. No IT team required. Get your first workflow running in under 30 minutes.</p>

          <div className="signup-actions">
            <a href="https://app.flow80.com/signup" className="btn-signup primary">
              Create Free Account →
            </a>
            <a href="https://app.flow80.com/login" className="btn-signup outline">
              Already have an account? Sign in
            </a>
          </div>

          <div className="signup-divider">or</div>

          <a href="https://app.flow80.com/signup?plan=pro" className="btn-signup outline" style={{ textDecoration: 'none', display: 'block' }}>
            14-day free trial — no credit card
          </a>

          <div className="signup-trust">
            <span className="trust-item">14-day free trial, no credit card</span>
            <span className="trust-item">Cancel anytime, no questions asked</span>
            <span className="trust-item">GDPR DPA available on free plan</span>
          </div>

          <div className="pricing-note">
            <strong>Starter plan from €19/mo</strong> — flat rate, unlimited workflows after trial. No per-user pricing. <a href="/en/pricing" style={{ color: 'var(--accent)' }}>See all plans →</a>
          </div>

          <p className="login-link">
            Questions? <a href="https://app.flow80.com/login">Talk to us →</a>
          </p>
        </div>
      </div>
    </>
  );
}