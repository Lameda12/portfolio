"use client";

import {
  CommandBlock,
  CRTVignette,
  BlinkingCursor,
  ProjectCard,
  TerminalLine,
} from "@/components/Terminal";

export default function Home() {
  return (
    <>
      <CRTVignette />

      <div className="relative z-10 min-h-screen px-4 pb-28 pt-6 sm:px-8 sm:pt-10">
        <main className="relative mx-auto max-w-4xl font-mono text-[var(--crt-fg)]">
          <header className="mb-10">
            <h1 className="mb-1 text-2xl font-semibold text-[var(--crt-accent)] crt-glow-strong sm:text-3xl">
              Alamedin Sabit
              <BlinkingCursor className="ml-2 align-baseline opacity-70" />
            </h1>
            <p className="mb-4 text-sm text-[var(--crt-dim)] sm:text-base">
              CS student → founder · Halifax, NS · building TradeLock
            </p>
            <TerminalLine dim>
              guest@portfolio:~$ — stack: Next.js · Python · TypeScript · FastAPI · Claude API
            </TerminalLine>
          </header>

          {/* whoami */}
          <CommandBlock command="whoami">
            <TerminalLine>name: Alamedin Sabit</TerminalLine>
            <TerminalLine>alias: Lameda12</TerminalLine>
            <TerminalLine>loc: Halifax, Nova Scotia</TerminalLine>
            <TerminalLine>edu: Computer Science · Dalhousie · Winter 2028</TerminalLine>
            <TerminalLine>role: CS student → founder</TerminalLine>
            <TerminalLine>
              focus: <span className="text-[var(--crt-accent)]">building TradeLock</span>
            </TerminalLine>
          </CommandBlock>

          {/* projects */}
          <CommandBlock command="ls -la ~/projects">
            <TerminalLine dim>total 6 · directories are lies, these are ships in the harbor</TerminalLine>
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

          {/* tech stack */}
          <CommandBlock command="cat ~/stack.txt">
            <TerminalLine>
              Languages:  TypeScript · Python · SQL · Rust (learning)
            </TerminalLine>
            <TerminalLine>
              Web:        Next.js App Router · React · Tailwind CSS · Vercel edge
            </TerminalLine>
            <TerminalLine>
              Backend:    FastAPI · PostgreSQL · Stripe Connect · schema design
            </TerminalLine>
            <TerminalLine>
              Infra:      Vercel · Docker basics · Git-first workflows
            </TerminalLine>
          </CommandBlock>

          {/* ai skills */}
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
              Built:      Comply (MCP linter) · commitcraft (AI commits) · PG Bot (RAG)
            </TerminalLine>
          </CommandBlock>

          {/* soft skills */}
          <CommandBlock command="cat ~/soft.txt">
            <TerminalLine>
              Shipping:   bias toward done — ideas are cheap, deployed things count
            </TerminalLine>
            <TerminalLine>
              Building:   full-stack ownership from schema to UI to stripe webhook
            </TerminalLine>
            <TerminalLine>
              Learning:   CS fundamentals + self-directed depth (see every project)
            </TerminalLine>
            <TerminalLine>
              Mindset:    indie hacker roots · founder mentality · ship → iterate
            </TerminalLine>
          </CommandBlock>

          {/* links */}
          <CommandBlock command="cat ~/links.txt">
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
