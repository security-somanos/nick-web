"use client"

import { useEffect, useRef, useState } from "react"
import { ThumbsUp, ThumbsDown, Share2, Play } from "lucide-react"
import type { Reel as ReelData } from "@/lib/reels"
import { isHlsUrl } from "@/lib/utils"

export default function ReelView({ reel, index, onActive, autoSound = false }: { reel: ReelData; index?: number; onActive?: (idx: number) => void; autoSound?: boolean }) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [isActive, setIsActive] = useState(false)
  const [isMuted, setIsMuted] = useState(!autoSound)
  const [liked, setLiked] = useState(false)
  const [disliked, setDisliked] = useState(false)
  const [likeCount, setLikeCount] = useState(reel.likes)
  const [dislikeCount, setDislikeCount] = useState(reel.dislikes)
  const [copied, setCopied] = useState(false)
  const [showPlayOverlay, setShowPlayOverlay] = useState(false)
  const userInteractedRef = useRef(false)
  const attemptedAutoStartRef = useRef(false)

  async function playWithMute(desiredMuted: boolean) {
    const v = videoRef.current
    if (!v) return
    v.muted = desiredMuted
    try { await v.play() } catch { /* ignore */ }
  }

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        const active = entry.isIntersecting && entry.intersectionRatio > 0.6
        setIsActive(active)
        if (active && typeof index === 'number') {
          onActive?.(index)
        }
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const v = videoRef.current
    if (!v) return

    let didAttachListeners = false
    const tryPlay = async () => {
      try {
        if (userInteractedRef.current) {
          await playWithMute(isMuted)
          return
        }
        if (!attemptedAutoStartRef.current) {
          attemptedAutoStartRef.current = true
          if (autoSound) {
            try {
              await playWithMute(false)
              setIsMuted(false)
              return
            } catch {
              await playWithMute(true)
              setIsMuted(true)
              return
            }
          } else {
            await playWithMute(true)
            setIsMuted(true)
            return
          }
        }
        v.muted = isMuted
      } catch {
        // ignore
      }
    }

    if (isActive) {
      // If the video is not ready yet, wait for it to become playable
      if (v.readyState < 2) {
        const onReady = () => {
          v.removeEventListener('canplay', onReady)
          v.removeEventListener('loadeddata', onReady)
          tryPlay()
        }
        v.addEventListener('canplay', onReady, { once: true } as any)
        v.addEventListener('loadeddata', onReady, { once: true } as any)
        didAttachListeners = true
      } else {
        tryPlay()
      }
    } else {
      try { v.pause() } catch { /* noop */ }
    }

    return () => {
      if (didAttachListeners) {
        try {
          v.removeEventListener('canplay', tryPlay as any)
          v.removeEventListener('loadeddata', tryPlay as any)
        } catch {
          // ignore
        }
      }
    }
  }, [isActive, autoSound, isMuted])

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = isMuted
  }, [isMuted])

  // HLS setup for Bunny.net or any .m3u8 source
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Only prepare video source when this reel is active in view
    if (!isActive) {
      try {
        // Stop and clear source to prevent background playback
        video.pause?.()
        video.removeAttribute('src')
        video.load?.()
      } catch {
        // ignore
      }
      return
    }

    if (!isHlsUrl(reel.videoUrl)) {
      video.src = reel.videoUrl
      return
    }

    let hls: any
    const setup = async () => {
      const canUseNativeHls = video.canPlayType('application/vnd.apple.mpegURL') !== ''
      if (canUseNativeHls) {
        video.src = reel.videoUrl
        return
      }
      try {
        const Hls = (await import('hls.js')).default
        if (Hls.isSupported()) {
          hls = new Hls({ enableWorker: true })
          hls.loadSource(reel.videoUrl)
          hls.attachMedia(video)
        } else {
          video.src = reel.videoUrl
        }
      } catch {
        video.src = reel.videoUrl
      }
    }
    setup()
    return () => {
      try { hls?.destroy?.() } catch { /* ignore */ }
      try {
        video.pause?.()
        video.removeAttribute('src')
        video.load?.()
      } catch {
        // ignore
      }
    }
  }, [reel.videoUrl, isActive])

  function toggleLike() {
    if (liked) {
      setLiked(false)
      setLikeCount((c) => Math.max(0, c - 1))
      return
    }
    setLiked(true)
    setLikeCount((c) => c + 1)
    if (disliked) {
      setDisliked(false)
      setDislikeCount((c) => Math.max(0, c - 1))
    }
  }

  function toggleDislike() {
    if (disliked) {
      setDisliked(false)
      setDislikeCount((c) => Math.max(0, c - 1))
      return
    }
    setDisliked(true)
    setDislikeCount((c) => c + 1)
    if (liked) {
      setLiked(false)
      setLikeCount((c) => Math.max(0, c - 1))
    }
  }

  async function handleShare() {
    const shareUrl = typeof window !== "undefined" ? `${window.location.origin}/videos/shorts?id=${reel.id}` : ""
    if (typeof navigator !== "undefined" && (navigator as any).share) {
      try {
        await (navigator as any).share({ title: reel.title, text: reel.description, url: shareUrl })
        return
      } catch {
        // ignore
      }
    }
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // ignore
    }
  }

  async function handleVideoClick() {
    const v = videoRef.current
    if (!v) return
    userInteractedRef.current = true
    if (v.paused) {
      console.log("trigger handleVideoClick")
      // On play, always unmute per requirement
      setIsMuted(false)
      try { await playWithMute(false) } catch { /* ignore */ }
    } else {
      v.pause?.()
      setShowPlayOverlay(true)
      window.setTimeout(() => setShowPlayOverlay(false), 700)
    }
  }

  return (
    <div ref={containerRef} className="relative max-h-[calc(96vh-64px)] h-[calc(96vh-64px)] snap-start flex items-center justify-center overflow-hidden px-0 md:px-8 py-4 md:py-8">
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="absolute inset-0 -z-10 blur-3xl opacity-20" aria-hidden>
          <div className="w-[60vw] h-[60vh] bg-gradient-to-b from-purple-500/30 to-blue-500/30 rounded-full" />
        </div>
        <div className="relative h-full aspect-[9/16] w-auto mx-auto rounded-2xl overflow-hidden border border-white/10 bg-black">
          <video
            ref={videoRef}
            src={!isHlsUrl(reel.videoUrl) && isActive ? reel.videoUrl : undefined}
            poster={reel.previewUrl}
            muted={isMuted}
            loop
            playsInline
            preload={isActive ? "auto" : "none"}
            className="w-full h-full object-cover cursor-pointer"
            onClick={handleVideoClick}
          />
          {/* Center play overlay (animated, transient) */}
          <div className={`pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${showPlayOverlay ? 'opacity-100' : 'opacity-0'}`}>
            <div className="bg-black/40 rounded-full p-4 animate-[pulse_0.7s_ease-out_1]">
              <Play className="w-10 h-10 text-white" />
            </div>
          </div>
          {/* Audio toggle (inside video on all breakpoints) */}
          <button
            aria-label={isMuted ? "Unmute" : "Mute"}
            className="absolute right-2 top-2 z-20 rounded-full border border-white/10 bg-black/30 backdrop-blur px-3 py-1 text-xs hover:bg-black/50"
            onClick={async () => {
              userInteractedRef.current = true
              setIsMuted((prev) => {
                const next = !prev
                // Apply the new mute state immediately
                playWithMute(next).catch(() => {})
                return next
              })
            }}
          >
            {isMuted ? "Sound" : "Mute"}
          </button>
          {/* Mobile overlay controls (inside video) */}
          <div className="md:hidden absolute right-2 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4 z-10">
            <button
              aria-label="Like"
              className={`cursor-pointer flex flex-col items-center gap-1 rounded-full p-3 border border-white/10 bg-black/20 backdrop-blur-sm hover:bg-white/10 ${liked ? "text-emerald-400" : "text-white"}`}
              onClick={toggleLike}
            >
              <ThumbsUp className="w-6 h-6" />
              <span className="text-xs opacity-80">{likeCount}</span>
            </button>
            <button
              aria-label="Dislike"
              className={`cursor-pointer flex flex-col items-center gap-1 rounded-full p-3 border border-white/10 bg-black/20 backdrop-blur-sm hover:bg-white/10 ${disliked ? "text-rose-400" : "text-white"}`}
              onClick={toggleDislike}
            >
              <ThumbsDown className="w-6 h-6" />
              <span className="text-xs opacity-80">{dislikeCount}</span>
            </button>
            <button
              aria-label="Share"
              className="cursor-pointer flex flex-col items-center gap-1 rounded-full p-3 border border-white/10 bg-black/20 backdrop-blur-sm hover:bg-white/10"
              onClick={handleShare}
            >
              <Share2 className="w-6 h-6" />
              <span className="text-xs opacity-80">Share</span>
              {copied && <span className="text-[10px] text-emerald-400">Copied</span>}
            </button>
          </div>
          {/* Desktop overlay controls (inside video, right side) */}
          <div className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 flex-col items-center gap-5 z-10">
            <button
              aria-label="Like"
              className={`cursor-pointer flex flex-col items-center gap-1 rounded-full p-3 border border-white/10 bg-black/20 backdrop-blur-sm hover:bg-white/10 ${liked ? "text-emerald-400" : "text-white"}`}
              onClick={toggleLike}
            >
              <ThumbsUp className="w-6 h-6" />
              <span className="text-xs opacity-80">{likeCount}</span>
            </button>
            <button
              aria-label="Dislike"
              className={`cursor-pointer flex flex-col items-center gap-1 rounded-full p-3 border border-white/10 bg-black/20 backdrop-blur-sm hover:bg-white/10 ${disliked ? "text-rose-400" : "text-white"}`}
              onClick={toggleDislike}
            >
              <ThumbsDown className="w-6 h-6" />
              <span className="text-xs opacity-80">{dislikeCount}</span>
            </button>
            <button
              aria-label="Share"
              className="cursor-pointer flex flex-col items-center gap-1 rounded-full p-3 border border-white/10 bg-black/20 backdrop-blur-sm hover:bg-white/10"
              onClick={handleShare}
            >
              <Share2 className="w-6 h-6" />
              <span className="text-xs opacity-80">Share</span>
              {copied && <span className="text-[10px] text-emerald-400">Copied</span>}
            </button>
          </div>
          {/* Title overlay aligned to video bounds */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0">
            <div className="bg-gradient-to-t from-black/70 via-black/20 to-transparent p-3 pb-10 md:p-4 md:pb-6">
              <div className="font-semibold leading-tight text-base md:text-lg drop-shadow line-clamp-3">{reel.title}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


