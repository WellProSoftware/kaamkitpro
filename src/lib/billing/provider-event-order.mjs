/**
 * Decide whether a provider event may change subscription state.
 * Provider timestamps have second-level precision. On a timestamp tie, allow
 * terminal transitions so cancellation/expiry cannot be discarded behind an
 * activation/charge event; terminal local states are never reopened.
 * @param {{status?: string, last_provider_event_at?: string | null} | null | undefined} current
 * @param {string} incomingEventAt ISO timestamp derived from the signed provider payload
 * @param {string} nextStatus status mapped from the allow-listed provider event
 */
export function shouldApplyProviderEvent(current, incomingEventAt, nextStatus) {
  if (!current || current.status === "cancelled" || current.status === "expired") return false;
  const incoming = Date.parse(incomingEventAt);
  if (!Number.isFinite(incoming)) return false;
  if (!current.last_provider_event_at) return true;
  const previous = Date.parse(current.last_provider_event_at);
  if (!Number.isFinite(previous)) return false;
  if (incoming > previous) return true;
  if (incoming < previous) return false;
  return nextStatus === "cancelled" || nextStatus === "expired";
}
