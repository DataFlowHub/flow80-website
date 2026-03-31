import type { Metadata } from 'next';
import '../styles/globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://flow80.com'),
  title: 'Workflow Automation Without Code — Flow80',
  description:
    'Flow80 connects your systems and automates your operations. No developers, no complicated setup. Get started in minutes.',
  openGraph: {
    title: 'Workflow Automation Without Code — Flow80',
    description:
      'Flow80 connects your systems and automates your operations. No developers, no complicated setup. Get started in minutes.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Workflow Automation Without Code — Flow80',
    description: 'Connect your systems and automate your operations. No code required.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-site-state={process.env.NEXT_PUBLIC_SITE_STATE || 'pre-launch'}>
      <head>
        {/* Google Fonts — preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* Favicon */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        {/* Consent flag (set by cookie consent banner — stub for now) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__flow80Consent = true;`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
