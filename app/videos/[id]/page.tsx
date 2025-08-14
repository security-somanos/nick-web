import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Html5VideoPlayer from "@/components/html5-video-player"
import RelatedVideosList from "@/components/related-videos-list"
import { videos } from "@/lib/videos"
import type { SubtitleTrack } from "@/lib/videos"
import { buildCdnUrl, computePreviewUrl, withBase } from "@/lib/utils"
import VideoDescription from "@/components/video-description"

export function generateStaticParams() {
  return videos.map(v => ({ id: String(v.id) }))
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const id = Number(params.id)
  const video = videos.find(v => v.id === id)
  if (!video) return {}

  const poster = computePreviewUrl({ previewUrl: video.previewUrl, videoSrc: video.videoSrc })
  const pagePath = `/videos/${id}`
  const siteFromEnv = process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_BASE_URL || process.env.VERCEL_URL || ""
  const site = siteFromEnv ? (siteFromEnv.startsWith("http") ? siteFromEnv : `https://${siteFromEnv}`) : ""
  const url = site ? `${site}${pagePath}` : pagePath

  const titleMain = video.subtleText || video.title || video.subtitle
  const dateStr = video.publishedAt ? new Intl.DateTimeFormat("es-ES", { day: "numeric", month: "short", year: "numeric" }).format(new Date(video.publishedAt)).toLowerCase() : undefined
  const locationAndDate = [video.location, dateStr].filter(Boolean).join(" · ")
  const title = locationAndDate ? `${titleMain} — ${locationAndDate}` : titleMain
  const description = video.description || video.subtitle

  const videoOgUrl = video.streamUrl || video.videoSrc

  // Extract hashtags from description to use as keywords
  const hashtagRegex = /(^|\s)#([A-Za-z0-9_]+)/g
  const tagSet = new Set<string>()
  let match: RegExpExecArray | null
  if (video.description) {
    while ((match = hashtagRegex.exec(video.description)) !== null) {
      const tag = match[2]
      if (tag) tagSet.add(tag)
    }
  }
  const keywords = Array.from(tagSet)

  return {
    title,
    description,
    keywords: keywords.length ? keywords : undefined,
    authors: video.author ? [{ name: video.author }] : undefined,
    alternates: { canonical: url },
    openGraph: {
      type: "video.other",
      url,
      siteName: "Nick Spanos",
      title,
      description,
      images: poster ? [{ url: poster }] : undefined,
      videos: videoOgUrl ? [{ url: videoOgUrl }] : undefined,
      locale: "es_ES",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: poster ? [poster] : undefined,
    },
  }
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
            <h2 className="text-2xl font-impact tracking-widest">{video!.realTitle || video.subtitle}</h2>
            <p className="text-gray-300 text-sm">{video!.subtitle}</p>
          </div>
          <VideoDescription video={video!} />
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

