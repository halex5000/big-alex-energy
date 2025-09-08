import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://bigalexenergy.com'),
  title: 'Big Alex Energy – Alex Hardman',
  description:
    'Engineering leader. Infra architect. CLI-powered personal site.',
  authors: [{ name: 'Alex Hardman' }],
  keywords: [
    'Alex Hardman',
    'Engineering Leader',
    'halex9000',
    'Resume',
    'CLI Portfolio',
    'Infrastructure Architect',
  ],
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/favicon-180x180.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    title: 'Big Alex Energy – Alex Hardman',
    description:
      'I turned my resume into a terminal. Now you can run `cat resume`.',
    type: 'website',
    url: 'https://bigalexenergy.com',
    images: [
      {
        url: '/og-images/bae-og-v2.png',
        width: 1200,
        height: 630,
        alt: 'Screenshot of CLI terminal on bigalexenergy.com',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Big Alex Energy – Alex Hardman',
    description: 'You can run `download resume` on my site. CLI mode is live.',
    images: ['/og-images/bae-og-v2.png'],
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
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

        {/* Plausible Analytics */}
        <Script
          defer
          data-domain="bigalexenergy.com"
          src="https://plausible.io/js/script.hash.outbound-links.js"
        />
        <Script id="plausible-init">
          {`window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }`}
        </Script>
      </body>
    </html>
  );
}
