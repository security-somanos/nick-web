"use client"

import { ShoppingBag } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import dynamic from "next/dynamic"

// Lazy load the Html5VideoPlayer to avoid heavy initial hydration
const Html5VideoPlayer = dynamic(() => import("@/components/html5-video-player"), {
  ssr: false,
})

type MerchItem = {
  id: string
  title: string
  videoSrc: string
  poster?: string
}

const merchItems: MerchItem[] = [
  { id: "cap", title: "Cap", videoSrc: "/videos/cap.mp4" },
  { id: "poster", title: "Poster", videoSrc: "/videos/poster.mp4" },
  { id: "token", title: "Token", videoSrc: "/videos/token.mp4" },
  { id: "hoodie", title: "Hoodie", videoSrc: "/videos/hoodie.mp4" },
]

export function ProjectsSection() {
  return (
    <section id="projects" className="space-y-8">
      <div className="flex items-center gap-3">
        <ShoppingBag className="w-6 h-6" />
        <h2 className="text-2xl font-bold">Merchandising</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {merchItems.map((item) => (
          <div key={item.id} className="group">
            <div className="shadow-md shadow-black/50 border border-white/10 rounded-12 overflow-hidden bg-black">
              <div className="relative">
                <Html5VideoPlayer
                  src={item.videoSrc}
                  poster={item.poster}
                  autoPlay
                  muted
                  loop
                  controls={false}
                  aspect="square"
                  fit="cover"
                />
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/40 to-transparent opacity-70" />
              </div>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <div className="text-white font-content text-sm md:text-base">{item.title}</div>
              <Badge variant="outline" className="text-gray-300 border-gray-500/40">Soon</Badge>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}


