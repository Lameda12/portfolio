"use client";

import { useEffect, useRef } from "react";

/**
 * The obligatory bottom-half gameplay strip.
 *
 * Nobody is shipping a 40MB screen capture to Vercel, so this is a tiny
 * canvas endless-runner: three lanes in fake perspective, obstacles rushing
 * the camera, and a little guy who dodges them on his own. It runs only while
 * it is on screen and stops dead for prefers-reduced-motion.
 */

const LANES = [-1, 0, 1];
const SPEED = 0.42; // depth units per second
const HORIZON = 0.34; // fraction of canvas height where the track vanishes

type Obstacle = { z: number; lane: number; coin: boolean };

export function SubwaySurfers() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    let raf = 0;
    let last = 0;
    let scrollPhase = 0;
    let visible = true;
    let width = 0;
    let height = 0;

    let obstacles: Obstacle[] = [];
    let spawnTimer = 0;
    let lane = 0; // where the runner currently is
    let laneX = 0; // smoothed, for the slide animation
    let hop = 0; // 0..1 jump arc
    let score = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    // Perspective projection: z=0 is at the camera, z=1 is the horizon.
    const project = (z: number) => {
      const k = 0.2 / (z + 0.2); // 1 at the camera, ~0.17 at the horizon
      const horizonY = height * HORIZON;
      return { y: horizonY + (height - horizonY) * k, s: k };
    };

    // Distance between lane centres at full scale. Capping against height keeps
    // a wide desktop strip from turning the track into an empty highway.
    const laneSpacing = () => Math.min(width * 0.3, height * 1.6);

    const laneScreenX = (l: number, s: number) =>
      width / 2 + l * s * laneSpacing();

    /** Pick a lane that has nothing dangerous in the danger zone. */
    const dodge = () => {
      const threatened = (l: number) =>
        obstacles.some((o) => !o.coin && o.lane === l && o.z > 0.06 && o.z < 0.42);
      if (!threatened(lane)) return;
      const safe = LANES.filter((l) => Math.abs(l - lane) <= 1 && !threatened(l));
      if (safe.length) lane = safe[Math.floor(Math.random() * safe.length)];
      hop = 1;
    };

    const drawTrack = () => {
      // Sky / tunnel gradient
      const sky = ctx.createLinearGradient(0, 0, 0, height);
      sky.addColorStop(0, "#120a2a");
      sky.addColorStop(0.34, "#2a1150");
      sky.addColorStop(1, "#06060f");
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, width, height);

      const horizonY = height * HORIZON;

      // Sun on the horizon, because of course
      ctx.save();
      ctx.globalAlpha = 0.55;
      const sun = ctx.createRadialGradient(
        width / 2, horizonY, 0,
        width / 2, horizonY, height * 0.42
      );
      sun.addColorStop(0, "rgba(255,45,149,0.9)");
      sun.addColorStop(0.5, "rgba(157,78,221,0.28)");
      sun.addColorStop(1, "rgba(157,78,221,0)");
      ctx.fillStyle = sun;
      ctx.fillRect(0, 0, width, horizonY + height * 0.2);
      ctx.restore();

      // Track surface
      const near = project(0);
      const far = project(1);
      ctx.fillStyle = "#0a0a18";
      ctx.beginPath();
      ctx.moveTo(laneScreenX(-1.6, far.s), far.y);
      ctx.lineTo(laneScreenX(1.6, far.s), far.y);
      ctx.lineTo(laneScreenX(1.6, near.s), near.y);
      ctx.lineTo(laneScreenX(-1.6, near.s), near.y);
      ctx.closePath();
      ctx.fill();

      // Lane dividers
      ctx.strokeStyle = "rgba(0,229,255,0.32)";
      ctx.lineWidth = 1.5;
      for (const l of [-0.5, 0.5]) {
        ctx.beginPath();
        ctx.moveTo(laneScreenX(l, far.s), far.y);
        ctx.lineTo(laneScreenX(l, near.s), near.y);
        ctx.stroke();
      }

      // Rungs streaming toward the camera — this is what sells the speed
      for (let i = 0; i < 16; i++) {
        const z = ((i / 16 + scrollPhase) % 1);
        const p = project(z);
        ctx.strokeStyle = `rgba(182,255,0,${0.06 + 0.3 * p.s})`;
        ctx.lineWidth = Math.max(1, 3 * p.s);
        ctx.beginPath();
        ctx.moveTo(laneScreenX(-1.5, p.s), p.y);
        ctx.lineTo(laneScreenX(1.5, p.s), p.y);
        ctx.stroke();
      }

      // Side walls
      for (const side of [-1, 1]) {
        ctx.fillStyle = "rgba(157,78,221,0.14)";
        ctx.beginPath();
        ctx.moveTo(laneScreenX(1.6 * side, far.s), far.y);
        ctx.lineTo(laneScreenX(1.6 * side, near.s), near.y);
        ctx.lineTo(laneScreenX(7 * side, near.s), near.y);
        ctx.lineTo(laneScreenX(4 * side, far.s), far.y);
        ctx.closePath();
        ctx.fill();
      }
    };

    const drawObstacle = (o: Obstacle) => {
      const p = project(o.z);
      const x = laneScreenX(o.lane, p.s);

      if (o.coin) {
        const r = Math.max(1.5, 16 * p.s);
        ctx.save();
        ctx.shadowColor = "rgba(255,214,10,0.85)";
        ctx.shadowBlur = 14 * p.s;
        ctx.fillStyle = "#ffd60a";
        ctx.beginPath();
        ctx.ellipse(x, p.y - r * 2.4, r * 0.55, r, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        return;
      }

      const w = Math.max(2, laneSpacing() * 0.52 * p.s);
      const h = Math.max(3, height * 0.6 * p.s);
      ctx.save();
      ctx.shadowColor = "rgba(255,45,149,0.7)";
      ctx.shadowBlur = 16 * p.s;
      ctx.fillStyle = "#ff2d95";
      ctx.fillRect(x - w / 2, p.y - h, w, h);
      ctx.fillStyle = "rgba(0,0,0,0.4)";
      ctx.fillRect(x - w / 2, p.y - h, w, h * 0.22);
      ctx.restore();
    };

    const drawRunner = () => {
      const p = project(0.05);
      const targetX = laneScreenX(lane, p.s);
      laneX += (targetX - laneX) * 0.22;

      const arc = Math.sin(hop * Math.PI); // 0 → 1 → 0
      const lift = arc * height * 0.16;
      const s = p.s;
      const bodyW = height * 0.17 * s;
      const bodyH = height * 0.45 * s;
      const baseY = p.y - lift;

      ctx.save();
      ctx.shadowColor = "rgba(0,229,255,0.8)";
      ctx.shadowBlur = 20;

      // shadow on the ground
      ctx.shadowBlur = 0;
      ctx.fillStyle = `rgba(0,0,0,${0.45 - arc * 0.25})`;
      ctx.beginPath();
      ctx.ellipse(laneX, p.y, bodyW * 0.7, bodyW * 0.22, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.shadowColor = "rgba(0,229,255,0.8)";
      ctx.shadowBlur = 18;

      // body
      ctx.fillStyle = "#00e5ff";
      ctx.beginPath();
      ctx.roundRect(laneX - bodyW / 2, baseY - bodyH, bodyW, bodyH * 0.68, bodyW * 0.28);
      ctx.fill();

      // head
      ctx.fillStyle = "#b6ff00";
      ctx.beginPath();
      ctx.arc(laneX, baseY - bodyH - bodyW * 0.32, bodyW * 0.42, 0, Math.PI * 2);
      ctx.fill();

      // legs, alternating with the scroll so he looks like he's running
      ctx.shadowBlur = 0;
      ctx.fillStyle = "#00b8d4";
      const stride = Math.sin(scrollPhase * Math.PI * 8) * bodyW * 0.3;
      for (const dir of [-1, 1]) {
        ctx.beginPath();
        ctx.roundRect(
          laneX - bodyW * 0.28 + (dir > 0 ? bodyW * 0.26 : 0),
          baseY - bodyH * 0.34,
          bodyW * 0.28,
          bodyH * 0.34 + dir * stride * (1 - arc),
          bodyW * 0.12
        );
        ctx.fill();
      }
      ctx.restore();
    };

    const drawHud = () => {
      ctx.save();
      ctx.font = `700 ${Math.max(10, Math.min(15, width * 0.018))}px ui-monospace, monospace`;
      ctx.textBaseline = "top";

      ctx.fillStyle = "rgba(255,214,10,0.95)";
      ctx.fillText(`◎ ${Math.floor(score)}`, 12, 10);

      ctx.fillStyle = "rgba(255,255,255,0.34)";
      ctx.textAlign = "right";
      ctx.fillText("gameplay to keep you here", width - 12, 10);
      ctx.restore();
    };

    const frame = (t: number) => {
      raf = requestAnimationFrame(frame);
      if (!visible) {
        last = t;
        return;
      }

      const dt = Math.min((t - last) / 1000 || 0, 0.05);
      last = t;

      scrollPhase = (scrollPhase + dt * SPEED) % 1;
      score += dt * 24;
      if (hop > 0) hop = Math.max(0, hop - dt * 2.6);

      // advance + retire obstacles
      obstacles.forEach((o) => (o.z -= dt * SPEED));
      obstacles = obstacles.filter((o) => o.z > -0.05);

      spawnTimer -= dt;
      if (spawnTimer <= 0) {
        spawnTimer = 0.55 + Math.random() * 0.5;
        const coin = Math.random() < 0.35;
        obstacles.push({
          z: 1,
          lane: LANES[Math.floor(Math.random() * LANES.length)],
          coin,
        });
      }

      dodge();

      drawTrack();
      // far to near, so nearer things paint over farther ones
      obstacles.sort((a, b) => b.z - a.z).forEach(drawObstacle);
      drawRunner();
      drawHud();
    };

    const drawStill = () => {
      obstacles = [
        { z: 0.75, lane: -1, coin: false },
        { z: 0.45, lane: 1, coin: true },
      ];
      drawTrack();
      obstacles.forEach(drawObstacle);
      laneX = laneScreenX(0, project(0.05).s);
      drawRunner();
      drawHud();
    };

    const start = () => {
      cancelAnimationFrame(raf);
      if (reduced.matches) {
        drawStill();
        return;
      }
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };

    const onResize = () => {
      resize();
      if (reduced.matches) drawStill();
    };

    resize();
    start();

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    const onVisibility = () => {
      visible = !document.hidden;
    };

    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);
    reduced.addEventListener("change", start);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      reduced.removeEventListener("change", start);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="block h-full w-full"
      aria-hidden
    />
  );
}
