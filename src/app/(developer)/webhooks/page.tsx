'use client';

import Link from 'next/link';
import CodeBlock from '@/components/DevDocs/CodeBlock';
import LanguageTabs, { TabPane } from '@/components/DevDocs/LanguageTabs';
import type { Language } from '@/components/DevDocs/LanguageTabs';


const hmacSamples: Record<Language, string> = {
  php: `<?php
// Flow80 — verify inbound webhook signature (HMAC-SHA256)
function verify_flow80_signature(
    string $payload,
    string $signature,
    string $secret
): bool {
    $expected = hash_hmac('sha256', $payload, $secret);
    return hash_equals($expected, $signature);
}

// In your webhook handler:
$raw_body    = file_get_contents('php://input');
$signature   = $headers['X-Flow80-Signature'] ?? '';
$webhook_secret = 'whsec_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';

if (!verify_flow80_signature($raw_body, $signature, $webhook_secret)) {
    http_response_code(401);
    exit('Invalid signature');
}

$data = json_decode($raw_body, true);
// → $data['event'], $data['flow_id'], $data['run_id'], $data['timestamp']`,
  python: `import hmac
import hashlib
import json
from flask import request, abort

def verify_signature(payload: bytes, signature: str, secret: str) -> bool:
    expected = hmac.new(secret.encode(), payload, hashlib.sha256).hexdigest()
    return hmac.compare_digest(expected, signature)

@app.route('/webhooks/flow80', methods=['POST'])
def inbound_webhook():
    sig     = request.headers.get('X-Flow80-Signature', '')
    secret  = 'whsec_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'

    if not verify_signature(request.data, sig, secret):
        abort(401)

    data = request.get_json()
    event   = data.get('event')
    flow_id = data.get('flow_id')
    run_id  = data.get('run_id')
    # handle the event ...
    return '', 200`,
  node: `import crypto from 'crypto';

function verifySignature(payload: Buffer, signature: string, secret: string): boolean {
  const expected = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
}

app.post('/webhooks/flow80', (req, res) => {
  const sig    = req.headers['x-flow80-signature'] ?? '';
  const secret = process.env.FLOW80_WEBHOOK_SECRET!;

  // req.rawBody must be a Buffer — ensure your Express parser preserves it
  if (!verifySignature(req.rawBody, sig, secret)) {
    return res.status(401).send('Invalid signature');
  }

  const { event, flow_id, run_id, payload } = req.body;
  // handle event ...
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
	// parse JSON from body ...
}`,
  curl: `# Signature verification is server-side only.
# To inspect a test webhook locally:
curl -X POST "https://your-app.com/webhooks/flow80" \\
  -H "Content-Type: application/json" \\
  -H "X-Flow80-Signature: <your_webhook_secret>" \\
  -d '{"event":"flow.completed","flow_id":"wf_xxx","run_id":"run_yyy","timestamp":"2026-04-08T10:00:00Z","payload":{}}'`,
};

function InlineCode({ children }: { children: React.ReactNode }) {
  return <code className="inline-code">{children}</code>;
}

