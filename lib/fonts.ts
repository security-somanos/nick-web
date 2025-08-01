import localFont from 'next/font/local'

// ProtoMono for content and general text
export const protoMono = localFont({
  src: '../public/fonts/ProtoMono-Medium.woff2',
  variable: '--font-proto-mono',
  display: 'swap',
})

// LomoCopy for titles
export const lomoCopy = localFont({
  src: '../public/fonts/LomoCopy LT Std Regular.otf',
  variable: '--font-lomo-copy',
  display: 'swap',
})

// ClashDisplay for impact statements
export const clashDisplay = localFont({
  src: '../public/fonts/ClashDisplay-Medium.woff2',
  variable: '--font-clash-display',
  display: 'swap',
})

// Export font variables for use in CSS
export const fontVariables = {
  '--font-proto-mono': protoMono.variable,
  '--font-lomo-copy': lomoCopy.variable,
  '--font-clash-display': clashDisplay.variable,
} 