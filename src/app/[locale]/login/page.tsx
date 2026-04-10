'use client'

export default function LoginPage() {
  return (
    <>
      <style>{`
        .login-root {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg);
          background-image: radial-gradient(ellipse at 50% 40%, rgba(255,87,51,0.06) 0%, transparent 60%);
          padding: 2rem 1.5rem;
        }
        .login-card {
          width: 100%;
          max-width: 420px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 2.5rem;
          box-shadow: 0 24px 64px rgba(0,0,0,0.4);
        }
        .login-logo {
          text-align: center;
          margin-bottom: 2rem;
        }
        .login-logo-text {
          font-size: 1.5rem;
          font-weight: 800;
          color: #fff;
          letter-spacing: -0.02em;
          display: block;
        }
        .login-headline {
          font-size: 1.375rem;
          font-weight: 700;
          text-align: center;
          margin-bottom: 0.4rem;
        }
        .login-sub {
          font-size: 0.9rem;
          color: var(--muted);
          text-align: center;
          margin-bottom: 2rem;
        }
        .form-group {
          margin-bottom: 1.25rem;
        }
        .form-label {
          display: block;
          font-size: 0.8125rem;
          font-weight: 600;
          color: var(--text);
          margin-bottom: 0.5rem;
        }
        .form-input {
          width: 100%;
          padding: 0.75rem 1rem;
          background: var(--bg);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px;
          color: var(--text);
          font-family: var(--font);
          font-size: 0.9375rem;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .form-input:focus {
          border-color: var(--accent);
          box-shadow: 0 0 0 3px var(--accent-glow);
        }
        .form-input::placeholder {
          color: var(--muted);
        }
        .login-btn {
          width: 100%;
          padding: 0.875rem;
          background: var(--accent);
          color: #0d0d0d;
          font-family: var(--font);
          font-size: 0.9375rem;
          font-weight: 700;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
          margin-top: 0.5rem;
        }
        .login-btn:hover {
          background: #ff7048;
          box-shadow: 0 0 24px rgba(255, 87, 51, 0.4);
        }
        .login-divider {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin: 1.5rem 0;
          color: var(--muted);
          font-size: 0.8rem;
        }
        .login-divider::before,
        .login-divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: rgba(255,255,255,0.08);
        }
        .login-footer-links {
          display: flex;
          justify-content: space-between;
          margin-top: 1.25rem;
        }
        .login-footer-links a {
          font-size: 0.8125rem;
          color: var(--muted);
          text-decoration: none;
          transition: color 0.2s;
        }
        .login-footer-links a:hover {
          color: var(--accent);
          opacity: 1;
        }
        .forgot-link {
          text-align: right;
        }
        .signup-link {
          text-align: center;
          margin-top: 0;
          font-size: 0.875rem;
          color: var(--muted);
        }
        .signup-link a {
          color: var(--accent);
          font-weight: 600;
        }
      `}</style>

      <div className="login-root">
        <div className="login-card">
          <div className="login-logo">
            <span className="login-logo-text">Flow80</span>
          </div>

          <h1 className="login-headline">Welcome back</h1>
          <p className="login-sub">Sign in to your workspace</p>

          <form onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <label className="form-label" htmlFor="email">Email address</label>
              <input
                id="email"
                type="email"
                className="form-input"
                placeholder="you@company.com"
                autoComplete="email"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                className="form-input"
                placeholder="••••••••"
                autoComplete="current-password"
                required
              />
            </div>

            <button type="submit" className="login-btn">Sign In</button>
          </form>

          <div className="login-footer-links">
            <a href="/forgot-password">Forgot password?</a>
            <a href="/forgot-password" className="forgot-link">Reset it →</a>
          </div>

          <div className="signup-link">
            Don't have an account? <a href="/signup">Get started →</a>
          </div>
        </div>
      </div>
    </>
  );
}
