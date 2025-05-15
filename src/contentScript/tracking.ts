async function getOrCreateClientId() {
  const result = await chrome.storage.local.get("clientId");
  let clientId = result.clientId;
  if (!clientId) {
    // Generate a unique client ID, the actual value is not relevant
    clientId = self.crypto.randomUUID();
    await chrome.storage.local.set({ clientId });
  }
  return clientId;
}

export async function sendTrackingEvent() {
  try {
    const GA_ENDPOINT = "https://my-tracking-proxy.pear104.workers.dev";
    const DEFAULT_ENGAGEMENT_TIME_IN_MSEC = 100;
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;

    await fetch(GA_ENDPOINT, {
      method: "POST",
      body: JSON.stringify({
        client_id: await getOrCreateClientId(),
        events: [
          {
            name: "gpa_" + tz,
            params: {
              engagement_time_msec: DEFAULT_ENGAGEMENT_TIME_IN_MSEC,
            },
          },
        ],
      }),
    });
  } catch (error) {}
}
