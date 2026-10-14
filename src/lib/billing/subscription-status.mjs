/**
 * Maps explicitly recognized Razorpay subscription events/statuses to internal states.
 * Unknown event/status combinations never grant entitlement.
 * @param {string} event
 * @param {string | undefined} providerStatus
 * @returns {"active" | "past_due" | "cancelled" | "expired" | "incomplete" | null}
 */
export function statusFor(event, providerStatus) {
  if (["subscription.activated", "subscription.charged", "subscription.resumed"].includes(event)) return "active";
  if (event === "subscription.halted") return "past_due";
  if (event === "subscription.cancelled") return "cancelled";
  if (event === "subscription.completed") return "expired";
  if (event === "subscription.pending" || event === "subscription.paused") return "incomplete";
  if (event === "subscription.updated") {
    switch (providerStatus) {
      case "active": return "active";
      case "pending":
      case "authenticated": return "incomplete";
      case "halted": return "past_due";
      case "cancelled": return "cancelled";
      case "completed":
      case "expired": return "expired";
      default: return null;
    }
  }
  return null;
}
