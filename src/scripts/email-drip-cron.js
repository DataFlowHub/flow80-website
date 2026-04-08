/**
 * Flow80 Email Drip Cron Script
 * Run every 15 minutes via cron:
 *   */15 * * * *  /usr/bin/node /opt/sites/flow80/src/scripts/email-drip-cron.js
 *
 * Processes the email_drip_queue in MongoDB and sends emails via Mailgun.
 * Each run sends the next due email (1→2→3→4) for each eligible user.
 */

const { MongoClient } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017';
const DB_NAME = process.env.MONGO_NAME || 'servicing';
const COLL_NAME = 'email_drip_queue';

const MAILGUN_API_KEY = process.env.MAILGUN_API_KEY;
const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN;
const MAILGUN_FROM = process.env.MAILGUN_FROM || 'Flow80 <support@flow80.com>';

const EMAIL_SEQUENCE = [
  { id: 1, send_after_days: 0 },
  { id: 2, send_after_days: 2 },
  { id: 3, send_after_days: 4 },
  { id: 4, send_after_days: 7 },
];

const EMAIL_SUBJECTS = {
  1: 'Welcome to Flow80 — let\'s get you shipping',
  2: 'One thing most users miss on day one',
  3: 'The feature you didn\'t know you needed',
  4: 'How a logistics team cut reporting ops from 3 days to 20 minutes',
};

// ─── Email content renderer ───────────────────────────────────────────────────

