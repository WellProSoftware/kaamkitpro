type AnalyticsParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (
      command: "event",
      eventName: string,
      params?: AnalyticsParams
    ) => void;
  }
}

function trackEvent(
  eventName: string,
  params: AnalyticsParams = {}
): void {
  if (typeof window === "undefined") {
    return;
  }

  if (typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", eventName, params);
}

export function trackToolUsed(toolName: string): void {
  trackEvent("tool_used", {
    tool_name: toolName,
  });
}

export function trackDownload(
  toolName: string,
  fileType?: string
): void {
  trackEvent("download", {
    tool_name: toolName,
    file_type: fileType,
  });
}

export function trackCopy(toolName: string): void {
  trackEvent("copy_result", {
    tool_name: toolName,
  });
}
