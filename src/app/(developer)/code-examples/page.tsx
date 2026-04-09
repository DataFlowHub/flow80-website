'use client';

import CodeBlock from '@/components/DevDocs/CodeBlock';
import LanguageTabs, { TabPane } from '@/components/DevDocs/LanguageTabs';
import type { Language } from '@/components/DevDocs/LanguageTabs';


const BASE_URL = 'https://app.flow80.com/api/v1';

function InlineCode({ children }: { children: React.ReactNode }) {
  return <code className="inline-code">{children}</code>;
}

// ── Use Case 1: Trigger a workflow ─────────────────────────────────────────
const triggerSamples: Record<Language, string> = {
  php: `<?php
// Trigger a Flow80 workflow via API
$api_key = getenv('FLOW80_API_KEY'); // flw_live_...

$payload = json_encode([
    'flow_id' => 'wf_xxxxxxxxxxxxxxxx',
    'trigger' => 'api',
    'payload' => [
        'order_id'      => 'ORD-' . time(),
        'customer_email' => 'jane@example.com',
        'items'         => [['sku' => 'WIDGET-A', 'qty' => 2]],
    ],
]);

$ch = curl_init("${BASE_URL}/flows/execute");
curl_setopt_array($ch, [
    CURLOPT_HTTPHEADER     => [
        'Authorization: Bearer ' . $api_key,
        'Content-Type: application/json',
    ],
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => $payload,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT        => 30,
]);
$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

$result = json_decode($response, true);
if ($http_code === 202) {
    echo "Workflow triggered! Run ID: " . $result['run_id'];
} else {
    echo "Error ($http_code): " . ($result['error'] ?? $response);
}`,
  python: `import os
import requests
import time

API_KEY = os.environ.get("FLOW80_API_KEY")  # flw_live_...

payload = {
    "flow_id": "wf_xxxxxxxxxxxxxxxx",
    "trigger": "api",
    "payload": {
        "order_id": f"ORD-{int(time.time())}",
        "customer_email": "jane@example.com",
        "items": [{"sku": "WIDGET-A", "qty": 2}],
    },
}

resp = requests.post(
    f"${BASE_URL}/flows/execute",
    headers={
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json",
    },
    json=payload,
    timeout=30,
)

if resp.status_code == 202:
    data = resp.json()
    print(f"Workflow triggered! Run ID: {data['run_id']}")
else:
    print(f"Error ({resp.status_code}): {resp.text}")`,
  node: `import os from 'os';
import crypto from 'crypto';

const API_KEY = process.env.FLOW80_API_KEY!; // flw_live_...

async function triggerFlow(flowId: string, payload: Record<string, unknown>) {
  const orderId = \`ORD-\${Date.now()}\`;

  const response = await fetch(\`${BASE_URL}/flows/execute\`, {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${API_KEY}\`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      flow_id: flowId,
      trigger: 'api',
      payload: { order_id: orderId, ...payload },
    }),
    signal: AbortSignal.timeout(30_000),
  });

  if (!response.ok) {
    throw new Error(\`API error \${response.status}: \${await response.text()}\`);
  }

  const result = await response.json();
  console.log(\`Workflow triggered! Run ID: \${result.run_id}\`);
  return result;
}

triggerFlow('wf_xxxxxxxxxxxxxxxx', {
  customer_email: 'jane@example.com',
  items: [{ sku: 'WIDGET-A', qty: 2 }],
});`,
  ruby: `require 'net/http'
require 'json'
require 'time'

API_KEY = ENV['FLOW80_API_KEY']  # flw_live_...
BASE_URL = '${BASE_URL}'

payload = {
  flow_id: 'wf_xxxxxxxxxxxxxxxx',
  trigger: 'api',
  payload: {
    order_id: "ORD-#{Time.now.to_i}",
    customer_email: 'jane@example.com',
    items: [{ sku: 'WIDGET-A', qty: 2 }],
  },
}

uri = URI("#{BASE_URL}/flows/execute")
req = Net::HTTP::Post.new(uri)
req['Authorization'] = "Bearer #{API_KEY}"
req['Content-Type'] = 'application/json'
req.body = JSON.generate(payload)

Net::HTTP.start(uri.hostname, uri.port, use_ssl: true, timeout: 30) do |http|
  res = http.request(req)
  if res.is_a?(Net::HTTPSuccess)
    data = JSON.parse(res.body)
    puts "Workflow triggered! Run ID: #{data['run_id']}"
  else
    puts "Error (#{res.code}): #{res.body}"
  end
end`,
  go: `package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"strconv"
	"time"
)

func triggerFlow(flowID string, payload map[string]interface{}) error {
	apiKey := os.Getenv("FLOW80_API_KEY")
	body, _ := json.Marshal(map[string]interface{}{
		"flow_id": flowID,
		"trigger": "api",
		"payload": payload,
	})
	req, err := http.NewRequest("POST", "${BASE_URL}/flows/execute", bytes.NewBuffer(body))
	if err != nil {
		return err
	}
	req.Header.Set("Authorization", "Bearer "+apiKey)
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("User-Agent", "Flow80-Go/1.0")

	client := &http.Client{Timeout: 30 * time.Second}
	resp, err := client.Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	if resp.StatusCode != 202 {
		return fmt.Errorf("API error: %d", resp.StatusCode)
	}

	var result map[string]interface{}
	json.NewDecoder(resp.Body).Decode(&result)
	fmt.Println("Workflow triggered! Run ID:", result["run_id"])
	return nil
}

func main() {
	triggerFlow("wf_xxxxxxxxxxxxxxxx", map[string]interface{}{
		"order_id":       fmt.Sprintf("ORD-%d", time.Now().Unix()),
		"customer_email": "jane@example.com",
		"items":          []map[string]int{{"sku": "WIDGET-A", "qty": 2}},
	})
}`,
  curl: `curl -X POST "${BASE_URL}/flows/execute" \\
  -H "Authorization: Bearer flw_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" \\
  -H "Content-Type: application/json" \\
  -d '{
    "flow_id": "wf_xxxxxxxxxxxxxxxx",
    "trigger": "api",
    "payload": {
      "order_id": "ORD-12345",
      "customer_email": "jane@example.com",
      "items": [{"sku": "WIDGET-A", "qty": 2}]
    }
  }'`,
};

