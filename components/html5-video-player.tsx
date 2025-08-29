"use client"

import { useEffect, useRef } from "react"
import { isHlsUrl } from "@/lib/utils"

interface Html5VideoPlayerProps {
  src: string
  poster?: string
  autoPlay?: boolean
  controls?: boolean
  loop?: boolean
  muted?: boolean
  subtitles?: Array<{ lang: string; label: string; src: string; default?: boolean }>
  aspect?: "video" | "square"
  fit?: "contain" | "cover"
  containerClassName?: string
  videoClassName?: string
}

export default function Html5VideoPlayer({ src, poster, autoPlay = false, controls = true, loop = false, muted = false, subtitles = [], aspect = "video", fit = "contain", containerClassName = "", videoClassName = "" }: Html5VideoPlayerProps) {
  const ref = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    if (autoPlay && ref.current) {
      const tryPlay = async () => {
        try { await ref.current?.play() } catch { /* ignore */ }
      }
      tryPlay()
    }
  }, [autoPlay, src])

  useEffect(() => {
    const video = ref.current
    if (!video) return
    if (!isHlsUrl(src)) return

    let hls: any
    const setupHls = async () => {
      // Safari (and some mobile browsers) support HLS natively
      const canUseNativeHls = video.canPlayType('application/vnd.apple.mpegURL') !== ''
      if (canUseNativeHls) {
        video.src = src
        return
      }
      try {
        const Hls = (await import('hls.js')).default
        if (Hls.isSupported()) {
          hls = new Hls({ enableWorker: true })
          hls.loadSource(src)
          hls.attachMedia(video)
        } else {
          // Fallback to direct src in case
          video.src = src
        }
      } catch {
        video.src = src
      }
    }

    setupHls()
    return () => {
      if (hls) {
        try { hls.destroy() } catch { /* ignore */ }
      }
    }
  }, [src])

  return (
    <div className={`relative w-full ${aspect === 'square' ? 'aspect-square' : 'aspect-video'} bg-black rounded-2xl overflow-hidden border border-white/10 ${containerClassName}`}>
      <video
        ref={ref}
        src={!isHlsUrl(src) ? src : undefined}
        poster={poster}
        controls={controls}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        playsInline
        className={`w-full h-full ${fit === 'cover' ? 'object-cover' : 'object-contain'} bg-black ${videoClassName}`}
      >
        {subtitles.map((track) => (
          <track
            key={`${track.lang}-${track.label}`}
            srcLang={track.lang}
            label={track.label}
            kind="subtitles"
            src={track.src}
            default={track.default}
          />
        ))}
      </video>
    </div>
  )
}


