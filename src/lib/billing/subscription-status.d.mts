export type SubscriptionInternalStatus = "active" | "past_due" | "cancelled" | "expired" | "incomplete";
export function statusFor(event: string, providerStatus?: string): SubscriptionInternalStatus | null;
