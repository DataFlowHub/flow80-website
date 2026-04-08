'use client';

// ── Analytics Service (Otto's Instrumentation Plan — W4) ──
// Thin wrapper around GA4 / window.gtag
// All 7 pre-launch events implemented. Go-live events stubbed for future activation.

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    fbq: (...args: unknown[]) => void;
    __flow80Consent: boolean;
    flow80Sid: string;
    flow80Uid: string | null;
  }
}

const SITE_STATE = process.env.NEXT_PUBLIC_SITE_STATE || 'pre-launch';
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';

// ── Session ID ──
function getSessionId(): string {
  if (typeof window === 'undefined') return '';
  if (!window.flow80Sid) {
    window.flow80Sid = crypto.randomUUID?.() || Math.random().toString(36).slice(2);
    try { sessionStorage.setItem('flow80Sid', window.flow80Sid); } catch {}
  }
  return window.flow80Sid;
}

// ── Consent Guard ──
function canTrack(): boolean {
  if (typeof window === 'undefined') return false;
  return window.__flow80Consent !== false;
}

// ── Base event sender ──
function sendEvent(name: string, params: Record<string, unknown> = {}): void {
  if (!canTrack()) return;
  if (typeof window.gtag !== 'function') {
    // Stub: log to console in dev
    if (process.env.NODE_ENV === 'development') {
      console.debug('[Analytics]', name, params);
    }
    return;
  }
  window.gtag('event', name, {
    ...params,
    site_state: SITE_STATE,
    flow80_session_id: getSessionId(),
    send_to: GA_MEASUREMENT_ID || undefined,
  });
}

// ── 1. page_view ──
// Fires on every full page load and client-side navigation.
export function trackPageView(pageLocation?: string): void {
  sendEvent('page_view', {
    page_location: pageLocation || (typeof window !== 'undefined' ? window.location.href : ''),
    language: getLanguage(),
  });
}

// ── 2. section_view ──
// Fires once per section per session when it scrolls into view.
const _viewedSections = new Set<string>();

export function trackSectionView(sectionName: string): void {
  if (_viewedSections.has(sectionName)) return;
  _viewedSections.add(sectionName);
  sendEvent('section_view', {
    section_name: sectionName,
    site_state: SITE_STATE,
  });
}

// ── 3. newsletter_signup_attempted ──
export function trackNewsletterSignupAttempted(formLocation: string): void {
  sendEvent('newsletter_signup_attempted', {
    form_location: formLocation,
    language: getLanguage(),
    site_state: SITE_STATE,
  });
}

// ── 4. newsletter_signup_completed ──
export function trackNewsletterSignupCompleted(formLocation: string): void {
  sendEvent('newsletter_signup_completed', {
    form_location: formLocation,
    language: getLanguage(),
    subscription_tier: 'free',
    site_state: SITE_STATE,
  });
}

// ── 5. early_access_submitted ──
export function trackEarlyAccessSubmitted(formVariant: string = 'default'): void {
  sendEvent('early_access_submitted', {
    language: getLanguage(),
    form_variant: formVariant,
    site_state: SITE_STATE,
  });
}

// ── 6. cta_clicked ──
export function trackCtaClicked(
  ctaLabel: string,
  ctaPosition: string,
  ctaDestination?: string
): void {
  sendEvent('cta_clicked', {
    cta_label: ctaLabel,
    cta_position: ctaPosition,
    cta_destination: ctaDestination || '',
    language: getLanguage(),
    site_state: SITE_STATE,
  });

  // Go-live: trial_signup_initiated (fires alongside cta_clicked)
  if (SITE_STATE === 'go-live') {
    // Stub — activate when trial funnel is live
    // trackTrialSignupInitiated(ctaPosition, ctaLabel);
  }
}

// ── 7. language_toggled ──
export function trackLanguageToggled(langFrom: string, langTo: string, switcherLocation: string): void {
  sendEvent('language_toggled', {
    language_from: langFrom,
    language_to: langTo,
    language_switcher_location: switcherLocation,
    site_state: SITE_STATE,
  });
}

// ── Onboarding Funnel Tracking ───────────────────────────────────────────────
// Card: 69d57925390d8571c7c61c6d

export type OnboardingStep = 'signup' | 'step1' | 'step2' | 'step3' | 'step4' | 'dashboard';

interface OnboardingEventParams {
  step: OnboardingStep;
  userId?: string;     // falls back to flow80Uid or session ID
  timeOnStepMs?: number;
}

function resolveUserId(): string {
  if (typeof window === 'undefined') return '';
  return window.flow80Uid || getSessionId();
}

export function trackOnboardingStepViewed(params: OnboardingEventParams): void {
  sendEvent('onboarding_step_viewed', {
    funnel_name:    'onboarding',
    step_name:     params.step,
    user_id:       params.userId ?? resolveUserId(),
    time_on_step_ms: null,
    site_state:    SITE_STATE,
  });
}

export function trackOnboardingStepCompleted(params: OnboardingEventParams): void {
  sendEvent('onboarding_step_completed', {
    funnel_name:      'onboarding',
    step_name:       params.step,
    user_id:         params.userId ?? resolveUserId(),
    time_on_step_ms: params.timeOnStepMs ?? null,
    site_state:      SITE_STATE,
  });
}

export function trackOnboardingStepAbandoned(params: OnboardingEventParams): void {
  sendEvent('onboarding_step_abandoned', {
    funnel_name:      'onboarding',
    step_name:       params.step,
    user_id:         params.userId ?? resolveUserId(),
    time_on_step_ms: params.timeOnStepMs ?? null,
    site_state:      SITE_STATE,
  });
}

// ── Utility ──
function getLanguage(): string {
  if (typeof document === 'undefined') return 'en';
  return document.documentElement.lang || 'en';
}

// ── SPA Navigation Tracking ──
export function initPageViewTracking(): void {
  if (typeof window === 'undefined') return;

  // Patch pushState/replaceState for SPA navigation
  const origPushState = history.pushState;
  const origReplaceState = history.replaceState;

  history.pushState = function (...args) {
    origPushState.apply(this, args);
    trackPageView();
  };

  history.replaceState = function (...args) {
    origReplaceState.apply(this, args);
    trackPageView();
  };

  window.addEventListener('popstate', () => {
    trackPageView();
  });
}

// ── IntersectionObserver-based Section Tracking ──
export function initSectionTracking(): void {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const name = (entry.target as HTMLElement).dataset.sectionName;
          if (name) trackSectionView(name);
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('[data-section-name]').forEach((el) => {
    io.observe(el);
  });
}

// ── CTA Click Delegation ──
export function initCtaTracking(): void {
  if (typeof document === 'undefined') return;

  document.addEventListener('click', (e) => {
    const target = (e.target as HTMLElement).closest('[data-cta]') as HTMLElement | null;
    if (!target) return;

    const label = target.textContent?.trim() || '';
    const position = target.dataset.ctaPosition || target.dataset.cta || '';
    const href = target.getAttribute('href') || '';

    trackCtaClicked(label, position, href);
  });
}
