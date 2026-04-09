/**
 * Developer Portal Layout — wraps all /developer/* pages.
 * Dark-themed, with left sidebar navigation.
 */
import type { Metadata } from 'next';
import DevSidebar from '@/components/DevDocs/Sidebar';
import '@/styles/developer.css';

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
    </div>
  );
}
