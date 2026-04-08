/**
 * GET /api/analytics/onboarding-funnel
 * Returns aggregated onboarding funnel data.
 * Card: 69d57925390d8571c7c61c6d
 */

import { NextResponse } from 'next/server';
import { getFunnelSummary } from '@/services/onboarding-funnel';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const summary = await getFunnelSummary();
    return NextResponse.json(summary, {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (err) {
    console.error('[onboarding-funnel API]', err);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}