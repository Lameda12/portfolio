import type { ReactNode } from "react";
import type { PostMeta } from "./meta";

/** Full-bleed background: gradient wash + drifting blobs + noise. */
function Backdrop({ wash, tint }: { wash: [string, string]; tint: string }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(120% 90% at 12% 8%, ${wash[0]} 0%, transparent 58%),
                       radial-gradient(110% 85% at 92% 88%, ${wash[1]} 0%, transparent 55%),
                       var(--br-bg)`,
        }}
      />
      <div
        className="br-drift absolute -left-24 top-1/4 h-72 w-72 rounded-full opacity-30 blur-3xl"
        style={{ background: tint }}
      />
      <div
        className="br-drift absolute -right-20 bottom-10 h-64 w-64 rounded-full opacity-20 blur-3xl"
        style={{ background: wash[1], animationDelay: "-7s" }}
      />
      <div className="br-noise absolute inset-0 opacity-[0.05] mix-blend-overlay" />
    </div>
  );
}

/**
 * One post in the feed: a viewport-height snap section holding just the
 * background and the content. The caption, rail and scrims are rendered once
 * by the Shell so that two neighbouring posts can never show two sets at once.
 */
export function Post({
  meta,
  index,
  label,
  children,
}: {
  meta: PostMeta;
  index: number;
  label: string;
  children: ReactNode;
}) {
  return (
    <section
      data-post={meta.id}
      data-index={index}
      aria-label={label}
      className="br-post relative flex w-full flex-col snap-start overflow-hidden"
      style={{ ["--tint" as string]: meta.tint }}
    >
      <Backdrop wash={meta.wash} tint={meta.tint} />

      {/* Centred when it fits, free to grow when it doesn't — never clipped.
          Padding keeps content clear of the Shell's caption and rail. */}
      <div className="relative z-10 flex flex-1 items-center justify-center px-4 pb-32 pr-[4.75rem] pt-14 sm:px-8 sm:pb-36 sm:pr-24 sm:pt-16 lg:px-10 lg:pr-10">
        <div className="br-rise w-full max-w-3xl">{children}</div>
      </div>
    </section>
  );
}
