'use client';

import Link from 'next/link';
import CodeBlock from '@/components/DevDocs/CodeBlock';
import LanguageTabs, { TabPane } from '@/components/DevDocs/LanguageTabs';
import type { Language } from '@/components/DevDocs/LanguageTabs';


const BASE_URL = 'https://app.flow80.com/api/v1';

// ── Auth examples ─────────────────────────────────────────────────────────────
const authSamples: Record<Language, string> = {
  php: `<?php
$api_key = 'flw_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';

$ch = curl_init('${BASE_URL}/flows');
curl_setopt_array($ch, [
    CURLOPT_HTTPHEADER => [
        'Authorization: Bearer ' . $api_key,
        'Content-Type: application/json',
    ],
    CURLOPT_RETURNTRANSFER => true,
]);
$res  = curl_exec($ch);
$http = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);`,
  python: `import requests

API_KEY = "flw_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"

headers = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json",
}

resp = requests.get(f"${BASE_URL}/flows", headers=headers)
print(resp.json())`,
  node: `const API_KEY = 'flw_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';

const resp = await fetch(\`${BASE_URL}/flows\`, {
  headers: {
    'Authorization': \`Bearer \${API_KEY}\`,
    'Content-Type': 'application/json',
  },
});
const data = await resp.json();
console.log(data);`,
  ruby: `require 'net/http'
require 'json'

API_KEY = 'flw_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
uri = URI("${BASE_URL}/flows")

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
	req, _ := http.NewRequest("GET", "${BASE_URL}/flows", nil)
	req.Header.Set("Authorization", "Bearer "+apiKey)
	req.Header.Set("Content-Type", "application/json")
	client := &http.Client{}
	resp, _ := client.Do(req)
	defer resp.Body.Close()
	body, _ := io.ReadAll(resp.Body)
	fmt.Println(string(body))
}`,
  curl: `curl -X GET "${BASE_URL}/flows" \\
  -H "Authorization: Bearer flw_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" \\
  -H "Content-Type: application/json"`,
};

// ── Execute examples ──────────────────────────────────────────────────────────
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
        'flow_id' => 'wf_xxxxxxxxxxxxxxxx',
        'trigger' => 'api',
        'payload' => ['order_id' => 'ORD-12345'],
    ]),
    CURLOPT_RETURNTRANSFER => true,
]);
$res  = curl_exec($ch);
$http = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);`,
  python: `import requests

resp = requests.post(
    f"${BASE_URL}/flows/execute",
    headers={"Authorization": f"Bearer {API_KEY}", "Content-Type": "application/json"},
    json={
        "flow_id": "wf_xxxxxxxxxxxxxxxx",
        "trigger": "api",
        "payload": {"order_id": "ORD-12345"},
    },
)
print(f"Status: {resp.status_code} — {resp.json()}")`,
  node: `const resp = await fetch(\`${BASE_URL}/flows/execute\`, {
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
const result = await resp.json();
console.log(result);`,
  ruby: `require 'net/http'
require 'json'

uri = URI("${BASE_URL}/flows/execute")
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
  go: `// Build JSON payload
payload := \`{"flow_id":"wf_xxxxxxxxxxxxxxxx","trigger":"api","payload":{"order_id":"ORD-12345"}}\`
req, _ := http.NewRequest("POST", "${BASE_URL}/flows/execute", strings.NewReader(payload))
req.Header.Set("Authorization", "Bearer "+apiKey)
req.Header.Set("Content-Type", "application/json")
// ...`,
  curl: `curl -X POST "${BASE_URL}/flows/execute" \\
  -H "Authorization: Bearer flw_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" \\
  -H "Content-Type: application/json" \\
  -d '{"flow_id":"wf_xxxxxxxxxxxxxxxx","trigger":"api","payload":{"order_id":"ORD-12345"}}'`,
};

