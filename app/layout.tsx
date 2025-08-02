import type { Metadata } from 'next'
import { protoMono, lomoCopy, clashDisplay } from '@/lib/fonts'
import './globals.css'

export const metadata: Metadata = {
  title: 'Nick Spanos - Bitcoin Pioneer & Bitcoin Center NYC Founder',
  description: 'Nick Spanos is a Bitcoin pioneer, inventor, serial entrepreneur, and founder of Bitcoin Center NYC. Discover his journey in cryptocurrency, blockchain innovation, and Bitcoin advocacy.',
  keywords: [
    'Nick Spanos',
    'Bitcoin',
    'Bitcoin Center NYC',
    'Cryptocurrency',
    'Blockchain',
    'Bitcoin Pioneer',
    'Bitcoin Entrepreneur',
    'Bitcoin Advocate',
    'Cryptocurrency Speaker',
    'Bitcoin Conference',
    'Blockchain Innovation',
    'Bitcoin Education',
    'Cryptocurrency Expert'
  ],
  authors: [{ name: 'Nick Spanos' }],
  creator: 'Nick Spanos',
  publisher: 'Nick Spanos',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://nickspanos.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Nick Spanos - Bitcoin Pioneer & Bitcoin Center NYC Founder',
    description: 'Nick Spanos is a Bitcoin pioneer, inventor, serial entrepreneur, and founder of Bitcoin Center NYC. Discover his journey in cryptocurrency, blockchain innovation, and Bitcoin advocacy.',
    url: 'https://nickspanos.com',
    siteName: 'Nick Spanos',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Nick Spanos - Bitcoin Pioneer',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nick Spanos - Bitcoin Pioneer & Bitcoin Center NYC Founder',
    description: 'Nick Spanos is a Bitcoin pioneer, inventor, serial entrepreneur, and founder of Bitcoin Center NYC.',
    images: ['/twitter-image.jpg'],
    creator: '@nickspanos',
    site: '@nickspanos',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  category: 'technology',
  classification: 'Bitcoin and Cryptocurrency',
  other: {
    'theme-color': '#000000',
    'color-scheme': 'dark',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': 'Nick Spanos',
    'application-name': 'Nick Spanos',
    'msapplication-TileColor': '#000000',
    'msapplication-config': '/browserconfig.xml',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${protoMono.variable} ${lomoCopy.variable} ${clashDisplay.variable}`}>
      <head>
        {/* Favicon - Using existing favicon files */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon-96x96.png" type="image/png" sizes="96x96" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        <style>{`
html {
  font-family: var(--font-proto-mono), monospace;
  --font-content: var(--font-proto-mono);
  --font-title: var(--font-lomo-copy);
  --font-impact: var(--font-clash-display);
}
        `}</style>
      </head>
      <body className="overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
