"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { HiVolumeOff, HiVolumeUp } from "react-icons/hi"
import type { VideoBox } from "@/lib/videos"

interface VideosGridProps {
  items: VideoBox[]
}

export default function VideosGrid({ items }: VideosGridProps) {
  const [hoveredBox, setHoveredBox] = useState<number | null>(null)
  const [audioEnabled, setAudioEnabled] = useState(false)
  const [individualAudioStates, setIndividualAudioStates] = useState<Record<number, boolean>>({})
  const [isMobile, setIsMobile] = useState(false)
  const [loadedVideos, setLoadedVideos] = useState<Set<number>>(new Set())
  const [videoLoadingStates, setVideoLoadingStates] = useState<Record<number, boolean>>({})
  const boxRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const observerRef = useRef<IntersectionObserver | null>(null)

  const computePreviewUrl = (box: VideoBox) => {
    if (box.previewUrl) return box.previewUrl
    const videoName = box.videoSrc.split('/').pop()?.replace('.mp4', '') || ''
    return `/images/conferences/preview-${videoName}.jpg`
  }

  const handleAudioToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    setAudioEnabled(!audioEnabled)
  }

  const handleIndividualAudioToggle = (videoId: number, e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    setIndividualAudioStates(prev => {
      const isCurrentlyActive = prev[videoId]
      if (isCurrentlyActive) {
        return { ...prev, [videoId]: false }
      } else {
        const newStates: Record<number, boolean> = {}
        items.forEach(box => { newStates[box.id] = box.id === videoId })
        return newStates
      }
    })
  }

  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth < 768)
    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const videoId = parseInt(entry.target.getAttribute('data-video-id') || '0')
            setLoadedVideos(prev => new Set([...prev, videoId]))
            setVideoLoadingStates(prev => ({ ...prev, [videoId]: true }))
            observerRef.current?.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '50px 0px', threshold: 0.1 }
    )

    const timer = setTimeout(() => {
      const videoContainers = document.querySelectorAll('[data-video-id]')
      videoContainers.forEach(container => observerRef.current?.observe(container))
    }, 100)

    return () => {
      clearTimeout(timer)
      observerRef.current?.disconnect()
    }
  }, [])

  const handleVideoLoaded = (videoId: number) => {
    setVideoLoadingStates(prev => ({ ...prev, [videoId]: false }))
  }

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        const videoId = items[index]?.id
        const isCurrentlyHovered = hoveredBox === videoId
        if (isMobile) {
          video.muted = !individualAudioStates[videoId]
        } else {
          video.muted = !(isCurrentlyHovered && audioEnabled)
        }
      }
    })
  }, [hoveredBox, audioEnabled, individualAudioStates, isMobile, items])

  const handleMouseEnter = (boxId: number, index: number) => {
    if (isMobile) return
    setHoveredBox(boxId)
    const boxEl = boxRefs.current[index]
    if (boxEl) {
      const currentWidth = boxEl.offsetWidth
      const targetHeight = currentWidth * (9 / 16)
      gsap.to(boxEl, { height: targetHeight, duration: 0.3, ease: "back.out(1.7)", transformOrigin: "center center" })
    }
  }

  const handleMouseLeave = (index: number) => {
    if (isMobile) return
    setHoveredBox(null)
    const boxEl = boxRefs.current[index]
    if (boxEl) {
      gsap.to(boxEl, { height: 200, duration: 0.3, ease: "back.out(1.7)", transformOrigin: "center center" })
    }
  }

  return (
    <section className="pt-6 pb-16 px-6">
      <div className="w-full mx-auto px-0">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-x-4 gap-y-0">
          {items.map((box, index) => (
            <div key={box.id} className="mb-6 flex flex-col justify-center items-center w-full md:h-[280px]" style={{ opacity: 1 }}>
              <a
                ref={(el) => { boxRefs.current[index] = el }}
                href={`/videos/${box.id}`}
                className={`shadow-md shadow-black/70 border border-[#252525] overflow-hidden rounded-12 cursor-pointer w-full relative block group ${isMobile ? 'h-auto' : 'h-[200px]'}`}
                onMouseEnter={() => handleMouseEnter(box.id, index)}
                onMouseLeave={() => handleMouseLeave(index)}
                style={{ opacity: 1, height: isMobile ? 'auto' : undefined }}
              >
                <div className={`relative z-10 m-[1px] rounded-12 overflow-hidden bg-fill-glass-secondary backdrop-blur-2xl ${isMobile ? 'h-auto' : 'h-full'}`}>
                  <div className={`bg-[#1a1a1a] relative overflow-hidden rounded-12 ${isMobile ? 'h-auto' : 'h-full'}`}>
                    <div style={{ position: "relative", height: isMobile ? "auto" : "100%" }}>
                      <div
                        className={`${
                          isMobile
                            ? 'relative w-full h-auto aspect-video'
                            : `absolute right-0 left-0 top-0 w-full h-[calc(100%-40px)] transition-all duration-300 ${
                                hoveredBox === box.id ? 'top-0 h-[calc(100%-40px)]' : 'top-0 h-full -translate-y-[40px]'
                              }`
                        }`}
                        data-video-id={box.id}
                      >
                        <img
                          src={computePreviewUrl(box)}
                          alt={`${box.title} preview`}
                          className={`w-full h-full object-cover object-center brightness-75 transition-opacity duration-300 ${
                            isMobile
                              ? (loadedVideos.has(box.id) && !videoLoadingStates[box.id] ? 'opacity-0' : 'opacity-100')
                              : (hoveredBox === box.id && loadedVideos.has(box.id) && !videoLoadingStates[box.id] ? 'opacity-0' : 'opacity-100')
                          }`}
                        />
                        {loadedVideos.has(box.id) && box.videoSrc && (
                          <video
                            key={`video-${box.id}`}
                            ref={(el) => { videoRefs.current[index] = el }}
                            autoPlay
                            loop
                            playsInline
                            muted={isMobile ? !individualAudioStates[box.id] : !(hoveredBox === box.id && audioEnabled)}
                            onLoadedData={() => handleVideoLoaded(box.id)}
                            className={`absolute inset-0 w-full h-full object-cover object-bottom brightness-75 transition-opacity duration-300 ${
                              isMobile
                                ? (videoLoadingStates[box.id] ? 'opacity-0' : 'opacity-100')
                                : (hoveredBox === box.id && !videoLoadingStates[box.id] ? 'opacity-100' : 'opacity-0')
                            }`}
                          >
                            <source src={box.videoSrc} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        )}
                        <div className={`absolute inset-0 bg-gradient-to-t from-black/50 to-transparent transition-opacity duration-300 ${isMobile ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></div>
                      </div>

                      {/* Title/subtitle overlay removed for /videos grid */}

                      <div className={`absolute bottom-0 left-0 right-0 z-30 transition-opacity duration-300 ${isMobile || hoveredBox === box.id ? 'opacity-100' : 'opacity-0'}`}>
                        {box.link && (
                          <button
                          className="w-full bg-[#1f1f1f] transition duration-200 cursor-pointer hover:bg-black/30 hover:backdrop-blur-sm text-white font-mono text-xs py-3 px-4 flex items-center justify-center gap-2"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            window.open(box.link, box.link === '#' ? '_self' : '_blank');
                          }}
                        >
                          <span>WATCH FULL VIDEO</span>
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                          </svg>
                        </button>
                        )}
                      </div>

                      {(isMobile || hoveredBox === box.id) && (
                        <button
                          onClick={isMobile ? (e) => handleIndividualAudioToggle(box.id, e) : handleAudioToggle}
                          className="cursor-pointer absolute top-3 right-3 z-50 w-8 h-8 bg-black/60 hover:bg-black/80 border border-white/30 rounded-full flex items-center justify-center transition-colors"
                        >
                          {isMobile ? (
                            individualAudioStates[box.id] ? <HiVolumeUp className="w-4 h-4 text-white" /> : <HiVolumeOff className="w-4 h-4 text-white" />
                          ) : (
                            audioEnabled ? <HiVolumeUp className="w-4 h-4 text-white" /> : <HiVolumeOff className="w-4 h-4 text-white" />
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </a>

              <div className="mt-2 w-full px-2">
                <div className="text-sm md:text-base text-[#f0f0f0] font-mono font-semibold line-clamp-2">{box.subtleText}</div>
                {box.author && (
                  <div className="text-[11px] text-gray-400 font-mono mt-1">{box.author}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


