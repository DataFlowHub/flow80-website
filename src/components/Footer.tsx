'use client';

import type { Translations } from '@/i18n/translations';

type Props = {
  t: Translations;
  locale: string;
};

export default function Footer({ t, locale }: Props) {
  const scrollToForms = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('forms-row')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* CTA Strip */}
      <div className="container">
        <div className="footer-cta-strip">
          <span className="footer-cta-strip__text">{t.footer.ctaStripHeadline}</span>
          <a
            href="#forms-row"
            className="footer-cta-strip__link"
            onClick={scrollToForms}
            data-cta="footer_cta"
            data-cta-position="footer_cta"
          >
            {t.footer.ctaStripCta}
          </a>
        </div>
      </div>

      <footer className="footer" data-section-name="footer">
        <div className="footer__top">
          <div className="footer__brand">
            <div className="footer__logo">Flow80</div>
            <p className="footer__tagline">{t.footer.tagline}</p>
          </div>

          <ul className="footer__links">
            <li><a href="#" className="footer__link">{t.footer.links.about}</a></li>
            <li><a href="#" className="footer__link footer__link--disabled" title="Coming soon">{t.footer.links.howItWorks} (coming)</a></li>
            <li><a href="#" className="footer__link footer__link--disabled" title="Coming soon">{t.footer.links.pricing} (coming)</a></li>
            <li><a href="/privacy" className="footer__link">{t.footer.links.privacy}</a></li>
            <li><a href="/terms" className="footer__link">{t.footer.links.terms}</a></li>
          </ul>
        </div>

        <hr className="footer__divider" />

        <div className="footer__bottom">
          <div className="footer__badges">
            <span>🇪🇺 {t.footer.badges.gdpr}</span>
            <span>🇩🇰 {t.footer.badges.denmark}</span>
            <span>🔒 {t.footer.badges.secure}</span>
          </div>
          <p className="footer__copyright">{t.footer.copyright}</p>
        </div>
      </footer>
    </>
  );
}
