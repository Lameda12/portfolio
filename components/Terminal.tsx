import { type ReactNode } from "react";

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

export function CRTVignette() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[4] crt-vignette"
      aria-hidden
    />
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
      <h2 className="crt-glow mb-3 flex flex-wrap items-baseline gap-2 text-[var(--crt-dim)]">
        <span className="select-none">$</span>
        <span className="text-[var(--crt-accent)]">{command}</span>
        <BlinkingCursor className="opacity-40" />
      </h2>
      <div className="terminal-indent">{children}</div>
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
    <article className="mb-4 border border-[var(--crt-muted)] bg-black/40 px-3 py-3 sm:px-4">
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
      <p className="mb-2 text-sm text-[var(--crt-fg)]">{description}</p>
      <p className="text-xs text-[var(--crt-dim)] sm:text-sm">{stack}</p>
    </article>
  );
}
