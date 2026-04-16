import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Alamedin Sabit (Lameda12) · Terminal",
  description:
    "CS @ Dalhousie · Halifax. TradeLock, Comply, and shipping weird software.",
  icons: {
    icon: "/profile.jpg",
    apple: "/profile.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jetbrainsMono.variable} bg-black antialiased`}>
        {children}
      </body>
    </html>
  );
}
