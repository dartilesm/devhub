import { NextRequest, NextResponse } from "next/server";

const HOST_NAME = process.env.VERCEL_PROJECT_PRODUCTION_URL || "bytebuzz.dev";

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

  // Get IP from x-forwarded-for header (middleware edge runtime does not provide req.ip)
  const ip = getHeader("x-forwarded-for")?.split(",")[0]?.trim();

  if (!userAgent?.includes("vercel") && url.includes(HOST_NAME)) {
    const data = {
      url,
      ip,
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
    console.log({ data });
    try {
      const response = await fetch(`${process.env.PIRSCH_API_URL}/hit`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.PIRSCH_ACCESS_KEY}`,
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.text();
      console.log({ response: responseData });
    } catch (error) {
      console.error({ error });
    } finally {
      return NextResponse.next();
    }
  }
}
