"use client"

import { useVideosLayout } from "@/components/videos-layout-context"
import VideosGrid from "@/components/videos-grid"

const categoriesFallback = ["All", "Conferences", "Interviews", "Bitcoin", "Blockchain", "Web3", "Politics"]

export default function VideosPage() {
  const { filteredVideos, categories, activeCategory, setActiveCategory } = useVideosLayout()
  const cats = categories ?? categoriesFallback

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


