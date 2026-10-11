import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { EasterEgg } from "@/components/EasterEgg";
import { formatDate, getPosts } from "@/lib/posts";
import {
  experience,
  featured,
  moreWork,
  now,
  recognition,
  shelved,
  site,
  type Project,
} from "@/lib/site";

type GitCommit = { repo: string; message: string; time: string };

function timeAgo(iso: string): string {
  const h = Math.floor((Date.now() - new Date(iso).getTime()) / 3_600_000);
  if (h < 1) return "just now";
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return d < 30 ? `${d}d ago` : `${Math.floor(d / 30)}mo ago`;
}

async function getGitHubActivity(): Promise<GitCommit[]> {
  try {
    const res = await fetch("https://api.github.com/users/Lameda12/events/public", {
      next: { revalidate: 3600 },
      headers: { Accept: "application/vnd.github.v3+json" },
    });
    if (!res.ok) return [];
    const events: {
      type: string;
      repo?: { name?: string };
      payload?: { commits?: { message?: string }[] };
      created_at: string;
    }[] = await res.json();
    return events
      .filter((e) => e.type === "PushEvent")
      .flatMap((e) =>
        (e.payload?.commits ?? []).slice(0, 1).map((c) => ({
          repo: (e.repo?.name ?? "").replace("Lameda12/", ""),
          message: (c.message ?? "").split("\n")[0],
          time: e.created_at,
        })),
      )
      .slice(0, 4);
  } catch {
    return [];
  }
}

function Section({ label, children }: { label: string; children: ReactNode }) {
  const id = label.replace("~/", "");
  return (
    <section className="section" aria-labelledby={id}>
      <h2 className="section-label" id={id}>
        {label}
      </h2>
      <div className="section-body">{children}</div>
    </section>
  );
}

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

function WorkItem({ p }: { p: Project }) {
  return (
    <article className="work">
      <div className="work-head">
        <h3>{p.name}</h3>
        <span className="work-links">
          {p.live && (
            <a href={p.live} {...ext}>
              live
            </a>
          )}
          {p.code && (
            <a href={p.code} {...ext}>
              code
            </a>
          )}
        </span>
      </div>
      <p>{p.description}</p>
      {p.note && <p className="note">{p.note}</p>}
      <span className="tags">{p.stack.join(", ")}</span>
    </article>
  );
}

export default async function Home() {
  const [commits, posts] = await Promise.all([getGitHubActivity(), getPosts()]);
  const recentPosts = posts.slice(0, 5);

  return (
    <>
      <EasterEgg />

      <header className="hero">
        {/* Replace public/profile.jpg with the new photo; it's cropped to a circle. */}
        <Image src="/profile.jpg" alt={site.name} width={128} height={128} className="hero-photo" priority />
        <h1>
          {site.name}
          <span className="cursor" aria-hidden />
        </h1>
        <p className="lede">
          AI engineer who ships. I build agents that do real work, with guardrails enforced in code, not
          prompts.
        </p>
        <p className="status">
          AI Engineer Intern at <a href="https://trysoup.dev" {...ext}>Soup</a>. Computer Science at
          Dalhousie in Halifax, then an exchange term at City University of Hong Kong in Winter 2027.
        </p>
        <div className="actions">
          <a className="btn" href={`mailto:${site.email}?subject=${encodeURIComponent("Building something")}`}>
            Email me about what you&apos;re building
          </a>
          <Link href="/ideas">See what I want to build</Link>
        </div>
      </header>

      <Section label="~/now">
        <p className="section-note">Updated {now.updated}</p>
        <ul className="now-list">
          {now.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        {commits.length > 0 && (
          <div className="commits" aria-label="Latest public commits">
            {commits.map((c, i) => (
              <p key={i}>
                <span className="repo">{c.repo}</span>
                <span className="msg">{c.message}</span>
                <span>{timeAgo(c.time)}</span>
              </p>
            ))}
          </div>
        )}
      </Section>

      <Section label="~/work">
        {featured.map((p) => (
          <WorkItem key={p.name} p={p} />
        ))}
        <h3 className="subhead">smaller things</h3>
        <ul className="compact">
          {moreWork.map((p) => (
            <li key={p.name}>
              <a className="name" href={p.live ?? p.code} {...ext}>
                {p.name}
              </a>
              {p.description}
            </li>
          ))}
        </ul>
      </Section>

      <Section label="~/writing">
        {recentPosts.length > 0 ? (
          <ul className="post-list">
            {recentPosts.map((p) => (
              <li key={p.slug}>
                <time dateTime={p.date}>{formatDate(p.date, "short")}</time>
                <span>
                  <Link href={`/blog/${p.slug}`}>{p.title}</Link>
                  {p.draft && <span className="draft-flag">draft</span>}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="empty">The first essay is on its way.</p>
        )}
        <p className="mono" style={{ fontSize: "0.8125rem", marginTop: "1.25rem" }}>
          <Link href="/blog">All writing</Link>
          <span className="muted">, or follow the </span>
          <a href="/blog/rss.xml">RSS feed</a>
        </p>
      </Section>

      <Section label="~/experience">
        <ol className="timeline">
          {experience.map((r) => (
            <li key={r.org}>
              <span className="when">{r.period}</span>
              <div className="what">
                <strong>{r.role}</strong>,{" "}
                {r.href ? (
                  <a href={r.href} {...ext}>
                    {r.org}
                  </a>
                ) : (
                  r.org
                )}
                <p>{r.detail}</p>
              </div>
            </li>
          ))}
        </ol>
        <h3 className="subhead">recognition</h3>
        <ul className="compact">
          {recognition.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      </Section>

      <Section label="~/shelved">
        <p className="section-note">Paused for now</p>
        <ul className="compact">
          {shelved.paused.map((p) => (
            <li key={p.name}>
              <a className="name" href={p.href} {...ext}>
                {p.name}
              </a>
              {p.description}
            </li>
          ))}
        </ul>
        <p className="section-note" style={{ marginTop: "1.5rem" }}>
          Stopped
        </p>
        <ul className="compact">
          {shelved.stopped.map((p) => (
            <li key={p.name}>
              <a className="name" href={p.href} {...ext}>
                {p.name}
              </a>
              {p.description}
            </li>
          ))}
        </ul>
      </Section>

      <Section label="~/offline">
        <p>
          Born in Astana, studying in Halifax, heading to Hong Kong next. I watch enough anime that I built{" "}
          <a href="https://ani-scoupe.vercel.app" {...ext}>
            a site
          </a>{" "}
          to find the next one, study poker as applied game theory, and keep coming back to
          Rick Rubin&apos;s idea that the work gets better when you strip it down to what matters.
        </p>
        <p className="muted mono" style={{ fontSize: "0.75rem", marginTop: "1rem" }}>
          Type <kbd>help</kbd> anywhere on this page.
        </p>
      </Section>
    </>
  );
}