// ── Inline code ───────────────────────────────────────────────────────────────
function InlineCode({ children }: { children: React.ReactNode }) {
  return <code className="inline-code">{children}</code>;
}

// ── Endpoint card ─────────────────────────────────────────────────────────────
function EndpointCard({ method, path, description, body }: {
  method: string; path: string; description: string; body?: string;
}) {
  const colors: Record<string, string> = {
    GET: '#10b981', POST: '#6366f1', PUT: '#f59e0b', DELETE: '#ef4444', PATCH: '#8b5cf6',
  };
  return (
    <div className="endpoint-card">
      <div className="endpoint-card__head">
        <span className="endpoint-card__method" style={{ color: colors[method] ?? '#8b949e' }}>
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
          margin-bottom: 0.75rem;
          font-family: 'JetBrains Mono', monospace;
        }
        .endpoint-card__head { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.5rem; flex-wrap: wrap; }
        .endpoint-card__method {
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.06em;
          padding: 2px 8px;
          border-radius: 4px;
          background: rgba(255,255,255,0.06);
          border: 1px solid currentColor;
          opacity: 0.85;
        }
        .endpoint-card__path { font-size: 13.5px; color: #e6edf3; }
        .endpoint-card__desc {
          font-size: 13px;
          color: #8b949e;
          font-family: 'Inter', sans-serif;
          margin: 0;
          line-height: 1.6;
        }
        .endpoint-card__details { margin-top: 0.75rem; }
        .endpoint-card__details summary {
          font-size: 12px;
          color: #6366f1;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
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

// ── Main page ────────────────────────────────────────────────────────────────
export default function ApiReferencePage() {
  return (
    <div className="doc-page">
      <div className="doc-page__header">
        <div className="doc-page__badge">API Reference</div>
        <h1 className="doc-page__title">API Reference</h1>
        <p className="doc-page__lead">
          Base URL: <InlineCode>{BASE_URL}</InlineCode> — All requests require{' '}
          <InlineCode>Authorization: Bearer &lt;api_key&gt;</InlineCode> header.
        </p>
      </div>

      {/* ── Rate Limits Banner ── */}
      <div className="rate-limit-banner">
        <span className="rate-limit-banner__label">Rate limits</span>
        <span>Sandbox: <strong>1,000 req/min</strong></span>
        <span>·</span>
        <span>Starter: <strong>300 req/min</strong></span>
        <span>·</span>
        <span>Growth: <strong>1,000 req/min</strong></span>
        <span>·</span>
        <span>Enterprise: <strong>Custom</strong></span>
        <span className="rate-limit-banner__note">429 responses include a <InlineCode>Retry-After</InlineCode> header</span>
      </div>

      {/* ── Authentication ── */}
      <section className="doc-section">
        <h2 className="doc-section__title" id="authentication">Authentication</h2>
        <p className="doc-section__body">
          All API requests must include a valid API key in the{' '}
          <InlineCode>Authorization</InlineCode> header as a Bearer token.
          API keys are available in{' '}
          <Link href="/account/settings/api-keys" className="doc-link">Settings → API Keys</Link>.
        </p>
        <CodeBlock
          language="http"
          code={`Authorization: Bearer flw_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`}
        />
        <div className="tabbed-block" style={{ marginTop: '1.25rem' }}>
          <p className="tabbed-block__label">Authenticate a request</p>
          <LanguageTabs>
            {(Object.keys(authSamples) as Language[]).map(lang => (
              <TabPane key={lang} lang={lang}>
                <CodeBlock code={authSamples[lang]} language={lang.toUpperCase()} />
              </TabPane>
            ))}
          </LanguageTabs>
        </div>
      </section>

      {/* ── Endpoints ── */}
      <section className="doc-section">
        <h2 className="doc-section__title" id="endpoints">Endpoints</h2>

        <h3 className="doc-subsection__title">Workflows</h3>
        <EndpointCard
          method="GET"
          path="/api/v1/flows"
          description="Returns a paginated list of all workflows in your account. Includes status, trigger type, and last run timestamp."
        />
        <EndpointCard
          method="GET"
          path="/api/v1/flows/:id"
          description="Returns a single workflow by ID, including its step definitions and current configuration."
        />
        <EndpointCard
          method="POST"
          path="/api/v1/flows/execute"
          description="Triggers a workflow execution programmatically. Use this to integrate Flow80 into your own systems."
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
          method="GET"
          path="/api/v1/flows/:id/runs"
          description="Returns the execution history for a specific workflow. Supports cursor-based pagination."
        />

        <h3 className="doc-subsection__title">Webhooks</h3>
        <EndpointCard
          method="POST"
          path="/api/v1/webhooks/inbound"
          description="Inbound webhook endpoint. Flow80 POSTs here when receiving events from integrated third-party services."
        />
        <EndpointCard
          method="GET"
          path="/api/v1/webhooks"
          description="List all configured outbound webhooks for your account."
        />
        <EndpointCard
          method="POST"
          path="/api/v1/webhooks"
          description="Register a new outbound webhook URL and event types."
          body={`{
  "url": "https://your-app.com/webhooks/flow80",
  "events": ["flow.completed", "flow.failed"],
  "secret": "whsec_xxxxxxxxxxxxxxxx"
}`}
        />

        <h3 className="doc-subsection__title">Account & Usage</h3>
        <EndpointCard
          method="GET"
          path="/api/v1/account"
          description="Returns details about the authenticated account: plan, status, creation date, and billing info."
        />
        <EndpointCard
          method="GET"
          path="/api/v1/usage"
          description="Returns current API usage including executions used/remaining and rate limit status for the current window."
        />

        <div className="tabbed-block" style={{ marginTop: '1.5rem' }}>
          <p className="tabbed-block__label">Trigger a workflow</p>
          <LanguageTabs>
            {(Object.keys(executeSamples) as Language[]).map(lang => (
              <TabPane key={lang} lang={lang}>
                <CodeBlock code={executeSamples[lang]} language={lang.toUpperCase()} />
              </TabPane>
            ))}
          </LanguageTabs>
        </div>
      </section>

      {/* ── Error Codes ── */}
      <section className="doc-section">
        <h2 className="doc-section__title" id="errors">Error Codes</h2>
        <div className="error-table">
          {[
            ['400', 'Bad Request',    'Invalid JSON or missing required fields.'],
            ['401', 'Unauthorized',   'Missing or invalid API key.'],
            ['403', 'Forbidden',      'Valid key but insufficient permissions for this resource.'],
            ['404', 'Not Found',       'Flow, webhook, or resource does not exist.'],
            ['422', 'Unprocessable',  'Request valid but action cannot be performed (e.g., paused flow).'],
            ['429', 'Too Many Requests','Rate limit exceeded. Check Retry-After header.'],
            ['500', 'Internal Error',  'Something wrong on our end. Retry with exponential backoff.'],
          ].map(([code, name, desc]) => (
            <div key={code} className="error-row">
              <code className="error-row__code">{code}</code>
              <strong className="error-row__name">{name}</strong>
              <span className="error-row__desc">{desc}</span>
            </div>
          ))}
        </div>
      </section>

      <DocFooter
        prev={{ label: 'Getting Started', href: '/developer/getting-started' }}
        next={{ label: 'Webhooks', href: '/developer/webhooks' }}
      />

      <style jsx>{`
        .doc-page__header { margin-bottom: 2rem; }
        .doc-page__badge {
          display: inline-block;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #6366f1;
          background: rgba(99,102,241,0.12);
          border: 1px solid rgba(99,102,241,0.25);
          padding: 3px 10px;
          border-radius: 5px;
          margin-bottom: 1rem;
        }
        .doc-page__title {
          font-size: 2.2rem;
          font-weight: 700;
          color: #f0f6fc;
          margin: 0 0 0.75rem;
          letter-spacing: -0.025em;
        }
        .doc-page__lead {
          font-size: 0.95rem;
          color: #8b949e;
          line-height: 1.75;
          margin: 0;
        }
        .inline-code {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.85em;
          background: rgba(99,102,241,0.12);
          color: #a5b4fc;
          padding: 2px 6px;
          border-radius: 4px;
          border: 1px solid rgba(99,102,241,0.2);
        }
        .doc-link { color: #6366f1; text-decoration: underline; text-underline-offset: 2px; }

        /* Rate limit banner */
        .rate-limit-banner {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 0.5rem;
          background: rgba(16,185,129,0.06);
          border: 1px solid rgba(16,185,129,0.2);
          border-radius: 8px;
          padding: 0.7rem 1rem;
          font-size: 0.82rem;
          color: #8b949e;
          margin-bottom: 2rem;
        }
        .rate-limit-banner__label {
          font-weight: 700;
          color: #10b981;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-size: 10px;
          margin-right: 0.25rem;
        }
        .rate-limit-banner strong { color: #e6edf3; }
        .rate-limit-banner__note { width: 100%; font-size: 0.78rem; color: #64748b; margin-top: 0.25rem; }

        /* Sections */
        .doc-section { margin-bottom: 3rem; }
        .doc-section__title {
          font-size: 1.35rem;
          font-weight: 700;
          color: #f0f6fc;
          margin: 0 0 0.85rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid #21262d;
        }
        .doc-section__body {
          font-size: 0.9rem;
          color: #8b949e;
          line-height: 1.75;
          margin: 0 0 1rem;
        }
        .doc-subsection__title {
          font-size: 1rem;
          font-weight: 700;
          color: #e2e8f0;
          margin: 1.75rem 0 0.75rem;
        }

        /* Tabbed */
        .tabbed-block { margin-top: 1.25rem; }
        .tabbed-block__label {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: #64748b;
          margin: 0 0 0.6rem;
        }

        /* Error table */
        .error-table {
          background: #0d1117;
          border: 1px solid #21262d;
          border-radius: 10px;
          overflow: hidden;
        }
        .error-row {
          display: grid;
          grid-template-columns: 60px 160px 1fr;
          gap: 1rem;
          align-items: center;
          padding: 0.7rem 1.1rem;
          border-bottom: 1px solid #21262d;
          font-size: 0.85rem;
        }
        .error-row:last-child { border-bottom: none; }
        .error-row__code { font-family: 'JetBrains Mono', monospace; font-size: 12.5px; color: #ef4444; font-weight: 700; }
        .error-row__name { color: #e2e8f0; font-weight: 600; }
        .error-row__desc { color: #8b949e; }
        @media (max-width: 640px) { .error-row { grid-template-columns: 60px 1fr; } .error-row__name { grid-column: 2; } }
      `}</style>
    </div>
  );
}

function DocFooter({ prev, next }: { prev: { label: string; href: string }; next: { label: string; href: string } }) {
  return (
    <div className="doc-footer">
      <a href={prev.href} className="doc-footer__link doc-footer__link--prev">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
        {prev.label}
      </a>
      <a href={next.href} className="doc-footer__link doc-footer__link--next">
        {next.label}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
      </a>
      <style jsx>{`
        .doc-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 3.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid #21262d;
        }
        .doc-footer__link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.875rem;
          font-weight: 600;
          color: #8b949e;
          text-decoration: none;
          padding: 7px 14px;
          border-radius: 7px;
          border: 1px solid #21262d;
          background: #161b22;
          transition: all 0.15s;
        }
        .doc-footer__link:hover { color: #e6edf3; border-color: #6366f1; background: rgba(99,102,241,0.08); }
        .doc-footer__link--next { margin-left: auto; }
      `}</style>
    </div>
  );
}
