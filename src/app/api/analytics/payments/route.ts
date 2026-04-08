/**
 * GET /api/analytics/payments
 *
 * Returns payment analytics for the Flow80 dashboard:
 *   - MRR trend (current + 3 prior months)
 *   - Revenue by plan (Starter / Pro / Business)
 *   - Trial → Paid conversion rate
 *   - Churn metrics
 *   - Payment success vs failure rate
 *
 * Card: 69d57927864d77f88b8251bc
 */

import { NextResponse } from 'next/server';
import { getPaymentAnalytics } from '@/services/payment-analytics';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const analytics = await getPaymentAnalytics();
    return NextResponse.json(analytics, {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('[/api/analytics/payments]', msg);
    return NextResponse.json({ message: 'Internal server error', detail: msg }, { status: 500 });
  }
}
