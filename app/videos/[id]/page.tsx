"use client"

import { useMemo } from "react"
import { useParams, useRouter } from "next/navigation"
import Html5VideoPlayer from "@/components/html5-video-player"
import { videos } from "@/lib/videos"
import RelatedVideosList from "@/components/related-videos-list"

export default function VideoDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = Number(params?.id)
  const video = useMemo(() => videos.find(v => v.id === id), [id])

  if (!video) {
    return (
      <div className="min-h-screen text-white p-6">
        <button className="cursor-pointer text-sm text-gray-300 hover:underline" onClick={() => router.push('/videos')}>← Back to Videos</button>
        <h1 className="text-2xl mt-4">Video not found</h1>
      </div>
    )
  }

  const poster = video.previewUrl || `/images/conferences/preview-${video.videoSrc.split('/').pop()?.replace('.mp4','')}.jpg`
  const base = process.env.NEXT_PUBLIC_BLOB_BASE_URL || process.env.BLOB_BASE_URL || ""
  const blobRelative = video.blobUrl?.replace(/^\/+/, "") || ""
  debugger
  const blobSrc = blobRelative ? `${base.replace(/\/$/, "")}/${blobRelative}` : ""
  const src = blobSrc || video.videoSrc
  console.log(src)

  const related = videos.filter(v => v.id !== video.id).slice(0, 8)

  return (
    <div className="min-h-screen text-white">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
        <div className="lg:col-span-2 space-y-4">
          <Html5VideoPlayer src={src} poster={poster} controls autoPlay subtitles={video.subtitles} />
          <div className="space-y-1">
            <h2 className="text-2xl font-impact tracking-widest">{video.title}</h2>
            <p className="text-gray-300 text-sm">{video.subtitle}</p>
            {video.link && (
              <a className="text-xs text-gray-400 underline" href={video.link} target="_blank" rel="noopener noreferrer">Open external link</a>
            )}
          </div>
        </div>
        <div className="lg:col-span-1">
          <RelatedVideosList items={related} />
        </div>
      </div>
    </div>
  )
}


