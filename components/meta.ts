export type PostMeta = {
  id: string;
  /** Accent colour for this post, as a CSS colour string. */
  tint: string;
  /** Two colours for the background wash. */
  wash: [string, string];
  caption: string;
  tags: string[];
  sound: string;
  likes: number;
  comments: number;
  shares: number;
};

export const PINK = "#ff2d95";
export const CYAN = "#00e5ff";
export const LIME = "#b6ff00";
export const YELLOW = "#ffd60a";
export const VIOLET = "#9d4edd";

export const META = {
  hero: {
    id: "hero",
    tint: PINK,
    wash: ["#3a0a4d", "#0b1a3d"],
    caption: "pov: you opened a portfolio and it opened a for you page instead",
    tags: ["cs", "founder", "halifax", "shipping"],
    sound: "original sound — lameda12 (mechanical keyboard at 2am)",
    likes: 42_000,
    comments: 1_337,
    shares: 6_900,
  },
  about: {
    id: "about",
    tint: CYAN,
    wash: ["#062a3d", "#2a0a3d"],
    caption: "started a cs degree, got distracted building a company. doing both now",
    tags: ["dalhousie", "buildinpublic", "notsorry"],
    sound: "original sound — the deal",
    likes: 18_400,
    comments: 902,
    shares: 3_100,
  },
  tradelock: {
    id: "tradelock",
    tint: YELLOW,
    wash: ["#3d2a00", "#1a0a3d"],
    caption: "the main thing. licensed trades in canada, minus the paperwork hell",
    tags: ["tradelock", "marketplace", "stripe", "fastapi"],
    sound: "original sound — compliance forms go brrr",
    likes: 31_200,
    comments: 1_450,
    shares: 8_800,
  },
  comply: {
    id: "comply",
    tint: LIME,
    wash: ["#1a3d00", "#00263d"],
    caption: "an mcp server that yells at your git diff so your teammates don't have to",
    tags: ["mcp", "claudeapi", "devtools", "cli"],
    sound: "original sound — lgtm (it was not lgtm)",
    likes: 24_700,
    comments: 611,
    shares: 4_200,
  },
  ships: {
    id: "ships",
    tint: VIOLET,
    wash: ["#2a0a4d", "#0a1a3d"],
    caption: "the rest of the harbour. some shipped, some cursed, all mine",
    tags: ["sideprojects", "rag", "opencv", "anime"],
    sound: "original sound — ideas.txt overflowing",
    likes: 15_900,
    comments: 388,
    shares: 2_400,
  },
  stack: {
    id: "stack",
    tint: CYAN,
    wash: ["#00293d", "#3d0a2a"],
    caption: "tier list. fight me in the comments (the comments are my inbox)",
    tags: ["typescript", "python", "nextjs", "tierlist"],
    sound: "original sound — npm install (still going)",
    likes: 27_300,
    comments: 2_100,
    shares: 5_600,
  },
  ai: {
    id: "ai",
    tint: PINK,
    wash: ["#3d0a34", "#0a123d"],
    caption:
      "making models do real work, not demos. the difference is about 400 lines of glue",
    tags: ["llm", "mcp", "rag", "tooluse"],
    sound: "original sound — streaming tokens asmr",
    likes: 33_800,
    comments: 1_020,
    shares: 7_400,
  },
  commits: {
    id: "commits",
    tint: LIME,
    wash: ["#0a3d1a", "#0a0a3d"],
    caption: "live from the github api. yes one of them says 'fix: fix the fix'",
    tags: ["git", "commits", "receipts"],
    sound: "original sound — git push --force (do not)",
    likes: 9_800,
    comments: 240,
    shares: 1_600,
  },
  links: {
    id: "links",
    tint: YELLOW,
    wash: ["#3d3000", "#3d0a1a"],
    caption:
      "you made it to the end of the feed. touch grass, or email me. preferably email me",
    tags: ["hireme", "coop", "letsbuild"],
    sound: "original sound — outro",
    likes: 69_000,
    comments: 4_200,
    shares: 12_100,
  },
} satisfies Record<string, PostMeta>;

export const ORDER = [
  "hero",
  "about",
  "tradelock",
  "comply",
  "ships",
  "stack",
  "ai",
  "commits",
  "links",
] as const;

export type PostId = (typeof ORDER)[number];

/** Feed order, as the Shell needs it. */
export const FEED: PostMeta[] = ORDER.map((id) => META[id]);

export const indexOf = (id: PostId) => ORDER.indexOf(id);
