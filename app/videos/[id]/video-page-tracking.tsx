"use client"

import { useEffect } from "react"
import { trackViewContent } from "@/lib/facebook-pixel"
import type { Video } from "@/lib/videos"

interface VideoPageTrackingProps {
  video: Video
}

export default function VideoPageTracking({ video }: VideoPageTrackingProps) {
  useEffect(() => {
    // Track ViewContent when video page is viewed
    const videoTitle = video.realTitle || video.subtitle || video.title || `Video ${video.id}`
    trackViewContent({
      content_name: videoTitle,
      content_category: "video",
      content_ids: [String(video.id)],
      content_type: "video",
    })
  }, [video])

  return null
}

