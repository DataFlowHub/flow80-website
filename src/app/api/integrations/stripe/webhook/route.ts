/**
 * POST /api/integrations/stripe/webhook
 *
 * Stripe sends events here. We verify the signature and update MySQL.
 *
 * Events handled:
 *   checkout.session.completed   → upsert subscription (trial starts)
 *   customer.subscription.updated → upsert subscription (plan/interval change)
 *   customer.subscription.deleted → markCanceled
 *
 * Required env vars:
 *   STRIPE_WEBHOOK_SECRET  — from `stripe listen --forward-to localhost:3000/api/integrations/stripe/webhook`
 *   STRIPE_TEST_SECRET      — for test mode
 *   STRIPE_PROD_SECRET     — for live mode
 *
 * For MySQL connection:
 *   MYSQL_HOST / MYSQL_PORT / MYSQL_USER / MYSQL_PASSWORD / MYSQL_DATABASE
 */
import { NextRequest, NextResponse } from 'next/server';
import { constructWebhookEvent } from '@/services/stripe';
import { upsertSubscription, markCanceled } from '@/services/stripe-db';

export const runtime = 'nodejs';

// Disable Next.js body parsing — Stripe signature verification needs the raw body
export const dynamic = 'force-dynamic';

// Helper type for the full subscription object retrieved from Stripe API
interface StripeFullSubscription {
  items?: { data?: Array<{ price?: { id?: string } }> };
  trial_end?: number | null;
  current_period_end?: number | null;
  canceled_at?: number | null;
  status?: string;
}

async function handleCheckoutCompleted(session: {
  metadata?: { flow80_user_id?: string };
  customer?: string;
  subscription?: string;
}): Promise<void> {
  const { getSubscription } = await import('@/services/stripe');
  const fullSub = await getSubscription(session.subscription as string) as StripeFullSubscription;

  await upsertSubscription({
    userId:               session.metadata?.flow80_user_id ?? '',
    stripeCustomerId:     session.customer as string,
    stripeSubscriptionId: session.subscription as string,
    priceId:              fullSub.items?.data[0]?.price?.id ?? '',
    status:               fullSub.status ?? 'unknown',
    trialEnd:             fullSub.trial_end ?? null,
    periodEnd:            fullSub.current_period_end ?? null,
    canceledAt:           fullSub.canceled_at ?? null,
  });
  console.log(`[Stripe Webhook] Subscribed user ${session.metadata?.flow80_user_id}`);
}

async function handleSubscriptionUpdated(subEvent: {
  id?: string;
  customer?: string;
  status?: string;
  metadata?: { flow80_user_id?: string };
}): Promise<void> {
  const { getSubscription } = await import('@/services/stripe');
  const fullSub = await getSubscription(subEvent.id as string) as StripeFullSubscription;

  await upsertSubscription({
    userId:               subEvent.metadata?.flow80_user_id ?? '',
    stripeCustomerId:     subEvent.customer as string,
    stripeSubscriptionId: subEvent.id as string,
    priceId:              fullSub.items?.data[0]?.price?.id ?? '',
    status:               subEvent.status ?? 'unknown',
    trialEnd:             fullSub.trial_end ?? null,
    periodEnd:            fullSub.current_period_end ?? null,
    canceledAt:           fullSub.canceled_at ?? null,
  });
  console.log(`[Stripe Webhook] Updated subscription ${subEvent.id}`);
}

async function handleSubscriptionDeleted(subId: string): Promise<void> {
  await markCanceled(subId);
  console.log(`[Stripe Webhook] Deleted subscription ${subId}`);
}

export async function POST(req: NextRequest) {
  const sig = req.headers.get('stripe-signature') ?? '';
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string | undefined;

  if (!webhookSecret) {
    console.error('[Stripe Webhook] STRIPE_WEBHOOK_SECRET is not set');
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 });
  }

  // Read raw body (text() preserves raw bytes for signature verification)
  const rawBody = await req.text();

  let event: ReturnType<typeof constructWebhookEvent>;
  try {
    event = constructWebhookEvent(rawBody, sig, webhookSecret);
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    console.error('[Stripe Webhook] Signature verification failed:', msg);
    return NextResponse.json({ error: `Webhook error: ${msg}` }, { status: 400 });
  }

  console.log(`[Stripe Webhook] Processing event: ${event.type} (id=${event.id})`);

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object as {
          metadata?: { flow80_user_id?: string };
          customer?: string;
          subscription?: string;
        });
        break;

      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event.data.object as {
          id?: string;
          customer?: string;
          status?: string;
          metadata?: { flow80_user_id?: string };
        });
        break;

      case 'customer.subscription.deleted': {
        const sub = event.data.object as { id?: string };
        await handleSubscriptionDeleted(sub.id as string);
        break;
      }

      default:
        console.log(`[Stripe Webhook] Unhandled event type: ${event.type}`);
    }
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    console.error(`[Stripe Webhook] Error handling ${event.type}:`, msg);
    // Return 200 so Stripe doesn't retry forever on DB errors.
    // A real production system would use a DLQ + alerting here.
    return NextResponse.json({ error: `Handler error: ${msg}` }, { status: 200 });
  }

  return NextResponse.json({ received: true });
}
