"use client";

import { useCallback, useEffect, useState } from "react";

const RESPONSES: Record<string, string[]> = {
  hire: [
    "> processing request...",
    "> candidate: Alamedin Sabit",
    "> verdict: hire — reach out:",
    "  asabitt29@gmail.com",
    "  x.com/amadisabit",
    "  linkedin.com/in/alamedin-sabit",
  ],
  sudo: [
    "sudo: permission denied",
    "this is a portfolio, not a real shell.",
    "nice try though.",
  ],
  help: [
    "available commands:",
    "  whoami       print current user",
    "  ls           list ships in harbor",
    "  hire         initiate contact sequence",
    "  tradelock    brief on the main thing",
    "  coffee       system diagnostics",
    "  clear        attempt to clear the void",
    "  exit         you can try",
  ],
  ls: [
    "drwxr-xr-x  TradeLock/       (active · in development)",
    "drwxr-xr-x  Comply/          (shipped)",
    "drwxr-xr-x  commitcraft/     (shipped)",
    "drwxr-xr-x  AniScope/        (shipped)",
    "-rw-r--r--  ideas.txt        (overflowing)",
    "-rw-r--r--  sleep.log        (sparse)",
  ],
  whoami: [
    "you are: guest",
    "access level: read-only",
    "tip: type 'hire' if you came here for a reason.",
  ],
  tradelock: [
    "TradeLock — licensed trades marketplace for Canada",
    "discovery · compliance · payouts that feel sane",
    "stack: Next.js · FastAPI · PostgreSQL · Stripe Connect",
    "→ tradelockapp.ca",
  ],
  clear: [
    "clearing...",
    "",
    "the void remains.",
    "try F5.",
  ],
  exit: [
    "connection to portfolio.local closed.",
    "...",
    "just kidding. the tab stays open.",
    "TradeLock isn't going to build itself.",
  ],
  coffee: [
    "☕ current intake: ~3 cups/day",
    "side effects: shipping velocity +40%",
    "downside: sleep.log (sparse)",
  ],
};

const KEYWORDS = Object.keys(RESPONSES);
const MAX_BUFFER = 14;

export function EasterEgg() {
  const [active, setActive] = useState<{
    command: string;
    output: string[];
  } | null>(null);
  const [buffer, setBuffer] = useState("");

  const dismiss = useCallback(() => {
    setActive(null);
    setBuffer("");
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;

      if (e.key === "Escape") {
        dismiss();
        return;
      }

      if (e.key.length !== 1 || e.metaKey || e.ctrlKey) return;

      const next = (buffer + e.key.toLowerCase()).slice(-MAX_BUFFER);
      setBuffer(next);

      const match = KEYWORDS.find((k) => next.endsWith(k));
      if (match) {
        setActive({ command: match, output: RESPONSES[match] });
        setBuffer("");
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [buffer, dismiss]);

  if (!active) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-end p-6 sm:items-center sm:justify-center"
      onClick={dismiss}
    >
      <div
        className="w-full max-w-sm border border-[var(--crt-accent)] bg-[#0d0d0d] px-5 py-4 font-mono shadow-[0_0_40px_rgba(74,222,128,0.12)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-3 flex items-center justify-between">
          <span className="text-xs text-[var(--crt-dim)]">
            <span className="opacity-60">$</span> {active.command}
          </span>
          <button
            onClick={dismiss}
            className="text-xs text-[var(--crt-dim)] opacity-50 hover:opacity-100"
            aria-label="close"
          >
            [esc]
          </button>
        </div>
        <div className="space-y-0.5">
          {active.output.map((line, i) => (
            <p key={i} className="whitespace-pre text-sm text-[var(--crt-fg)]">
              {line}
            </p>
          ))}
        </div>
        <p className="mt-4 text-[10px] text-[var(--crt-dim)] opacity-40">
          press esc or click outside to dismiss
        </p>
      </div>
    </div>
  );
}