function renderEmail(emailId, name) {
  const bodies = {
    1: {
      html: `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:600px;margin:0 auto;padding:24px;color:#1a1a2e;">
  <h2 style="color:#6366f1;">Hey ${escapeHtml(name)},</h2>
  <p style="font-size:17px;line-height:1.6;">Welcome to Flow80 — you're in.</p>
  <p style="font-size:17px;line-height:1.6;">Building workflows shouldn't take a full afternoon. That's why we built Flow80: visual workflow automation that actually talks to your tools without you having to write a single line of integration code.</p>
  <p style="font-size:17px;line-height:1.6;">Here's what you can do right now:</p>
  <ul style="font-size:17px;line-height:1.8;">
    <li>→ Connect an integration (Slack, Notion, Google Sheets — whatever you use)</li>
    <li>→ Pick a template from the gallery and hit run</li>
    <li>→ Watch it execute while you make coffee</li>
  </ul>
  <p style="font-size:17px;line-height:1.6;">Your first workflow is waiting. Don't overthink it — just open the dashboard and follow the onboarding flow.</p>
  <a href="https://app.flow80.com/dashboard" style="display:inline-block;background:#6366f1;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:600;margin:16px 0;">Go to your dashboard →</a>
  <p style="font-size:15px;color:#64748b;">P.S. Reply to this email if anything feels off. We're actually reading them.</p>
</body></html>`,
      text: `Hey ${name},\n\nWelcome to Flow80 — you're in.\n\nBuilding workflows shouldn't take a full afternoon. That's why we built Flow80: visual workflow automation that actually talks to your tools without you having to write a single line of integration code.\n\nHere's what you can do right now:\n→ Connect an integration (Slack, Notion, Google Sheets — whatever you use)\n→ Pick a template from the gallery and hit run\n→ Watch it execute while you make coffee\n\nYour first workflow is waiting. Don't overthink it — just open the dashboard and follow the onboarding flow.\n\nGo to your dashboard → https://app.flow80.com/dashboard\n\nP.S. Reply to this email if anything feels off. We're actually reading them.\n\n— The Flow80 Team`,
    },
    2: {
      html: `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:600px;margin:0 auto;padding:24px;color:#1a1a2e;">
  <h2 style="color:#6366f1;">Hey ${escapeHtml(name)},</h2>
  <p style="font-size:17px;line-height:1.6;">Most people set up their first integration and stop there. That's fine — but you're leaving the good stuff on the table.</p>
  <p style="font-size:17px;line-height:1.6;"><strong>Here's the thing:</strong> Flow80 works best when you chain steps. Not "integration → action" — but "trigger → transform → action → notify."</p>
  <p style="font-size:17px;line-height:1.6;">That's the pattern that replaces the script you wrote at 11pm last month.</p>
  <p style="font-size:17px;line-height:1.6;"><strong>Quick example:</strong> Google Sheet row added → extract the data → run a calculation → push result to Slack</p>
  <p style="font-size:17px;line-height:1.6;">That's one workflow. That's 2 hours saved every time that sheet updates — forever.</p>
  <a href="https://app.flow80.com/dashboard/templates" style="display:inline-block;background:#6366f1;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:600;margin:16px 0;">See the template gallery →</a>
</body></html>`,
      text: `Hey ${name},\n\nMost people set up their first integration and stop there. That's fine — but you're leaving the good stuff on the table.\n\nHere's the thing: Flow80 works best when you chain steps. Not "integration → action" — but "trigger → transform → action → notify."\n\nThat's the pattern that replaces the script you wrote at 11pm last month.\n\nQuick example: Google Sheet row added → extract the data → run a calculation → push result to Slack\n\nThat's one workflow. That's 2 hours saved every time that sheet updates — forever.\n\nSee the template gallery → https://app.flow80.com/dashboard/templates\n\n— The Flow80 Team`,
    },
    3: {
      html: `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:600px;margin:0 auto;padding:24px;color:#1a1a2e;">
  <h2 style="color:#6366f1;">Hey ${escapeHtml(name)},</h2>
  <p style="font-size:17px;line-height:1.6;">Your workflows don't have to be linear.</p>
  <p style="font-size:17px;line-height:1.6;">Flow80 supports <strong>conditional branching</strong> — meaning your workflow can make decisions based on data. If X, do Y. If not, do Z.</p>
  <p style="font-size:17px;line-height:1.6;"><strong>Why this matters:</strong> most automations break because they assume everything goes according to plan. Conditional logic handles the edge cases.</p>
  <p style="font-size:17px;line-height:1.6;"><strong>Here's a real one:</strong></p>
  <blockquote style="border-left:4px solid #6366f1;padding:8px 16px;margin:16px 0;background:#f8f9ff;">
    If form submission country = "Germany" → apply GDPR compliance steps → send to EU operations queue<br>
    Else → proceed with standard flow
  </blockquote>
  <p style="font-size:17px;line-height:1.6;">One conditional step. No code. No custom logic to maintain.</p>
  <a href="https://app.flow80.com/dashboard" style="display:inline-block;background:#6366f1;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:600;margin:16px 0;">Explore conditional branching →</a>
</body></html>`,
      text: `Hey ${name},\n\nYour workflows don't have to be linear.\n\nFlow80 supports conditional branching — meaning your workflow can make decisions based on data. If X, do Y. If not, do Z.\n\nWhy this matters: most automations break because they assume everything goes according to plan. Conditional logic handles the edge cases.\n\nHere's a real one:\nIf form submission country = "Germany" → apply GDPR compliance steps → send to EU operations queue\nElse → proceed with standard flow\n\nOne conditional step. No code. No custom logic to maintain.\n\n— The Flow80 Team`,
    },
    4: {
      html: `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:600px;margin:0 auto;padding:24px;color:#1a1a2e;">
  <h2 style="color:#6366f1;">Hey ${escapeHtml(name)},</h2>
  <p style="font-size:17px;line-height:1.6;">We've been quiet this week. You've had time to dig in. So here's something worth your time.</p>
  <p style="font-size:17px;line-height:1.6;">A logistics operations team was running weekly KPI reports manually: pulling data from 4 systems, formatting in spreadsheets, sending to management. Every week. 3 days of work. Every single week.</p>
  <p style="font-size:17px;line-height:1.6;">They built one Flow80 workflow:\n→ Automated data collection from all 4 systems\n→ Normalized and calculated KPIs automatically\n→ Generated and emailed the report every Monday at 8am</p>
  <p style="font-size:17px;line-height:1.6;"><strong>Result:</strong>\n• 3 days → 20 minutes (setup once, runs itself)\n• Zero human error in the calculations\n• Team spends those 3 days on actual work</p>
  <p style="font-size:17px;line-height:1.6;">That's what automation looks like when it's built right. Not a toy demo. A workflow that's been running in production for 6 months.</p>
  <a href="https://flow80.com/case-studies" style="display:inline-block;background:#6366f1;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:600;margin:16px 0;">Read the full case study →</a>
  <p style="font-size:15px;color:#64748b;">Questions? Reply. We're the ones reading the emails.</p>
</body></html>`,
      text: `Hey ${name},\n\nWe've been quiet this week. You've had time to dig in. So here's something worth your time.\n\nA logistics operations team was running weekly KPI reports manually: pulling data from 4 systems, formatting in spreadsheets, sending to management. Every week. 3 days of work.\n\nThey built one Flow80 workflow:\n→ Automated data collection from all 4 systems\n→ Normalized and calculated KPIs automatically\n→ Generated and emailed the report every Monday at 8am\n\nResult:\n• 3 days → 20 minutes (setup once, runs itself)\n• Zero human error in the calculations\n• Team spends those 3 days on actual work\n\nThat's what automation looks like when it's built right.\n\nRead the full case study → https://flow80.com/case-studies\n\nQuestions? Reply. We're the ones reading the emails.\n\n\n— The Flow80 Team`,
    },
  };
  return bodies[emailId] || bodies[1];
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ─── Mailgun sender ───────────────────────────────────────────────────────────

async function sendViaMailgun(toEmail, toName, emailId) {
  const { html, text } = renderEmail(emailId, toName);
  const subject = EMAIL_SUBJECTS[emailId];

  const formData = new URLSearchParams({
    from: MAILGUN_FROM,
    to: `${toName} <${toEmail}>`,
    subject,
    text,
    html,
  });

  const response = await fetch(
    `https://api.mailgun.net/v3/${MAILGUN_DOMAIN}/messages`,
    {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(`api:${MAILGUN_API_KEY}`).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Mailgun error ${response.status}: ${errorText}`);
  }

  const data = await response.json();
  return data.id; // Mailgun message ID
}

// ─── Main logic ──────────────────────────────────────────────────────────────

async function processQueue() {
  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  const coll = client.db(DB_NAME).collection(COLL_NAME);

  console.log(`[${new Date().toISOString()}] Flow80 Email Drip Cron starting`);

  // Collect all active (non-unsubscribed) entries
  const entries = await coll.find({ unsubscribed: false }).toArray();
  const now = new Date();
  let sentCount = 0;

  for (const entry of entries) {
    try {
      const sentIds = entry.emails_sent.map(e => e.email_id);

      // Find the next email in sequence
      let nextEmailId = null;
      for (const seq of EMAIL_SEQUENCE) {
        if (!sentIds.includes(seq.id)) {
          nextEmailId = seq.id;
          break;
        }
      }
      if (!nextEmailId) continue; // All emails sent

      // Check timing
      const lastSentAt = entry.emails_sent.length > 0
        ? new Date(entry.emails_sent[entry.emails_sent.length - 1].sent_at)
        : new Date(entry.enqueued_at);

      const seqEntry = EMAIL_SEQUENCE.find(s => s.id === nextEmailId);
      const daysSince = Math.floor((now.getTime() - lastSentAt.getTime()) / (1000 * 60 * 60 * 24));

      if (daysSince < seqEntry.send_after_days) continue;

      // Skip if Mailgun not configured
      if (!MAILGUN_API_KEY || !MAILGUN_DOMAIN) {
        console.log(`[SKIP] Mailgun not configured — would send email ${nextEmailId} to ${entry.email}`);
        continue;
      }

      const messageId = await sendViaMailgun(entry.email, entry.name, nextEmailId);

      await coll.updateOne(
        { _id: entry._id },
        {
          $push: {
            emails_sent: { email_id: nextEmailId, sent_at: new Date() },
            mailgun_message_ids: messageId,
          },
        }
      );

      console.log(`[SENT] Email ${nextEmailId} → ${entry.email} (message_id: ${messageId})`);
      sentCount++;
    } catch (err) {
      console.error(`[ERROR] Failed to send email ${nextEmailId} to ${entry.email}:`, err.message);
    }
  }

  console.log(`[${new Date().toISOString()}] Flow80 Email Drip Cron done. Sent: ${sentCount}`);
  await client.close();
}

processQueue().catch(err => {
  console.error('[FATAL]', err);
  process.exit(1);
});
