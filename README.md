# Flow80 Pre-Launch Website

Built per W5 design spec (Iris 🦉) and W4 instrumentation plan (Otto 🐙).

## Stack
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** CSS with design system tokens (no Tailwind)
- **i18n:** Static JS translations (EN / DA / SV)
- **Analytics:** GA4-ready (stubbed until `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set)
- **Email:** API routes ready to wire to Mailgun / ConvertKit / Buttondown

## Routes
| Path | Description |
|---|---|
| `/en` | English (default) |
| `/da` | Danish |
| `/sv` | Swedish |
| `/api/newsletter/subscribe` | POST — newsletter signup |
| `/api/early-access/apply` | POST — early access application |

---

## Setup

```bash
cd /home/wiese/Jared/flow80-website
npm install
npm run dev        # development
npm run build      # production build
npm start          # production server
```

## Configuration

Copy `.env.local` and set your values:

```bash
cp .env.local .env.production
# Edit .env.production with production values
```

| Variable | Values | Default |
|---|---|---|
| `NEXT_PUBLIC_SITE_STATE` | `pre-launch` \| `go-live` | `pre-launch` |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | GA4 ID (e.g. `G-XXXXXXXXXX`) | _(empty — stubbed)_ |

---

## Go-Live Switch

The site is built so **go-live is a switch, not a rebuild**.

### To activate go-live state:
```bash
# Option A: environment variable
NEXT_PUBLIC_SITE_STATE=go-live npm run build

# Option B: edit .env.production
echo "NEXT_PUBLIC_SITE_STATE=go-live" >> .env.production
npm run build
```

The feature flag controls visibility of:
- Pre-launch elements (newsletter, early access forms)
- Go-live elements (trial signup CTA, pricing section — hidden in pre-launch via CSS `[data-site-state]` selectors)

**No code changes needed to switch states.**

---

## Email Integration

### Newsletter → jared@ooz.dk

Wire the `/api/newsletter/subscribe` route to your email platform. Options:

**Mailgun** (recommended for EU/GDPR):
```typescript
// src/app/api/newsletter/subscribe/route.ts
// Uncomment the Mailgun block and set env vars:
MAILGUN_API_KEY=your-key
MAILGUN_DOMAIN=flow80.com
```

**Buttondown** (simple, low-cost):
```typescript
const res = await fetch('https://api.buttondown.email/v1/subscribers', {
  method: 'POST',
  headers: {
    'Authorization': `Token ${process.env.BUTTONDOWN_API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ email, tags: ['flow80-prelaunch'] }),
});
```

**ConvertKit:**
```typescript
const res = await fetch(`https://api.convertkit.com/v3/${process.env.CK_FORM_ID}/subscribe`, {
  method: 'POST',
  body: new URLSearchParams({ api_key: process.env.CK_API_KEY, email, first_name: name }),
});
```

### Early Access → Ruby

Wire `/api/early-access/apply` to Mission Control (port 8101) to create a task assigned to Ruby.

```typescript
// In route.ts, uncomment the Mission Control fetch block:
const mcRes = await fetch(`${process.env.MISSION_CONTROL_API_URL}/api/tasks`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${process.env.MISSION_CONTROL_API_KEY}` },
  body: JSON.stringify({ type: 'early_access_application', priority: 'normal', data: payload, notify: 'ruby' }),
});
```

---

## Instrumentation (Otto's W4 Plan — 7 Pre-Launch Events)

All 7 pre-launch events are implemented in `src/services/analytics.ts`:

| # | Event | Fires When |
|---|---|---|
| 1 | `page_view` | Every page load + SPA navigation |
| 2 | `section_view` | Section scrolls into viewport (once/session) |
| 3 | `newsletter_signup_attempted` | Newsletter submit clicked |
| 4 | `newsletter_signup_completed` | Newsletter API returns 200/201 |
| 5 | `early_access_submitted` | Early access form submitted |
| 6 | `cta_clicked` | Any `[data-cta]` element clicked |
| 7 | `language_toggled` | Language switcher clicked |

**Verify with GA4 DebugView.** Route events to test property first via `send_to` param.

Go-live events (8–12) are stubbed in `analytics.ts` — activate when trial funnel is live.

---

## Deployment

Build the standalone output and deploy:
```bash
npm run build
# .next/standalone/ contains the Node server — deploy with Docker or bare metal
```

Or export as static (no server):
```bash
# next.config.js: change output from 'standalone' to 'export'
npm run export
```

### DNS / Hosting Notes
- Point `flow80.com` → deployment host
- Set `NEXT_PUBLIC_SITE_STATE=pre-launch` for staging
- Set `NEXT_PUBLIC_SITE_STATE=go-live` + GA ID for production

---

## Performance

- First Load JS: ~87 kB (shared), ~97 kB per page
- Static generation for language routes (ISR-ready)
- Google Fonts loaded via preconnect + `display=swap`
- All images SVG inline (no extra requests)
- Scroll-reveal animations via IntersectionObserver (no library)
- Mobile-responsive: 640px / 1024px breakpoints

Target: **< 2s load time on mobile** (3G, Moto G Power)