// ── Use Case 2: Poll run status ──────────────────────────────────────────────
const pollSamples: Record<Language, string> = {
  php: `<?php
// Poll a workflow run until completion (max 30 attempts, 2s interval)
$run_id  = $result['run_id'] ?? null;
$attempt = 0;
$max_attempts = 30;

while ($attempt < $max_attempts) {
    $ch = curl_init("${BASE_URL}/flows/runs/{$run_id}");
    curl_setopt_array($ch, [
        CURLOPT_HTTPHEADER     => ['Authorization: Bearer ' . $api_key],
        CURLOPT_RETURNTRANSFER => true,
    ]);
    $res  = curl_exec($ch);
    $data = json_decode($res, true);
    curl_close($ch);

    $status = $data['status'] ?? 'unknown';
    echo "Status: $status\\n";

    if (in_array($status, ['completed', 'failed', 'cancelled'])) {
        echo "Final status: $status\\n";
        break;
    }

    sleep(2);
    $attempt++;
}`,
  python: `import requests
import time

run_id = result.get('run_id')
for attempt in range(30):
    resp = requests.get(
        f"${BASE_URL}/flows/runs/{run_id}",
        headers={"Authorization": f"Bearer {API_KEY}"},
    )
    data = resp.json()
    status = data.get('status', 'unknown')
    print(f"[{attempt+1}] Status: {status}")

    if status in ('completed', 'failed', 'cancelled'):
        print(f"Final: {status}")
        break
    time.sleep(2)`,
  node: `const runId = result.run_id;
const maxAttempts = 30;
for (let attempt = 0; attempt < maxAttempts; attempt++) {
  const resp = await fetch(\`${BASE_URL}/flows/runs/\${runId}\`, {
    headers: { 'Authorization': \`Bearer \${API_KEY}\` },
  });
  const data = await resp.json();
  console.log(\`[\${attempt+1}] Status: \${data.status}\`);
  if (['completed', 'failed', 'cancelled'].includes(data.status)) {
    console.log(\`Final: \${data.status}\`);
    break;
  }
  await new Promise(r => setTimeout(r, 2000));
}`,
  ruby: `require 'net/http'
require 'json'

run_id = result['run_id']
30.times do |attempt|
  uri = URI("#{BASE_URL}/flows/runs/#{run_id}")
  req = Net::HTTP::Get.new(uri)
  req['Authorization'] = "Bearer #{API_KEY}"
  res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(req) }
  data = JSON.parse(res.body)
  status = data['status']
  puts "[#{attempt+1}] Status: #{status}"
  break if ['completed', 'failed', 'cancelled'].include?(status)
  sleep(2)
end`,
  go: `// Poll run status (Go routine + channel)
go func() {
    for attempt := 0; attempt < 30; attempt++ {
        req, _ := http.NewRequest("GET", fmt.Sprintf("${BASE_URL}/flows/runs/%s", runID), nil)
        req.Header.Set("Authorization", "Bearer "+apiKey)
        resp, _ := client.Do(req)
        var data map[string]interface{}
        json.NewDecoder(resp.Body).Decode(&data)
        fmt.Printf("[%d] Status: %v\\n", attempt+1, data["status"])
        if slices.Contains([]string{"completed", "failed", "cancelled"}, data["status"]) {
            break
        }
        time.Sleep(2 * time.Second)
    }
}()`,
  curl: `# Polling requires a loop — use your language's HTTP client
# This example uses bash + jq:
RUN_ID="run_yyyyyyyyyyyyyyyy"
for i in $(seq 1 30); do
  STATUS=$(curl -s "${BASE_URL}/flows/runs/\${RUN_ID}" \\
    -H "Authorization: Bearer flw_test_..." | jq -r '.status')
  echo "[$i] Status: $STATUS"
  [[ "$STATUS" =~ completed|failed|cancelled ]] && break
  sleep 2
done`,
};

