const HOST_NAME = process.env.VERCEL_PROJECT_PRODUCTION_URL || "bytebuzz.dev";

export function isDomainAllowed({ userAgent, url }: { userAgent: string; url: string }) {
  return !userAgent?.includes("vercel") && url.includes(HOST_NAME);
}
