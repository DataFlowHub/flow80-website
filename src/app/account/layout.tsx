/**
 * Account section layout — shared shell for /account/* pages.
 * Card: 69d57927864d77f88b8251bc
 */
import type { Metadata } from 'next';
import '@/styles/account.css';

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
    </div>
  );
}
