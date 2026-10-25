import type { MetadataRoute } from "next";

const SITE_URL = "https://yourdomain.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/dashboard/",
        "/settings/",
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}