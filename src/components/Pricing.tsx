'use client';

import type { Translations } from '@/i18n/translations';

type Props = {
  t: Translations;
};

export default function Pricing({ t }: Props) {
  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="pricing-section" id="pricing" data-section-name="pricing">
      <div className="container">
        <h2 className="pricing-section__title reveal">{t.pricing.sectionTitle}</h2>
        <p className="pricing-section__lead reveal">{t.pricing.leadIn}</p>

        <div className="pricing-section__grid reveal-stagger">
          {/* ── Starter — €19 ── */}
          <div className="pricing-card">
            <div className="pricing-card__header">
              <div className="pricing-card__tier-label">Starter</div>
              <div className="pricing-card__tagline">For solo operators and small teams</div>
            </div>
            <div className="pricing-card__price">
              <span className="pricing-card__amount">€19</span>
              <span className="pricing-card__period">/ month</span>
            </div>
            <ul className="pricing-card__features">
              <li className="pricing-card__feature">
                <svg className="pricing-card__check" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                <span><strong>Up to 5</strong> users</span>
              </li>
              <li className="pricing-card__feature">
                <svg className="pricing-card__check" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                <span><strong>Up to 10</strong> workflows</span>
              </li>
              <li className="pricing-card__feature">
                <svg className="pricing-card__check" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                <span><strong>10k</strong> API calls / month</span>
              </li>
              <li className="pricing-card__feature">
                <svg className="pricing-card__check" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                <span><strong>1 GB</strong> storage</span>
              </li>
              <li className="pricing-card__feature">
                <svg className="pricing-card__check" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                <span>Core integrations</span>
              </li>
              <li className="pricing-card__feature">
                <svg className="pricing-card__check" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                <span>Basic monitoring</span>
              </li>
              <li className="pricing-card__feature">
                <svg className="pricing-card__check" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                <span>Email support</span>
              </li>
            </ul>
            <button
              className="pricing-card__cta pricing-card__cta--outline"
              data-cta="pricing_starter"
              data-cta-position="pricing"
            >
              Start Free Trial
            </button>
          </div>

          {/* ── Pro — €49 (highlighted) ── */}
          <div className="pricing-card pricing-card--highlight">
            <div className="pricing-card__badge">Most Popular</div>
            <div className="pricing-card__header">
              <div className="pricing-card__tier-label">Pro</div>
              <div className="pricing-card__tagline">For growing teams that need more power</div>
            </div>
            <div className="pricing-card__price">
              <span className="pricing-card__amount">€49</span>
              <span className="pricing-card__period">/ month</span>
            </div>
            <ul className="pricing-card__features">
              <li className="pricing-card__feature">
                <svg className="pricing-card__check pricing-card__check--accent" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                <span><strong>Up to 20</strong> users</span>
              </li>
              <li className="pricing-card__feature">
                <svg className="pricing-card__check pricing-card__check--accent" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                <span><strong>Up to 50</strong> workflows</span>
              </li>
              <li className="pricing-card__feature">
                <svg className="pricing-card__check pricing-card__check--accent" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                <span><strong>100k</strong> API calls / month</span>
              </li>
              <li className="pricing-card__feature">
                <svg className="pricing-card__check pricing-card__check--accent" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                <span><strong>10 GB</strong> storage</span>
              </li>
              <li className="pricing-card__feature">
                <svg className="pricing-card__check pricing-card__check--accent" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                <span>All standard integrations</span>
              </li>
              <li className="pricing-card__feature">
                <svg className="pricing-card__check pricing-card__check--accent" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                <span>Real-time monitoring & logs</span>
              </li>
              <li className="pricing-card__feature">
                <svg className="pricing-card__check pricing-card__check--accent" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                <span>Smart exception handling</span>
              </li>
              <li className="pricing-card__feature">
                <svg className="pricing-card__check pricing-card__check--accent" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                <span>Priority email support (8h response)</span>
              </li>
            </ul>
            <button
              className="pricing-card__cta pricing-card__cta--solid"
              data-cta="pricing_pro"
              data-cta-position="pricing"
            >
              Start Free Trial
            </button>
          </div>

          {/* ── Scale — €129 ── */}
          <div className="pricing-card">
            <div className="pricing-card__header">
              <div className="pricing-card__tier-label">Scale</div>
              <div className="pricing-card__tagline">For teams that need serious scale</div>
            </div>
            <div className="pricing-card__price">
              <span className="pricing-card__amount">€129</span>
              <span className="pricing-card__period">/ month</span>
            </div>
            <ul className="pricing-card__features">
              <li className="pricing-card__feature">
                <svg className="pricing-card__check" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                <span><strong>Up to 100</strong> users</span>
              </li>
              <li className="pricing-card__feature">
                <svg className="pricing-card__check" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                <span><strong>Unlimited</strong> workflows</span>
              </li>
              <li className="pricing-card__feature">
                <svg className="pricing-card__check" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                <span><strong>1M</strong> API calls / month</span>
              </li>
              <li className="pricing-card__feature">
                <svg className="pricing-card__check" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                <span><strong>100 GB</strong> storage</span>
              </li>
              <li className="pricing-card__feature">
                <svg className="pricing-card__check" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                <span>All standard + custom integrations</span>
              </li>
              <li className="pricing-card__feature">
                <svg className="pricing-card__check" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                <span>Advanced monitoring & alerting</span>
              </li>
              <li className="pricing-card__feature">
                <svg className="pricing-card__check" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                <span>Smart exception handling</span>
              </li>
              <li className="pricing-card__feature">
                <svg className="pricing-card__check" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                <span>Dedicated support (4h response) + SLA</span>
              </li>
            </ul>
            <button
              className="pricing-card__cta pricing-card__cta--outline"
              onClick={scrollToContact}
              data-cta="pricing_scale"
              data-cta-position="pricing"
            >
              Start Free Trial
            </button>
          </div>
        </div>

        <p className="pricing-section__addon reveal">
          Need more? Add API calls, storage, or Docker hours on demand. Custom pricing available for high-volume enterprise needs.
        </p>
        <p className="pricing-section__trial-note reveal">
          14-day free trial. No credit card needed to start.
        </p>
      </div>
    </section>
  );
}