export default function CodeExamplesPage() {
  return (
    <div className="doc-page">
      <div className="doc-page__header">
        <div className="doc-page__badge">Code Examples</div>
        <h1 className="doc-page__title">Code Examples</h1>
        <p className="doc-page__lead">
          Complete integration snippets for common use cases.
          All examples use the{' '}
          <InlineCode>flw_test_…</InlineCode> sandbox key — replace with your live key for production.
        </p>
      </div>

      {/* ── Quick navigation ── */}
      <div className="quick-nav">
        <a href="#trigger-workflow" className="quick-nav__link">Trigger a Workflow</a>
        <a href="#poll-run-status" className="quick-nav__link">Poll Run Status</a>
      </div>

      {/* ── Trigger Workflow ── */}
      <section id="trigger-workflow" className="doc-section">
        <h2 className="doc-section__title">Trigger a Workflow</h2>
        <p className="doc-section__body">
          The most common integration: send data to Flow80 and trigger a workflow execution.
          Returns <InlineCode>202 Accepted</InlineCode> with a <InlineCode>run_id</InlineCode>{' '}
          you can use to track progress.
        </p>
        <CodeBlock
          language="json"
          code={`// Response: HTTP 202 Accepted
{
  "run_id":   "run_yyyyyyyyyyyyyyyy",
  "flow_id":  "wf_xxxxxxxxxxxxxxxx",
  "status":   "queued",
  "queued_at": "2026-04-08T10:00:00Z"
}`}
        />
        <div className="tabbed-block" style={{ marginTop: '1.25rem' }}>
          <p className="tabbed-block__label">Full example — trigger a workflow</p>
          <LanguageTabs>
            {(Object.keys(triggerSamples) as Language[]).map(lang => (
              <TabPane key={lang} lang={lang}>
                <CodeBlock code={triggerSamples[lang]} language={lang.toUpperCase()} />
              </TabPane>
            ))}
          </LanguageTabs>
        </div>
      </section>

      {/* ── Poll Run Status ── */}
      <section id="poll-run-status" className="doc-section">
        <h2 className="doc-section__title">Poll Run Status</h2>
        <p className="doc-section__body">
          After triggering a workflow, poll <InlineCode>GET /flows/runs/:id</InlineCode>{' '}
          until the run reaches a terminal state. For production, consider using webhooks
          instead — they&apos;re far more efficient than polling.
        </p>
        <div className="tabbed-block">
          <p className="tabbed-block__label">Poll run status until terminal state</p>
          <LanguageTabs>
            {(Object.keys(pollSamples) as Language[]).map(lang => (
              <TabPane key={lang} lang={lang}>
                <CodeBlock code={pollSamples[lang]} language={lang.toUpperCase()} />
              </TabPane>
            ))}
          </LanguageTabs>
        </div>
      </section>

      {/* ── More Examples ── */}
      <section className="doc-section">
        <h2 className="doc-section__title">More Examples</h2>
        <p className="doc-section__body">
          Additional examples are available in each guide:
        </p>
        <div className="examples-links">
          {[
            ['🔑', 'Authentication Guide', '/developer/authentication', 'API key management, rotation, scopes, and enterprise SSO.'],
            ['⚡', 'API Reference', '/developer/api-reference', 'Full endpoint docs for flows, webhooks, account, and usage.'],
            ['🔔', 'Webhooks Guide', '/developer/webhooks', 'Set up outbound webhooks with HMAC verification.'],
          ].map(([icon, title, href, desc]) => (
            <a key={String(href)} href={href} className="examples-link-card">
              <span className="examples-link-card__icon">{icon}</span>
              <div>
                <strong className="examples-link-card__title">{title}</strong>
                <p className="examples-link-card__desc">{desc}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      <DocFooter
        prev={{ label: 'Webhooks', href: '/developer/webhooks' }}
        next={{ label: null }}
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
        .quick-nav {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 2.5rem;
          padding: 1rem 1.25rem;
          background: #161b22;
          border: 1px solid #21262d;
          border-radius: 10px;
        }
        .quick-nav__link {
          font-size: 13px;
          font-weight: 500;
          color: #8b949e;
          text-decoration: none;
          padding: 4px 12px;
          border-radius: 5px;
          border: 1px solid transparent;
          transition: all 0.12s;
        }
        .quick-nav__link:hover { color: #e6edf3; background: rgba(255,255,255,0.06); border-color: #30363d; }
        .tabbed-block { margin-top: 1.25rem; }
        .tabbed-block__label {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: #64748b;
          margin: 0 0 0.6rem;
        }

        /* Example links */
        .examples-links { display: flex; flex-direction: column; gap: 0.75rem; }
        .examples-link-card {
          display: flex;
          gap: 1rem;
          align-items: flex-start;
          background: #161b22;
          border: 1px solid #21262d;
          border-radius: 10px;
          padding: 1rem 1.2rem;
          text-decoration: none;
          transition: border-color 0.15s, background 0.15s;
        }
        .examples-link-card:hover { border-color: #6366f1; background: rgba(99,102,241,0.04); }
        .examples-link-card__icon { font-size: 1.2rem; flex-shrink: 0; margin-top: 2px; }
        .examples-link-card__title { font-size: 0.9rem; font-weight: 700; color: #f0f6fc; }
        .examples-link-card__desc { font-size: 0.8rem; color: #8b949e; margin: 0.2rem 0 0; line-height: 1.55; }
      `}</style>
    </div>
  );
}

function DocFooter({ prev, next }: { prev: { label: string; href: string }; next: { label: string | null; href?: string } | null }) {
  return (
    <div className="doc-footer">
      {prev && (
        <a href={prev.href} className="doc-footer__link doc-footer__link--prev">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
          {prev.label}
        </a>
      )}
      {next?.label && (
        <a href={next.href} className="doc-footer__link doc-footer__link--next">
          {next.label}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
        </a>
      )}
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
