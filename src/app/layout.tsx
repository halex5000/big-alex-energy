import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { Navigation } from '@/components/ui/navigation';
import { ConditionalThemeToggle } from '@/components/ui/conditional-theme-toggle';

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
    'From serverless backbones to global experimentation platforms, I build systems that scale and teams that thrive.',
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
    title: 'Big Alex Energy - Alex Hardman',
    description:
      'From serverless backbones to global experimentation platforms, I build systems that scale and teams that thrive.',
    type: 'website',
    url: 'https://bigalexenergy.com',
    images: [
      {
        url: '/og-images/optimized-og.png',
        width: 1200,
        height: 630,
        alt: 'Screenshot of CLI terminal on bigalexenergy.com',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Big Alex Energy - Alex Hardman',
    description:
      'From serverless backbones to global experimentation platforms, I build systems that scale and teams that thrive.',
    images: ['/og-images/optimized-og.png'],
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
        {/* Global Navigation */}
        <Navigation />

        {/* Global Theme Toggle - hidden on CLI page */}
        <ConditionalThemeToggle />

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

        {/* UTM Parameter Tracking */}
        <Script id="utm-tracking">
          {`
            // Track UTM parameters on page load
            (function() {
              const urlParams = new URLSearchParams(window.location.search);
              const utmParams = {};
              ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(param => {
                const value = urlParams.get(param);
                if (value) utmParams[param] = value;
              });
              
              if (Object.keys(utmParams).length > 0 && window.plausible) {
                window.plausible('UTM Parameters Detected', { props: utmParams });
              }
            })();
          `}
        </Script>
      </body>
    </html>
  );
}
