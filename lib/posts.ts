import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");
const SHOW_DRAFTS = process.env.NODE_ENV !== "production";

export type PostMeta = {
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD
  summary: string;
  featured: boolean;
  draft: boolean;
  readingMinutes: number;
};

export type Post = PostMeta & { html: string };

function toISODate(value: unknown, file: string): string {
  // gray-matter parses unquoted YAML dates into Date objects.
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  throw new Error(`${file}: "date" must be YYYY-MM-DD`);
}

function readPost(file: string): Post {
  const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
  const { data, content } = matter(raw);
  if (typeof data.title !== "string" || !data.title.trim()) {
    throw new Error(`${file}: missing "title" in frontmatter`);
  }
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return {
    slug: file.replace(/\.md$/, ""),
    title: data.title,
    date: toISODate(data.date, file),
    summary: typeof data.summary === "string" ? data.summary : "",
    featured: data.featured === true,
    draft: data.draft === true,
    readingMinutes: Math.max(1, Math.round(words / 230)),
    html: marked.parse(content, { async: false, gfm: true }),
  };
}

function allPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md") && !f.startsWith("_"))
    .map(readPost)
    .filter((p) => SHOW_DRAFTS || !p.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
}

const strip = (post: Post): PostMeta => {
  const meta: Partial<Post> = { ...post };
  delete meta.html;
  return meta as PostMeta;
};

export function getPosts(): PostMeta[] {
  return allPosts().map(strip);
}

export function getPost(slug: string): { post: Post; newer?: PostMeta; older?: PostMeta } | null {
  const posts = allPosts();
  const i = posts.findIndex((p) => p.slug === slug);
  if (i === -1) return null;
  return {
    post: posts[i],
    newer: posts[i - 1] ? strip(posts[i - 1]) : undefined,
    older: posts[i + 1] ? strip(posts[i + 1]) : undefined,
  };
}

export function formatDate(iso: string, style: "long" | "short" = "long"): string {
  const d = new Date(`${iso}T12:00:00Z`);
  return d.toLocaleDateString("en-CA", {
    timeZone: "UTC",
    month: style === "long" ? "long" : "short",
    day: "numeric",
    ...(style === "long" ? { year: "numeric" } : {}),
  });
}
