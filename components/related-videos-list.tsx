"use client"

import { useMemo, useState } from "react"
import type { VideoBox } from "@/lib/videos"

interface RelatedVideosListProps {
  items: VideoBox[]
  initialVisible?: number
  title?: string
}

export default function RelatedVideosList({ items, initialVisible = 8, title = "Related" }: RelatedVideosListProps) {
  const [expanded, setExpanded] = useState(false)

  const visibleItems = useMemo(() => {
    if (expanded) return items
    return items.slice(0, initialVisible)
  }, [items, expanded, initialVisible])

  const getPreviewUrl = (videoSrc: string) => {
    const videoName = videoSrc.split('/').pop()?.replace('.mp4', '') || ''
    return `/images/conferences/preview-${videoName}.jpg`
  }

  const canSeeMore = !expanded && items.length > visibleItems.length

  return (
    <div className="w-full">
      <h3 className="text-sm text-gray-400 mb-3">{title}</h3>
      <div className="space-y-3">
        {visibleItems.map((v) => (
          <a
            key={v.id}
            href={`/videos/${v.id}`}
            className="group flex gap-3 w-full"
          >
            <div className="relative w-44 aspect-video rounded-lg overflow-hidden border border-white/10 bg-black">
              <img
                src={getPreviewUrl(v.videoSrc)}
                alt={`${v.title} preview`}
                className="absolute inset-0 w-full h-full object-cover object-center brightness-75 transition-transform duration-300 group-hover:scale-[1.02]"
                loading="lazy"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold line-clamp-2 group-hover:underline">
                {v.title}
              </div>
              <div className="text-xs text-gray-400 mt-1 line-clamp-2">
                {v.subtitle}
              </div>
            </div>
          </a>
        ))}
      </div>

      {canSeeMore && (
        <div className="mt-4">
          <button
            className="cursor-pointer text-sm px-3 py-1.5 rounded-full border border-white/20 hover:bg-white/10"
            onClick={() => setExpanded(true)}
          >
            See more
          </button>
        </div>
      )}
    </div>
  )
}


