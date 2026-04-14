import { NextRequest, NextResponse } from 'next/server';

interface SubscribeBody {
  name: string;
  email: string;
  language?: string;
}

const LARAVEL_API_URL = process.env.LARAVEL_API_URL ?? 'http://localhost:8000';

export async function POST(req: NextRequest) {
  try {
    const body: SubscribeBody = await req.json();
    const { name, email, language } = body;

    if (!name || !email) {
      return NextResponse.json({ message: 'Name and email are required' }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ message: 'Invalid email address' }, { status: 400 });
    }

    // Forward to Laravel backend for storage + email notification
    const laravelRes = await fetch(`${LARAVEL_API_URL}/api/leads/newsletter`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ name, email, language: language || 'en' }),
    });

    if (!laravelRes.ok) {
      const errData = await laravelRes.json().catch(() => ({}));
      console.error('[Newsletter] Laravel error:', errData);
      return NextResponse.json(
        { message: errData.message || 'Failed to subscribe' },
        { status: laravelRes.status }
      );
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error('[Newsletter Error]', err);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
