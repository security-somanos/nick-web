"use client"

import { useEffect, useRef, useState } from "react"
import { isHlsUrl } from "@/lib/utils"
import { trackVideoView, trackVideoPlay, trackVideoProgress } from "@/lib/facebook-pixel"

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
  videoId?: string
  videoTitle?: string
}

export default function Html5VideoPlayer({ src, poster, autoPlay = false, controls = true, loop = false, muted = false, subtitles = [], aspect = "video", fit = "contain", containerClassName = "", videoClassName = "", videoId, videoTitle }: Html5VideoPlayerProps) {
  const ref = useRef<HTMLVideoElement | null>(null)
  const [hasTrackedView, setHasTrackedView] = useState(false)
  const [hasTrackedPlay, setHasTrackedPlay] = useState(false)
  const [progressTracked, setProgressTracked] = useState(new Set<number>())

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
    if (!video || !videoId) return

    // Track video view when video starts playing
    const handlePlay = () => {
      if (!hasTrackedView) {
        setHasTrackedView(true)
        trackVideoView({
          video_id: videoId,
          video_title: videoTitle,
          video_type: "video/mp4",
          video_duration: video.duration || undefined,
          content_category: "video",
        })
      }
      
      if (!hasTrackedPlay) {
        setHasTrackedPlay(true)
        trackVideoPlay({
          video_id: videoId,
          video_title: videoTitle,
          video_type: "video/mp4",
        })
      }
    }

    // Track video progress
    const handleTimeUpdate = () => {
      if (!video.duration) return
      const currentProgress = (video.currentTime / video.duration) * 100
      const milestones = [25, 50, 75, 100]
      
      milestones.forEach((milestone) => {
        if (currentProgress >= milestone && !progressTracked.has(milestone)) {
          const newProgressTracked = new Set(progressTracked)
          newProgressTracked.add(milestone)
          setProgressTracked(newProgressTracked)
          
          trackVideoProgress({
            video_id: videoId,
            video_title: videoTitle,
            progress_percentage: milestone,
            video_duration: video.duration,
          })
        }
      })
    }

    video.addEventListener("play", handlePlay)
    video.addEventListener("timeupdate", handleTimeUpdate)

    return () => {
      video.removeEventListener("play", handlePlay)
      video.removeEventListener("timeupdate", handleTimeUpdate)
    }
  }, [videoId, videoTitle, hasTrackedView, hasTrackedPlay, progressTracked])

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


