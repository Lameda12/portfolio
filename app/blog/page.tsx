import type { Metadata } from "next";
import Link from "next/link";
import { formatDate, getPosts, type PostMeta } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Writing",
  description: "Essays on building, AI, and what I notice along the way.",
  alternates: { canonical: "/blog" },
};

function PostList({ posts, withYear = false }: { posts: PostMeta[]; withYear?: boolean }) {
  return (
    <ul className="post-list">
      {posts.map((p) => (
        <li key={p.slug}>
          <time dateTime={p.date}>{withYear ? p.date.slice(0, 4) : formatDate(p.date, "short")}</time>
          <span>
            <Link href={`/blog/${p.slug}`}>{p.title}</Link>
            {p.draft && <span className="draft-flag">draft</span>}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default function BlogIndex() {
  const posts = getPosts();
  const featured = posts.filter((p) => p.featured);

  const byYear = posts.reduce<Map<string, PostMeta[]>>((acc, p) => {
    const y = p.date.slice(0, 4);
    acc.set(y, [...(acc.get(y) ?? []), p]);
    return acc;
  }, new Map());

  return (
    <div className="page">
      <div className="page-inner">
        <h1>Writing</h1>
        <p className="intro">
          Essays on building, AI, and what I notice along the way. New ones go out on the{" "}
          <a href="/blog/rss.xml">RSS feed</a>.
        </p>

        {posts.length === 0 && (
          <p className="empty">
            The first essay is on its way. Add the RSS feed to your reader and it&apos;ll show up there.
          </p>
        )}

        {featured.length > 0 && (
          <>
            <h2 className="year">start here</h2>
            <PostList posts={featured} withYear />
          </>
        )}

        {[...byYear.entries()].map(([year, list]) => (
          <section key={year}>
            <h2 className="year">{year}</h2>
            <PostList posts={list} />
          </section>
        ))}
      </div>
    </div>
  );
}
