/**
 * Developer Portal Layout — wraps all /developer/* pages.
 * Dark-themed, with left sidebar navigation.
 */
import type { Metadata } from 'next';
import DevSidebar from '@/components/DevDocs/Sidebar';

export const metadata: Metadata = {
  title: {
    default: 'Developer Docs — Flow80',
    template: '%s — Flow80 Developer Docs',
  },
  description: 'Build powerful workflow integrations with the Flow80 API. Reference docs, guides, and code examples.',
};

export default function DeveloperLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="dev-layout">
      <DevSidebar />
      <main className="dev-layout__main" id="main-content">
        <div className="dev-layout__content">
          {children}
        </div>
      </main>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap');

        .dev-layout {
          display: flex;
          min-height: 100vh;
          background: #0d1117;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
        }

        .dev-layout__main {
          flex: 1;
          min-width: 0;
          overflow-x: hidden;
        }

        .dev-layout__content {
          max-width: 860px;
          margin: 0 auto;
          padding: 3rem 2.5rem 5rem;
        }

        @media (max-width: 768px) {
          .dev-layout__content {
            padding: 2rem 1.25rem 4rem;
          }
        }
      `}</style>
    </div>
  );
}
