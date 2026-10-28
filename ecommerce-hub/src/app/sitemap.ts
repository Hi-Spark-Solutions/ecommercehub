import type { MetadataRoute } from "next";
import { solutionsMenu, solutionTools } from "@/config/marketing-nav";

const SITE_URL = "https://smartifycommerce.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/product",
    "/pricing",
    "/about",
    "/contact",
    "/signup",
    "/login",
    "/privacy",
    "/terms",
  ];

  const solutionRoutes = solutionsMenu.map((solution) => solution.href);

  const toolRoutes = Object.values(solutionTools)
    .flat()
    .map((tool) => tool.href);

  const routes = [...new Set([
    ...staticRoutes,
    ...solutionRoutes,
    ...toolRoutes,
  ])];

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    changeFrequency: "daily",
    priority: route === "" ? 1 : route.startsWith("/solutions/") ? 0.8 : 0.6,
  }));
}