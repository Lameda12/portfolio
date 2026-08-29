"use client";

import { useSyncExternalStore } from "react";

// When TradeLock stopped being a weekend idea.
const START_DATE = new Date("2025-01-01");

// Nothing to subscribe to — the value only matters once, on the client.
const subscribe = () => () => {};
const getDays = () =>
  Math.floor((Date.now() - START_DATE.getTime()) / 86_400_000);
const getServerDays = () => null;

export function BuildingStreak() {
  // useSyncExternalStore keeps the server render ("—") and the client render
  // (the real count) from fighting each other during hydration.
  const days = useSyncExternalStore(subscribe, getDays, getServerDays);

  return (
    <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/45 px-3 py-1.5 text-[12px] font-semibold sm:text-[13px]">
      <span aria-hidden>🔥</span>
      <span className="text-white/70">
        building for{" "}
        <span className="tabular-nums text-[var(--br-pink)]">
          {days === null ? "—" : days.toLocaleString()}
        </span>{" "}
        days straight
      </span>
    </p>
  );
}
