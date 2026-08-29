"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { SubwaySurfers } from "./SubwaySurfers";
import { Caption } from "./Caption";
import { Rail } from "./Rail";
import type { PostMeta } from "./meta";

/** One short blip through WebAudio, so the sound toggle isn't a lie. */
function useBlip(enabled: boolean) {
  const ctxRef = useRef<AudioContext | null>(null);

  return useCallback(() => {
    if (!enabled) return;
    try {
      type WithWebkit = typeof window & { webkitAudioContext?: typeof AudioContext };
      const Ctor = window.AudioContext ?? (window as WithWebkit).webkitAudioContext;
      if (!Ctor) return;
      const ctx = (ctxRef.current ??= new Ctor());
      if (ctx.state === "suspended") void ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const now = ctx.currentTime;

      osc.type = "triangle";
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.12);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.06, now + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);

      osc.connect(gain).connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.18);
    } catch {
      /* audio is a nice-to-have */
    }
  }, [enabled]);
}

function IconButton({
  label,
  onClick,
  active,
  children,
}: {
  label: string;
  onClick: () => void;
  active?: boolean;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={active}
      title={label}
      className={`grid h-9 w-9 place-items-center rounded-full border text-[13px] backdrop-blur-md transition-colors ${
        active
          ? "border-[var(--br-lime)] bg-[var(--br-lime)]/20 text-[var(--br-lime)]"
          : "border-white/15 bg-black/45 text-white/70 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}

/**
 * The app chrome: story progress bars, feed scroller, dot nav, and the
 * split-screen gameplay strip underneath.
 */
export function Shell({ children, feed }: { children: ReactNode; feed: PostMeta[] }) {
  const count = feed.length;
  const feedRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);
  const [sound, setSound] = useState(false);
  const [strip, setStrip] = useState(true);
  const blip = useBlip(sound);
  const current = feed[Math.min(active, count - 1)] ?? feed[0];
  const firstRun = useRef(true);

  const sections = useCallback(
    () => Array.from(feedRef.current?.querySelectorAll<HTMLElement>("[data-post]") ?? []),
    []
  );

  const goTo = useCallback(
    (i: number) => {
      const list = sections();
      const clamped = Math.max(0, Math.min(list.length - 1, i));
      list[clamped]?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
        block: "start",
      });
    },
    [sections]
  );

  /* Track which post is on screen. */
  useEffect(() => {
    const list = sections();
    if (!list.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setActive(Number((e.target as HTMLElement).dataset.index ?? 0));
          }
        }
      },
      { root: feedRef.current, threshold: 0.55 }
    );

    list.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [sections]);

  /* Blip on post change, but not on the first render. */
  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    blip();
  }, [active, blip]);

  /* The gameplay strip resizes the feed via a CSS variable. */
  useEffect(() => {
    document.documentElement.dataset.strip = strip ? "on" : "off";
  }, [strip]);

  /* Keyboard navigation. */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;

      switch (e.key) {
        case "ArrowDown":
        case "j":
        case "PageDown":
          e.preventDefault();
          goTo(active + 1);
          break;
        case "ArrowUp":
        case "k":
        case "PageUp":
          e.preventDefault();
          goTo(active - 1);
          break;
        case "Home":
          e.preventDefault();
          goTo(0);
          break;
        case "End":
          e.preventDefault();
          goTo(count - 1);
          break;
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, count, goTo]);

  return (
    <div className="relative h-dvh w-full overflow-hidden">
      {/* ── top bar ── */}
      <header className="pointer-events-none absolute inset-x-0 top-0 z-30 px-3 pt-2 sm:px-5 sm:pt-3">
        <div className="mb-2 flex gap-1" aria-hidden>
          {Array.from({ length: count }, (_, i) => (
            <span
              key={i}
              className={`h-[3px] flex-1 rounded-full transition-colors duration-300 ${
                i <= active ? "bg-white/85" : "bg-white/20"
              }`}
            />
          ))}
        </div>

        <div className="flex items-center justify-between">
          <nav className="pointer-events-auto flex items-center gap-4 text-[13px] font-semibold sm:text-sm">
            <span className="text-white/45">Following</span>
            <span className="relative text-white">
              For You
              <span className="absolute -bottom-1.5 left-0 h-[2px] w-full rounded-full bg-white" />
            </span>
          </nav>

          <div className="pointer-events-auto flex items-center gap-2">
            <IconButton
              label={strip ? "Hide gameplay" : "Show gameplay"}
              onClick={() => setStrip((s) => !s)}
              active={strip}
            >
              🎮
            </IconButton>
            <IconButton
              label={sound ? "Mute" : "Unmute"}
              onClick={() => setSound((s) => !s)}
              active={sound}
            >
              {sound ? "🔊" : "🔇"}
            </IconButton>
          </div>
        </div>
      </header>

      {/* ── dot nav ── */}
      <nav
        className="absolute left-2 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-2 lg:flex"
        aria-label="Jump to post"
      >
        {Array.from({ length: count }, (_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Go to post ${i + 1}`}
            aria-current={i === active}
            className={`h-2 rounded-full transition-all ${
              i === active ? "h-5 w-2 bg-white" : "w-2 bg-white/30 hover:bg-white/60"
            }`}
          />
        ))}
      </nav>

      {/* ── the feed, with one shared set of overlay furniture on top ── */}
      <div className="relative z-10" style={{ height: "calc(100dvh - var(--br-strip))" }}>
        <div ref={feedRef} className="br-feed">
          {children}
        </div>

        {/* Rendered once, for the post currently in view. Keeping these out of
            the posts themselves is what stops two captions and two rails from
            overlapping while a scroll is in flight. */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-20 h-28 bg-gradient-to-b from-black/70 to-transparent"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-56 bg-gradient-to-t from-black via-black/85 to-transparent"
          aria-hidden
        />
        <Caption meta={current} />
        {/* key resets the like state as you move between posts */}
        <Rail
          key={current.id}
          likes={current.likes}
          comments={current.comments}
          shares={current.shares}
          tint={current.tint}
        />
      </div>

      {/* ── split-screen gameplay ── */}
      <div
        className="relative z-20 w-full overflow-hidden border-t border-white/10"
        style={{ height: "var(--br-strip)" }}
      >
        <SubwaySurfers />
        <div className="br-scanlines pointer-events-none absolute inset-0 opacity-40" aria-hidden />
      </div>
    </div>
  );
}
