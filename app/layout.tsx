import type { Metadata, Viewport } from "next";
import { Archivo_Black, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const display = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mono",
  display: "swap",
});

// Vercel injects the real domain at build time; fall back to dev.
const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Alamedin Sabit · Brain Rot Portfolio",
  description:
    "CS @ Dalhousie, building TradeLock and Comply in Halifax. A portfolio that scrolls like a For You page.",
  icons: { icon: "/profile.jpg", apple: "/profile.jpg" },
  openGraph: {
    title: "Alamedin Sabit · Brain Rot Portfolio",
    description:
      "CS student turned founder. TradeLock, Comply, and shipping weird software.",
    type: "profile",
    images: ["/profile.jpg"],
  },
  twitter: {
    card: "summary",
    creator: "@amadisabit",
    title: "Alamedin Sabit · Brain Rot Portfolio",
    description: "A portfolio that scrolls like a For You page.",
  },
};

export const viewport: Viewport = {
  themeColor: "#05060a",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-strip="on">
      <body className={`${display.variable} ${mono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
