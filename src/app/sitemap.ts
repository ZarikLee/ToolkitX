import { categories } from "@/data/tutorials";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://aitoolkitx.com";
  const entries: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), priority: 1 },
    { url: `${baseUrl}/learn`, lastModified: new Date(), priority: 0.8 },
  ];

  for (const cat of categories) {
    entries.push({
      url: `${baseUrl}/learn/${cat.id}`,
      lastModified: new Date(),
      priority: 0.7,
    });
    for (const t of cat.tutorials) {
      entries.push({
        url: `${baseUrl}/learn/${cat.id}/${t.slug}`,
        lastModified: new Date(),
        priority: 0.6,
      });
    }
  }

  return entries;
}
