import Image from "next/image";
import {
  CommandBlock,
  CRTVignette,
  BlinkingCursor,
  ProjectCard,
  TerminalLine,
} from "@/components/Terminal";
import { EasterEgg } from "@/components/EasterEgg";
import { BuildingStreak } from "@/components/BuildingStreak";

type GitCommit = {
  repo: string;
  message: string;
  time: string;
};

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
    const res = await fetch(
      "https://api.github.com/users/Lameda12/events/public",
      {
        next: { revalidate: 3600 },
        headers: { Accept: "application/vnd.github.v3+json" },
      }
    );
    if (!res.ok) return [];
    const events: {
      type: string;
      repo: { name: string };
      payload: { commits: { message: string }[] };
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
      .slice(0, 6);
  } catch {
    return [];
  }
}

export default async function Home() {
  const commits = await getGitHubActivity();

  return (
    <>
      <CRTVignette />
      <EasterEgg />

      <div className="relative z-10 min-h-screen px-4 pb-28 pt-6 sm:px-8 sm:pt-10">
        <main className="relative mx-auto max-w-4xl font-mono text-[var(--crt-fg)]">

          {/* ── Header ── */}
          <header className="mb-10">
            <h1 className="mb-1 text-2xl font-semibold text-[var(--crt-accent)] crt-glow-strong sm:text-3xl">
              Alamedin Sabit
              <BlinkingCursor className="ml-2 align-baseline opacity-70" />
            </h1>
            <p className="mb-1 text-sm text-[var(--crt-dim)] sm:text-base">
              CS student → founder · Halifax, NS
            </p>
            <BuildingStreak />
            <div className="mt-3">
              <TerminalLine dim>
                guest@portfolio:~$ — stack: Next.js · Python · TypeScript ·
                FastAPI · Claude API
              </TerminalLine>
            </div>
          </header>

          {/* ── whoami ── */}
          <CommandBlock command="whoami">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
              <div className="shrink-0">
                <div className="inline-block border border-[var(--crt-muted)] p-0.5">
                  <Image
                    src="/profile.jpg"
                    alt="Alamedin Sabit"
                    width={110}
                    height={110}
                    className="block"
                    priority
                  />
                </div>
                <p className="mt-1 text-center text-[10px] text-[var(--crt-muted)]">
                  portrait.jpg
                </p>
              </div>
              <div>
                <TerminalLine>name: Alamedin Sabit</TerminalLine>
                <TerminalLine>alias: Lameda12</TerminalLine>
                <TerminalLine>loc: Halifax, Nova Scotia</TerminalLine>
                <TerminalLine>
                  edu: Computer Science · Dalhousie · Winter 2028
                </TerminalLine>
                <TerminalLine>role: CS student → founder</TerminalLine>
                <TerminalLine>
                  focus:{" "}
                  <span className="text-[var(--crt-accent)]">
                    building TradeLock
                  </span>
                </TerminalLine>
              </div>
            </div>
          </CommandBlock>

          {/* ── About Me ── */}
          <CommandBlock command="cat ~/about.me">
            {/* Meme — floated right on desktop, below on mobile */}
            <div className="mb-4 float-none sm:float-right sm:ml-6 sm:mb-2 flex flex-col items-center">
              <div className="border border-[var(--crt-muted)] p-0.5 inline-block">
                <Image
                  src="/meme.jpg"
                  alt="me shipping at 2am"
                  width={140}
                  height={160}
                  className="block"
                />
              </div>
              <p className="mt-1 text-center text-[10px] text-[var(--crt-dim)] max-w-[140px]">
                me shipping to prod at 2am 🚬
              </p>
            </div>

            <TerminalLine>
              👋{" "}
              <span className="text-[var(--crt-accent)]">
                hey, i&apos;m alamedin
              </span>{" "}
              — cs student, accidental founder, anime enjoyer
            </TerminalLine>
            <TerminalLine dim>
              📍 Halifax, NS · CS @ Dalhousie (Winter 2028)
            </TerminalLine>

            <div className="mt-3 mb-3">
              <TerminalLine>
                🧠{" "}
                <span className="text-[var(--crt-accent)]">the deal</span>
              </TerminalLine>
              <TerminalLine dim>
                {"   "}started a CS degree. got distracted building a company.
              </TerminalLine>
              <TerminalLine dim>
                {"   "}now doing both. not sorry about it.
              </TerminalLine>
            </div>

            <div className="mb-3">
              <TerminalLine>
                ⚡{" "}
                <span className="text-[var(--crt-accent)]">
                  what actually moves me
                </span>
              </TerminalLine>
              <TerminalLine dim>
                {"   →"} making AI do real work, not just demos
              </TerminalLine>
              <TerminalLine dim>
                {"   →"} shipping before it&apos;s &quot;ready&quot; (it&apos;s
                never ready)
              </TerminalLine>
              <TerminalLine dim>
                {"   →"} anime 👀 (yes that&apos;s Your Name in the background)
              </TerminalLine>
              <TerminalLine dim>
                {"   →"} the intersection of &quot;this is insane&quot; and
                &quot;it ships&quot;
              </TerminalLine>
            </div>

            <div className="mb-3">
              <TerminalLine>
                🚀{" "}
                <span className="text-[var(--crt-accent)]">
                  building right now
                </span>
              </TerminalLine>
              <TerminalLine dim>
                {"   "}TradeLock — fixing licensed trades in Canada, one
                compliance form at a time
              </TerminalLine>
              <TerminalLine dim>
                {"   "}Comply — AI that actually respects your team&apos;s git
                conventions
              </TerminalLine>
            </div>

            <div className="mb-3 clear-both">
              <TerminalLine>
                💀{" "}
                <span className="text-[var(--crt-accent)]">misc facts</span>
              </TerminalLine>
              <TerminalLine dim>
                {"   →"} built a RAG bot for PG essays just because 🤷
              </TerminalLine>
              <TerminalLine dim>
                {"   →"} commits always end with one &quot;fix: fix the
                fix&quot;
              </TerminalLine>
              <TerminalLine dim>
                {"   →"} sleep.log is sparse. ideas.txt overflows.
              </TerminalLine>
              <TerminalLine dim>
                {"   →"} rick rubin fan. strips things to their essence. 🎛️
              </TerminalLine>
            </div>
          </CommandBlock>

          {/* ── GitHub Activity ── */}
          {commits.length > 0 && (
            <CommandBlock command="git log --public --oneline">
              {commits.map((c, i) => (
                <div
                  key={i}
                  className="mb-1.5 flex flex-wrap items-baseline gap-x-2 text-sm sm:text-[0.95rem]"
                >
                  <span className="shrink-0 text-[var(--crt-dim)]">
                    [{c.repo}]
                  </span>
                  <span className="min-w-0 flex-1 text-[var(--crt-fg)]">
                    {c.message}
                  </span>
                  <span className="shrink-0 text-[10px] text-[var(--crt-muted)] sm:text-xs">
                    {timeAgo(c.time)}
                  </span>
                </div>
              ))}
            </CommandBlock>
          )}

          {/* ── Projects ── */}
          <CommandBlock command="ls -la ~/projects">
            <TerminalLine dim>
              total 6 · directories are lies, these are ships in the harbor
            </TerminalLine>
            <ProjectCard
              name="TradeLock"
              description="Licensed trades marketplace for Canada — discovery, compliance, and payouts that feel sane."
              stack="Next.js · FastAPI · PostgreSQL · Stripe Connect"
              href="https://tradelockapp.ca"
            />
            <ProjectCard
              name="Comply"
              description="CLI + MCP server: enforce team conventions on git diffs via LLM, regex, or AST rules."
              stack="TypeScript · MCP · CLI"
              href="https://comply-docs.vercel.app"
            />
            <ProjectCard
              name="AniScope"
              description="Anime discovery — tasteful rails, obsessive metadata, late-night scrolling energy."
              stack="Next.js · TypeScript"
              href="https://ani-scoupe.vercel.app"
            />
            <ProjectCard
              name="commitcraft"
              description="CLI for AI-written commits — multi-provider, zero cringe templates."
              stack="TypeScript · Claude API"
            />
            <ProjectCard
              name="Eye-Draw"
              description="Draw on a canvas using eye tracking — OpenCV pipeline, calibration chaos, fun demos."
              stack="Python · OpenCV"
            />
            <ProjectCard
              name="Paul Graham Bot"
              description="RAG over PG essays — opinions distilled, citations (mostly) intact."
              stack="Python · embeddings · RAG"
            />
          </CommandBlock>

          {/* ── Tech Stack ── */}
          <CommandBlock command="cat ~/stack.txt">
            <TerminalLine>
              Languages:  TypeScript · Python · SQL · Rust (learning)
            </TerminalLine>
            <TerminalLine>
              Web:        Next.js App Router · React · Tailwind CSS · Vercel
              edge
            </TerminalLine>
            <TerminalLine>
              Backend:    FastAPI · PostgreSQL · Stripe Connect · schema design
            </TerminalLine>
            <TerminalLine>
              Infra:      Vercel · Docker basics · Git-first workflows
            </TerminalLine>
          </CommandBlock>

          {/* ── AI Skills ── */}
          <CommandBlock command="cat ~/ai.txt">
            <TerminalLine>
              Models:     Claude API (Anthropic) · OpenAI-compatible interfaces
            </TerminalLine>
            <TerminalLine>
              Tooling:    MCP server development · tool-use patterns · streaming
            </TerminalLine>
            <TerminalLine>
              Techniques: RAG pipelines · embeddings · diff-aware LLM workflows
            </TerminalLine>
            <TerminalLine dim>
              Built:      Comply (MCP linter) · commitcraft (AI commits) · PG
              Bot (RAG)
            </TerminalLine>
          </CommandBlock>

          {/* ── Soft Skills ── */}
          <CommandBlock command="cat ~/soft.txt">
            <TerminalLine>
              Shipping:   bias toward done — ideas are cheap, deployed things
              count
            </TerminalLine>
            <TerminalLine>
              Building:   full-stack ownership from schema to UI to stripe
              webhook
            </TerminalLine>
            <TerminalLine>
              Learning:   CS fundamentals + self-directed depth (see every
              project)
            </TerminalLine>
            <TerminalLine>
              Mindset:    indie hacker roots · founder mentality · ship →
              iterate
            </TerminalLine>
          </CommandBlock>

          {/* ── Links ── */}
          <CommandBlock command="cat ~/links.txt">
            <TerminalLine>
              email:{" "}
              <a
                className="text-[var(--crt-link)] underline underline-offset-2 hover:text-[var(--crt-accent)]"
                href="mailto:asabitt29@gmail.com"
              >
                asabitt29@gmail.com
              </a>
            </TerminalLine>
            <TerminalLine>
              github:{" "}
              <a
                className="text-[var(--crt-link)] underline underline-offset-2 hover:text-[var(--crt-accent)]"
                href="https://github.com/Lameda12"
                target="_blank"
                rel="noopener noreferrer"
              >
                github.com/Lameda12
              </a>
            </TerminalLine>
            <TerminalLine>
              x:{" "}
              <a
                className="text-[var(--crt-link)] underline underline-offset-2 hover:text-[var(--crt-accent)]"
                href="https://x.com/amadisabit"
                target="_blank"
                rel="noopener noreferrer"
              >
                @amadisabit
              </a>
            </TerminalLine>
            <TerminalLine>
              linkedin:{" "}
              <a
                className="text-[var(--crt-link)] underline underline-offset-2 hover:text-[var(--crt-accent)]"
                href="https://www.linkedin.com/in/alamedin-sabit"
                target="_blank"
                rel="noopener noreferrer"
              >
                in/alamedin-sabit
              </a>
            </TerminalLine>
            <TerminalLine>
              product hunt:{" "}
              <a
                className="text-[var(--crt-link)] underline underline-offset-2 hover:text-[var(--crt-accent)]"
                href="https://www.producthunt.com/@amadisabit"
                target="_blank"
                rel="noopener noreferrer"
              >
                @amadisabit
              </a>
            </TerminalLine>
            <TerminalLine>
              comply repo:{" "}
              <a
                className="text-[var(--crt-link)] underline underline-offset-2 hover:text-[var(--crt-accent)]"
                href="https://github.com/Lameda12/Comply"
                target="_blank"
                rel="noopener noreferrer"
              >
                github.com/Lameda12/Comply
              </a>
            </TerminalLine>
          </CommandBlock>

          <footer className="mt-12 border-t border-[var(--crt-muted)] pt-6 text-sm text-[var(--crt-dim)]">
            <p>
              EOF — this page is static HTML cosplaying as a shell.
              <BlinkingCursor className="ml-1 align-baseline" />
            </p>
          </footer>
        </main>

        <div
          className="pointer-events-none fixed bottom-4 right-4 z-30 flex items-center gap-1 font-mono text-[var(--crt-accent)]"
          aria-hidden
        >
          <span className="text-[var(--crt-dim)]">_</span>
          <BlinkingCursor />
        </div>
      </div>
    </>
  );
}
