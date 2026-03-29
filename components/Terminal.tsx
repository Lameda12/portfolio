"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

export function BlinkingCursor({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-block w-[0.55em] select-none text-[var(--crt-accent)] crt-cursor ${className}`}
      aria-hidden
    >
      █
    </span>
  );
}

export function CRTScanlines() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[5] mix-blend-overlay crt-scanlines"
      aria-hidden
    />
  );
}

export function CRTVignette() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[4] crt-vignette"
      aria-hidden
    />
  );
}

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return reduced;
}

type BootSequenceProps = {
  lines: string[];
  prompt: string;
  msPerChar?: number;
  onComplete: () => void;
};

/** Types boot lines one-by-one; does not block page interactivity but boot UI is read-only. */
export function BootSequence({
  lines,
  prompt,
  msPerChar = 10,
  onComplete,
}: BootSequenceProps) {
  const reduced = usePrefersReducedMotion();
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [currentFragment, setCurrentFragment] = useState("");
  const lineIndex = useRef(0);
  const charIndex = useRef(0);
  const doneRef = useRef(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const finish = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    setVisibleLines(lines);
    setCurrentFragment("");
    onCompleteRef.current();
  }, [lines]);

  useEffect(() => {
    if (reduced) {
      finish();
      return;
    }
    lineIndex.current = 0;
    charIndex.current = 0;
    doneRef.current = false;
    setVisibleLines([]);
    setCurrentFragment("");

    const tick = () => {
      const i = lineIndex.current;
      if (i >= lines.length) {
        finish();
        return;
      }
      const line = lines[i];
      const c = charIndex.current;
      if (c < line.length) {
        charIndex.current = c + 1;
        setCurrentFragment(line.slice(0, c + 1));
      } else {
        setVisibleLines((prev) => [...prev, line]);
        setCurrentFragment("");
        charIndex.current = 0;
        lineIndex.current = i + 1;
        if (lineIndex.current >= lines.length) {
          finish();
          return;
        }
      }
    };

    const id = window.setInterval(tick, msPerChar);
    return () => window.clearInterval(id);
  }, [lines, msPerChar, reduced, finish]);

  return (
    <div className="min-h-[12rem] font-mono text-sm leading-relaxed sm:text-[0.95rem]">
      {visibleLines.map((line, idx) => (
        <div key={`boot-${idx}-${line.slice(0, 12)}`} className="whitespace-pre-wrap">
          <span className="text-[var(--crt-dim)]">{prompt}</span>
          {line}
        </div>
      ))}
      {currentFragment.length > 0 && (
        <div className="whitespace-pre-wrap">
          <span className="text-[var(--crt-dim)]">{prompt}</span>
          {currentFragment}
          <BlinkingCursor className="ml-0 align-baseline" />
        </div>
      )}
      {visibleLines.length === 0 && currentFragment.length === 0 && !reduced && (
        <div className="whitespace-pre-wrap">
          <span className="text-[var(--crt-dim)]">{prompt}</span>
          <BlinkingCursor className="ml-0 align-baseline" />
        </div>
      )}
    </div>
  );
}

export function CommandBlock({
  command,
  children,
}: {
  command: string;
  children: ReactNode;
}) {
  return (
    <section className="mb-10 font-mono">
      <h2 className="mb-3 flex flex-wrap items-baseline gap-2 text-[var(--crt-dim)]">
        <span className="select-none">$</span>
        <span className="text-[var(--crt-accent)]">{command}</span>
        <BlinkingCursor className="opacity-40" />
      </h2>
      <div className="crt-glow border-l-2 border-[var(--crt-dim)] pl-3 sm:pl-4">
        {children}
      </div>
    </section>
  );
}

export function TerminalLine({
  children,
  dim,
}: {
  children: ReactNode;
  dim?: boolean;
}) {
  return (
    <p
      className={`mb-1.5 whitespace-pre-wrap break-words text-sm sm:text-[0.95rem] ${
        dim ? "text-[var(--crt-dim)]" : "text-[var(--crt-fg)]"
      }`}
    >
      {children}
    </p>
  );
}

export function ProjectCard({
  name,
  description,
  stack,
  href,
}: {
  name: string;
  description: string;
  stack: string;
  href?: string;
}) {
  return (
    <article className="mb-5 border border-[var(--crt-dim)] bg-black/40 px-3 py-3 sm:px-4">
      <div className="mb-1 flex flex-wrap items-center gap-2">
        <span className="font-semibold text-[var(--crt-accent)]">{name}</span>
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="break-all text-[var(--crt-link)] underline underline-offset-2 hover:text-[var(--crt-accent)]"
          >
            {href.replace(/^https?:\/\//, "")}
          </a>
        ) : null}
      </div>
      <p className="mb-2 text-[var(--crt-fg)]">{description}</p>
      <p className="text-xs text-[var(--crt-dim)] sm:text-sm">{stack}</p>
    </article>
  );
}
