type LogEvent =
  | { type: "page_view"; page: string; userAgent?: string }
  | { type: "ugc_click"; ugcName: string; assetId: number; creator: string; tier: string }
  | { type: "search"; query: string; results: number }
  | { type: "tier_filter"; tier: string }
  | { type: "roblox_account"; username: string };

export async function logEvent(event: LogEvent): Promise<void> {
  try {
    await fetch(`${import.meta.env.BASE_URL}api/logs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        event.type === "page_view"
          ? { ...event, userAgent: navigator.userAgent }
          : event
      ),
    });
  } catch {
    // fail silently — logs are non-critical
  }
}
