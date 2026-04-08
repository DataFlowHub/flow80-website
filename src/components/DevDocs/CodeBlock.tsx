'use client';

import { useState } from 'react';

interface CodeBlockProps {
  code: string;
  language?: string;
  highlightLines?: number[];
}

function copyToClipboard(text: string, setter: (v: boolean) => void) {
  navigator.clipboard.writeText(text).then(() => {
    setter(true);
    setTimeout(() => setter(false), 1800);
  });
}

export default function CodeBlock({ code, language, highlightLines = [] }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const lines = code.split('\n');

  return (
    <div className="code-block">
      <div className="code-block__header">
        <span className="code-block__lang">{language ?? 'code'}</span>
        <button
          className="code-block__copy"
          onClick={() => copyToClipboard(code, setCopied)}
          aria-label="Copy code"
        >
          {copied ? (
            <span style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: 4 }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              Copied!
            </span>
          ) : (
            <>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 5 }}>
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              Copy
            </>
          )}
        </button>
      </div>
      <pre className="code-block__pre"><code>
        {lines.map((line, i) => (
          <span
            key={i}
            className={`code-line${highlightLines.includes(i + 1) ? ' code-line--highlight' : ''}`}
          >
            <span className="code-line__num">{i + 1}</span>
            <span className="code-line__text">{line || ' '}</span>
          </span>
        ))}
      </code></pre>

      <style jsx>{`
        .code-block {
          background: #0d1117;
          border: 1px solid #21262d;
          border-radius: 10px;
          overflow: hidden;
          font-family: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace;
          font-size: 13.5px;
          line-height: 1.65;
        }
        .code-block__header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 16px;
          background: #161b22;
          border-bottom: 1px solid #21262d;
        }
        .code-block__lang {
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: #8b949e;
        }
        .code-block__copy {
          display: inline-flex;
          align-items: center;
          background: none;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 5px;
          padding: 3px 10px;
          color: #8b949e;
          font-size: 11.5px;
          font-family: 'Inter', system-ui, sans-serif;
          cursor: pointer;
          transition: all 0.15s;
        }
        .code-block__copy:hover { background: rgba(255,255,255,0.08); color: #e6edf3; }
        .code-block__pre {
          margin: 0;
          padding: 16px 0;
          overflow-x: auto;
        }
        .code-block__pre code { display: block; }
        .code-line {
          display: flex;
          padding: 0 16px;
          min-height: 1.65em;
        }
        .code-line--highlight {
          background: rgba(99,102,241,0.1);
          border-left: 2px solid #6366f1;
        }
        .code-line__num {
          min-width: 36px;
          padding-right: 16px;
          color: #3b444d;
          user-select: none;
          text-align: right;
          flex-shrink: 0;
        }
        .code-line__text { color: #e6edf3; white-space: pre; }
      `}</style>
    </div>
  );
}
