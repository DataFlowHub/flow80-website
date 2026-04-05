'use client';

import type { Translations } from '@/i18n/translations';

type Props = {
  t: Translations;
  locale: string;
};

const isGoLive = process.env.NEXT_PUBLIC_SITE_STATE === 'go-live';

export default function Footer({ t, locale }: Props) {
  const scrollToForms = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('forms-row')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToPricing = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToHowItWorks = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Go-Live footer content
  const goLiveFooter = isGoLive
    ? (t as Translations & { footerGoLive?: Props['t']['footer'] }).footerGoLive
    : null;

  const ctaStripHeadline = goLiveFooter?.ctaStripHeadline ?? t.footer.ctaStripHeadline;
  const ctaStripCta = goLiveFooter?.ctaStripCta ?? t.footer.ctaStripCta;
  const footerTagline = goLiveFooter?.tagline ?? t.footer.tagline;
  const ctaScrollHandler = isGoLive ? scrollToPricing : scrollToForms;

  const footerGroupProduct = goLiveFooter?.groupProduct ?? 'Product';
  const footerGroupCompany = goLiveFooter?.groupCompany ?? 'Company';
  const footerGroupLegal = goLiveFooter?.groupLegal ?? 'Legal';

  const linksGoLive = goLiveFooter?.links ?? null;

  return (
    <>
      {/* CTA Strip */}
      {isGoLive ? (
        <div className="footer-cta-strip-go-live">
          <p className="footer-cta-strip-go-live__headline">Ready to automate?</p>
          <a
            href="#pricing"
            className="footer-cta-strip-go-live__btn"
            onClick={ctaScrollHandler}
            data-cta="footer_cta_go_live"
            data-cta-position="footer_cta"
          >
            {ctaStripCta}
          </a>
        </div>
      ) : (
        <div className="container">
          <div className="footer-cta-strip">
            <span className="footer-cta-strip__text">{ctaStripHeadline}</span>
            <a
              href="#pricing"
              className="footer-cta-strip__link"
              onClick={ctaScrollHandler}
              data-cta={isGoLive ? 'footer_cta_go_live' : 'footer_cta'}
              data-cta-position="footer_cta"
            >
              {ctaStripCta}
            </a>
          </div>
        </div>
      )}

      <footer className="footer" data-section-name="footer">
        <div className="footer__top">
          <div className="footer__brand">
            <div className="footer__logo">Flow80</div>
            <p className="footer__tagline">{footerTagline}</p>
          </div>

          {isGoLive && linksGoLive ? (
            // Go-Live footer links: grouped
            <ul className="footer__links">
              <li className="footer__group-label">{footerGroupProduct}</li>
              <li>
                <a href="#how-it-works" className="footer__link" onClick={scrollToHowItWorks}>
                  {linksGoLive.howItWorks}
                </a>
              </li>
              <li>
                <a href="#pricing" className="footer__link" onClick={scrollToPricing}>
                  {linksGoLive.pricing}
                </a>
              </li>
              <li>
                <a href="#templates" className="footer__link" onClick={(e) => { e.preventDefault(); document.getElementById('templates')?.scrollIntoView({ behavior: 'smooth' }); }}>
                  {linksGoLive.templates}
                </a>
              </li>
            </ul>
          ) : (
            // Pre-launch footer links
            <ul className="footer__links">
              <li><a href="/about" className="footer__link">{t.footer.links.about}</a></li>
              <li>
                <span className="footer__link footer__link--disabled" aria-disabled="true">
                  {t.footer.links.howItWorks} (coming)
                </span>
              </li>
              <li>
                <span className="footer__link footer__link--disabled" aria-disabled="true">
                  {t.footer.links.pricing} (coming)
                </span>
              </li>
              <li><a href="/privacy" className="footer__link">{t.footer.links.privacy}</a></li>
              <li><a href="/terms" className="footer__link">{t.footer.links.terms}</a></li>
            </ul>
          )}
        </div>

        <hr className="footer__divider" />

        <div className="footer__bottom">
          <div className="footer__badges">
            <span>🇪🇺 {goLiveFooter?.badges?.gdpr ?? t.footer.badges.gdpr}</span>
            <span>🇩🇰 {goLiveFooter?.badges?.denmark ?? t.footer.badges.denmark}</span>
            <span>🔒 {goLiveFooter?.badges?.secure ?? t.footer.badges.secure}</span>
          </div>
          <p className="footer__copyright">{goLiveFooter?.copyright ?? t.footer.copyright}</p>
        </div>
      </footer>
    </>
  );
}
