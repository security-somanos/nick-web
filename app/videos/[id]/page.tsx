import Link from "next/link"
import { notFound } from "next/navigation"
import Html5VideoPlayer from "@/components/html5-video-player"
import RelatedVideosList from "@/components/related-videos-list"
import { videos } from "@/lib/videos"
import type { SubtitleTrack } from "@/lib/videos"
import { buildCdnUrl, computePreviewUrl, withBase } from "@/lib/utils"

export function generateStaticParams() {
  return videos.map(v => ({ id: String(v.id) }))
}

export default function VideoDetailPage({ params }: { params: { id: string } }) {
  const id = Number(params.id)
  const video = videos.find(v => v.id === id)

  if (!video) {
    notFound()
  }

  const poster = computePreviewUrl({ previewUrl: video!.previewUrl, videoSrc: video!.videoSrc })
  const base = process.env.NEXT_PUBLIC_CDN_VIDEOS_BASE || process.env.NEXT_PUBLIC_BLOB_BASE_URL || process.env.BLOB_BASE_URL || ""
  const blobRelative = video!.blobUrl?.replace(/^\/+/, "") || ""
  const blobSrc = blobRelative ? withBase(`/${blobRelative}`, base) : ""
  const src = video!.streamUrl || blobSrc || buildCdnUrl(video!.videoSrc, "videos")

  const related = videos.filter(v => v.id !== video!.id).slice(0, 8)

  return (
    <div className="min-h-screen text-white">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
        <div className="lg:col-span-2 space-y-4">
          <Html5VideoPlayer src={src} poster={poster} controls autoPlay subtitles={video!.subtitles?.map((t: SubtitleTrack) => ({ ...t, src: buildCdnUrl(t.src, "videos") }))} />
          <div className="space-y-1">
            <h2 className="text-2xl font-impact tracking-widest">{video!.subtleText}</h2>
            <p className="text-gray-300 text-sm">{video!.subtitle}</p>
            {video!.link && (
              <a className="text-xs text-gray-400 underline" href={video!.link} target="_blank" rel="noopener noreferrer">Open external link</a>
            )}
          </div>
        </div>
        <div className="lg:col-span-1">
          <RelatedVideosList items={related} />
        </div>
      </div>
      <div className="px-6 pb-6">
        <Link href="/videos" className="cursor-pointer text-sm text-gray-300 hover:underline">← Back to Videos</Link>
      </div>
    </div>
  )
}

