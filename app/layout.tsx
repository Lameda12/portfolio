import type { Metadata } from "next";
import { Literata, Martian_Mono } from "next/font/google";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { site } from "@/lib/site";
import "./globals.css";

const mono = Martian_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
});

const serif = Literata({
  subsets: ["latin"],
  variable: "--font-serif",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name}, AI engineer`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name}, AI engineer`,
    description: site.description,
    url: site.url,
  },
  twitter: { card: "summary", creator: "@amadisabit" },
  alternates: {
    canonical: "/",
    types: { "application/rss+xml": [{ url: "/blog/rss.xml", title: `${site.name}: writing` }] },
  },
  icons: { icon: "/profile.jpg", apple: "/profile.jpg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${mono.variable} ${serif.variable}`}>
      <body>
        <a className="skip-link mono" href="#content">
          Skip to content
        </a>
        <div className="shell">
          <Nav />
          <main id="content">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
