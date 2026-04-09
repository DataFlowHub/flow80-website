
'use client';

/**
 * Flow80 — Developer Portal / API Reference
 * Card: 69d0f53115a6e8f21953c43b
 *
 * Styled after Mailgun's developer docs:
 *   - Sandbox domain + Base URL header with copy buttons
 *   - Language tabs (PHP, Python, Node, Ruby, Go, cURL)
 *   - Dark-themed code blocks with line numbers + copy button
 *   - Sections: Authentication, Endpoints, Webhooks, Sandbox vs Production
 *   - "Need help?" footer
 */

'use client';

import { useState, useCallback } from 'react';

// ─── Shared Types ───────────────────────────────────────────────────────────

type Language = 'php' | 'python' | 'node' | 'ruby' | 'go' | 'curl';

interface CodeBlockProps {
  code: string;
  language?: string;
  highlightLines?: number[];
}

interface EndpointDef {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  description: string;
  body?: string;
}

// ─── Utility ───────────────────────────────────────────────────────────────

function copyToClipboard(text: string, setter: (v: boolean) => void) {
  navigator.clipboard.writeText(text).then(() => {
    setter(true);
    setTimeout(() => setter(false), 1800);
  });
}

// ─── Copy Button ───────────────────────────────────────────────────────────

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      className="copy-btn"
      onClick={() => copyToClipboard(text, setCopied)}
      title="Copy to clipboard"
      aria-label="Copy to clipboard"
    >
      {copied ? (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
      )}
      <style jsx>{`
        .copy-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 6px;
          padding: 4px 8px;
          color: #94a3b8;
          cursor: pointer;
          transition: background 0.15s, color 0.15s;
          line-height: 1;
        }
        .copy-btn:hover { background: rgba(255,255,255,0.12); color: #e2e8f0; }
      `}</style>
    </button>
  );
}

// ─── Code Block ────────────────────────────────────────────────────────────

