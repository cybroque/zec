import type { MetadataRoute } from "next";
import { beyondServicesSeoList } from "@/data/beyondSeoData";
import { programsSeoList } from "@/data/programsSeoData";
import { blogPosts } from "@/data/blogData";

const BASE_URL = "https://zippyec.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();

  // Core navigation pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/programs`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/stories`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/beyond`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.85,
    },
  ];

  // Onsite SEO pages for Beyond the Ride services
  const beyondRoutes: MetadataRoute.Sitemap = beyondServicesSeoList.map((service) => ({
    url: `${BASE_URL}/beyond/${service.slug}`,
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  // Onsite SEO pages for Programs
  const programRoutes: MetadataRoute.Sitemap = programsSeoList.map((program) => ({
    url: `${BASE_URL}/programs/${program.slug}`,
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  // Blog articles
  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: currentDate,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...beyondRoutes, ...programRoutes, ...blogRoutes];
}
