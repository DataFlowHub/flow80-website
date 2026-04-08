/**
 * Flow80 Onboarding Funnel — Event Types
 * Card: 69d57925390d8571c7c61c6d
 */

export type OnboardingStep =
  | 'signup'
  | 'step1'
  | 'step2'
  | 'step3'
  | 'step4'
  | 'dashboard';

export type OnboardingEventType =
  | 'step_viewed'
  | 'step_completed'
  | 'step_abandoned';

export interface OnboardingEvent {
  user_id:         string;
  session_id:      string;
  funnel_name:     'onboarding';
  step_name:       OnboardingStep;
  event_type:      OnboardingEventType;
  time_on_step_ms: number | null;
  created_at:      Date;
}

export interface FunnelStepSummary {
  step:           OnboardingStep;
  viewed:         number;
  completed:      number;
  abandoned:      number;
  completion_rate: number; // 0–1
  avg_time_ms:    number | null;
  drop_off_rate:  number; // 1 - completion_rate
}

export interface FunnelSummary {
  funnel:     FunnelStepSummary[];
  total_users: number;
  generated_at: string;
}