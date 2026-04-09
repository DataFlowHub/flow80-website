'use client';

import { useState } from 'react';

export type Language = 'php' | 'python' | 'node' | 'ruby' | 'go' | 'curl';

export const LANG_LABELS: Record<Language, string> = {
  php: 'PHP', python: 'Python', node: 'Node.js', ruby: 'Ruby', go: 'Go', curl: 'cURL',
};

interface TabPaneProps {
  lang: Language;
  children: React.ReactNode;
}

export function TabPane({ lang, children }: TabPaneProps) {
  return (
    <div data-lang={lang} style={{ display: 'none' }}>
      {children}
    </div>
  );
}

interface LanguageTabsProps {
  children: React.ReactElement<TabPaneProps> | React.ReactElement<TabPaneProps>[];
}

export default function LanguageTabs({ children }: LanguageTabsProps) {
  const kids = Array.isArray(children) ? children : [children];
  const firstLang = kids[0]?.props?.lang as Language | undefined;
  const [active, setActive] = useState<Language>(firstLang ?? 'curl');

  return (
    <div className="lang-tabs">
      <div className="lang-tabs__bar">
        {(Object.keys(LANG_LABELS) as Language[]).map(lang => (
          <button
            key={lang}
            className={`lang-tabs__btn${active === lang ? ' lang-tabs__btn--active' : ''}`}
            onClick={() => setActive(lang)}
          >
            {LANG_LABELS[lang]}
          </button>
        ))}
      </div>
      <div className="lang-tabs__content">
        {kids.map((child, i) => {
          const childLang = child?.props?.lang as Language;
          return (
            <div key={i} style={{ display: childLang === active ? 'block' : 'none' }}>
              {child}
            </div>
          );
        })}
      </div>

      <style jsx>{`
        .lang-tabs {}
        .lang-tabs__bar {
          display: flex;
          gap: 2px;
          background: #161b22;
          border: 1px solid #21262d;
          border-bottom: none;
          border-radius: 10px 10px 0 0;
          padding: 6px 6px 0;
          overflow-x: auto;
        }
        .lang-tabs__btn {
          padding: 7px 16px;
          border-radius: 7px 7px 0 0;
          font-size: 12.5px;
          font-weight: 600;
          font-family: 'Inter', system-ui, sans-serif;
          color: #8b949e;
          background: none;
          border: none;
          cursor: pointer;
          transition: color 0.15s, background 0.15s;
          white-space: nowrap;
        }
        .lang-tabs__btn:hover { color: #e6edf3; background: rgba(255,255,255,0.05); }
        .lang-tabs__btn--active { color: #e6edf3 !important; background: #0d1117 !important; }
        .lang-tabs__content :global(.code-block) {
          border-radius: 0 0 10px 10px;
          border-top: none;
        }
      `}</style>
    </div>
  );
}
