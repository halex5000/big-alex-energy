import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Alex Hardman - Engineering Leader",
  description: "Engineering Leader. Systems Thinker. Platform Builder. I've built systems that power billions of customer interactions, and led teams that scale them with clarity, trust, and resilience.",
  authors: [{ name: "Alex Hardman" }],
  keywords: ["engineering", "leadership", "systems", "platform", "software", "architecture"],
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" }
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }
    ],
    other: [
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" }
    ]
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Alex Hardman - Engineering Leader",
    description: "Engineering Leader. Systems Thinker. Platform Builder. I've built systems that power billions of customer interactions, and led teams that scale them with clarity, trust, and resilience.",
    type: "website",
    url: "https://halex9000.dev",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alex Hardman - Engineering Leader",
    description: "Engineering Leader. Systems Thinker. Platform Builder. I've built systems that power billions of customer interactions, and led teams that scale them with clarity, trust, and resilience.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
