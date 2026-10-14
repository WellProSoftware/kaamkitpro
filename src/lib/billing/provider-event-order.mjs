/**
 * Pure guard for applying a provider-created subscription event.
 * Terminal states never reopen, and timestamps must move strictly forward.
 * @param {{currentStatus?: string, lastEventAt?: string | null, eventAt: string}} input
 */
export function shouldApplyProviderEvent({ currentStatus, lastEventAt, eventAt }) {
  if (currentStatus === "cancelled" || currentStatus === "expired") return false;
  const incoming = Date.parse(eventAt);
  if (!Number.isFinite(incoming)) return false;
  if (lastEventAt != null) {
    const previous = Date.parse(lastEventAt);
    if (!Number.isFinite(previous) || incoming <= previous) return false;
  }
  return true;
}

/**
 * Convert a provider Unix timestamp (seconds) into an ISO timestamp.
 * Returns null for missing, non-finite, non-positive, or out-of-range values.
 * @param {unknown} value
 * @returns {string | null}
 */
export function parseProviderEventTimestamp(value) {
  if (typeof value !== "number" || !Number.isFinite(value) || value <= 0) return null;
  const milliseconds = value * 1000;
  if (!Number.isFinite(milliseconds)) return null;
  const date = new Date(milliseconds);
  if (!Number.isFinite(date.getTime())) return null;
  return date.toISOString();
}
