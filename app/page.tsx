import Image from "next/image";
import { Shell } from "@/components/Shell";
import { Post } from "@/components/Post";
import {
  CYAN,
  FEED,
  LIME,
  META,
  PINK,
  VIOLET,
  YELLOW,
  indexOf,
} from "@/components/meta";
import {
  Chip,
  Headline,
  Kicker,
  Marquee,
  ProjectCard,
  ScrollHint,
  TierRow,
} from "@/components/ui";
import { EasterEgg } from "@/components/EasterEgg";
import { BuildingStreak } from "@/components/BuildingStreak";

/* ══════════════════════════════════════════════════
   Live GitHub activity
   ══════════════════════════════════════════════════ */

type GitCommit = { repo: string; message: string; time: string };

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const h = Math.floor(diff / 3_600_000);
  if (h < 1) return "just now";
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 30) return `${d}d ago`;
  return `${Math.floor(d / 30)}mo ago`;
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
      repo: { name: string };
      payload: { commits?: { message: string }[] };
      created_at: string;
    }[] = await res.json();

    return events
      .filter((e) => e.type === "PushEvent")
      .flatMap((e) =>
        (e.payload?.commits ?? []).slice(0, 2).map((c) => ({
          repo: (e.repo?.name ?? "").replace("Lameda12/", ""),
          message: (c.message ?? "").split("\n")[0],
          time: e.created_at,
        }))
      )
      .slice(0, 7);
  } catch {
    return [];
  }
}

const LINKS = [
  { label: "email", value: "asabitt29@gmail.com", href: "mailto:asabitt29@gmail.com" },
  { label: "github", value: "github.com/Lameda12", href: "https://github.com/Lameda12" },
  { label: "x", value: "@amadisabit", href: "https://x.com/amadisabit" },
  {
    label: "linkedin",
    value: "in/alamedin-sabit",
    href: "https://www.linkedin.com/in/alamedin-sabit",
  },
  {
    label: "product hunt",
    value: "@amadisabit",
    href: "https://www.producthunt.com/@amadisabit",
  },
];

/* ══════════════════════════════════════════════════ */

