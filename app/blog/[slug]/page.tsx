import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDate, getPost, getPosts } from "@/lib/posts";
import { site } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const found = getPost(slug);
  if (!found) return {};
  const { post } = found;
  return {
    title: post.title,
    description: post.summary || undefined,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.summary || undefined,
      publishedTime: post.date,
      url: `/blog/${post.slug}`,
    },
  };
}

export default async function PostPage({ params }: Params) {
  const { slug } = await params;
  const found = getPost(slug);
  if (!found) notFound();
  const { post, newer, older } = found;
  const replySubject = encodeURIComponent(`Re: ${post.title}`);

  return (
    <article className="essay">
      <div className="essay-inner">
        <Link href="/blog" className="back">
          ~/writing
        </Link>
        <h1>
          {post.title}
          {post.draft && <span className="draft-flag">draft</span>}
        </h1>
        <p className="meta">
          <time dateTime={post.date}>{formatDate(post.date)}</time>, {post.readingMinutes} min read
        </p>

        <div className="prose" dangerouslySetInnerHTML={{ __html: post.html }} />

        <footer className="essay-end">
          <p>
            Disagree, or building something related?{" "}
            <a href={`mailto:${site.email}?subject=${replySubject}`}>Reply by email</a>.
          </p>
          {(newer || older) && (
            <nav className="pager" aria-label="More essays">
              {newer ? (
                <Link href={`/blog/${newer.slug}`}>
                  <span>newer</span>
                  <strong>{newer.title}</strong>
                </Link>
              ) : (
                <span />
              )}
              {older && (
                <Link href={`/blog/${older.slug}`} className="older">
                  <span>older</span>
                  <strong>{older.title}</strong>
                </Link>
              )}
            </nav>
          )}
        </footer>
      </div>
    </article>
  );
}
