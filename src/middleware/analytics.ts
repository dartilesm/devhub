import { headers } from "next/headers";

const HOST_NAME = process.env.VERCEL_PROJECT_PRODUCTION_URL || "localhost";

export async function getIp() {
  const headersList = await headers();
  const forwardedFor = headersList.get("x-forwarded-for");
  const realIp = headersList.get("x-real-ip");

  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  if (realIp) return realIp.trim();

  return null;
}
/**
 * Handles analytics logging and posting to external API for each request.
 * @param req - The Next.js middleware request object
 */
export async function handleAnalytics() {
  /**
   * Extracts the value of a header from the request.
   * @param name - The header name
   * @returns The header value or undefined
   */
  async function getHeader(name: string): Promise<string | undefined> {
    const headerList = await headers();
    return headerList.get(name) || undefined;
  }

  const userAgent = await getHeader("user-agent");
  const pathname = await getHeader("x-current-path");
  const url = `https://${HOST_NAME}${pathname}`;
  console.log({ headers: await headers() });

  // TODO: Find a way to exclude prefetch requests
  if (!userAgent?.includes("vercel") && url.includes(HOST_NAME)) {
    const data = {
      url,
      ip: await getIp(),
      user_agent: userAgent || "",
      accept_language: await getHeader("accept-language"),
      sec_ch_ua: await getHeader("sec-ch-ua"),
      sec_ch_ua_mobile: await getHeader("sec-ch-ua-mobile"),
      sec_ch_ua_platform: await getHeader("sec-ch-ua-platform"),
      sec_ch_ua_platform_version: await getHeader("sec-ch-ua-platform-version"),
      sec_ch_width: await getHeader("sec-ch-width"),
      sec_ch_viewport_width: await getHeader("sec-ch-viewport-width"),
      referrer: await getHeader("referer"),
      tags: {},
    };

    // Log the analytics data
    console.log({ ...data, hostname: HOST_NAME });
    try {
      const response = await fetch(`${process.env.PIRSCH_API_URL}/hit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.PIRSCH_ACCESS_KEY}`,
        },
        body: JSON.stringify(data),
      });
      console.log({ response });
    } catch (error) {
      console.error({ error });
    }
  }
}
