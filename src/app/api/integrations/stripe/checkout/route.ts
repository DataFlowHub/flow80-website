/**
 * POST /api/integrations/stripe/checkout
 *
 * Body:
 *   { tier: 'starter' | 'pro' | 'business', interval: 'monthly' | 'annual', userId: string, userEmail: string }
 *
 * Returns:
 *   { url: string, sessionId: string }
 *
 * Requires STRIPE_TEST_SECRET or STRIPE_PROD_SECRET, plus the price env vars.
 * The frontend redirects the browser to `url` to complete payment in Stripe.
 */
import { NextRequest, NextResponse } from 'next/server';
import { createCheckoutSession, priceIdFor } from '@/services/stripe';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { tier, interval = 'monthly', userId, userEmail } = body as {
      tier: 'starter' | 'pro' | 'business';
      interval?: 'monthly' | 'annual';
      userId: string;
      userEmail: string;
    };

    // Validate
    if (!tier || !['starter', 'pro', 'business'].includes(tier)) {
      return NextResponse.json({ error: 'Invalid tier. Must be starter, pro, or business.' }, { status: 400 });
    }
    if (!userId || !userEmail) {
      return NextResponse.json({ error: 'userId and userEmail are required.' }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
    }

    // Determine price ID — fail fast if env is missing
    let priceId: string;
    try {
      priceId = priceIdFor(tier, interval);
    } catch {
      return NextResponse.json(
        { error: `Price ID for ${tier}/${interval} is not configured. Set STRIPE_PRICE_${tier.toUpperCase()}_${interval.toUpperCase()} in .env.local.` },
        { status: 500 }
      );
    }

    // Build URLs — caller passes success/cancel or we fall back to site root
    const origin    = req.headers.get('origin') ?? 'http://localhost:3000';
    const successUrl = `${origin}/dashboard?checkout=success&session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl  = `${origin}/pricing?checkout=canceled`;

    const { sessionId, url } = await createCheckoutSession({
      priceId,
      userId,
      userEmail,
      successUrl,
      cancelUrl,
    });

    return NextResponse.json({ sessionId, url });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Internal error';
    console.error('[Stripe Checkout]', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
