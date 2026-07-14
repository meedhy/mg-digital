export type TrackingEvent =
  | "hero_primary_cta_click"
  | "hero_portfolio_click"
  | "offer_bridge_click"
  | "portfolio_bridge_click"
  | "navbar_cta_click"
  | "objective_select"
  | "objective_navigation_click"
  | "offer_view"
  | "offer_navigation_click"
  | "offer_cta_click"
  | "process_step_navigation_click"
  | "technology_select"
  | "lead_form_start"
  | "lead_form_step_complete"
  | "lead_form_submit"
  | "lead_form_error"
  | "whatsapp_click"
  | "email_click";

export type EventPayload = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export function trackEvent(event: TrackingEvent, payload: EventPayload = {}) {
  if (typeof window === "undefined") return;

  window.dataLayer?.push({ event, ...payload });
}
