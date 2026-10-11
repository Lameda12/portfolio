import Link from "next/link";
import { formatDate } from "@/lib/posts";
import type { WritingItem } from "@/lib/substack";

export function WritingList({ items, withYear = false }: { items: WritingItem[]; withYear?: boolean }) {
  return (
    <ul className="post-list">
      {items.map((p) => (
        <li key={p.href}>
          <time dateTime={p.date}>{withYear ? p.date.slice(0, 4) : formatDate(p.date, "short")}</time>
          <span>
            {p.source === "substack" ? (
              <a href={p.href} target="_blank" rel="noopener noreferrer">
                {p.title}
              </a>
            ) : (
              <Link href={p.href}>{p.title}</Link>
            )}
            {p.source === "substack" && <span className="source-flag">substack</span>}
            {p.draft && <span className="draft-flag">draft</span>}
          </span>
        </li>
      ))}
    </ul>
  );
}
