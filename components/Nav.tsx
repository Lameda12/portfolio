"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/blog", label: "writing" },
  { href: "/ideas", label: "ideas" },
  { href: "/ai", label: "ai" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <nav className="nav" aria-label="Main">
      <Link href="/" className="home" aria-current={pathname === "/" ? "page" : undefined}>
        ~/alamedin
      </Link>
      <ul>
        {items.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <li key={item.href}>
              <Link href={item.href} aria-current={active ? "page" : undefined}>
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
