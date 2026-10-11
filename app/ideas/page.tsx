import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Ideas",
  description: "Things I want to build, or want someone to build.",
  alternates: { canonical: "/ideas" },
};

// Edit freely. `state` is one short phrase about where the idea stands.
const ideas: { name: string; pitch: string; state: string }[] = [
  {
    name: "Roomtone",
    pitch:
      "Scan your apartment with your phone's LiDAR, sample the noise floor in each room, and get told which corner is best for a call or a recording.",
    state: "sketched, not started",
  },
  {
    name: "Toi invitations",
    pitch:
      "Beautiful, customizable invitation sites for Kazakh weddings and toi celebrations, built for families first and event agencies second.",
    state: "researching",
  },
  {
    name: "A career agent you text",
    pitch:
      "An agent on Telegram that handles the routine parts of a job search: tracking applications, tailoring the boring bits, nudging you to follow up.",
    state: "building for myself",
  },
];

export default function IdeasPage() {
  const subject = encodeURIComponent("An idea from your list");
  return (
    <div className="page">
      <div className="page-inner">
        <h1>Ideas</h1>
        <p className="intro">
          Things I want to build, or want someone to build. If one of these is already your problem, or your
          company, <a href={`mailto:${site.email}?subject=${subject}`}>email me</a>. I&apos;d rather team up than
          start from zero.
        </p>
        <ul className="ideas">
          {ideas.map((idea) => (
            <li key={idea.name}>
              <h2>{idea.name}</h2>
              <p>{idea.pitch}</p>
              <p className="state">{idea.state}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
