"use client";

import { useEffect, useRef, useState } from "react";

/** Dark → bright ramps for luminance → glyph */
const RAMP = " .'`^\",:;Il!i><~+\\-?][}{1)(|/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$";

function charFromLuminance(lum: number): string {
  if (lum < 6) return " ";
  const t = Math.min(1, lum / 255);
  const idx = Math.min(RAMP.length - 1, Math.floor(t * RAMP.length));
  return RAMP[idx];
}

function phosphorColors(
  r: number,
  g: number,
  b: number,
  tint: { r: number; g: number; b: number },
  mix: number
): string {
  const rr = Math.round(r * (1 - mix) + tint.r * mix);
  const gg = Math.round(g * (1 - mix) + tint.g * mix);
  const bb = Math.round(b * (1 - mix) + tint.b * mix);
  return `rgb(${rr},${gg},${bb})`;
}

type Row = { ch: string; color: string }[];

export type AsciiAvatarProps = {
  src: string;
  /** Terminal column count (monospace cells) */
  cols?: number;
  rows?: number;
  className?: string;
  /** Blend sampled colors toward phosphor green for cohesion (0–1) */
  colorMix?: number;
};

export function AsciiAvatar({
  src,
  cols = 40,
  rows = 30,
  className = "",
  colorMix = 0.22,
}: AsciiAvatarProps) {
  const [grid, setGrid] = useState<Row[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    setGrid(null);
    setError(null);

    const img = new Image();
    img.decoding = "async";

    const run = () => {
      try {
        const c = document.createElement("canvas");
        c.width = cols;
        c.height = rows;
        const ctx = c.getContext("2d", { willReadFrequently: true });
        if (!ctx) {
          setError("canvas");
          return;
        }
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(img, 0, 0, cols, rows);
        const { data } = ctx.getImageData(0, 0, cols, rows);

        const tint = { r: 0, g: 255, b: 65 };
        const out: Row[] = [];
        for (let y = 0; y < rows; y++) {
          const line: Row = [];
          for (let x = 0; x < cols; x++) {
            const i = (y * cols + x) * 4;
            const r = data[i] ?? 0;
            const gch = data[i + 1] ?? 0;
            const b = data[i + 2] ?? 0;
            const a = data[i + 3] ?? 255;
            const lum =
              a < 8 ? 0 : 0.299 * r + 0.587 * gch + 0.114 * b;
            const ch = charFromLuminance(lum);
            const color =
              a < 8
                ? "transparent"
                : phosphorColors(r, gch, b, tint, colorMix);
            line.push({ ch, color });
          }
          out.push(line);
        }
        if (mounted.current) setGrid(out);
      } catch {
        if (mounted.current) setError("decode");
      }
    };

    img.onload = run;
    img.onerror = () => {
      if (mounted.current) setError("load");
    };
    img.src = src;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, cols, rows, colorMix]);

  if (error) {
    return (
      <pre
        className={`text-[var(--crt-dim)] crt-glow ${className}`}
        aria-label="Portrait placeholder — add /public/profile.jpg"
      >
        {`┌${"─".repeat(Math.min(cols, 24))}┐
│${" ".repeat(Math.min(cols, 24))}│
│     ( no portrait )      │
│${" ".repeat(Math.min(cols, 24))}│
└${"─".repeat(Math.min(cols, 24))}┘`}
      </pre>
    );
  }

  if (!grid) {
    return (
      <pre
        className={`animate-pulse text-[var(--crt-dim)] ${className}`}
        aria-busy
      >
        {Array.from({ length: Math.min(rows, 6) }, (_, y) => (
          <span key={y} className="block">
            {"░".repeat(Math.min(cols, 40))}
          </span>
        ))}
      </pre>
    );
  }

  return (
    <pre
      className={`m-0 overflow-x-auto text-left leading-none tracking-tight crt-glow ${className}`}
      style={{ fontSize: "clamp(7px, 1.65vw, 11px)" }}
      aria-label="ASCII portrait"
    >
      {grid.map((line, y) => (
        <span key={y} className="block whitespace-pre">
          {line.map((cell, x) => (
            <span key={`${y}-${x}`} style={{ color: cell.color }}>
              {cell.ch}
            </span>
          ))}
        </span>
      ))}
    </pre>
  );
}
