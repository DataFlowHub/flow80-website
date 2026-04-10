'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Locale = 'en' | 'da' | 'sv';

const LOCALES: { code: Locale; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'da', label: 'DA' },
  { code: 'sv', label: 'SV' },
];

const navLinks = [
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/features', label: 'Features' },
  { href: '/templates', label: 'Templates' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/compliance', label: 'Compliance' },
];

type Props = {
  locale: Locale;
  onLocaleChange?: (locale: Locale) => void;
};

export default function Navbar({ locale, onLocaleChange }: Props) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const switchLocale = (newLocale: Locale) => {
    const segments = pathname.split('/');
    if (segments.length >= 2 && LOCALES.some(l => l.code === segments[1])) {
      segments[1] = newLocale;
    } else {
      segments.splice(1, 0, newLocale);
    }
    window.location.href = segments.join('/');
  };

  const localizedLink = (href: string) => `/${locale}${href}`;

  return (
    <>
      <style>{`
        .nav-root {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          background: rgba(13,13,13,0.92);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(255,87,51,0.08);
        }
        .nav-inner {
          max-width: 1200px; margin: 0 auto; padding: 0 1.5rem;
          height: 64px; display: flex; align-items: center; justify-content: space-between;
        }
        .nav-logo {
          font-size: 1.25rem; font-weight: 800; color: #fff;
          text-decoration: none; letter-spacing: -0.02em;
        }
        .nav-logo:hover { opacity: 1; color: #fff; }
        .nav-links { display: flex; align-items: center; gap: 2rem; list-style: none; margin: 0; padding: 0; }
        .nav-links a {
          font-size: 0.9rem; font-weight: 500; color: #888;
          text-decoration: none; transition: color 0.2s;
        }
        .nav-links a:hover { color: #f0f0f0; opacity: 1; }
        .nav-cta {
          display: inline-flex; align-items: center;
          padding: 0.5rem 1.25rem;
          background: #ff5733; color: #0d0d0d;
          font-size: 0.875rem; font-weight: 600;
          border-radius: 8px; text-decoration: none; transition: all 0.2s;
          border: none; cursor: pointer;
        }
        .nav-cta:hover { background: #ff7048; opacity: 1; box-shadow: 0 0 20px rgba(255,87,51,0.4); color: #0d0d0d; }
        .hamburger {
          display: none; flex-direction: column; justify-content: center; gap: 5px;
          background: none; border: none; cursor: pointer; padding: 4px;
        }
        .hamburger span { display: block; width: 22px; height: 2px; background: #f0f0f0; border-radius: 2px; transition: all 0.3s; }
        .mobile-menu { display: none; flex-direction: column; gap: 0; background: #141414; border-top: 1px solid rgba(255,87,51,0.1); }
        .mobile-menu.open { display: flex; }
        .mobile-menu a { display: block; padding: 1rem 1.5rem; color: #888; font-size: 1rem; font-weight: 500; text-decoration: none; border-bottom: 1px solid rgba(255,255,255,0.05); transition: color 0.2s; }
        .mobile-menu a:hover { color: #f0f0f0; opacity: 1; }
        .mobile-cta { display: block; padding: 1rem 1.5rem; background: #ff5733; color: #0d0d0d; font-weight: 600; text-decoration: none; text-align: center; }
        .lang-switcher { display: flex; align-items: center; gap: 0.25rem; }
        .lang-btn { background: none; border: 1px solid #2a2a2a; color: #888; font-size: 0.75rem; font-weight: 600; padding: 0.25rem 0.5rem; border-radius: 4px; cursor: pointer; transition: all 0.2s; }
        .lang-btn:hover { border-color: #ff5733; color: #f0f0f0; }
        .lang-btn.active { background: #ff5733; border-color: #ff5733; color: #fff; }
        .nav-right { display: flex; align-items: center; gap: 1rem; }
        @media (max-width: 768px) { .nav-links { display: none; } .hamburger { display: flex; } .lang-switcher { display: none; } }
      `}</style>

      <nav className="nav-root">
        <div className="nav-inner">
          <Link href={`/${locale}`} className="nav-logo">Flow80</Link>

          <ul className="nav-links">
            {navLinks.map(link => (
              <li key={link.href}>
                <Link href={localizedLink(link.href)}>{link.label}</Link>
              </li>
            ))}
          </ul>

          <div className="nav-right">
            <div className="lang-switcher">
              {LOCALES.map(l => (
                <button
                  key={l.code}
                  className={`lang-btn ${locale === l.code ? 'active' : ''}`}
                  onClick={() => switchLocale(l.code)}
                >
                  {l.label}
                </button>
              ))}
            </div>
            <Link href={localizedLink('/login')} className="nav-cta hide-mobile">Get Started</Link>
          </div>

          <button className="hamburger hide-desktop" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            <span /><span /><span />
          </button>
        </div>

        <div className={`mobile-menu ${open ? 'open' : ''}`}>
          {navLinks.map(link => (
            <Link key={link.href} href={localizedLink(link.href)} onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          ))}
          <Link href={localizedLink('/login')} className="mobile-cta" onClick={() => setOpen(false)}>
            Get Started
          </Link>
        </div>
      </nav>
    </>
  );
}
