import { NextRequest, NextResponse } from 'next/server';

interface EarlyAccessBody {
  name: string;
  email: string;
  company: string;
  challenge?: string;
  language?: string;
}

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
      source: 'flow80-prelaunch',
      timestamp: new Date().toISOString(),
    };

    console.log('[Early Access Apply]', payload);

    // TODO: Wire to Mission Control (port 8101) to notify Ruby
    // const mcRes = await fetch('http://localhost:8101/api/tasks', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     type: 'early_access_application',
    //     priority: 'normal',
    //     data: payload,
    //     notify: 'ruby',
    //   }),
    // });

    // TODO: Store in database (Mission Control / Supabase / etc.)
    // const dbRes = await supabase.from('early_access_applications').insert(payload);

    // Simulate network latency
    await new Promise((r) => setTimeout(r, 400));

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error('[Early Access Error]', err);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
