import type { ReactNode } from "react";

/** Endlessly scrolling ticker. Content is duplicated so the loop is seamless. */
export function Marquee({ items, tint }: { items: string[]; tint: string }) {
  const run = [...items, ...items];
  return (
    <div
      className="relative overflow-hidden border-y py-1.5"
      style={{ borderColor: `${tint}55` }}
    >
      <div className="br-marquee-track">
        {run.map((item, i) => (
          <span
            key={i}
            className="px-4 text-[11px] font-bold uppercase tracking-[0.18em] sm:text-xs"
            style={{ color: i % 2 ? "var(--br-ink)" : tint }}
          >
            {item} <span className="opacity-40">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/** Small all-caps label above a heading. */
export function Kicker({ children, tint }: { children: ReactNode; tint: string }) {
  return (
    <p
      className="mb-2 text-[10px] font-bold uppercase tracking-[0.28em] sm:text-xs"
      style={{ color: tint }}
    >
      {children}
    </p>
  );
}

/** Oversized heading with the chromatic-aberration treatment. */
export function Headline({
  text,
  className = "",
  glitch = true,
}: {
  text: string;
  className?: string;
  glitch?: boolean;
}) {
  return (
    <h2
      {...(glitch ? { "data-text": text } : {})}
      className={`br-display ${glitch ? "br-glitch" : ""} text-[11vw] font-black uppercase leading-[0.88] sm:text-5xl md:text-6xl lg:text-7xl ${className}`}
    >
      {text}
    </h2>
  );
}

export function Chip({ children, tint }: { children: ReactNode; tint: string }) {
  return (
    <span
      className="inline-block rounded-full border px-2.5 py-1 text-[11px] font-semibold sm:text-xs"
      style={{ borderColor: `${tint}66`, color: tint, background: `${tint}14` }}
    >
      {children}
    </span>
  );
}

/** A project as a "pinned post" card. */
export function ProjectCard({
  name,
  blurb,
  stack,
  href,
  status,
  tint,
}: {
  name: string;
  blurb: string;
  stack: string[];
  href?: string;
  status: string;
  tint: string;
}) {
  const inner = (
    <>
      <div className="mb-1.5 flex flex-wrap items-center gap-2">
        <span className="br-display text-lg font-black uppercase sm:text-xl" style={{ color: tint }}>
          {name}
        </span>
        <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold text-white/70">
          {status}
        </span>
      </div>
      <p className="mb-2 text-[13px] leading-snug text-white/80 sm:text-sm">{blurb}</p>
      <p className="flex flex-wrap gap-1.5">
        {stack.map((s) => (
          <span
            key={s}
            className="rounded bg-black/40 px-1.5 py-0.5 text-[10px] text-white/60 sm:text-[11px]"
          >
            {s}
          </span>
        ))}
      </p>
      {href ? (
        <p className="mt-2 text-[11px] font-semibold" style={{ color: tint }}>
          {href.replace(/^https?:\/\//, "")} ↗
        </p>
      ) : null}
    </>
  );

  const className =
    "block rounded-2xl border border-white/12 bg-black/45 p-3.5 backdrop-blur-sm transition-colors hover:border-white/30 sm:p-4";

  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {inner}
    </a>
  ) : (
    <div className={className}>{inner}</div>
  );
}

/** One row of a tier list, because the stack section had to be a tier list. */
export function TierRow({
  tier,
  color,
  items,
}: {
  tier: string;
  color: string;
  items: string[];
}) {
  return (
    <div className="flex items-stretch gap-2">
      <div
        className="br-display grid w-11 shrink-0 place-items-center rounded-lg text-xl font-black text-black sm:w-14 sm:text-2xl"
        style={{ background: color }}
      >
        {tier}
      </div>
      <div className="flex flex-1 flex-wrap items-center gap-1.5 rounded-lg border border-white/10 bg-black/40 p-2">
        {items.map((i) => (
          <span
            key={i}
            className="rounded bg-white/8 px-2 py-1 text-[11px] font-medium text-white/85 sm:text-xs"
          >
            {i}
          </span>
        ))}
      </div>
    </div>
  );
}

/** "keep scrolling" nudge for the first post. */
export function ScrollHint() {
  return (
    <p className="br-bounce mt-4 flex items-center justify-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">
      <span aria-hidden>↓</span> keep scrolling
    </p>
  );
}
