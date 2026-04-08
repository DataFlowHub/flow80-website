'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  label: string;
  href: string;
  badge?: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const NAV: NavSection[] = [
  {
    title: 'Getting Started',
    items: [
      { label: 'Introduction', href: '/developer/getting-started' },
      { label: 'Authentication', href: '/developer/authentication' },
    ],
  },
  {
    title: 'API Reference',
    items: [
      { label: 'Overview', href: '/developer/api-reference' },
      { label: 'Webhooks', href: '/developer/webhooks' },
    ],
  },
  {
    title: 'Examples',
    items: [
      { label: 'Code Examples', href: '/developer/code-examples' },
    ],
  },
];

export default function DevSidebar() {
  const pathname = usePathname();

  return (
    <aside className="dev-sidebar">
      <div className="dev-sidebar__brand">
        <Link href="/developer/getting-started" className="dev-sidebar__logo">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="#6366f1" stroke="#6366f1" strokeWidth="1.5" strokeLinejoin="round" />
          </svg>
          <span>Flow80</span>
          <span className="dev-sidebar__logo-sub">Docs</span>
        </Link>
      </div>

      <nav className="dev-sidebar__nav" aria-label="Developer documentation">
        {NAV.map(section => (
          <div key={section.title} className="dev-sidebar__section">
            <p className="dev-sidebar__section-title">{section.title}</p>
            <ul className="dev-sidebar__list">
              {section.items.map(item => {
                const active = pathname === item.href || pathname === item.href + '/';
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`dev-sidebar__link${active ? ' dev-sidebar__link--active' : ''}`}
                    >
                      {item.label}
                      {item.badge && (
                        <span className="dev-sidebar__badge">{item.badge}</span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="dev-sidebar__footer">
        <a href="https://flow80.com" className="dev-sidebar__footer-link">
          ← Back to Flow80
        </a>
      </div>

      <style jsx>{`
        .dev-sidebar {
          width: 260px;
          min-width: 260px;
          height: 100vh;
          position: sticky;
          top: 0;
          background: #0d1117;
          border-right: 1px solid #21262d;
          display: flex;
          flex-direction: column;
          overflow-y: auto;
          overflow-x: hidden;
          scrollbar-width: thin;
          scrollbar-color: #30363d transparent;
        }
        .dev-sidebar::-webkit-scrollbar { width: 4px; }
        .dev-sidebar::-webkit-scrollbar-thumb { background: #30363d; border-radius: 4px; }

        .dev-sidebar__brand {
          padding: 20px 20px 16px;
          border-bottom: 1px solid #21262d;
        }
        .dev-sidebar__logo {
          display: flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          font-size: 15px;
          font-weight: 700;
          color: #f0f6fc;
          letter-spacing: -0.01em;
        }
        .dev-sidebar__logo-sub {
          font-size: 11px;
          font-weight: 600;
          color: #8b949e;
          background: rgba(255,255,255,0.06);
          border: 1px solid #30363d;
          padding: 1px 7px;
          border-radius: 4px;
          letter-spacing: 0.03em;
          text-transform: uppercase;
        }

        .dev-sidebar__nav {
          flex: 1;
          padding: 20px 12px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .dev-sidebar__section {}
        .dev-sidebar__section-title {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.07em;
          color: #8b949e;
          padding: 0 8px;
          margin: 0 0 6px;
        }
        .dev-sidebar__list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 1px;
        }
        .dev-sidebar__link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 7px 8px;
          border-radius: 6px;
          font-size: 13.5px;
          color: #8b949e;
          text-decoration: none;
          transition: background 0.12s, color 0.12s;
          font-weight: 500;
        }
        .dev-sidebar__link:hover { background: rgba(255,255,255,0.06); color: #e6edf3; }
        .dev-sidebar__link--active {
          background: rgba(99,102,241,0.12) !important;
          color: #a5b4fc !important;
        }
        .dev-sidebar__badge {
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: #10b981;
          background: rgba(16,185,129,0.1);
          border: 1px solid rgba(16,185,129,0.2);
          padding: 1px 6px;
          border-radius: 4px;
        }

        .dev-sidebar__footer {
          padding: 16px 20px;
          border-top: 1px solid #21262d;
        }
        .dev-sidebar__footer-link {
          font-size: 12px;
          color: #8b949e;
          text-decoration: none;
          transition: color 0.12s;
        }
        .dev-sidebar__footer-link:hover { color: #e6edf3; }
      `}</style>
    </aside>
  );
}
