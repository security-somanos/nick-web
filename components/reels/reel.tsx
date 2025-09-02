"use client"

import { useEffect, useRef, useState } from "react"
import { ThumbsUp, ThumbsDown, Share2, Play } from "lucide-react"
import { AspectRatio } from "@/components/ui/aspect-ratio"
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

  function waitForLoadedData(video: HTMLVideoElement): Promise<void> {
    if (video.readyState >= 2) return Promise.resolve()
    return new Promise((resolve) => {
      const onLoaded = () => { video.removeEventListener('loadeddata', onLoaded); resolve() }
      video.addEventListener('loadeddata', onLoaded, { once: true })
    })
  }

  async function playWithMute(desiredMuted: boolean) {
    const v = videoRef.current
    if (!v) return
    v.muted = desiredMuted
    await waitForLoadedData(v)
    await v.play()
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
    if (isActive) {
      const tryPlay = async () => {
        try {
          if (userInteractedRef.current) {
            // With prior interaction, honor autoSound: play with sound if enabled
            if (autoSound) {
              await playWithMute(false)
              setIsMuted(false)
            } else {
              await playWithMute(true)
              setIsMuted(true)
            }
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
          // After first attempt, do not spam play; just ensure mute state is applied
          v.muted = isMuted
        } catch {
          // swallow errors to avoid console noise
        }
      }
      tryPlay()
    } else {
      try { v.pause() } catch { /* noop */ }
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
    return () => { try { hls?.destroy?.() } catch { /* ignore */ } }
  }, [reel.videoUrl])

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
    <div ref={containerRef} className="relative max-h-[calc(100vh-64px)] h-[calc(100vh-64px)] snap-start flex items-center justify-center overflow-hidden">
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="absolute inset-0 -z-10 blur-3xl opacity-20" aria-hidden>
          <div className="w-[60vw] h-[60vh] bg-gradient-to-b from-purple-500/30 to-blue-500/30 rounded-full" />
        </div>
        <div className="w-[min(440px,92vw)] max-h-full">
          <AspectRatio ratio={9 / 16}>
            <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 bg-black">
              <video
                ref={videoRef}
                src={!isHlsUrl(reel.videoUrl) ? reel.videoUrl : undefined}
                poster={reel.previewUrl}
                muted={isMuted}
                loop
                playsInline
                preload="metadata"
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
                  setIsMuted((m) => !m)
                  try { await playWithMute(false) } catch { /* ignore */ }
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
            </div>
          </AspectRatio>
        </div>

        <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-4 w-[min(440px,92vw)] max-w-full">
          <div className="bg-gradient-to-t from-black/70 via-black/10 to-transparent p-4 rounded-b-2xl">
            <div className="font-semibold text-lg drop-shadow">{reel.title}</div>
            {/*<div className="mt-1 text-sm text-white/80 whitespace-pre-wrap">{reel.description}</div>*/}
          </div>
        </div>
      </div>
    </div>
  )
}


