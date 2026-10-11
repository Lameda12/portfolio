// Everything on the homepage that you'll want to edit lives here.

export const site = {
  name: "Alamedin Sabit",
  handle: "Lameda12",
  url: "https://www.alamedinsabit.me",
  email: "asabitt29@gmail.com",
  description:
    "AI engineer in Halifax. I build agents that do real work, with guardrails enforced in code, not prompts.",
};

export const links = [
  { label: "email", href: `mailto:${site.email}` },
  { label: "github", href: "https://github.com/Lameda12" },
  { label: "x", href: "https://x.com/amadisabit" },
  { label: "linkedin", href: "https://www.linkedin.com/in/alamedin-sabit" },
  { label: "substack", href: "https://alamedin.substack.com" },
  { label: "product hunt", href: "https://www.producthunt.com/@amadisabit" },
];

// Keep this to three lines. Bump the date whenever you touch it.
export const now = {
  updated: "October 2026",
  items: [
    "Learning C++ properly by building an Extended Kalman Filter from scratch, tested in PX4 simulation.",
    "Opening call_human to its first users and writing about what building it taught me.",
    "Finishing my second year of CS at Dalhousie before a Winter 2027 exchange at City University of Hong Kong.",
  ],
};

export type Project = {
  name: string;
  description: string;
  stack: string[];
  live?: string;
  code?: string;
  note?: string;
};

export const featured: Project[] = [
  {
    name: "call_human",
    description:
      "An AI coding tutor that never writes your code. A server-side check throws out any reply containing code you didn't write, and every solved problem ends with a keystroke-replay receipt you can show a TA.",
    stack: ["Next.js", "Claude API"],
    live: "https://call-human.vercel.app",
    code: "https://github.com/Lameda12/call_human",
  },
  {
    name: "Orderable",
    description:
      "An open-source MCP server that lets an AI agent order from an independent restaurant. Agents check live stock, get a quote that holds for ten minutes, and see any allergen the owner hasn't listed as unknown, never as safe.",
    stack: ["TypeScript", "MCP"],
    live: "https://orderable-mcp.vercel.app",
    code: "https://github.com/Lameda12/OrderAble",
  },
  {
    name: "OpenPango",
    description:
      "An agent harness for post-purchase ops. Every tool call lands in a hash-chained log, refunds over $75 wait for a human, and customer emails get blocked if they cite an ETA the carrier never gave.",
    stack: ["Python", "evals"],
    live: "https://open-pango.vercel.app",
    code: "https://github.com/Lameda12/OpenPango",
  },
  {
    name: "SatelLocator",
    description:
      "A live 3D tracker for every active satellite, with pass predictions for wherever you're standing.",
    note: "3rd place, MDA Space Mission Accepted hackathon",
    stack: ["JavaScript", "orbital propagation"],
    live: "https://satellocator.vercel.app",
    code: "https://github.com/Lameda12/Mission-Accepted-Space-Hackathon-2025",
  },
  {
    name: "Kazakh RAG QA",
    description:
      "Question answering over Kazakh text: KazEmbed-v5 embeddings and FAISS for retrieval, a RoBERTa reader for answers, evaluated on KazQAD.",
    stack: ["Python", "FAISS", "RoBERTa"],
    live: "https://huggingface.co/spaces/RedBullet12/kazakh-rag-qa",
  },
];

export const moreWork: Project[] = [
  {
    name: "AniScope",
    description: "Anime discovery with obsessive metadata.",
    stack: ["Next.js"],
    live: "https://ani-scoupe.vercel.app",
  },
  {
    name: "microgpt-learning",
    description: "A GPT built from scratch in PyTorch to understand every line.",
    stack: ["PyTorch"],
    code: "https://github.com/Lameda12/microgpt-learning",
  },
  {
    name: "Eye-Draw",
    description: "Draw on a canvas with your eyes. OpenCV gaze tracking, tested over 500+ sessions.",
    stack: ["Python", "OpenCV"],
    code: "https://github.com/Lameda12/Eye-Draw",
  },
  {
    name: "AsterGrav",
    description: "An Asteroids-style game in C++ and raylib.",
    stack: ["C++", "raylib"],
    live: "https://amdtoplay.itch.io",
  },
];

export const shelved = {
  paused: [
    {
      name: "TradeLock",
      description: "A marketplace for licensed trades in Canada. On hold, not abandoned.",
      href: "https://github.com/Lameda12/TradeLock",
    },
    {
      name: "commitcraft",
      description: "A CLI that writes git commit messages with any model provider. On hold.",
      href: "https://github.com/Lameda12/commitcraft",
    },
  ],
  stopped: [
    {
      name: "Comply",
      description:
        "A CLI and MCP server that enforced team conventions on git diffs. I shipped it, nobody wanted it, so I stopped.",
      href: "https://github.com/Lameda12/Comply",
    },
  ],
};

export type Role = {
  org: string;
  role: string;
  // Leave empty to hide the date column for that row.
  period: string;
  detail: string;
  href?: string;
};

export const experience: Role[] = [
  {
    org: "Soup",
    role: "AI Engineer Intern",
    period: "Since Oct 2026",
    detail: "Open-source CLI for post-training language models: data checks, training, evals, release gates.",
    href: "https://trysoup.dev",
  },
  {
    org: "Freedom Bank Kazakhstan",
    role: "Network Systems Intern",
    period: "Summer 2026",
    detail: "Branch routing on Cisco IR1101 and IOS XE, Starlink WAN failover, IPsec VPN.",
  },
  {
    org: "Climate Smart Ventures (AETP)",
    role: "AI and Automation Intern",
    // TODO: add dates
    period: "",
    detail: "Automated investment memo drafting and built an n8n newsletter pipeline.",
  },
];

export const recognition = [
  "3rd place, MDA Space Mission Accepted hackathon (SatelLocator)",
  "NVIDIA 6G Developer Program grant",
];