export default function WebhooksPage() {
  return (
    <div className="doc-page">
      <div className="doc-page__header">
        <div className="doc-page__badge">Webhooks</div>
        <h1 className="doc-page__title">Webhooks</h1>
        <p className="doc-page__lead">
          Outbound webhooks let Flow80 push real-time events to your server as your workflows run.
          Configure them in{' '}
          <Link href="/account/settings/webhooks" className="doc-link">Settings → Webhooks</Link>.
        </p>
      </div>

      {/* ── How It Works ── */}
      <section className="doc-section">
        <h2 className="doc-section__title">How It Works</h2>
        <ol className="how-steps">
          {[
            ['Create a webhook endpoint', 'Set up a POST endpoint on your server that accepts JSON.'],
            ['Register in Flow80', 'Add your URL and select events in Settings → Webhooks.'],
            ['We send events', 'Flow80 POSTs to your URL whenever matching events occur.'],
            ['Verify & respond', 'Validate the HMAC-SHA256 signature, process the event, return 2xx.'],
          ].map(([title, desc], i) => (
            <li key={i} className="how-step">
              <span className="how-step__num">{i + 1}</span>
              <div>
                <strong className="how-step__title">{title}</strong>
                <p className="how-step__desc">{desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ── Events ── */}
      <section className="doc-section">
        <h2 className="doc-section__title">Available Events</h2>
        <div className="event-list">
          {[
            ['flow.started', ' Fired when a workflow execution begins.'],
            ['flow.completed', ' Fired when a workflow finishes successfully.'],
            ['flow.failed', ' Fired when a workflow errors or times out.'],
            ['flow.step_completed', ' Fired after each individual step finishes.'],
            ['flow.step_failed', ' Fired when a specific step errors.'],
            ['webhook.delivered', ' Fired when Flow80 receives an inbound webhook.'],
            ['webhook.received', ' Fired when an inbound webhook is received and accepted.'],
          ].map(([event, desc]) => (
            <div key={event} className="event-row">
              <code className="event-row__name">{event}</code>
              <span className="event-row__desc">{desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Payload Format ── */}
      <section className="doc-section">
        <h2 className="doc-section__title">Payload Format</h2>
        <p className="doc-section__body">Every webhook POST includes this structure:</p>
        <CodeBlock
          language="json"
          code={`{
  "event":       "flow.completed",
  "flow_id":     "wf_xxxxxxxxxxxxxxxx",
  "run_id":      "run_yyyyyyyyyyyyyyyy",
  "timestamp":   "2026-04-08T10:23:45Z",
  "payload":     {
    "order_id":        "ORD-12345",
    "status":          "completed",
    "steps_executed":  4,
    "duration_ms":     1243
  }
}`}
        />
      </section>

      {/* ── Signature Verification ── */}
      <section className="doc-section">
        <h2 className="doc-section__title" id="verification">Signature Verification</h2>
        <p className="doc-section__body">
          Every outbound webhook includes an{' '}
          <InlineCode>X-Flow80-Signature</InlineCode> header — the HMAC-SHA256 hex digest
          of the raw request body, signed with your webhook secret.{' '}
          <strong style={{ color: '#fcd34d' }}>Always verify server-side.</strong>
        </p>
        <div className="doc-callout doc-callout--warn">
          <strong>Never skip verification.</strong> Without HMAC verification, any actor who
          discovers your webhook URL could send fake events to your system.
        </div>

        <div className="tabbed-block" style={{ marginTop: '1.25rem' }}>
          <p className="tabbed-block__label">Verify webhook signature</p>
          <LanguageTabs>
            {(Object.keys(hmacSamples) as Language[]).map(lang => (
              <TabPane key={lang} lang={lang}>
                <CodeBlock code={hmacSamples[lang]} language={lang.toUpperCase()} />
              </TabPane>
            ))}
          </LanguageTabs>
        </div>
      </section>

      {/* ── Retry Behavior ── */}
      <section className="doc-section">
        <h2 className="doc-section__title">Retry Behavior</h2>
        <p className="doc-section__body">
          If your endpoint doesn&apos;t return a 2xx within 10 seconds, Flow80 retries with
          exponential backoff:
        </p>
        <div className="retry-table">
          {[
            ['2xx', 'Acknowledged within 10 seconds', '#10b981'],
            ['4xx', 'Not retried. Fix your request payload.', '#ef4444'],
            ['5xx / timeout', 'Exponential backoff: 30s → 2m → 10m → 1h', '#f59e0b'],
            ['Max attempts', '4 total attempts. Marked as failed after final attempt.', '#ef4444'],
          ].map(([code, note, color]) => (
            <div key={String(code)} className="retry-row">
              <code className="retry-row__code" style={{ color }}>{code}</code>
              <span className="retry-row__note">{note}</span>
            </div>
          ))}
        </div>
        <p className="doc-section__body" style={{ marginTop: '1rem' }}>
          Failed deliveries appear in{' '}
          <Link href="/account/settings/webhooks" className="doc-link">Settings → Webhooks</Link>
          {' '}with error details and the ability to replay individual events.
        </p>
      </section>

      <DocFooter
        prev={{ label: 'API Reference', href: '/developer/api-reference' }}
        next={{ label: 'Code Examples', href: '/developer/code-examples' }}
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
        .tabbed-block { margin-top: 1.25rem; }
        .tabbed-block__label {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: #64748b;
          margin: 0 0 0.6rem;
        }

        /* How it works */
        .how-steps { list-style: none; display: flex; flex-direction: column; gap: 1rem; padding: 0; margin: 0; }
        .how-step {
          display: flex;
          gap: 1rem;
          align-items: flex-start;
          background: #161b22;
          border: 1px solid #21262d;
          border-radius: 10px;
          padding: 1rem 1.2rem;
        }
        .how-step__num {
          width: 28px;
          height: 28px;
          background: rgba(99,102,241,0.15);
          border: 1px solid rgba(99,102,241,0.3);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 700;
          color: #818cf8;
          flex-shrink: 0;
        }
        .how-step__title { font-size: 0.9rem; font-weight: 600; color: #f0f6fc; }
        .how-step__desc { font-size: 0.82rem; color: #8b949e; margin: 0.2rem 0 0; line-height: 1.55; }

        /* Event list */
        .event-list {
          background: #0d1117;
          border: 1px solid #21262d;
          border-radius: 10px;
          overflow: hidden;
        }
        .event-row {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          padding: 0.65rem 1.1rem;
          border-bottom: 1px solid #21262d;
          font-size: 0.85rem;
        }
        .event-row:last-child { border-bottom: none; }
        .event-row__name {
          font-family: 'JetBrains Mono', monospace;
          font-size: 12.5px;
          color: #a5b4fc;
          min-width: 200px;
        }
        .event-row__desc { color: #8b949e; }

        /* Callout */
        .doc-callout {
          background: rgba(99,102,241,0.06);
          border: 1px solid rgba(99,102,241,0.2);
          border-left: 3px solid #6366f1;
          border-radius: 8px;
          padding: 0.85rem 1.1rem;
          font-size: 0.875rem;
          color: #a5b4fc;
          line-height: 1.6;
          margin-top: 0.75rem;
        }
        .doc-callout--warn {
          background: rgba(245,158,11,0.06);
          border-color: rgba(245,158,11,0.25);
          border-left-color: #f59e0b;
          color: #fcd34d;
        }

        /* Retry */
        .retry-table {
          background: #0d1117;
          border: 1px solid #21262d;
          border-radius: 10px;
          overflow: hidden;
        }
        .retry-row {
          display: grid;
          grid-template-columns: 180px 1fr;
          gap: 1rem;
          align-items: center;
          padding: 0.7rem 1.1rem;
          border-bottom: 1px solid #21262d;
          font-size: 0.85rem;
        }
        .retry-row:last-child { border-bottom: none; }
        .retry-row__code { font-family: 'JetBrains Mono', monospace; font-size: 12.5px; font-weight: 700; }
        .retry-row__note { color: #8b949e; }
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
