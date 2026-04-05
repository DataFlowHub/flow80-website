import Stripe from 'stripe';

// ── Tier → Price ID map ──────────────────────────────────────────────────────
// Loaded from env so TEST vs LIVE is env-driven, not code-driven.
export const STRIPE_PRICES = {
  starter_monthly:  process.env.STRIPE_PRICE_STARTER_MONTHLY  ?? '',
  starter_annual:   process.env.STRIPE_PRICE_STARTER_ANNUAL   ?? '',
  pro_monthly:       process.env.STRIPE_PRICE_PRO_MONTHLY       ?? '',
  pro_annual:        process.env.STRIPE_PRICE_PRO_ANNUAL         ?? '',
  business_monthly:  process.env.STRIPE_PRICE_BUSINESS_MONTHLY  ?? '',
  business_annual:   process.env.STRIPE_PRICE_BUSINESS_ANNUAL   ?? '',
  free:              process.env.STRIPE_PRICE_FREE               ?? '',
} as const;

export type TierKey = keyof typeof STRIPE_PRICES;
export type TierLabel = 'starter' | 'pro' | 'business' | 'free';

export function priceIdFor(tier: TierLabel, interval: 'monthly' | 'annual'): string {
  const key = `${tier}_${interval}` as TierKey;
  const id = STRIPE_PRICES[key];
  if (!id) throw new Error(`No Stripe Price ID configured for ${key}`);
  return id;
}

// ── Stripe client ────────────────────────────────────────────────────────────
function getStripe(): Stripe {
  const live = process.env.STRIPE_LIVE_MODE === 'true';
  const key  = live
    ? (process.env.STRIPE_PROD_SECRET ?? '')
    : (process.env.STRIPE_TEST_SECRET  ?? '');
  if (!key) throw new Error('Stripe API key not set in environment');
  return new Stripe(key, { apiVersion: '2024-11-20.acacia' });
}

// ── Checkout session ─────────────────────────────────────────────────────────
// Creates a Stripe Checkout session with a 14-day trial for paid tiers.
// Returns { url } to redirect the browser.
export async function createCheckoutSession({
  priceId,
  userId,
  userEmail,
  successUrl,
  cancelUrl,
}: {
  priceId: string;
  userId: string;
  userEmail: string;
  successUrl: string;
  cancelUrl: string;
}): Promise<{ sessionId: string; url: string }> {
  const stripe = getStripe();

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    customer_email: userEmail,
    line_items: [{ price: priceId, quantity: 1 }],
    // 14-day trial on all paid tiers
    subscription_data: {
      trial_period_days: 14,
      metadata: { flow80_user_id: userId },
    },
    metadata: { flow80_user_id: userId },
    success_url: successUrl,
    cancel_url: cancelUrl,
    allow_promotion_codes: true,
    billing_address_collection: 'auto',
  });

  if (!session.url) throw new Error('Stripe did not return a checkout URL');
  return { sessionId: session.id, url: session.url };
}

// ── Retrieve subscription ────────────────────────────────────────────────────
export async function getSubscription(subscriptionId: string) {
  const stripe = getStripe();
  return stripe.subscriptions.retrieve(subscriptionId);
}

// ── Construct webhook event ──────────────────────────────────────────────────
export function constructWebhookEvent(
  payload: string | Buffer,
  sig: string,
  secret: string
): Stripe.Event {
  return getStripe().webhooks.constructEvent(payload, sig, secret);
}
