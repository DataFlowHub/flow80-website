export interface EmailContent {
  subject: string;
  preview_text: string;
  html_body: string;
  text_body: string;
}

const TEMPLATES: Record<number, { subject: string; preview_text: string; send_after_days: number; render: (name: string, company?: string) => { subject: string; preview_text: string; html_body: string; text_body: string } }> = {
  1: {
    subject: 'Welcome to Flow80 — let\'s get you shipping',
    preview_text: 'You made it. Here\'s where to start.',
    send_after_days: 0,
    render: (name) => ({
      subject: 'Welcome to Flow80 — let\'s get you shipping',
      preview_text: 'You made it. Here\'s where to start.',
      html_body: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #1a1a2e;">
  <h2 style="color: #6366f1;">Hey ${name},</h2>
  <p style="font-size: 17px; line-height: 1.6;">Welcome to Flow80 — you're in.</p>
  <p style="font-size: 17px; line-height: 1.6;">Building workflows shouldn't take a full afternoon. That's why we built Flow80: visual workflow automation that actually talks to your tools without you having to write a single line of integration code.</p>
  <p style="font-size: 17px; line-height: 1.6;">Here's what you can do right now:</p>
  <ul style="font-size: 17px; line-height: 1.8;">
    <li>→ Connect an integration (Slack, Notion, Google Sheets — whatever you use)</li>
    <li>→ Pick a template from the gallery and hit run</li>
    <li>→ Watch it execute while you make coffee</li>
  </ul>
  <p style="font-size: 17px; line-height: 1.6;">Your first workflow is waiting. Don't overthink it — just open the dashboard and follow the onboarding flow.</p>
  <a href="https://app.flow80.com/dashboard" style="display: inline-block; background: #6366f1; color: #fff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; margin: 16px 0;">Go to your dashboard →</a>
  <p style="font-size: 15px; color: #64748b;">P.S. Reply to this email if anything feels off. We're actually reading them.</p>
</body>
</html>`,
      text_body: `Hey ${name},\n\nWelcome to Flow80 — you're in.\n\nBuilding workflows shouldn't take a full afternoon. That's why we built Flow80: visual workflow automation that actually talks to your tools without you having to write a single line of integration code.\n\nHere's what you can do right now:\n→ Connect an integration (Slack, Notion, Google Sheets — whatever you use)\n→ Pick a template from the gallery and hit run\n→ Watch it execute while you make coffee\n\nYour first workflow is waiting. Don't overthink it — just open the dashboard and follow the onboarding flow.\n\nGo to your dashboard → https://app.flow80.com/dashboard\n\nP.S. Reply to this email if anything feels off. We're actually reading them.\n\n— The Flow80 Team`,
    }),
  },
  2: {
    subject: 'One thing most users miss on day one',
    preview_text: 'This is the workflow pattern that saves teams 2 hours a week.',
    send_after_days: 2,
    render: (name) => ({
      subject: 'One thing most users miss on day one',
      preview_text: 'This is the workflow pattern that saves teams 2 hours a week.',
      html_body: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #1a1a2e;">
  <h2 style="color: #6366f1;">Hey ${name},</h2>
  <p style="font-size: 17px; line-height: 1.6;">Most people set up their first integration and stop there. That's fine — but you're leaving the good stuff on the table.</p>
  <p style="font-size: 17px; line-height: 1.6;"><strong>Here's the thing:</strong> Flow80 works best when you chain steps. Not "integration → action" — but "trigger → transform → action → notify."</p>
  <p style="font-size: 17px; line-height: 1.6;">That's the pattern that replaces the script you wrote at 11pm last month.</p>
  <p style="font-size: 17px; line-height: 1.6;"><strong>Quick example:</strong></p>
  <ul style="font-size: 17px; line-height: 1.8;">
    <li>Google Sheet row added → extract the data → run a calculation → push result to Slack</li>
  </ul>
  <p style="font-size: 17px; line-height: 1.6;">That's one workflow. That's 2 hours saved every time that sheet updates — forever.</p>
  <a href="https://app.flow80.com/dashboard/templates" style="display: inline-block; background: #6366f1; color: #fff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; margin: 16px 0;">See the template gallery →</a>
  <p style="font-size: 17px; line-height: 1.6;">One more thing: if you connected Slack during onboarding, turn on execution notifications. You'll get a ping every time a workflow runs. You'll feel like you have an assistant.</p>
</body>
</html>`,
      text_body: `Hey ${name},\n\nMost people set up their first integration and stop there. That's fine — but you're leaving the good stuff on the table.\n\nHere's the thing: Flow80 works best when you chain steps. Not "integration → action" — but "trigger → transform → action → notify."\n\nThat's the pattern that replaces the script you wrote at 11pm last month.\n\nQuick example:\nGoogle Sheet row added → extract the data → run a calculation → push result to Slack\n\nThat's one workflow. That's 2 hours saved every time that sheet updates — forever.\n\nSee the template gallery → https://app.flow80.com/dashboard/templates\n\n— The Flow80 Team`,
    }),
  },
  3: {
    subject: 'The feature you didn\'t know you needed',
    preview_text: 'Conditional branching. Here\'s why it changes everything.',
    send_after_days: 4,
    render: (name) => ({
      subject: 'The feature you didn\'t know you needed',
      preview_text: 'Conditional branching. Here\'s why it changes everything.',
      html_body: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #1a1a2e;">
  <h2 style="color: #6366f1;">Hey ${name},</h2>
  <p style="font-size: 17px; line-height: 1.6;">Your workflows don't have to be linear.</p>
  <p style="font-size: 17px; line-height: 1.6;">Flow80 supports <strong>conditional branching</strong> — meaning your workflow can make decisions based on data. If X, do Y. If not, do Z.</p>
  <p style="font-size: 17px; line-height: 1.6;"><strong>Why this matters:</strong> most automations break because they assume everything goes according to plan. Conditional logic handles the edge cases. The "what if the customer is EU" path. The "what if the field is empty" fallback. Real business logic.</p>
  <p style="font-size: 17px; line-height: 1.6;">Without it, you're either over-automating (bad) or under-automating (also bad).</p>
  <p style="font-size: 17px; line-height: 1.6;"><strong>Here's a real one:</strong></p>
  <blockquote style="border-left: 4px solid #6366f1; padding: 8px 16px; margin: 16px 0; background: #f8f9ff;">
    If form submission country = "Germany" → apply GDPR compliance steps → send to EU operations queue<br>
    Else → proceed with standard flow
  </blockquote>
  <p style="font-size: 17px; line-height: 1.6;">One conditional step. No code. No custom logic to maintain.</p>
  <a href="https://app.flow80.com/dashboard" style="display: inline-block; background: #6366f1; color: #fff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; margin: 16px 0;">Explore conditional branching →</a>
</body>
</html>`,
      text_body: `Hey ${name},\n\nYour workflows don't have to be linear.\n\nFlow80 supports conditional branching — meaning your workflow can make decisions based on data. If X, do Y. If not, do Z.\n\nWhy this matters: most automations break because they assume everything goes according to plan. Conditional logic handles the edge cases. The "what if the customer is EU" path. The "what if the field is empty" fallback. Real business logic.\n\nHere's a real one:\nIf form submission country = "Germany" → apply GDPR compliance steps → send to EU operations queue\nElse → proceed with standard flow\n\nOne conditional step. No code. No custom logic to maintain.\n\n— The Flow80 Team`,
    }),
  },
  4: {
    subject: 'How a logistics team cut reporting ops from 3 days to 20 minutes',
    preview_text: 'A real team. A real workflow. Real numbers.',
    send_after_days: 7,
    render: (name) => ({
      subject: 'How a logistics team cut reporting ops from 3 days to 20 minutes',
      preview_text: 'A real team. A real workflow. Real numbers.',
      html_body: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #1a1a2e;">
  <h2 style="color: #6366f1;">Hey ${name},</h2>
  <p style="font-size: 17px; line-height: 1.6;">We've been quiet this week. You've had time to dig in. So here's something worth your time.</p>
  <p style="font-size: 17px; line-height: 1.6;">A logistics operations team was running weekly KPI reports manually: pulling data from 4 systems, formatting in spreadsheets, sending to management. Every week. 3 days of work. Every single week.</p>
  <p style="font-size: 17px; line-height: 1.6;">They built one Flow80 workflow:</p>
  <ul style="font-size: 17px; line-height: 1.8;">
    <li>→ Automated data collection from all 4 systems</li>
    <li>→ Normalized and calculated KPIs automatically</li>
    <li>→ Generated and emailed the report every Monday at 8am</li>
  </ul>
  <p style="font-size: 17px; line-height: 1.6;"><strong>Result:</strong></p>
  <ul style="font-size: 17px; line-height: 1.8;">
    <li>3 days → 20 minutes (setup once, runs itself)</li>
    <li>Zero human error in the calculations</li>
    <li>Team spends those 3 days on actual work</li>
  </ul>
  <p style="font-size: 17px; line-height: 1.6;">That's what automation looks like when it's built right. Not a toy demo. Not a "this is what could happen." A workflow that's been running in production for 6 months.</p>
  <a href="https://flow80.com/case-studies" style="display: inline-block; background: #6366f1; color: #fff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; margin: 16px 0;">Read the full case study →</a>
  <p style="font-size: 15px; color: #64748b;">Questions? Reply. We're the ones reading the emails.</p>
</body>
</html>`,
      text_body: `Hey ${name},\n\nWe've been quiet this week. You've had time to dig in. So here's something worth your time.\n\nA logistics operations team was running weekly KPI reports manually: pulling data from 4 systems, formatting in spreadsheets, sending to management. Every week. 3 days of work. Every single week.\n\nThey built one Flow80 workflow:\n→ Automated data collection from all 4 systems\n→ Normalized and calculated KPIs automatically\n→ Generated and emailed the report every Monday at 8am\n\nResult:\n• 3 days → 20 minutes (setup once, runs itself)\n• Zero human error in the calculations\n• Team spends those 3 days on actual work\n\nThat's what automation looks like when it's built right.\n\nRead the full case study → https://flow80.com/case-studies\n\nQuestions? Reply. We're the ones reading the emails.\n\n— The Flow80 Team`,
    }),
  },
};

export function getEmailContent(emailId: number, name: string): EmailContent | null {
  const template = TEMPLATES[emailId];
  if (!template) return null;
  return template.render(name);
}

export function getTemplate(emailId: number) {
  return TEMPLATES[emailId] ?? null;
}
