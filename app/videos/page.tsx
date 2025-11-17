"use client"

import { useEffect } from "react"
import { useVideosLayout } from "@/components/videos-layout-context"
import VideosGrid from "@/components/videos-grid"
import { trackViewContent } from "@/lib/facebook-pixel"

const categoriesFallback = ["All", "Conferences", "Interviews", "Bitcoin", "Blockchain", "Web3", "Politics"]

export default function VideosPage() {
  const { filteredVideos, categories, activeCategory, setActiveCategory } = useVideosLayout()
  const cats = categories ?? categoriesFallback

  // Track page view
  useEffect(() => {
    trackViewContent({
      content_name: "Videos Page",
      content_category: "videos",
      content_type: "page",
    })
  }, [])

  return (
    <div className="min-h-screen text-white">
      <div className="flex">
        <main className="flex-1 md:ml-0 ml-0">
          <VideosGrid items={filteredVideos} />
        </main>
      </div>
    </div>
  )
}


