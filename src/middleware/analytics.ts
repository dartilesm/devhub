import { NextRequest, NextResponse } from "next/server";
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
export async function handleAnalytics(req: NextRequest) {
  /**
   * Extracts the value of a header from the request.
   * @param name - The header name
   * @returns The header value or undefined
   */
  function getHeader(name: string): string | undefined {
    return req.headers.get(name) || undefined;
  }

  const userAgent = getHeader("user-agent");
  const url = req.nextUrl.toString();

  // TODO: Find a way to exclude prefetch requests
  if (!userAgent?.includes("vercel") && url.includes(HOST_NAME)) {
    const data = {
      url,
      ip: await getIp(),
      user_agent: userAgent || "",
      accept_language: getHeader("accept-language"),
      sec_ch_ua: getHeader("sec-ch-ua"),
      sec_ch_ua_mobile: getHeader("sec-ch-ua-mobile"),
      sec_ch_ua_platform: getHeader("sec-ch-ua-platform"),
      sec_ch_ua_platform_version: getHeader("sec-ch-ua-platform-version"),
      sec_ch_width: getHeader("sec-ch-width"),
      sec_ch_viewport_width: getHeader("sec-ch-viewport-width"),
      referrer: getHeader("referer"),
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
    } finally {
      return NextResponse.next();
    }
  }
}