function CodeBlock({ code, language, highlightLines = [] }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const lines = code.split('\n');

  const handleCopy = () => copyToClipboard(code, setCopied);

  return (
    <div className="code-block">
      <div className="code-block__header">
        <span className="code-block__lang">{language ?? 'code'}</span>
        <button className="code-block__copy" onClick={handleCopy} aria-label="Copy code">
          {copied ? (
            <span style={{ color: '#10b981' }}>Copied!</span>
          ) : (
            <>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 5 }}>
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              Copy
            </>
          )}
        </button>
      </div>
      <pre className="code-block__pre">
        <code>
          {lines.map((line, i) => (
            <span
              key={i}
              className={`code-line${highlightLines.includes(i + 1) ? ' code-line--highlight' : ''}`}
            >
              <span className="code-line__num">{i + 1}</span>
              <span className="code-line__text">{line || ' '}</span>
            </span>
          ))}
        </code>
      </pre>
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
          font-family: var(--font-body, 'Inter', sans-serif);
          cursor: pointer;
          transition: all 0.15s;
        }
        .code-block__copy:hover { background: rgba(255,255,255,0.08); color: #e6edf3; }
        .code-block__pre {
          margin: 0;
          padding: 16px 0;
          overflow-x: auto;
        }
        .code-block__pre code {
          display: block;
        }
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
        .code-line__text {
          color: #e6edf3;
          white-space: pre;
        }
      `}</style>
    </div>
  );
}

// ─── Language Tabs ─────────────────────────────────────────────────────────

const LANG_LABELS: Record<Language, string> = {
  php: 'PHP', python: 'Python', node: 'Node.js', ruby: 'Ruby', go: 'Go', curl: 'cURL',
};

function LanguageTabs({ children }: { children: React.ReactNode }) {
  // children is expected to be an array of React.ReactElement with a `data-lang` prop
  const kids = Array.isArray(children) ? children : [children];
  const firstLang = (kids[0]?.props as any)?.['data-lang'] as Language | undefined;
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
          const childLang = (child?.props as any)?.['data-lang'] as Language;
          return childLang === active ? (
            <div key={i} className="lang-tabs__pane">{child}</div>
          ) : null;
        })}
      </div>
      <style jsx>{`
        .lang-tabs { margin-bottom: 0; }
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
          font-family: var(--font-body, 'Inter', sans-serif);
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
        .lang-tabs__pane { display: block; }
      `}</style>
    </div>
  );
}

// ─── Section Block ─────────────────────────────────────────────────────────

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section className="dev-section" id={id}>
      <h2 className="dev-section__title">{title}</h2>
      {children}
      <style jsx>{`
        .dev-section { margin-bottom: 3.5rem; }
        .dev-section__title {
          font-size: 1.3rem;
          font-weight: 700;
          color: #f1f5f9;
          margin: 0 0 1.25rem;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid #1e293b;
        }
      `}</style>
    </section>
  );
}

// ─── Endpoint Card ─────────────────────────────────────────────────────────

function EndpointCard({ method, path, description, body }: EndpointDef) {
  const methodColors: Record<string, string> = {
    GET: '#10b981', POST: '#6366f1', PUT: '#f59e0b', DELETE: '#ef4444',
  };
  return (
    <div className="endpoint-card">
      <div className="endpoint-card__head">
        <span className="endpoint-card__method" style={{ color: methodColors[method] }}>
          {method}
        </span>
        <code className="endpoint-card__path">{path}</code>
      </div>
      <p className="endpoint-card__desc">{description}</p>
      {body && (
        <details className="endpoint-card__details">
          <summary>Request body</summary>
          <pre className="endpoint-card__body"><code>{body}</code></pre>
        </details>
      )}
      <style jsx>{`
        .endpoint-card {
          background: #0d1117;
          border: 1px solid #21262d;
          border-radius: 10px;
          padding: 1.1rem 1.25rem;
          margin-bottom: 1rem;
          font-family: 'JetBrains Mono', 'Fira Code', monospace;
        }
        .endpoint-card__head { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.5rem; flex-wrap: wrap; }
        .endpoint-card__method {
          font-size: 11.5px;
          font-weight: 700;
          letter-spacing: 0.05em;
          padding: 2px 8px;
          border-radius: 4px;
          background: rgba(255,255,255,0.06);
          border: 1px solid currentColor;
          opacity: 0.9;
        }
        .endpoint-card__path { font-size: 13.5px; color: #e6edf3; }
        .endpoint-card__desc { font-size: 13.5px; color: #8b949e; font-family: var(--font-body, 'Inter', sans-serif); margin: 0; line-height: 1.6; }
        .endpoint-card__details { margin-top: 0.75rem; }
        .endpoint-card__details summary {
          font-size: 12px;
          color: #6366f1;
          cursor: pointer;
          font-family: var(--font-body, 'Inter', sans-serif);
          user-select: none;
        }
        .endpoint-card__body {
          background: #161b22;
          border: 1px solid #21262d;
          border-radius: 6px;
          padding: 0.75rem 1rem;
          margin-top: 0.5rem;
          overflow-x: auto;
          font-size: 12.5px;
          color: #e6edf3;
        }
      `}</style>
    </div>
  );
}

// ─── Inline Code ───────────────────────────────────────────────────────────

function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <>
      <code className="inline-code">{children}</code>
      <style jsx>{`
        .inline-code {
          font-family: 'JetBrains Mono', 'Fira Code', monospace;
          font-size: 0.85em;
          background: rgba(99,102,241,0.12);
          color: #a5b4fc;
          padding: 2px 6px;
          border-radius: 4px;
          border: 1px solid rgba(99,102,241,0.2);
        }
      `}</style>
    </>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────

export default function DeveloperPage() {
  const [baseUrlCopied, setBaseUrlCopied] = useState(false);
  const [sandboxCopied, setSandboxCopied] = useState(false);

  const BASE_URL = 'https://app.flow80.com/api/v1';
  const SANDBOX_DOMAIN = 'sandbox.flow80.com';

  // ── Auth code samples ──────────────────────────────────────────────────
  const authSamples: Record<Language, string> = {
    php: `<?php
// Flow80 API — Authentication
$api_key = 'flw_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';

$ch = curl_init('${BASE_URL}/flows');
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ' . $api_key,
    'Content-Type: application/json',
]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
curl_close($ch);`,
    python: `import requests

API_KEY = "flw_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
BASE_URL = "${BASE_URL}"

headers = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json",
}

response = requests.get(f"{BASE_URL}/flows", headers=headers)
print(response.json())`,
    node: `// Flow80 API — Authentication
const API_KEY = 'flw_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
const BASE_URL = '${BASE_URL}';

const response = await fetch(\`\${BASE_URL}/flows\`, {
  headers: {
    'Authorization': \`Bearer \${API_KEY}\`,
    'Content-Type': 'application/json',
  },
});

const data = await response.json();
console.log(data);`,
    ruby: `# Flow80 API — Authentication
require 'net/http'
require 'json'

API_KEY = 'flw_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
BASE_URL = '${BASE_URL}'

uri = URI("#{BASE_URL}/flows")
req = Net::HTTP::Get.new(uri)
req['Authorization'] = "Bearer #{API_KEY}"
req['Content-Type'] = 'application/json'

res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(req) }
puts JSON.parse(res.body)`,
    go: `package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {
	apiKey := "flw_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
	baseURL := "${BASE_URL}"

	req, _ := http.NewRequest("GET", baseURL+"/flows", nil)
	req.Header.Set("Authorization", "Bearer "+apiKey)
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil { panic(err) }
	defer resp.Body.Close()
	body, _ := io.ReadAll(resp.Body)
	fmt.Println(string(body))
}`,
    curl: `curl -X GET "${BASE_URL}/flows" \\
  -H "Authorization: Bearer flw_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" \\
  -H "Content-Type: application/json"`,
  };

  // ── Execute workflow samples ──────────────────────────────────────────
  const executeSamples: Record<Language, string> = {
    php: `<?php
$ch = curl_init('${BASE_URL}/flows/execute');
curl_setopt_array($ch, [
    CURLOPT_HTTPHEADER => [
        'Authorization: Bearer ' . $api_key,
        'Content-Type: application/json',
    ],
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => json_encode([
        'flow_id'    => 'wf_xxxxxxxxxxxxxxxx',
        'trigger'    => 'api',
        'payload'   => ['order_id' => 'ORD-12345'],
    ]),
    CURLOPT_RETURNTRANSFER => true,
]);
$res   = curl_exec($ch);
$http  = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

echo "Status: $http\\n";`,
    python: `import requests

resp = requests.post(
    f"{BASE_URL}/flows/execute",
    headers={"Authorization": f"Bearer {API_KEY}", "Content-Type": "application/json"},
    json={
        "flow_id": "wf_xxxxxxxxxxxxxxxx",
        "trigger": "api",
        "payload": {"order_id": "ORD-12345"},
    },
)
print(f"Status: {resp.status_code}")`,
    node: `const resp = await fetch(\`\${BASE_URL}/flows/execute\`, {
  method: 'POST',
  headers: {
    'Authorization': \`Bearer \${API_KEY}\`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    flow_id: 'wf_xxxxxxxxxxxxxxxx',
    trigger: 'api',
    payload: { order_id: 'ORD-12345' },
  }),
});
console.log('Status:', resp.status);`,
    ruby: `require 'net/http'
require 'json'

uri = URI("#{BASE_URL}/flows/execute")
req = Net::HTTP::Post.new(uri)
req['Authorization'] = "Bearer #{API_KEY}"
req['Content-Type'] = 'application/json'
req.body = JSON.generate({
  flow_id: 'wf_xxxxxxxxxxxxxxxx',
  trigger: 'api',
  payload: { order_id: 'ORD-12345' },
})

res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(req) }
puts "Status: #{res.code}"`,
    go: `payload := \`{"flow_id":"wf_xxxxxxxxxxxxxxxx","trigger":"api","payload":{"order_id":"ORD-12345"}}\`
req, _ := http.NewRequest("POST", baseURL+"/flows/execute", strings.NewReader(payload))
req.Header.Set("Authorization", "Bearer "+apiKey)
req.Header.Set("Content-Type", "application/json")
// ...`,
    curl: `curl -X POST "${BASE_URL}/flows/execute" \\
  -H "Authorization: Bearer flw_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" \\
  -H "Content-Type: application/json" \\
  -d '{"flow_id":"wf_xxxxxxxxxxxxxxxx","trigger":"api","payload":{"order_id":"ORD-12345"}}'`,
  };

  // ── HMAC signature verification ──────────────────────────────────────
  const hmacSamples: Record<Language, string> = {
    php: `<?php
// Flow80 — Verify inbound webhook signature (HMAC-SHA256)
function verify_flow80_signature(
    string $payload,
    string $signature,
    string $secret
): bool {
    $expected = hash_hmac('sha256', $payload, $secret);
    return hash_equals($expected, $signature);
}

// In your webhook handler:
$raw_body   = file_get_contents('php://input');
$headers    = getallheaders();
$signature  = $headers['X-Flow80-Signature'] ?? '';
$webhook_secret = 'whsec_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';

if (!verify_flow80_signature($raw_body, $signature, $webhook_secret)) {
    http_response_code(401);
    exit('Invalid signature');
}

// Payload is a JSON object:
$data = json_decode($raw_body, true);
// → $data['event'], $data['flow_id'], $data['run_id'], $data['timestamp']`,
    python: `import hmac
import hashlib
import json
from flask import request, abort

def verify_signature(payload: bytes, signature: str, secret: str) -> bool:
    expected = hmac.new(secret.encode(), payload, hashlib.sha256).hexdigest()
    return hmac.compare_digest(expected, signature)

@app.route('/webhooks/inbound', methods=['POST'])
def inbound_webhook():
    sig   = request.headers.get('X-Flow80-Signature', '')
    secret = 'whsec_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'

    if not verify_signature(request.data, sig, secret):
        abort(401)

    data = request.get_json()
    print(data['event'], data['flow_id'])
    return '', 200`,
    node: `import crypto from 'crypto';

function verifySignature(payload, signature, secret) {
  const expected = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  return crypto.timingSafeEqual(
    Buffer.from(expected),
    Buffer.from(signature)
  );
}

app.post('/webhooks/inbound', (req, res) => {
  const sig    = req.headers['x-flow80-signature'];
  const secret = 'whsec_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';

  if (!verifySignature(req.rawBody, sig, secret)) {
    return res.status(401).send('Invalid signature');
  }

  const { event, flow_id, run_id } = req.body;
  res.sendStatus(200);
});`,
    ruby: `# Ruby — verify webhook signature
require 'openssl'
require 'json'

def verify_signature(payload, signature, secret)
  expected = OpenSSL::HMAC.hexdigest('SHA256', secret, payload)
  ActiveSupport::SecurityUtils.secure_compare(expected, signature)
end

# In your webhook controller:
raw_body   = request.body.read
signature  = request.headers['X-Flow80-Signature']
webhook_secret = 'whsec_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'

unless verify_signature(raw_body, signature, webhook_secret)
  head :unauthorized
end

data = JSON.parse(raw_body)`,
    go: `package main

import (
	"crypto/hmac"
	"crypto/sha256"
	"encoding/hex"
	"io"
	"net/http"
)

func verifySignature(payload []byte, signature, secret string) bool {
	mac := hmac.New(sha256.New, []byte(secret))
	mac.Write(payload)
	expected := hex.EncodeToString(mac.Sum(nil))
	return hmac.Equal([]byte(expected), []byte(signature))
}

func webhookHandler(w http.ResponseWriter, r *http.Request) {
	body, _ := io.ReadAll(r.Body)
	sig := r.Header.Get("X-Flow80-Signature")
	if !verifySignature(body, sig, "whsec_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx") {
		http.Error(w, "invalid signature", 401)
		return
	}
	// process webhook ...
}`,
    curl: `# Webhook signature verification is server-side only.
# The X-Flow80-Signature header contains the HMAC-SHA256
# of the raw request body, signed with your webhook secret.
#
# Always verify server-side — never in client-side code.
#
# To inspect a webhook payload locally with cURL:
curl -X POST "${BASE_URL}/webhooks/inbound" \\
  -H "Content-Type: application/json" \\
  -H "X-Flow80-Signature: <computed_signature>" \\
  -d '{"event":"flow.completed","flow_id":"wf_xxx","run_id":"run_xxx"}'`,
  };

  // ── Render language-tabbed code blocks ────────────────────────────────
  const renderAuthTab = (lang: Language) => (
    <div data-lang={lang}><CodeBlock code={authSamples[lang]} language={LANG_LABELS[lang]} /></div>
  );
  const renderExecuteTab = (lang: Language) => (
    <div data-lang={lang}><CodeBlock code={executeSamples[lang]} language={LANG_LABELS[lang]} /></div>
  );
  const renderHmacTab = (lang: Language) => (
    <div data-lang={lang}><CodeBlock code={hmacSamples[lang]} language={LANG_LABELS[lang]} /></div>
  );

  return (
    <div className="dev-portal">
      {/* ── Page Header ── */}
      <div className="dev-portal__header">
        <div className="dev-portal__header-inner">
          <div>
            <h1 className="dev-portal__title">Developer Portal</h1>
            <p className="dev-portal__subtitle">Build powerful workflow integrations with the Flow80 API</p>
          </div>
        </div>
      </div>

      {/* ── Base URL + Sandbox Banner ── */}
      <div className="dev-portal__base-url-banner">
        <div className="base-url-row">
          <div className="base-url-row__label">Base URL</div>
          <code className="base-url-row__value">{BASE_URL}</code>
          <CopyButton text={BASE_URL} />
        </div>
        <div className="base-url-row">
          <div className="base-url-row__label base-url-row__label--sandbox">Sandbox</div>
          <code className="base-url-row__value">{SANDBOX_DOMAIN}</code>
          <CopyButton text={SANDBOX_DOMAIN} />
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="dev-portal__content">

        {/* ── Authentication ── */}
        <Section id="authentication" title="Authentication">
          <p className="dev-section__intro">
            All API requests require an API key passed in the{' '}
            <InlineCode>Authorization</InlineCode> header as a Bearer token.
            Your API keys are available in{' '}
            <a href="/account/settings/api-keys" className="dev-link">Settings → API Keys</a>.
          </p>
          <div className="auth-format">
            <CodeBlock
              code={`Authorization: Bearer flw_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`}
              language="http"
            />
          </div>
          <div className="api-key-format">
            <h3 className="api-key-format__title">API Key Format</h3>
            <ul className="api-key-format__list">
              <li><InlineCode>flw_live_…</InlineCode> — Production key. Billed, full rate limits.</li>
              <li><InlineCode>flw_test_…</InlineCode> — Sandbox key. No billing, isolated environment.</li>
              <li><InlineCode>flw_dev_…</InlineCode> — Development key. Higher limits, logs visible to account owner.</li>
            </ul>
          </div>
          <div className="tabbed-block">
            <h3 className="tabbed-block__title">Authenticate a Request</h3>
            <LanguageTabs>
              {(Object.keys(LANG_LABELS) as Language[]).map(lang => renderAuthTab(lang))}
            </LanguageTabs>
          </div>
        </Section>

        {/* ── Endpoints ── */}
        <Section id="endpoints" title="Key Endpoints">

          <EndpointCard
            method="GET"
            path="/api/v1/flows"
            description="Returns a paginated list of all workflows in your account."
          />
          <EndpointCard
            method="POST"
            path="/api/v1/flows/execute"
            description="Triggers a workflow execution via the API."
            body={`{
  "flow_id": "wf_xxxxxxxxxxxxxxxx",
  "trigger": "api",
  "payload": {
    "order_id": "ORD-12345",
    "customer_email": "jane@example.com"
  }
}`}
          />
          <EndpointCard
            method="POST"
            path="/api/v1/webhooks/inbound"
            description="Receive inbound events from external systems. Flow80 sends a POST to your configured endpoint on workflow events."
          />
          <EndpointCard
            method="GET"
            path="/api/v1/usage"
            description="Returns your current API usage including executions used/remaining and rate limit status."
          />
          <EndpointCard
            method="GET"
            path="/api/v1/account"
            description="Returns details about the authenticated account: plan, status, creation date, and billing info."
          />

          <div className="tabbed-block">
            <h3 className="tabbed-block__title">Trigger a Workflow</h3>
            <LanguageTabs>
              {(Object.keys(LANG_LABELS) as Language[]).map(lang => renderExecuteTab(lang))}
            </LanguageTabs>
          </div>
        </Section>

        {/* ── Webhooks ── */}
        <Section id="webhooks" title="Webhooks">
          <p className="dev-section__intro">
            Configure outbound webhooks in{' '}
            <a href="/account/settings/webhooks" className="dev-link">Settings → Webhooks</a>.
            Flow80 will POST JSON to your endpoint on workflow events.
          </p>

          <h3 className="webhook-format__title">Webhook Payload Format</h3>
          <CodeBlock
            code={`{
  "event":       "flow.completed",
  "flow_id":     "wf_xxxxxxxxxxxxxxxx",
  "run_id":      "run_yyyyyyyyyyyyyyyy",
  "timestamp":   "2026-04-08T10:23:45Z",
  "payload":     {
    "order_id":      "ORD-12345",
    "status":        "completed",
    "steps_executed": 4,
    "duration_ms":   1243
  }
}`}
            language="json"
          />

          <h3 className="webhook-format__title" style={{ marginTop: '1.5rem' }}>Webhook Events</h3>
          <div className="event-list">
            {[
              ['flow.started',      'Fired when a workflow execution begins.'],
              ['flow.completed',    'Fired when a workflow finishes successfully.'],
              ['flow.failed',       'Fired when a workflow errors or times out.'],
              ['flow.step_completed', 'Fired after each individual step.'],
              ['webhook.delivered', 'Fired when Flow80 receives an inbound webhook.'],
            ].map(([event, desc]) => (
              <div key={event} className="event-list__item">
                <InlineCode>{event}</InlineCode>
                <span>{desc}</span>
              </div>
            ))}
          </div>

          <h3 className="webhook-format__title" style={{ marginTop: '1.5rem' }}>Signature Verification</h3>
          <p className="dev-section__intro">
            Every outbound webhook includes an{' '}
            <InlineCode>X-Flow80-Signature</InlineCode> header — the HMAC-SHA256 of the raw
            request body, signed with your webhook secret.{' '}
            <strong>Always verify this server-side.</strong>
          </p>
          <div className="tabbed-block">
            <LanguageTabs>
              {(Object.keys(LANG_LABELS) as Language[]).map(lang => renderHmacTab(lang))}
            </LanguageTabs>
          </div>

          <h3 className="webhook-format__title" style={{ marginTop: '1.5rem' }}>Retry Behavior</h3>
          <div className="retry-table">
            {[
              ['2xx',           'Success — acknowledged within 10 seconds'],
              ['4xx',           'Not retried. Fix the request payload.'],
              ['5xx / timeout', 'Retried with exponential backoff: 30s, 2m, 10m, 1h'],
              ['Max retries',  '4 attempts total. After that, the event is marked failed.'],
            ].map(([code, note]) => (
              <div key={String(code)} className="retry-row">
                <code className="retry-row__code">{code}</code>
                <span className="retry-row__note">{note}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* ── Sandbox vs Production ── */}
        <Section id="environments" title="Sandbox vs Production">
          <p className="dev-section__intro">
            Flow80 maintains a separate sandbox environment for development and testing.
            No actions in the sandbox affect production — no billing, no real integrations.
          </p>
          <div className="env-table">
            <div className="env-row env-row--header">
              <span>Environment</span>
              <span>Domain</span>
              <span>Billing</span>
              <span>Rate Limits</span>
            </div>
            {[
              ['Sandbox',    SANDBOX_DOMAIN, 'Never billed', 'Generous (10× prod)'],
              ['Production', 'app.flow80.com', 'Yes', 'Per plan limits'],
            ].map(([env, domain, billing, limits]) => (
              <div key={String(env)} className="env-row">
                <span className="env-row__env">{env}</span>
                <code className="env-row__val">{domain}</code>
                <span className="env-row__val">{limits}</span>
              </div>
            ))}
          </div>

          <div className="env-switch-note">
            <p>
              <strong>Switching environments:</strong> Use your{' '}
              <InlineCode>flw_test_…</InlineCode> API key for sandbox requests.
              In the UI, use the <strong>Sandbox mode</strong> toggle in the workflow editor.
            </p>
          </div>
        </Section>

        {/* ── Rate Limits ── */}
        <Section id="rate-limits" title="Rate Limits">
          <p className="dev-section__intro">
            Rate limits are applied per API key. Limits reset every 60 seconds (sliding window).
          </p>
          <div className="rate-limit-table">
            {[
              ['Sandbox', '1,000 req / min'],
              ['Starter', '300 req / min'],
              ['Growth', '1,000 req / min'],
              ['Enterprise', 'Custom — contact us'],
            ].map(([plan, limit]) => (
              <div key={String(plan)} className="rate-limit-row">
                <span className="rate-limit-row__plan">{plan}</span>
                <code className="rate-limit-row__limit">{limit}</code>
              </div>
            ))}
          </div>
          <p className="dev-section__intro" style={{ marginTop: '0.75rem' }}>
            Exceeding the rate limit returns{' '}
            <InlineCode>429 Too Many Requests</InlineCode> with a{' '}
            <InlineCode>Retry-After</InlineCode> header indicating seconds to wait.
          </p>
        </Section>

        {/* ── Error Codes ── */}
        <Section id="errors" title="Error Codes">
          <div className="error-table">
            {[
              ['400', 'Bad Request', 'Invalid JSON or missing required fields.'],
              ['401', 'Unauthorized', 'Missing or invalid API key.'],
              ['403', 'Forbidden', 'Valid key but insufficient permissions for this resource.'],
              ['404', 'Not Found', 'Flow, webhook, or resource does not exist.'],
              ['422', 'Unprocessable', 'Request is valid but the action cannot be performed (e.g., flow is paused).'],
              ['429', 'Too Many Requests', 'Rate limit exceeded. Check Retry-After header.'],
              ['500', 'Internal Error', 'Something went wrong on our end. Retry with backoff.'],
            ].map(([code, name, desc]) => (
              <div key={code} className="error-row">
                <code className="error-row__code">{code}</code>
                <span className="error-row__name">{name}</span>
                <span className="error-row__desc">{desc}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* ── Need Help? ── */}
        <div className="dev-help-footer">
          <div className="dev-help-footer__inner">
            <div className="dev-help-footer__icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>
            <div className="dev-help-footer__text">
              <h3 className="dev-help-footer__heading">Need help?</h3>
              <p className="dev-help-footer__sub">
                Our integration team is available Mon–Fri, 9:00–17:00 CET.
              </p>
            </div>
            <div className="dev-help-footer__actions">
              <a href="mailto:api@flow80.com" className="dev-help-footer__link dev-help-footer__link--primary">
                api@flow80.com
              </a>
              <a href="/docs" className="dev-help-footer__link">
                Docs Home
              </a>
              <a href="/account/settings/api-keys" className="dev-help-footer__link">
                API Keys
              </a>
            </div>
          </div>
        </div>

      </div>{/* /content */}

      {/* ── Global Styles ── */}
      <style jsx global>{`
        .dev-portal {
          max-width: 1100px;
          margin: 0 auto;
          padding: 2rem 1.5rem 4rem;
          font-family: 'Inter', system-ui, sans-serif;
          color: #f1f5f9;
        }
        .dev-portal__header {
          margin-bottom: 1.75rem;
        }
        .dev-portal__header-inner {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 1rem;
        }
        .dev-portal__title {
          font-size: 2rem;
          font-weight: 700;
          color: #f8fafc;
          margin: 0 0 0.35rem;
          letter-spacing: -0.02em;
        }
        .dev-portal__subtitle {
          font-size: 1rem;
          color: #64748b;
          margin: 0;
        }

        /* Base URL Banner */
        .dev-portal__base-url-banner {
          background: #161b22;
          border: 1px solid #21262d;
          border-radius: 12px;
          padding: 0.85rem 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          margin-bottom: 2.5rem;
        }
        .base-url-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .base-url-row__label {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: #8b949e;
          min-width: 80px;
        }
        .base-url-row__label--sandbox {
          color: #f59e0b;
        }
        .base-url-row__value {
          font-family: 'JetBrains Mono', monospace;
          font-size: 13.5px;
          color: #e6edf3;
          flex: 1;
        }

        /* Content */
        .dev-portal__content { }

        /* Section */
        .dev-section__intro {
          font-size: 0.9rem;
          color: #94a3b8;
          line-height: 1.7;
          margin: 0 0 1.25rem;
        }
        .dev-link {
          color: #6366f1;
          text-decoration: underline;
          text-underline-offset: 2px;
        }
        .dev-link:hover { color: #818cf8; }

        /* Auth format */
        .auth-format { margin-bottom: 1.25rem; }

        /* API key format */
        .api-key-format {
          background: #0d1117;
          border: 1px solid #21262d;
          border-radius: 10px;
          padding: 1rem 1.25rem;
          margin-bottom: 1.5rem;
        }
        .api-key-format__title {
          font-size: 0.85rem;
          font-weight: 700;
          color: #e2e8f0;
          margin: 0 0 0.75rem;
        }
        .api-key-format__list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          font-size: 0.85rem;
          color: #8b949e;
        }

        /* Tabbed block */
        .tabbed-block { margin-top: 1.25rem; }

        .tabbed-block__title {
          font-size: 0.82rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: #64748b;
          margin: 0 0 0.75rem;
        }

        /* Webhook events */
        .event-list {
          background: #0d1117;
          border: 1px solid #21262d;
          border-radius: 10px;
          overflow: hidden;
        }
        .event-list__item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.65rem 1.1rem;
          font-size: 0.85rem;
          color: #8b949e;
          border-bottom: 1px solid #21262d;
        }
        .event-list__item:last-child { border-bottom: none; }
        .event-list__item :global(code) { min-width: 160px; }

        /* Retry table */
        .retry-table {
          background: #0d1117;
          border: 1px solid #21262d;
          border-radius: 10px;
          overflow: hidden;
        }
        .retry-row {
          display: grid;
          grid-template-columns: 160px 1fr;
          gap: 1rem;
          align-items: center;
          padding: 0.7rem 1.1rem;
          border-bottom: 1px solid #21262d;
          font-size: 0.85rem;
        }
        .retry-row:last-child { border-bottom: none; }
        .retry-row__code {
          color: #e6edf3;
          font-family: 'JetBrains Mono', monospace;
          font-size: 12.5px;
        }
        .retry-row__note { color: #8b949e; }

        /* Env table */
        .env-table {
          background: #0d1117;
          border: 1px solid #21262d;
          border-radius: 10px;
          overflow: hidden;
          margin-bottom: 1rem;
        }
        .env-row {
          display: grid;
          grid-template-columns: 100px 1fr 100px 1fr;
          gap: 1rem;
          align-items: center;
          padding: 0.75rem 1.1rem;
          border-bottom: 1px solid #21262d;
          font-size: 0.85rem;
        }
        .env-row:last-child { border-bottom: none; }
        .env-row--header {
          background: #161b22;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #8b949e;
          padding: 0.6rem 1.1rem;
        }
        .env-row__env { font-weight: 600; color: #e2e8f0; }
        .env-row__val { color: #8b949e; font-family: 'JetBrains Mono', monospace; font-size: 12.5px; }

        /* Env switch note */
        .env-switch-note {
          background: rgba(99,102,241,0.08);
          border: 1px solid rgba(99,102,241,0.2);
          border-radius: 8px;
          padding: 0.9rem 1.1rem;
          font-size: 0.85rem;
          color: #a5b4fc;
          line-height: 1.6;
        }

        /* Rate limit table */
        .rate-limit-table {
          background: #0d1117;
          border: 1px solid #21262d;
          border-radius: 10px;
          overflow: hidden;
        }
        .rate-limit-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.7rem 1.1rem;
          border-bottom: 1px solid #21262d;
          font-size: 0.85rem;
        }
        .rate-limit-row:last-child { border-bottom: none; }
        .rate-limit-row__plan { color: #e2e8f0; font-weight: 600; }
        .rate-limit-row__limit { color: #10b981; font-family: 'JetBrains Mono', monospace; font-size: 12.5px; }

        /* Error table */
        .error-table {
          background: #0d1117;
          border: 1px solid #21262d;
          border-radius: 10px;
          overflow: hidden;
        }
        .error-row {
          display: grid;
          grid-template-columns: 64px 140px 1fr;
          gap: 1rem;
          align-items: center;
          padding: 0.7rem 1.1rem;
          border-bottom: 1px solid #21262d;
          font-size: 0.85rem;
        }
        .error-row:last-child { border-bottom: none; }
        .error-row__code {
          font-family: 'JetBrains Mono', monospace;
          font-size: 12.5px;
          color: #ef4444;
          font-weight: 700;
        }
        .error-row__name { color: #e2e8f0; font-weight: 600; }
        .error-row__desc { color: #8b949e; }

        /* Help footer */
        .dev-help-footer {
          margin-top: 3.5rem;
          background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%);
          border: 1px solid #3730a3;
          border-radius: 14px;
          padding: 1.75rem 2rem;
        }
        .dev-help-footer__inner {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          flex-wrap: wrap;
        }
        .dev-help-footer__icon {
          width: 52px;
          height: 52px;
          background: rgba(99,102,241,0.15);
          border: 1px solid rgba(99,102,241,0.3);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #818cf8;
          flex-shrink: 0;
        }
        .dev-help-footer__text { flex: 1; min-width: 180px; }
        .dev-help-footer__heading {
          font-size: 1.05rem;
          font-weight: 700;
          color: #f1f5f9;
          margin: 0 0 0.25rem;
        }
        .dev-help-footer__sub {
          font-size: 0.85rem;
          color: #64748b;
          margin: 0;
        }
        .dev-help-footer__actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
        }
        .dev-help-footer__link {
          display: inline-flex;
          align-items: center;
          padding: 8px 16px;
          border-radius: 7px;
          font-size: 0.85rem;
          font-weight: 600;
          transition: all 0.15s;
          color: #94a3b8;
          border: 1px solid #21262d;
          background: rgba(255,255,255,0.04);
        }
        .dev-help-footer__link:hover { background: rgba(255,255,255,0.08); color: #e2e8f0; }
        .dev-help-footer__link--primary {
          background: #6366f1;
          border-color: #6366f1;
          color: white;
        }
        .dev-help-footer__link--primary:hover { background: #4f46e5; border-color: #4f46e5; }

        /* Responsive */
        @media (max-width: 640px) {
          .env-row { grid-template-columns: 1fr 1fr; }
          .env-row--header { display: none; }
          .error-row { grid-template-columns: 56px 1fr; }
          .error-row__name { grid-column: 2; }
          .error-row__desc { grid-column: 1 / -1; }
          .retry-row { grid-template-columns: 1fr; }
          .dev-help-footer__inner { flex-direction: column; align-items: flex-start; }
          .dev-help-footer__actions { width: 100%; }
        }
      `}</style>
    </div>
  );
}
