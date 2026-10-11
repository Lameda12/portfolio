"use client";

import { useCallback, useEffect, useState } from "react";

const RESPONSES: Record<string, string[]> = {
  help: [
    "type any of these, anywhere on the page:",
    "  whoami     who's on the other side",
    "  ls         what's running",
    "  hire       how to reach me",
    "  coffee     system diagnostics",
    "  exit       you can try",
  ],
  whoami: [
    "you are: guest",
    "access level: read-only",
    "tip: type 'hire' if you came here for a reason.",
  ],
  ls: [
    "call_human/     live, taking founding users",
    "orderable/      live, open source",
    "openpango/      live demo, open source",
    "tradelock/      paused",
    "commitcraft/    paused",
    "comply/         stopped",
    "ideas.txt       overflowing",
  ],
  hire: [
    "> candidate: Alamedin Sabit",
    "> verdict: reach out",
    "  asabitt29@gmail.com",
    "  x.com/amadisabit",
    "  linkedin.com/in/alamedin-sabit",
  ],
  sudo: ["sudo: permission denied", "this is a website, not a shell.", "nice try though."],
  coffee: ["current intake: ~3 cups/day", "side effects: shipping velocity up", "known issue: sleep.log is sparse"],
  exit: ["connection closed.", "...", "just kidding. the tab stays open."],
};

const KEYWORDS = Object.keys(RESPONSES);
const MAX_BUFFER = 12;

export function EasterEgg() {
  const [active, setActive] = useState<{ command: string; output: string[] } | null>(null);
  const [buffer, setBuffer] = useState("");

  const dismiss = useCallback(() => {
    setActive(null);
    setBuffer("");
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target?.tagName ?? "")) return;
      if (e.key === "Escape") return dismiss();
      if (e.key.length !== 1 || e.metaKey || e.ctrlKey || e.altKey) return;

      const next = (buffer + e.key.toLowerCase()).slice(-MAX_BUFFER);
      const match = KEYWORDS.find((k) => next.endsWith(k));
      if (match) {
        setActive({ command: match, output: RESPONSES[match] });
        setBuffer("");
      } else {
        setBuffer(next);
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [buffer, dismiss]);

  if (!active) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center"
      onClick={dismiss}
      role="presentation"
    >
      <div
        role="dialog"
        aria-label={`Output of ${active.command}`}
        className="w-full max-w-sm px-5 py-4"
        style={{
          fontFamily: "var(--mono)",
          background: "var(--paper)",
          color: "var(--ink)",
          border: "1px solid var(--accent)",
          borderRadius: 4,
          boxShadow: "0 18px 50px rgba(0,0,0,0.25)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-3 flex items-center justify-between" style={{ fontSize: "0.75rem", color: "var(--muted)" }}>
          <span>$ {active.command}</span>
          <button onClick={dismiss} aria-label="Close" style={{ color: "var(--muted)", cursor: "pointer" }}>
            [esc]
          </button>
        </div>
        {active.output.map((line, i) => (
          <p key={i} className="whitespace-pre" style={{ margin: 0, fontSize: "0.8rem", lineHeight: 1.7 }}>
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}
