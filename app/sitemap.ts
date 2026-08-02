import type { MetadataRoute } from "next";
import { getContent } from "@/lib/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const content = await getContent();
  const base = "https://yourdomain.com";

  const staticRoutes = ["", "/about", "/portfolio", "/services", "/testimonials", "/contact"].map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
  }));

  const projectRoutes = content.projects.map((p) => ({
    url: `${base}/portfolio/${p.slug}`,
    lastModified: new Date(p.createdAt),
  }));

  return [...staticRoutes, ...projectRoutes];
}
