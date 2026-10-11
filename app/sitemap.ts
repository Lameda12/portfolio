import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/posts";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/blog", "/ideas", "/ai"].map((p) => ({ url: `${site.url}${p}` }));
  const posts = getPosts()
    .filter((p) => !p.draft)
    .map((p) => ({ url: `${site.url}/blog/${p.slug}`, lastModified: p.date }));
  return [...pages, ...posts];
}
