import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How I use AI",
  description: "What I hand to AI, what I don't, and why the rules live in code.",
  alternates: { canonical: "/ai" },
};

// Draft. Rewrite in your own words before merging.
export default function AiPage() {
  return (
    <div className="page">
      <div className="page-inner">
        <h1>How I use AI</h1>
        <p className="intro">What I hand to models, what I keep, and the rule that shows up in everything I build.</p>

        <div className="prose">
          <h2>Rules belong in code, not prompts</h2>
          <p>
            A prompt that says &quot;don&apos;t do X&quot; is a request. A check that throws the output away when it
            does X is a rule. In call_human the tutor is told never to write your code, but the thing that actually
            stops it is a server-side scan that discards any reply containing code you didn&apos;t write. Orderable
            reports an unlisted allergen as unknown, never as safe. OpenPango blocks a customer email that cites an
            ETA the carrier never gave. Models are good at the work. They shouldn&apos;t be the last line of defense.
          </p>

          <h2>What I hand off</h2>
          <ul>
            <li>Scaffolding, boilerplate, and the fifth version of a form I&apos;ve already built four times.</li>
            <li>First drafts of tests, docs, and migrations, which I then read line by line.</li>
            <li>Searching unfamiliar codebases and docs to find where to start.</li>
          </ul>

          <h2>What I keep</h2>
          <ul>
            <li>Learning fundamentals. If I can&apos;t write it without help, I don&apos;t understand it yet.</li>
            <li>Decisions about what to build, what to cut, and what to stop.</li>
            <li>Anything I&apos;d have to defend in an interview, an exam, or a postmortem.</li>
          </ul>

          <h2>Tools</h2>
          <p>
            Claude Code and the Claude API for most building, OpenAI-compatible APIs and Groq where speed matters, and
            local models through Ollama and LM Studio when I want to see what runs on my own hardware.
          </p>
        </div>
      </div>
    </div>
  );
}
