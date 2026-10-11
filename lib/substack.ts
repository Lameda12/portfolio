import { getPosts } from "@/lib/posts";

export const SUBSTACK_PROFILE = "https://substack.com/@alamedin";
export const SUBSTACK_PUBLICATION = "https://alamedin.substack.com";
const FEED_URL = `${SUBSTACK_PUBLICATION}/feed`;

export type WritingItem = {
  title: string;
  date: string; // YYYY-MM-DD
  href: string;
  source: "site" | "substack";
  draft?: boolean;
  featured?: boolean;
};

const unwrap = (s = "") =>
  s
    .replace(/^<!\[CDATA\[/, "")
    .replace(/\]\]>$/, "")
    .replace(/&amp;/g, "&")
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .trim();

const tag = (xml: string, name: string) => xml.match(new RegExp(`<${name}>([\\s\\S]*?)</${name}>`))?.[1];

// Revalidates hourly, so a new Substack post shows up here within the hour.
export async function getSubstackPosts(): Promise<WritingItem[]> {
  try {
    const res = await fetch(FEED_URL, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const xml = await res.text();
    return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].flatMap(([, item]) => {
      const title = unwrap(tag(item, "title"));
      const link = unwrap(tag(item, "link"));
      const date = new Date(unwrap(tag(item, "pubDate")));
      if (!title || !link || Number.isNaN(date.getTime())) return [];
      return [{ title, href: link, date: date.toISOString().slice(0, 10), source: "substack" as const }];
    });
  } catch {
    return [];
  }
}

// Essays from content/posts plus Substack posts, newest first.
export async function getAllWriting(): Promise<WritingItem[]> {
  const local: WritingItem[] = getPosts().map((p) => ({
    title: p.title,
    date: p.date,
    href: `/blog/${p.slug}`,
    source: "site",
    draft: p.draft,
    featured: p.featured,
  }));
  const remote = await getSubstackPosts();
  return [...local, ...remote].sort((a, b) => b.date.localeCompare(a.date));
}
