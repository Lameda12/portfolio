import type { Metadata } from "next";
import { WritingList } from "@/components/WritingList";
import { SUBSTACK_PROFILE, getAllWriting, type WritingItem } from "@/lib/substack";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Writing",
  description: "Essays on building, AI, and what I notice along the way.",
  alternates: { canonical: "/blog" },
};

export default async function BlogIndex() {
  const items = await getAllWriting();
  const featured = items.filter((p) => p.featured);

  const byYear = items.reduce<Map<string, WritingItem[]>>((acc, p) => {
    const y = p.date.slice(0, 4);
    acc.set(y, [...(acc.get(y) ?? []), p]);
    return acc;
  }, new Map());

  return (
    <div className="page">
      <div className="page-inner">
        <h1>Writing</h1>
        <p className="intro">
          Essays on building, AI, and what I notice along the way. Some live here, some on{" "}
          <a href={SUBSTACK_PROFILE} target="_blank" rel="noopener noreferrer">
            Substack
          </a>
          . Subscribe there, or follow the <a href="/blog/rss.xml">RSS feed</a> for the ones published here.
        </p>

        {items.length === 0 && (
          <p className="empty">
            The first essay is on its way. Add the RSS feed to your reader and it&apos;ll show up there.
          </p>
        )}

        {featured.length > 0 && (
          <>
            <h2 className="year">start here</h2>
            <WritingList items={featured} withYear />
          </>
        )}

        {[...byYear.entries()].map(([year, list]) => (
          <section key={year}>
            <h2 className="year">{year}</h2>
            <WritingList items={list} />
          </section>
        ))}
      </div>
    </div>
  );
}