export default async function Home() {
  const commits = await getGitHubActivity();

  return (
    <>
      <EasterEgg />

      <Shell feed={FEED}>
        {/* ══ 01 · hero ══ */}
        <Post meta={META.hero} index={indexOf("hero")} label="Intro">
          <div className="text-center">
            <div className="mb-3 flex justify-center">
              <span className="block overflow-hidden rounded-full border-[3px] border-[var(--br-pink)] shadow-[0_0_50px_rgba(255,45,149,0.45)]">
                <Image
                  src="/profile.jpg"
                  alt="Alamedin Sabit"
                  width={104}
                  height={104}
                  className="h-20 w-20 object-cover sm:h-24 sm:w-24"
                  priority
                />
              </span>
            </div>

            <Kicker tint={PINK}>cs × founder · halifax</Kicker>
            <Headline text="Alamedin" className="text-white" />
            <Headline text="Sabit" className="text-[var(--br-pink)]" />

            <p className="mx-auto mt-3 max-w-md text-[12px] leading-relaxed text-white/75 sm:text-base">
              I ship things before they&apos;re ready, because they never are.
              Currently making licensed trades in Canada less painful.
            </p>

            <div className="mt-3 flex flex-wrap justify-center gap-1.5">
              <Chip tint={PINK}>Next.js</Chip>
              <Chip tint={CYAN}>Python</Chip>
              <Chip tint={LIME}>TypeScript</Chip>
              <Chip tint={YELLOW}>FastAPI</Chip>
              <Chip tint={VIOLET}>Claude API</Chip>
            </div>

            <div className="mt-3 text-[13px] text-white/60">
              <BuildingStreak />
            </div>

            <ScrollHint />
          </div>
        </Post>

        {/* ══ 02 · about ══ */}
        <Post meta={META.about} index={indexOf("about")} label="About">
          <div>
            <Kicker tint={CYAN}>cat ~/about.me</Kicker>
            <Headline text="the deal" className="mb-4 text-white" />

            <div>
              <figure className="float-right ml-3 w-24 sm:ml-5 sm:w-32">
                <span className="block overflow-hidden rounded-xl border border-white/20">
                  <Image
                    src="/meme.jpg"
                    alt="Shipping to production at 2am"
                    width={128}
                    height={128}
                    className="h-auto w-full object-cover"
                  />
                </span>
                <figcaption className="mt-1.5 text-center text-[10px] leading-tight text-white/50">
                  me shipping to prod at 2am
                </figcaption>
              </figure>

              <div className="space-y-3">
                <div>
                  <p className="mb-1 text-xs font-bold uppercase tracking-widest text-[var(--br-cyan)]">
                    🧠 what happened
                  </p>
                  <p className="text-[13px] leading-relaxed text-white/80 sm:text-sm">
                    Started a CS degree at Dalhousie. Got distracted building a
                    company. Now doing both, and not sorry about it.
                  </p>
                </div>

                <div>
                  <p className="mb-1 text-xs font-bold uppercase tracking-widest text-[var(--br-cyan)]">
                    ⚡ what actually moves me
                  </p>
                  <ul className="space-y-1 text-[13px] leading-relaxed text-white/80 sm:text-sm">
                    <li>→ making AI do real work, not just demos</li>
                    <li>→ shipping before it&apos;s &quot;ready&quot;</li>
                    <li>→ anime, unreasonably</li>
                    <li>→ where &quot;this is insane&quot; meets &quot;it ships&quot;</li>
                  </ul>
                </div>

                <div>
                  <p className="mb-1 text-xs font-bold uppercase tracking-widest text-[var(--br-cyan)]">
                    💀 misc
                  </p>
                  <ul className="space-y-1 text-[13px] leading-relaxed text-white/70 sm:text-sm">
                    <li>→ built a RAG bot for PG essays just because</li>
                    <li>
                      → every branch has exactly one{" "}
                      <code className="rounded bg-black/50 px-1">fix: fix the fix</code>
                    </li>
                    <li>→ sleep.log is sparse, ideas.txt overflows</li>
                    <li>→ Rick Rubin fan — strip it to the essence</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Post>

        {/* ══ 03 · TradeLock ══ */}
        <Post meta={META.tradelock} index={indexOf("tradelock")} label="TradeLock">
          <div>
            <Kicker tint={YELLOW}>📌 pinned · building right now</Kicker>
            <Headline text="TradeLock" className="mb-3 text-[var(--br-yellow)]" />

            <p className="mb-4 max-w-xl text-sm leading-relaxed text-white/85 sm:text-base">
              A licensed-trades marketplace for Canada. Discovery, compliance, and
              payouts that feel sane instead of feeling like a fax machine with a
              login page.
            </p>

            <div className="mb-4 grid gap-2 sm:grid-cols-3">
              {[
                ["discovery", "find a licensed trade without six phone calls"],
                ["compliance", "licences and insurance verified up front"],
                ["payouts", "Stripe Connect, escrow-style, no chasing"],
              ].map(([h, d]) => (
                <div key={h} className="rounded-xl border border-white/12 bg-black/45 p-3">
                  <p className="mb-1 text-xs font-bold uppercase tracking-widest text-[var(--br-yellow)]">
                    {h}
                  </p>
                  <p className="text-[12px] leading-snug text-white/70">{d}</p>
                </div>
              ))}
            </div>

            <div className="mb-4 flex flex-wrap gap-2">
              <Chip tint={YELLOW}>Next.js</Chip>
              <Chip tint={YELLOW}>FastAPI</Chip>
              <Chip tint={YELLOW}>PostgreSQL</Chip>
              <Chip tint={YELLOW}>Stripe Connect</Chip>
            </div>

            <a
              href="https://tradelockapp.ca"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full bg-[var(--br-yellow)] px-5 py-2.5 text-sm font-bold text-black transition-transform hover:scale-105"
            >
              tradelockapp.ca ↗
            </a>
          </div>
        </Post>

        {/* ══ 04 · Comply ══ */}
        <Post meta={META.comply} index={indexOf("comply")} label="Comply">
          <div>
            <Kicker tint={LIME}>📌 pinned · shipped</Kicker>
            <Headline text="Comply" className="mb-3 text-[var(--br-lime)]" />

            <p className="mb-3 max-w-xl text-sm leading-relaxed text-white/85 sm:text-base">
              A CLI and MCP server that enforces your team&apos;s conventions on a git
              diff — via LLM, regex, or AST rules. Code review nobody wanted to do,
              automated.
            </p>

            <pre className="mb-3 overflow-x-auto rounded-xl border border-white/12 bg-black/60 p-3 text-[10.5px] leading-snug text-white/85 sm:text-xs">
{`$ comply check --staged
  ✓ naming/branch-prefix      pass
  ✓ tests/co-located          pass
  ✗ commits/imperative-mood   fail
      "added logging" → "add logging"
  1 rule failed. fix it or fight the linter.`}
            </pre>

            <div className="mb-3 flex flex-wrap gap-2">
              <Chip tint={LIME}>TypeScript</Chip>
              <Chip tint={LIME}>MCP</Chip>
              <Chip tint={LIME}>CLI</Chip>
              <Chip tint={LIME}>Claude API</Chip>
            </div>

            <div className="flex flex-wrap gap-2">
              <a
                href="https://comply-docs.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-full bg-[var(--br-lime)] px-5 py-2.5 text-sm font-bold text-black transition-transform hover:scale-105"
              >
                docs ↗
              </a>
              <a
                href="https://github.com/Lameda12/Comply"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-full border border-white/25 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:border-white/60"
              >
                source ↗
              </a>
            </div>
          </div>
        </Post>

        {/* ══ 05 · other ships ══ */}
        <Post meta={META.ships} index={indexOf("ships")} label="Other projects">
          <div>
            <Kicker tint={VIOLET}>ls -la ~/projects</Kicker>
            <Headline text="the harbour" className="mb-4 text-white" />

            <div className="grid gap-2.5 sm:grid-cols-2">
              <ProjectCard
                tint={VIOLET}
                name="AniScope"
                status="shipped"
                blurb="Anime discovery — tasteful rails, obsessive metadata, late-night scrolling energy."
                stack={["Next.js", "TypeScript"]}
                href="https://ani-scoupe.vercel.app"
              />
              <ProjectCard
                tint={VIOLET}
                name="commitcraft"
                status="shipped"
                blurb="CLI for AI-written commits. Multi-provider, zero cringe templates."
                stack={["TypeScript", "Claude API"]}
              />
              <ProjectCard
                tint={VIOLET}
                name="Eye-Draw"
                status="demo"
                blurb="Draw on a canvas with eye tracking. OpenCV pipeline, calibration chaos, genuinely fun."
                stack={["Python", "OpenCV"]}
              />
              <ProjectCard
                tint={VIOLET}
                name="Paul Graham Bot"
                status="weekend"
                blurb="RAG over PG essays. Opinions distilled, citations mostly intact."
                stack={["Python", "embeddings", "RAG"]}
              />
            </div>
          </div>
        </Post>

        {/* ══ 06 · stack tier list ══ */}
        <Post meta={META.stack} index={indexOf("stack")} label="Tech stack">
          <div>
            <Kicker tint={CYAN}>cat ~/stack.txt | tierlist</Kicker>
            <Headline text="the stack" className="mb-4 text-white" />

            <div className="space-y-2">
              <TierRow
                tier="S"
                color={PINK}
                items={["TypeScript", "Next.js App Router", "React", "Tailwind"]}
              />
              <TierRow
                tier="A"
                color={YELLOW}
                items={["Python", "FastAPI", "PostgreSQL", "Stripe Connect", "Vercel"]}
              />
              <TierRow
                tier="B"
                color={CYAN}
                items={["SQL", "Docker basics", "schema design", "Git-first workflows"]}
              />
              <TierRow tier="?" color={VIOLET} items={["Rust (learning)", "CSS animations at 3am"]} />
            </div>

            <div className="mt-5 hidden sm:block">
              <Marquee
                tint={CYAN}
                items={[
                  "bias toward done",
                  "ideas are cheap, deployed things count",
                  "schema to UI to stripe webhook",
                  "ship → iterate → ship",
                ]}
              />
            </div>
          </div>
        </Post>

        {/* ══ 07 · AI ══ */}
        <Post meta={META.ai} index={indexOf("ai")} label="AI work">
          <div>
            <Kicker tint={PINK}>cat ~/ai.txt</Kicker>
            <Headline text="ai, but it works" className="mb-4 text-white" />

            <div className="grid gap-2.5 sm:grid-cols-3">
              {[
                ["models", ["Claude API (Anthropic)", "OpenAI-compatible interfaces"]],
                ["tooling", ["MCP server development", "tool-use patterns", "streaming"]],
                ["techniques", ["RAG pipelines", "embeddings", "diff-aware LLM workflows"]],
              ].map(([head, items]) => (
                <div
                  key={head as string}
                  className="rounded-xl border border-white/12 bg-black/45 p-3.5"
                >
                  <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[var(--br-pink)]">
                    {head as string}
                  </p>
                  <ul className="space-y-1 text-[12px] leading-snug text-white/75 sm:text-[13px]">
                    {(items as string[]).map((i) => (
                      <li key={i}>· {i}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <p className="mt-4 rounded-xl border border-[var(--br-pink)]/35 bg-[var(--br-pink)]/10 p-3.5 text-[13px] leading-relaxed text-white/85 sm:text-sm">
              <span className="font-bold text-[var(--br-pink)]">receipts:</span> Comply
              (MCP linter for git diffs) · commitcraft (AI commit messages) · Paul
              Graham Bot (RAG). Shipped, not slideware.
            </p>
          </div>
        </Post>

        {/* ══ 08 · live commits ══ */}
        <Post meta={META.commits} index={indexOf("commits")} label="Recent commits">
          <div>
            <Kicker tint={LIME}>git log --public --oneline</Kicker>
            <Headline text="receipts" className="mb-4 text-white" />

            {commits.length > 0 ? (
              <ul className="space-y-1.5">
                {commits.map((c, i) => (
                  <li
                    key={i}
                    className="flex flex-wrap items-baseline gap-x-2 rounded-lg border border-white/10 bg-black/45 px-3 py-2 text-[12px] sm:text-[13px]"
                  >
                    <span className="shrink-0 font-bold text-[var(--br-lime)]">
                      [{c.repo}]
                    </span>
                    <span className="min-w-0 flex-1 text-white/85">{c.message}</span>
                    <span className="shrink-0 text-[10px] text-white/45">
                      {timeAgo(c.time)}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="rounded-lg border border-white/10 bg-black/45 px-3 py-4 text-[13px] text-white/60">
                GitHub&apos;s API is rate-limiting me right now. The commits are still
                happening, you&apos;ll have to take my word for it.
              </p>
            )}

            <p className="mt-3 text-[11px] text-white/45">
              pulled live from the GitHub API · revalidates hourly
            </p>
          </div>
        </Post>

        {/* ══ 09 · links ══ */}
        <Post meta={META.links} index={indexOf("links")} label="Contact">
          <div className="text-center">
            <Kicker tint={YELLOW}>end of feed</Kicker>
            <Headline text="say hi" className="mb-4 text-[var(--br-yellow)]" />

            <p className="mx-auto mb-5 max-w-md text-[13px] leading-relaxed text-white/80 sm:text-sm">
              Open to co-ops, internships, and anyone building something strange and
              useful. I reply fast.
            </p>

            <ul className="mx-auto mb-5 grid max-w-md gap-2">
              {LINKS.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    {...(l.href.startsWith("http")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="flex items-center justify-between rounded-xl border border-white/12 bg-black/45 px-4 py-2.5 text-left transition-colors hover:border-[var(--br-yellow)]/60"
                  >
                    <span className="text-[11px] font-bold uppercase tracking-widest text-white/50">
                      {l.label}
                    </span>
                    <span className="text-[13px] font-semibold text-white">
                      {l.value}
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <p className="text-[11px] leading-relaxed text-white/40">
              this page is a static site cosplaying as a for you page.
              <br />
              try typing <code className="rounded bg-black/50 px-1 text-white/70">hire</code>{" "}
              anywhere on it.
            </p>
          </div>
        </Post>
      </Shell>
    </>
  );
}
