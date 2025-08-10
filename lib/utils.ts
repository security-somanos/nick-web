import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// URL helpers for CDN resolution
export function isAbsoluteUrl(url?: string): boolean {
  if (!url) return false
  return /^(https?:)?\/\//i.test(url)
}

export function withBase(path: string, base?: string): string {
  if (!path) return path
  if (isAbsoluteUrl(path) || !base) return path
  const normalizedBase = base.replace(/\/$/, "")
  const normalizedPath = path.replace(/^\//, "")
  return `${normalizedBase}/${normalizedPath}`
}

export type CdnKind = "images" | "videos"

export function getCdnBase(kind: CdnKind): string | undefined {
  if (kind === "images") {
    return process.env.NEXT_PUBLIC_CDN_IMAGES_BASE || process.env.NEXT_PUBLIC_CDN_BASE
  }
  return process.env.NEXT_PUBLIC_CDN_VIDEOS_BASE || process.env.NEXT_PUBLIC_CDN_BASE
}

export function buildCdnUrl(path: string, kind: CdnKind = "videos"): string {
  return withBase(path, getCdnBase(kind))
}

export function computePreviewUrl(params: { previewUrl?: string; videoSrc?: string }): string {
  const { previewUrl, videoSrc } = params
  if (previewUrl) {
    return buildCdnUrl(previewUrl, "images")
  }
  const videoName = (videoSrc || "").split("/").pop()?.replace(".mp4", "") || ""
  return buildCdnUrl(`/images/conferences/preview-${videoName}.jpg`, "images")
}

export function isHlsUrl(url?: string): boolean {
  if (!url) return false
  return /\.m3u8(\?|$)/i.test(url)
}