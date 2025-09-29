import { createHmac } from "crypto";

/**
 * Generic form sender
 *
 * @param payload  - The request body (typed per site)
 * @param siteSlug - Slug or identifier of the site
 * @param endpoint - API endpoint (your comms webhook)
 * @param secret   - Shared HMAC secret
 */
export async function sendForm<TPayload extends object, TResponse = unknown>(
    payload: TPayload,
    siteSlug: string,
    endpoint: string,
    secret: string
): Promise<TResponse> {
    const raw = JSON.stringify(payload);
    const sig = createHmac("sha256", secret).update(raw).digest("hex");

    const res = await fetch(endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Site": siteSlug,
            "X-Signature": sig
        },
        body: raw
    });

    if (!res.ok) {
        throw new Error(`Form submission failed: ${res.status}`);
    }

    // Cast JSON to TResponse
    return (await res.json()) as TResponse;
}
