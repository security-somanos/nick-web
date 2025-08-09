"use client"

import { VideosLayoutProvider } from "@/components/videos-layout-context"
import VideosShell from "@/components/videos-shell"

export default function VideosLayout({ children }: { children: React.ReactNode }) {
  return (
    <VideosLayoutProvider>
      <VideosShell>{children}</VideosShell>
    </VideosLayoutProvider>
  )
}


