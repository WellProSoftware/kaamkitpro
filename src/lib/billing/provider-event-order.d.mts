export function shouldApplyProviderEvent(input: {
  currentStatus?: string;
  lastEventAt?: string | null;
  eventAt: string;
}): boolean;
