"use client"

import { useMemo, useState } from "react"
import type { VideoBox } from "@/lib/videos"
import { Button } from "@/components/ui/button"
import { Share2Icon } from "lucide-react"

interface VideoDescriptionProps {
  video: VideoBox
}

function formatPublishedDate(dateString?: string): string | null {
  if (!dateString) return null
  try {
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return null
    // Example: "29 jul 2025"
    return new Intl.DateTimeFormat("es-ES", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
      .format(date)
      .toLowerCase()
  } catch {
    return null
  }
}

export default function VideoDescription({ video }: VideoDescriptionProps) {
  const [expanded, setExpanded] = useState(false)
  const [copied, setCopied] = useState(false)

  const publishedDate = useMemo(() => formatPublishedDate(video.publishedAt), [video.publishedAt])
  const location = useMemo(() => (video.location && video.location.trim().length > 0 ? video.location : null), [video.location])

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation()
    const shareDate = video.publishedAt
      ? new Intl.DateTimeFormat("en-US", { day: "numeric", month: "short", year: "numeric" }).format(new Date(video.publishedAt))
      : null
    const dateForShare = shareDate ? ` · ${shareDate}` : ""
    const locForShare = location ? ` · ${location}` : ""
    const baseTitle = video.subtleText || video.title
    // Build a more compelling share text
    const textMsg = `${baseTitle}${locForShare}${dateForShare}\n\n${video.subtitle}\n\nWatch here:`
    const shareData = {
      title: baseTitle,
      text: textMsg,
      url: typeof window !== "undefined" ? window.location.href : undefined,
    }
    const ua = typeof navigator !== "undefined" ? navigator.userAgent || "" : ""
    const isMobile = /Mobi|Android|iPhone|iPad|iPod|Mobile|Tablet/i.test(ua)
    try {
      // Prefer Web Share API only on mobile
      if (isMobile && navigator.share) {
        await navigator.share(shareData)
        return
      }
    } catch {
      // fallthrough to clipboard
    }

    try {
      if (shareData.url && navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
        await navigator.clipboard.writeText(`${textMsg}\n${shareData.url}`)
      } else if (shareData.url) {
        // Legacy fallback for iOS/Safari: hidden textarea + execCommand
        const textarea = document.createElement("textarea")
        textarea.value = `${textMsg}\n${shareData.url}`
        textarea.setAttribute("readonly", "")
        textarea.style.position = "absolute"
        textarea.style.left = "-9999px"
        document.body.appendChild(textarea)
        textarea.select()
        try { document.execCommand("copy") } catch { /* ignore */ }
        document.body.removeChild(textarea)
      }
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      // no-op
    }
  }

  const hasDescription = Boolean(video.description)

  if (!hasDescription && !publishedDate && !location) return null

  return (
    <section
      className="w-full rounded-xl border border-white/10 p-4 bg-white/5 cursor-pointer"
      onClick={() => {
        if (!expanded) setExpanded(true)
      }}
    >
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-3 text-xs text-gray-300">
          {(publishedDate || location) && (
            <>
              {publishedDate && <span className="whitespace-nowrap">{publishedDate}</span>}
              {publishedDate && location && (
                <span className="w-1 h-1 rounded-full bg-gray-500/70" aria-hidden="true" />
              )}
              {location && <span className="font-medium text-gray-200">{location}</span>}
            </>
          )}
        </div>
        <Button
          type="button"
          variant="outlineTech"
          size="sm"
          onClick={handleShare}
          className="min-w-[110px]"
        >
          <Share2Icon className="size-4" />
          {copied ? "Copied" : "Share"}
        </Button>
      </div>

      {hasDescription && (
        <div className="mt-3">
          <div className={expanded ? "text-sm text-gray-200 whitespace-pre-line" : "text-sm text-gray-200 line-clamp-3 whitespace-pre-line"}>
            {video.description}
          </div>
          <div className="mt-2 flex items-center gap-3">
            <button
              type="button"
              className="cursor-pointer text-xs text-gray-300 underline underline-offset-2 hover:text-gray-200"
              onClick={(e) => {
                e.stopPropagation()
                setExpanded(v => !v)
              }}
            >
              {expanded ? "Mostrar menos" : "Mostrar más"}
            </button>
            {expanded && video.link && (
              <a
                href={video.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-gray-300 underline underline-offset-2 hover:text-gray-200"
                onClick={(e) => e.stopPropagation()}
              >
                Abrir enlace externo
              </a>
            )}
          </div>
        </div>
      )}
    </section>
  )
}


