import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    {
      url: "https://mgdigital-conseil.com/",
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://mgdigital-conseil.com/mentions-legales",
      lastModified,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: "https://mgdigital-conseil.com/confidentialite",
      lastModified,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}
