import { NextRequest, NextResponse } from 'next/server';

// Newsletter subscription endpoint
// Connects to email platform (jared@ooz.dk)
// In production this would integrate with Mailgun, ConvertKit, Buttondown, etc.

interface SubscribeBody {
  name: string;
  email: string;
  language?: string;
}

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

    // TODO: Wire to actual email platform
    // Options: Mailgun API, ConvertKit, Buttondown, Mailchimp
    // env.NEXT_PUBLIC_EMAIL_PROVIDER=x
    // env.MAILGUN_API_KEY=...
    // env.MAILGUN_DOMAIN=...
    // env.CONVERTKIT_API_KEY=...
    // env.BUTTONDOWN_API_KEY=...
    //
    // For now, log to console (staging verification)
    console.log('[Newsletter Subscribe]', {
      name,
      email,
      language,
      timestamp: new Date().toISOString(),
    });

    // Simulate network latency
    await new Promise((r) => setTimeout(r, 400));

    // In production, replace this block with actual email platform API call:
    //
    // Example — Mailgun:
    // const formData = new URLSearchParams({
    //   from: 'Flow80 <noreply@flow80.com>',
    //   to: 'jared@ooz.dk',
    //   subject: `New newsletter signup: ${name}`,
    //   text: `Name: ${name}\nEmail: ${email}\nLanguage: ${language}`,
    // });
    // const mgRes = await fetch(
    //   `https://api.mailgun.net/v3/${process.env.MAILGUN_DOMAIN}/messages`,
    //   {
    //     method: 'POST',
    //     headers: {
    //       'Authorization': `Basic ${Buffer.from(`api:${process.env.MAILGUN_API_KEY}`).toString('base64')}`,
    //     },
    //     body: formData,
    //   }
    // );
    // if (!mgRes.ok) throw new Error('Mailgun error');

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error('[Newsletter Error]', err);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
