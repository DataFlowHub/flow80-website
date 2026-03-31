'use client';

import { useState, useRef } from 'react';
import type { Translations } from '@/i18n/translations';
import { trackNewsletterSignupAttempted, trackNewsletterSignupCompleted } from '@/services/analytics';

type Props = {
  t: Translations;
  locale: string;
};

type FieldErrors = { name?: string; email?: string };

export default function NewsletterForm({ t, locale }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const formRef = useRef<HTMLFormElement>(null);

  function validate(): FieldErrors {
    const e: FieldErrors = {};
    if (!name.trim()) e.name = t.newsletter.errorRequired;
    if (!email.trim()) {
      e.email = t.newsletter.errorRequired;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      e.email = t.newsletter.errorInvalidEmail;
    }
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError('');
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});

    trackNewsletterSignupAttempted('inline');

    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, language: locale }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || 'Failed');
      }

      trackNewsletterSignupCompleted('inline');
      setStatus('success');
    } catch (err) {
      setFormError(t.newsletter.errorGeneric);
      setStatus('idle');
    }
  }

  if (status === 'success') {
    return (
      <div className="newsletter-section" data-section-name="newsletter">
        <div className="newsletter__form-wrap">
          <div className="form-confirmation">
            <svg className="form-confirmation__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <h3 className="form-confirmation__heading">{t.newsletter.successHeading}</h3>
            <p className="form-confirmation__body">{t.newsletter.successBody}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="newsletter-section" data-section-name="newsletter">
      <div className="newsletter__form-wrap">
        <h2 className="newsletter__heading">{t.newsletter.heading}</h2>
        <p className="newsletter__subheading">{t.newsletter.subheading}</p>

        {formError && (
          <div className="form-error-banner">
            <p className="form-error-banner__heading">Something went wrong</p>
            <p className="form-error-banner__body">{formError}</p>
          </div>
        )}

        <form ref={formRef} onSubmit={handleSubmit} noValidate>
          <div className="form-field">
            <label className="form-label" htmlFor="newsletter-name">
              {t.newsletter.nameLabel}
            </label>
            <input
              id="newsletter-name"
              type="text"
              name="name"
              className="form-input"
              placeholder={t.newsletter.namePlaceholder}
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              disabled={status === 'loading'}
            />
            {errors.name && (
              <span className="form-error">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                {errors.name}
              </span>
            )}
          </div>

          <div className="form-field">
            <label className="form-label" htmlFor="newsletter-email">
              {t.newsletter.emailLabel}
            </label>
            <input
              id="newsletter-email"
              type="email"
              name="email"
              className="form-input"
              placeholder={t.newsletter.emailPlaceholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              disabled={status === 'loading'}
            />
            {errors.email && (
              <span className="form-error">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                {errors.email}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="form-submit"
            disabled={status === 'loading'}
            data-newsletter-submit
            data-cta="newsletter_submit"
            data-cta-position="newsletter_form"
          >
            {status === 'loading' ? t.newsletter.sending : t.newsletter.submitLabel}
          </button>

          <p className="form-privacy">{t.newsletter.privacyNote}</p>
        </form>
      </div>
    </div>
  );
}
