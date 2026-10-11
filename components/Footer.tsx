import { links } from "@/lib/site";

export function Footer() {
  return (
    <footer className="footer">
      <ul>
        {links.map((l) => (
          <li key={l.label}>
            <a href={l.href} {...(l.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
              {l.label}
            </a>
          </li>
        ))}
        <li>
          <a href="/blog/rss.xml">rss</a>
        </li>
      </ul>
      <p>
        EOF. Built in Halifax.
        <span className="cursor" aria-hidden />
      </p>
    </footer>
  );
}
