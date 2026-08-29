import type { PostMeta } from "./meta";

/** The bottom-left caption block, straight off the For You page. */
export function Caption({ meta }: { meta: PostMeta }) {
  return (
    <div className="pointer-events-auto absolute bottom-4 left-4 z-20 max-w-[calc(100%-5.5rem)] sm:bottom-6 sm:left-6 sm:max-w-lg">
      <p className="mb-1 text-sm font-bold text-white drop-shadow">
        @lameda12{" "}
        <span className="align-middle text-[var(--br-cyan)]" title="verified by nobody">
          ✔
        </span>
      </p>
      <p className="mb-1.5 text-[13px] leading-snug text-white/90 drop-shadow sm:text-sm">
        {meta.caption}
      </p>
      <p
        className="mb-2 text-[12px] font-semibold leading-snug sm:text-[13px]"
        style={{ color: meta.tint }}
      >
        {meta.tags.map((t) => `#${t}`).join(" ")}
      </p>
      <p className="flex items-center gap-1.5 overflow-hidden text-[11px] text-white/70">
        <span aria-hidden>♫</span>
        <span className="truncate">{meta.sound}</span>
      </p>
    </div>
  );
}
