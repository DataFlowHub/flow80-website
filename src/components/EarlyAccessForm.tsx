'use client';

import { useState } from 'react';
import type { Translations } from '@/i18n/translations';
import { trackEarlyAccessSubmitted, trackCtaClicked } from '@/services/analytics';

type Props = {
  t: Translations;
  locale: string;
};

type FieldErrors = { name?: string; email?: string; company?: string };

export default function EarlyAccessForm({ t, locale }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [challenge, setChallenge] = useState('');
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  function validate(): FieldErrors {
    const e: FieldErrors = {};
    if (!name.trim()) e.name = t.earlyAccess.errorRequired;
    if (!email.trim()) {
      e.email = t.earlyAccess.errorRequired;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      e.email = t.earlyAccess.errorInvalidEmail;
    }
    if (!company.trim()) e.company = t.earlyAccess.errorRequired;
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

    trackEarlyAccessSubmitted('default');

    setStatus('loading');
    try {
      const res = await fetch('/api/early-access/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, company, challenge, language: locale }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || 'Failed');
      }

      setStatus('success');
    } catch {
      setFormError(t.earlyAccess.errorGeneric);
      setStatus('idle');
    }
  }

  if (status === 'success') {
    return (
      <div className="early-access-section" data-section-name="early_access">
        <div className="early-access__form-wrap">
          <div className="form-confirmation">
            <svg className="form-confirmation__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <h3 className="form-confirmation__heading">{t.earlyAccess.successHeading}</h3>
            <p className="form-confirmation__body">{t.earlyAccess.successBody}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="early-access-section" id="early-access" data-section-name="early_access">
      <div className="early-access__form-wrap">
        <h2 className="early-access__heading">{t.earlyAccess.heading}</h2>
        <p className="early-access__subheading">{t.earlyAccess.subheading}</p>

        {formError && (
          <div className="form-error-banner">
            <p className="form-error-banner__heading">Something went wrong</p>
            <p className="form-error-banner__body">{formError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate data-early-access-form>
          <div className="form-field">
            <label className="form-label" htmlFor="ea-name">
              {t.earlyAccess.nameLabel}
            </label>
            <input
              id="ea-name"
              type="text"
              name="name"
              className="form-input"
              placeholder={t.earlyAccess.namePlaceholder}
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
            <label className="form-label" htmlFor="ea-email">
              {t.earlyAccess.emailLabel}
            </label>
            <input
              id="ea-email"
              type="email"
              name="email"
              className="form-input"
              placeholder={t.earlyAccess.emailPlaceholder}
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

          <div className="form-field">
            <label className="form-label" htmlFor="ea-company">
              {t.earlyAccess.companyLabel}
            </label>
            <input
              id="ea-company"
              type="text"
              name="company"
              className="form-input"
              placeholder={t.earlyAccess.companyPlaceholder}
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              autoComplete="organization"
              disabled={status === 'loading'}
            />
            {errors.company && (
              <span className="form-error">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                {errors.company}
              </span>
            )}
          </div>

          <div className="form-field">
            <label className="form-label" htmlFor="ea-challenge">
              {t.earlyAccess.challengeLabel}
            </label>
            <textarea
              id="ea-challenge"
              name="challenge"
              className="form-textarea"
              placeholder={t.earlyAccess.challengePlaceholder}
              value={challenge}
              onChange={(e) => setChallenge(e.target.value)}
              rows={3}
              disabled={status === 'loading'}
            />
          </div>

          <button
            type="submit"
            className="form-submit"
            disabled={status === 'loading'}
            data-cta="early_access_submit"
            data-cta-position="early_access_form"
          >
            {status === 'loading' ? t.earlyAccess.sending : t.earlyAccess.submitLabel}
          </button>

          <p className="early-access__trust">{t.earlyAccess.trustNote}</p>
        </form>
      </div>
    </div>
  );
}
