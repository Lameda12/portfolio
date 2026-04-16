"use client";

import { useEffect, useState } from "react";

// Set this to when you seriously started building TradeLock
const START_DATE = new Date("2025-01-01");

export function BuildingStreak() {
  const [days, setDays] = useState<number | null>(null);

  useEffect(() => {
    const diff = Date.now() - START_DATE.getTime();
    setDays(Math.floor(diff / (1000 * 60 * 60 * 24)));
  }, []);

  if (days === null) return null;

  return (
    <p className="text-sm text-[var(--crt-dim)] sm:text-base">
      building for{" "}
      <span className="text-[var(--crt-accent)]">{days} days</span>{" "}
      and counting
    </p>
  );
}
