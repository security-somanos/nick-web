"use client"

import { useEffect, useRef } from "react"

interface Html5VideoPlayerProps {
  src: string
  poster?: string
  autoPlay?: boolean
  controls?: boolean
  loop?: boolean
  muted?: boolean
  subtitles?: Array<{ lang: string; label: string; src: string; default?: boolean }>
}

export default function Html5VideoPlayer({ src, poster, autoPlay = false, controls = true, loop = false, muted = false, subtitles = [] }: Html5VideoPlayerProps) {
  const ref = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    if (autoPlay && ref.current) {
      const tryPlay = async () => {
        try { await ref.current?.play() } catch { /* ignore */ }
      }
      tryPlay()
    }
  }, [autoPlay, src])

  return (
    <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden border border-white/10">
      <video
        ref={ref}
        src={src}
        poster={poster}
        controls={controls}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        playsInline
        className="w-full h-full object-contain bg-black"
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


