"use client";

import {
  BootSequence,
  CommandBlock,
  CRTScanlines,
  CRTVignette,
  BlinkingCursor,
  ProjectCard,
  TerminalLine,
} from "@/components/Terminal";
import { useState } from "react";

const ASCII_HEADER_WIDE = `
██╗      █████╗ ███╗   ███╗███████╗██████╗  █████╗  ██╗██████╗ 
██║     ██╔══██╗████╗ ████║██╔════╝██╔══██╗██╔══██╗███║╚════██╗
██║     ███████║██╔████╔██║█████╗  ██║  ██║███████║╚██║ █████╔╝
██║     ██╔══██║██║╚██╔╝██║██╔══╝  ██║  ██║██╔══██║ ██║██╔═══╝ 
███████╗██║  ██║██║ ╚═╝ ██║███████╗██████╔╝██║  ██║████╗███████╗
╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝╚═════╝ ╚═╝  ╚═╝╚═══╝╚══════╝`;

const ASCII_HEADER_NARROW = `
╔══════════════════════════════════╗
║  lameda12@portfolio ~ HALIFAX-NS ║
║  Alamedin Sabit · CS @ Dal '28   ║
╚══════════════════════════════════╝`;

const BOOT_LINES = [
  "[ ok ] mounting virtual shell…",
  "[ ok ] resolving host: portfolio.local",
  "hostname: sabit-core · region: atlantic-canada",
  "uptime: shipping since first “Hello, world!”",
  "location: Halifax, Nova Scotia, Canada",
  'status: building TradeLock · studying @ Dal (Winter 2028)',
  "motd: Welcome — this is a portfolio, not a real SSH box.",
  "",
  "Initializing UI…",
];

export default function Home() {
  const [bootDone, setBootDone] = useState(false);

  return (
    <>
      <CRTVignette />
      <CRTScanlines />

      <div className="crt-glow relative z-10 min-h-screen px-4 pb-28 pt-6 sm:px-8 sm:pt-10">
        {/* Boot overlay */}
        <div
          className={`fixed inset-0 z-40 overflow-auto bg-black px-4 py-8 transition-opacity duration-500 sm:px-10 ${
            bootDone ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
          aria-hidden={bootDone}
        >
          <div className="crt-glow mx-auto max-w-3xl">
            <p className="text-[var(--crt-dim)]">boot sequence — press nothing</p>
            <BootSequence
              lines={BOOT_LINES}
              prompt="$ "
              msPerChar={8}
              onComplete={() => setBootDone(true)}
            />
          </div>
        </div>

        <main className="relative mx-auto max-w-4xl font-mono text-[var(--crt-fg)]">
          <header className="mb-10">
            <pre className="mb-2 hidden max-w-full overflow-x-auto text-[0.32rem] leading-none text-[var(--crt-accent)] sm:block sm:text-[0.42rem] md:text-[0.48rem]">
              {ASCII_HEADER_WIDE}
            </pre>
            <pre className="mb-4 max-w-full overflow-x-auto text-[0.62rem] leading-tight text-[var(--crt-accent)] sm:hidden">
              {ASCII_HEADER_NARROW}
            </pre>
            <TerminalLine dim>
              Session: guest@portfolio · <span className="text-[var(--crt-accent)]">read-only</span>{" "}
              MOTD
            </TerminalLine>
            <TerminalLine dim>
              Stack hints: Next.js · Python · TypeScript · FastAPI · Claude API · PostgreSQL · MCP
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

          <CommandBlock command="cat ~/skills.txt">
            <TerminalLine>
              Languages: TypeScript · Python · SQL · a little Rust curiosity
            </TerminalLine>
            <TerminalLine>
              Web: Next.js App Router · React · Tailwind · edge deployments on Vercel
            </TerminalLine>
            <TerminalLine>
              Backend: FastAPI · PostgreSQL · Stripe Connect · pragmatic schema design
            </TerminalLine>
            <TerminalLine>
              AI: Claude API · RAG · MCP tooling · diff-aware LLM workflows (see Comply)
            </TerminalLine>
            <TerminalLine dim>
              Tags: Next.js · Python · TypeScript · FastAPI · Claude API · PostgreSQL · MCP
            </TerminalLine>
          </CommandBlock>

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

          <footer className="mt-12 border-t border-[var(--crt-dim)] pt-6 text-sm text-[var(--crt-dim)]">
            <p>
              EOF — this page is static HTML cosplaying as a shell.
              <BlinkingCursor className="ml-1 align-baseline" />
            </p>
          </footer>
        </main>

        <div
          className="crt-glow pointer-events-none fixed bottom-4 right-4 z-30 flex items-center gap-1 font-mono text-[var(--crt-accent)]"
          aria-hidden
        >
          <span className="text-[var(--crt-dim)]">_</span>
          <BlinkingCursor />
        </div>
      </div>
    </>
  );
}
