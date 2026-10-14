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
