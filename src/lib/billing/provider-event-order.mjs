/**
 * Decide whether a provider event may change subscription state.
 * Terminal states are immutable here; timestamps use the provider-created time,
 * not webhook arrival time. Equal or invalid timestamps fail closed.
 * @param {{status?: string, last_provider_event_at?: string | null} | null | undefined} current
 * @param {string} incomingEventAt ISO timestamp derived from the signed provider payload
 */
export function shouldApplyProviderEvent(current, incomingEventAt) {
  if (!current || current.status === "cancelled" || current.status === "expired") return false;
  const incoming = Date.parse(incomingEventAt);
  if (!Number.isFinite(incoming)) return false;
  if (!current.last_provider_event_at) return true;
  const previous = Date.parse(current.last_provider_event_at);
  if (!Number.isFinite(previous)) return false;
  return incoming > previous;
}
