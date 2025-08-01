import type { Metadata } from 'next'
import { protoMono, lomoCopy } from '@/lib/fonts'
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
    <html lang="en" className={`${protoMono.variable} ${lomoCopy.variable}`}>
      <head>
        <style>{`
html {
  font-family: var(--font-proto-mono), monospace;
  --font-content: var(--font-proto-mono);
  --font-title: var(--font-lomo-copy);
}
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  )
}
