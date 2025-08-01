import type { Metadata } from 'next'
import { protoMono, lomoCopy, clashDisplay } from '@/lib/fonts'
import './globals.css'

export const metadata: Metadata = {
  title: 'v0 App',
  description: 'Created with v0',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${protoMono.variable} ${lomoCopy.variable} ${clashDisplay.variable}`}>
      <head>
        <style>{`
html {
  font-family: var(--font-proto-mono), monospace;
  --font-content: var(--font-proto-mono);
  --font-title: var(--font-lomo-copy);
  --font-impact: var(--font-clash-display);
}
        `}</style>
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
