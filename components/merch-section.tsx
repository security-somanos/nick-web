"use client"

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

export default function MerchSection() {
  return (
    <section className="py-16 px-0">
      <div className="w-full">
        <div className="flex items-end justify-between mb-8 px-3 md:px-4 lg:px-6">
          <div>
            <Badge variant="outline" className="border-gray-400 text-gray-300 mb-3">Merch</Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-title text-white leading-tight">
              Official Drops
            </h2>
            <p className="text-gray-400 text-sm md:text-base mt-2 font-content">
              Exclusive pieces. Launching soon.
            </p>
          </div>
        </div>

        {/* Grid: 4 columns desktop, 2 below 1200px, 1 on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6 px-2 md:px-4 lg:px-6">
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
                <div className="sm:hidden">
                  <Badge variant="outline" className="text-gray-300 border-gray-500/40">Soon</Badge>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Centered CTA below grid, styled like "See more" */}
        <div className="mt-16 flex justify-center px-3 md:px-4 lg:px-6">
          <a
            href="#"
            className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-400 text-gray-200 hover:bg-gray-500/10 hover:border-gray-200 transition-colors text-sm font-mono"
          >
            Coming soon
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}


