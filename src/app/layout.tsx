import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { Shell } from "@/components/providers/Shell";

const display = Geist({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const mono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const SITE = {
  name: "Nishant Shah",
  title: "Nishant Shah — AI Engineer",
  description:
    "AI, Machine Learning & Computer Vision engineer building production AI systems that think, reason, and solve real problems. Multi-agent frameworks, LLMs, and healthcare AI.",
  url: "https://nishantshah05.com.np",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.title,
    template: "%s — Nishant Shah",
  },
  description: SITE.description,
  keywords: [
    "Nishant Shah",
    "AI Engineer",
    "Machine Learning Engineer",
    "Computer Vision",
    "LLM Engineer",
    "Multi-Agent Systems",
    "Healthcare AI",
    "Full Stack AI Developer",
  ],
  authors: [{ name: "Nishant Shah" }],
  creator: "Nishant Shah",
  openGraph: {
    type: "website",
    url: SITE.url,
    title: SITE.title,
    description: SITE.description,
    siteName: SITE.name,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-dvh antialiased">
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
