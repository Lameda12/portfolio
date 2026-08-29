"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";

type Burst = { id: number; dx: number };

function compact(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
  return String(n);
}

function RailButton({
  label,
  count,
  onClick,
  active,
  children,
}: {
  label: string;
  count?: string;
  onClick?: () => void;
  active?: boolean;
  children: React.ReactNode;
}) {
  const Tag = onClick ? "button" : "div";
  return (
    <Tag
      {...(onClick ? { onClick, type: "button" as const } : {})}
      aria-label={onClick ? label : undefined}
      aria-pressed={onClick ? !!active : undefined}
      className={`flex w-12 flex-col items-center gap-1 ${
        onClick ? "cursor-pointer transition-transform active:scale-90" : ""
      }`}
    >
      <span
        className={`grid h-11 w-11 place-items-center rounded-full border backdrop-blur-md transition-colors ${
          active
            ? "border-[var(--br-pink)] bg-[var(--br-pink)]/20 text-[var(--br-pink)]"
            : "border-white/15 bg-black/45 text-white"
        }`}
      >
        {children}
      </span>
      {count ? (
        <span className="text-[10px] font-semibold tabular-nums text-white/85 drop-shadow">
          {count}
        </span>
      ) : null}
    </Tag>
  );
}

/**
 * The right-hand engagement rail. Purely decorative except the like button,
 * which is real — it just only counts on your machine.
 */
export function Rail({
  likes,
  comments,
  shares,
  tint = "var(--br-pink)",
}: {
  likes: number;
  comments: number;
  shares: number;
  tint?: string;
}) {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [bursts, setBursts] = useState<Burst[]>([]);
  const seq = useRef(0);

  const like = useCallback(() => {
    setLiked((prev) => {
      if (!prev) {
        const next = Array.from({ length: 5 }, () => ({
          id: seq.current++,
          dx: Math.round((Math.random() - 0.5) * 70),
        }));
        setBursts((b) => [...b, ...next]);
        window.setTimeout(
          () => setBursts((b) => b.filter((x) => !next.some((n) => n.id === x.id))),
          950
        );
      }
      return !prev;
    });
  }, []);

  const share = useCallback(() => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (navigator.share) {
      navigator.share({ title: "Alamedin Sabit", url }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(url).catch(() => {});
    }
  }, []);

  return (
    <div className="pointer-events-auto absolute bottom-28 right-2 z-20 flex flex-col items-center gap-4 sm:bottom-32 sm:right-4">
      {/* avatar + follow */}
      <a
        href="https://github.com/Lameda12"
        target="_blank"
        rel="noopener noreferrer"
        className="relative mb-1"
        aria-label="Follow Lameda12 on GitHub"
      >
        <span
          className="block overflow-hidden rounded-full border-2"
          style={{ borderColor: tint }}
        >
          <Image
            src="/profile.jpg"
            alt=""
            width={44}
            height={44}
            className="h-11 w-11 object-cover"
          />
        </span>
        <span
          className="absolute -bottom-2 left-1/2 grid h-5 w-5 -translate-x-1/2 place-items-center rounded-full text-xs font-bold text-white"
          style={{ background: tint }}
          aria-hidden
        >
          +
        </span>
      </a>

      {/* like */}
      <div className="relative">
        {bursts.map((b) => (
          <span
            key={b.id}
            className="br-float pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 text-lg"
            style={{ ["--dx" as string]: `${b.dx}px` }}
            aria-hidden
          >
            💗
          </span>
        ))}
        <RailButton
          label={liked ? "Unlike" : "Like"}
          count={compact(likes + (liked ? 1 : 0))}
          onClick={like}
          active={liked}
        >
          <svg viewBox="0 0 24 24" className={`h-5 w-5 ${liked ? "br-pop" : ""}`} fill="currentColor">
            <path d="M12 21s-7.5-4.7-9.6-9A5.4 5.4 0 0 1 12 6.2 5.4 5.4 0 0 1 21.6 12c-2.1 4.3-9.6 9-9.6 9Z" />
          </svg>
        </RailButton>
      </div>

      {/* comments — link to email, the only comment section that exists */}
      <a href="mailto:asabitt29@gmail.com" aria-label="Email Alamedin">
        <RailButton label="Comments" count={compact(comments)}>
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
            <path d="M4 4h16a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H9l-5 4V5a1 1 0 0 1 1-1Z" />
          </svg>
        </RailButton>
      </a>

      <RailButton
        label="Bookmark"
        count={compact(Math.round(shares * 0.7))}
        onClick={() => setBookmarked((b) => !b)}
        active={bookmarked}
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
          <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4.5L5 21V4a1 1 0 0 1 1-1Z" />
        </svg>
      </RailButton>

      <RailButton label="Share this page" count={compact(shares)} onClick={share}>
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
          <path d="m21 3-9 18-2.2-7.3L2.5 11.5 21 3Z" />
        </svg>
      </RailButton>

      {/* the spinning record */}
      <span
        className="br-spin mt-1 grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-gradient-to-br from-neutral-700 to-black"
        aria-hidden
      >
        <Image
          src="/profile.jpg"
          alt=""
          width={26}
          height={26}
          className="h-[26px] w-[26px] rounded-full object-cover"
        />
      </span>
    </div>
  );
}
