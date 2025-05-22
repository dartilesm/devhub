import { isDomainAllowed } from "@/lib/analytics/domain-check";

interface PageViewEventData {
  ip: string;
  headerList: Headers;
}

export function sendPageViewEvent(data: PageViewEventData) {
  const url = data.headerList.get("x-full-url") || "";
  const userAgent = data.headerList.get("user-agent") || "";

  if (!isDomainAllowed({ url, userAgent })) {
    console.log(
      `Page view event not sent because domain ${url} or user agent ${userAgent} is not allowed`
    );
    return;
  }

  const pageInfo = {
    url,
    ip: data.ip,
    user_agent: userAgent,
    accept_language: data.headerList.get("accept-language") || "",
    sec_ch_ua: data.headerList.get("sec-ch-ua") || "",
    sec_ch_ua_mobile: data.headerList.get("sec-ch-ua-mobile") || "",
    sec_ch_ua_platform: data.headerList.get("sec-ch-ua-platform") || "",
    sec_ch_ua_platform_version: data.headerList.get("sec-ch-ua-platform-version") || "",
    sec_ch_width: data.headerList.get("sec-ch-width") || "",
    sec_ch_viewport_width: data.headerList.get("sec-ch-viewport-width") || "",
    referrer: data.headerList.get("referer") || "",
    tags: {},
  };

  console.log("Page view event sent", pageInfo);
}
