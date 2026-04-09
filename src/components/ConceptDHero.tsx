'use client';

import { useEffect, useRef } from 'react';
import type { Translations } from '@/i18n/translations';

type Props = {
  t: Translations;
  locale: string;
};

// Animated network nodes canvas background
function NetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Nodes
    const NODE_COUNT = 55;
    const nodes: { x: number; y: number; vx: number; vy: number; r: number; opacity: number }[] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Move nodes
      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      });

      // Draw lines between nearby nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(124, 58, 237, ${0.15 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      nodes.forEach((n) => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(124, 58, 237, ${n.opacity})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        opacity: 0.6,
      }}
    />
  );
}

const INTEGRATIONS = [
  { label: 'SAP', color: '#0F9D58' },
  { label: 'Slack', color: '#4A154B' },
  { label: 'PostgreSQL', color: '#336791' },
  { label: 'SFTP / EDI', color: '#7C3AED' },
  { label: 'HubSpot', color: '#FF7A59' },
  { label: 'REST / GraphQL', color: '#7C3AED' },
  { label: '40+ more', color: '#7C3AED' },
];

export default function ConceptDHero({ t, locale }: Props) {
  const scrollToHowItWorks = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = `/${locale}/how-it-works`;
  };

  const scrollToForms = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = `/${locale}/pricing`;
  };

  return (
    <section className="concept-d-hero">
      {/* Animated network canvas background */}
      <NetworkCanvas />

      {/* Gradient overlay so text is readable */}
      <div className="concept-d-hero__overlay" aria-hidden="true" />

      <div className="concept-d-hero__inner container">
        {/* Top badge */}
        <div className="concept-d-hero__badge reveal">
          🚀 Built in Denmark · GDPR Compliant
        </div>

        {/* Headline */}
        <h1 className="concept-d-hero__headline reveal">
          Your data.<br />Your workflows.<br />
          <span className="concept-d-hero__headline-accent">Finally under control.</span>
        </h1>

        {/* Subheadline */}
        <p className="concept-d-hero__sub reveal">
          Flow80 connects your systems and automates your operations — no developers needed, no complicated setup. Get started in minutes, not months.
        </p>

        {/* CTAs */}
        <div className="concept-d-hero__ctas reveal">
          <button
            className="concept-d-hero__cta-primary"
            onClick={scrollToForms}
            data-cta="concept_d_primary"
            data-cta-position="hero"
            aria-label="Get Early Access"
          >
            Get Early Access →
          </button>
          <button
            className="concept-d-hero__cta-secondary"
            onClick={scrollToHowItWorks}
            data-cta="concept_d_secondary"
            data-cta-position="hero"
            aria-label="See How It Works"
          >
            See How It Works ↓
          </button>
        </div>

        {/* Trust badges */}
        <div className="concept-d-hero__trust reveal">
          <span>🇩🇰 Built in Denmark</span>
          <span>·</span>
          <span>🇪🇺 GDPR Compliant</span>
          <span>·</span>
          <span>🔒 Secure by design</span>
        </div>

        {/* Integration chips */}
        <div className="concept-d-hero__integrations reveal">
          <span className="concept-d-hero__integrations-label">Connect everything:</span>
          {INTEGRATIONS.map((inv) => (
            <span
              key={inv.label}
              className="concept-d-hero__chip"
              style={{ '--chip-color': inv.color } as React.CSSProperties}
            >
              {inv.label}
            </span>
          ))}
        </div>

        {/* Flow section */}
        <div className="concept-d-hero__flow reveal">
          <span className="concept-d-hero__flow-step">Connect</span>
          <span className="concept-d-hero__flow-arrow" aria-hidden="true">→</span>
          <span className="concept-d-hero__flow-step">Define</span>
          <span className="concept-d-hero__flow-arrow" aria-hidden="true">→</span>
          <span className="concept-d-hero__flow-step">Automate</span>
          <span className="concept-d-hero__flow-arrow" aria-hidden="true">→</span>
          <span className="concept-d-hero__flow-step concept-d-hero__flow-step--relax">Relax</span>
        </div>
      </div>
    </section>
  );
}