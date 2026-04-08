import { NextRequest, NextResponse } from 'next/server';
import { enqueueDripUser } from '@/lib/email-drip-queue';

interface EnqueueBody {
  email: string;
  name: string;
  source?: 'early_access' | 'newsletter' | 'signup';
}

export async function POST(req: NextRequest) {
  try {
    const body: EnqueueBody = await req.json();
    const { email, name, source = 'signup' } = body;

    if (!email || !name) {
      return NextResponse.json({ message: 'email and name are required' }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ message: 'Invalid email address' }, { status: 400 });
    }

    await enqueueDripUser(email, name, source);
    console.log('[Email Drip Enqueue]', { email, name, source, timestamp: new Date().toISOString() });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error('[Email Drip Enqueue Error]', err);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
