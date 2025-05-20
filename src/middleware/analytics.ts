import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

const HOST_NAME = process.env.VERCEL_PROJECT_PRODUCTION_URL || "localhost";

export async function getIp() {
  const headersList = await headers();
  const forwardedFor = headersList.get("x-forwarded-for");
  const realIp = headersList.get("x-real-ip");

  console.log({ forwardedFor, realIp });

  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  if (realIp) return realIp.trim();

  return null; // or '0.0.0.0', depends
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

  if (!userAgent?.includes("vercel") && url.includes(HOST_NAME)) {
    const data = {
      url,
      ip: await getIp(),
      accept_language: getHeader("accept-language"),
      user_agent: userAgent || "",
    };

    // Log the analytics data
    console.log({ data });
    try {
      const response = await fetch(`${process.env.PIRSCH_API_URL}/hit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
