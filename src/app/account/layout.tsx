/**
 * Account section layout — shared shell for /account/* pages.
 * Card: 69d57927864d77f88b8251bc
 */
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Account — Flow80',
  description: 'Manage your Flow80 account, billing, and analytics.',
};

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="account-shell">
      <nav className="account-nav">
        <a href="/account/analytics"  className="account-nav__link">Analytics</a>
        <a href="/account/billing"    className="account-nav__link">Billing</a>
        <a href="/account/settings"  className="account-nav__link">Settings</a>
        <a href="/developer/getting-started" className="account-nav__link account-nav__link--dev">Developer Docs ↗</a>
      </nav>
      <main>{children}</main>
      <style jsx>{`
        .account-shell { max-width: 1200px; margin: 0 auto; padding: 0 1.5rem; }
        .account-nav {
          display: flex; gap: 1.5rem; padding: 1.25rem 0;
          border-bottom: 1px solid #1e293b; margin-bottom: 0;
        }
        .account-nav__link {
          font-size: 0.9rem; font-weight: 500; color: #64748b;
          text-decoration: none; transition: color 0.15s;
        }
        .account-nav__link:hover { color: #6366f1; }
        .account-nav__link--dev { color: #a5b4fc !important; }
      `}</style>
    </div>
  );
}
