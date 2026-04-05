/**
 * GET /api/integrations/stripe/subscription?userId=xxx
 *
 * Returns the current subscription record for the given user from MySQL.
 *
 * Response:
 *   {
 *     tier, status, interval,
 *     trial_ends_at: ISO string | null,
 *     current_period_end: ISO string | null,
 *     canceled_at: ISO string | null,
 *     has_trial: boolean,
 *     is_active: boolean
 *   }
 *
 * Returns 404 if no subscription found.
 */
import { NextRequest, NextResponse } from 'next/server';
import { getSubscriptionByUserId } from '@/services/stripe-db';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'userId query parameter is required.' }, { status: 400 });
  }

  try {
    const sub = await getSubscriptionByUserId(userId);

    if (!sub) {
      return NextResponse.json({ error: 'No subscription found for this user.' }, { status: 404 });
    }

    const now = new Date();

    return NextResponse.json({
      tier:              sub.tier,
      status:            sub.status,
      interval:          sub.interval,
      trial_ends_at:     sub.trial_ends_at?.toISOString() ?? null,
      current_period_end: sub.current_period_end?.toISOString() ?? null,
      canceled_at:       sub.canceled_at?.toISOString() ?? null,
      has_trial:         sub.trial_ends_at !== null && sub.trial_ends_at > now,
      is_active:         ['active', 'trialing'].includes(sub.status),
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Internal error';
    console.error('[Stripe Subscription GET]', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
