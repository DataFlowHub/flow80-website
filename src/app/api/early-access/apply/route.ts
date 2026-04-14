import { NextRequest, NextResponse } from 'next/server';

interface EarlyAccessBody {
  name: string;
  email: string;
  company: string;
  challenge?: string;
  language?: string;
}

const LARAVEL_API_URL = process.env.LARAVEL_API_URL ?? 'http://localhost:8000';

export async function POST(req: NextRequest) {
  try {
    const body: EarlyAccessBody = await req.json();
    const { name, email, company, challenge, language } = body;

    if (!name || !email || !company) {
      return NextResponse.json({ message: 'Name, email, and company are required' }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ message: 'Invalid email address' }, { status: 400 });
    }

    const payload = {
      name,
      email,
      company,
      challenge: challenge || '',
      language: language || 'en',
    };

    // Forward to Laravel backend for storage + email notification
    const laravelRes = await fetch(`${LARAVEL_API_URL}/api/leads/early-access`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!laravelRes.ok) {
      const errData = await laravelRes.json().catch(() => ({}));
      console.error('[Early Access] Laravel error:', errData);
      return NextResponse.json(
        { message: errData.message || 'Failed to submit application' },
        { status: laravelRes.status }
      );
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error('[Early Access Error]', err);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
