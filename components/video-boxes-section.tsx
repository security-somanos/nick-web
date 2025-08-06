"use client"

import { useState, useRef, useEffect } from "react"
import { gsap } from "gsap"
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi"
import { Button } from "@/components/ui/button"

interface VideoBox {
  id: number
  title: string
  subtitle: string
  videoSrc: string
  link: string
  subtleText: string
}

const videoBoxes: VideoBox[] = [
  { 
    id: 1, 
    title: "LONDON, UK", 
    subtitle: "CryptoCurrency Convention", 
    videoSrc: "/videos/conferences/london.mp4",
    link: "https://www.youtube.com/watch?v=189Q0LJOxHA",
    subtleText: "Face Fears! Learn to Ride Life's Bicycle: Eyes on the Prize!"
  },
  { 
    id: 2, 
    title: "MIAMI, US", 
    subtitle: "The revolution has started", 
    videoSrc: "/videos/conferences/miami.mp4",
    link: "https://www.youtube.com/watch?v=Ut-mWQOMKZU",
    subtleText: "Bitcoin's Rise: Breaking Free and Building a Crypto Exchange!"
  },
  { 
    id: 3, 
    title: "MALTA, EU", 
    subtitle: "The State Of Crypto", 
    videoSrc: "/videos/conferences/malta.mp4",
    link: "https://www.youtube.com/watch?v=Ft1LUJJyUOM",
    subtleText: "Blockchain vs. Beasts: Take Control of Your Future!"
  },
  { 
    id: 4, 
    title: "NEW YORK, US", 
    subtitle: "Wall Street's Cryptocurrency HQ", 
    videoSrc: "/videos/conferences/new-york.mp4",
    link: "https://www.youtube.com/watch?v=DS29SnLaKJs",
    subtleText: "Bitcoin vs Inflation: The Educational Power That Changes Everything!"
  },
  { 
    id: 5, 
    title: "BALZAN, MALTA",
    subtitle: "AIBC Eurasia Conference 2024",
    videoSrc: "/videos/conferences/balzan.mp4",
    link: "https://www.youtube.com/watch?v=YTLN4AoXfkE",
    subtleText: "Never Lose Your Power! Don't let anyone take your tharos."
  },
  { 
    id: 6, 
    title: "DUBAI, UAE",
    subtitle: "World Blockchain Forum Dubai",
    videoSrc: "/videos/conferences/dubai.mp4",
    link: "https://www.youtube.com/watch?v=Jc2LxHfbiLA",
    subtleText: "Bought 12,000 Domains in the 90s? My Family's Reaction!"
  },
  { 
    id: 7, 
    title: "MIAMI, US",
    subtitle: "CBDC's vs Bitcoin",
    videoSrc: "/videos/conferences/quantum.mp4",
    link: "https://www.youtube.com/watch?v=VnHPcCXTbh8",
    subtleText: "CBDC Apocalypse: How AI Controls Your Money & Your Spending!"
  },
  { 
    id: 8, 
    title: "MIAMI, US", 
    subtitle: "Nick Spanos launches Miami Bitcoin", 
    videoSrc: "/videos/conferences/miami-center.mp4", 
    link: "https://www.youtube.com/watch?v=bQhOD0Qa6No",
    subtleText: "Nick Spanos launches Miami Bitcoin"
  },
]

// Filter categories
const filterCategories = [
  "Nick Spanos",
  "Conferences", 
  "Cryptocurrencies",
  "Blockchain",
  "Bitcoin Pioneer",
  "Decentralization",
  "Smart Contracts",
  "Crypto Activism",
  "Web3",
  "Libertarian Tech",
  "Bitcoin Center NYC"
]

export default function VideoBoxesSection() {
  const [hoveredBox, setHoveredBox] = useState<number | null>(null)
  const [audioEnabled, setAudioEnabled] = useState(false)
  const [individualAudioStates, setIndividualAudioStates] = useState<Record<number, boolean>>({})
  const [isMobile, setIsMobile] = useState(false)
  const [loadedVideos, setLoadedVideos] = useState<Set<number>>(new Set())
  const [videoLoadingStates, setVideoLoadingStates] = useState<Record<number, boolean>>({})
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const boxRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const observerRef = useRef<IntersectionObserver | null>(null)
  
  // Function to generate preview image URL from video source
  const getPreviewUrl = (videoSrc: string) => {
    const videoName = videoSrc.split('/').pop()?.replace('.mp4', '') || ''
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
        // Si está activo, solo lo desactivamos
        return {
          ...prev,
          [videoId]: false
        }
      } else {
        // Si no está activo, desactivamos todos los demás y activamos este
        const newStates: Record<number, boolean> = {}
        videoBoxes.forEach(box => {
          newStates[box.id] = box.id === videoId
        })
        return newStates
      }
    })
  }

  const handleFilterChange = (filter: string) => {
    setActiveFilter(activeFilter === filter ? null : filter)
  }

  // Detect mobile breakpoint
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768) // md breakpoint
    }
    
    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  // Set up Intersection Observer for lazy loading videos
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
      {
        rootMargin: '50px 0px', // Start loading 50px before the video comes into view
        threshold: 0.1
      }
    )

    // Use setTimeout to ensure DOM elements are rendered
    const timer = setTimeout(() => {
      const videoContainers = document.querySelectorAll('[data-video-id]')
      videoContainers.forEach(container => {
        observerRef.current?.observe(container)
      })
    }, 100)

    return () => {
      clearTimeout(timer)
      observerRef.current?.disconnect()
    }
  }, [])

  // Handle video load events
  const handleVideoLoaded = (videoId: number) => {
    setVideoLoadingStates(prev => ({ ...prev, [videoId]: false }))
  }

  // Control audio for videos based on mobile/desktop behavior
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        const videoId = videoBoxes[index].id
        const isCurrentlyHovered = hoveredBox === videoId
        
        if (isMobile) {
          // On mobile: each video has independent audio control
          video.muted = !individualAudioStates[videoId]
        } else {
          // On desktop: only unmute if this video is hovered AND audio is enabled
          video.muted = !(isCurrentlyHovered && audioEnabled)
        }
      }
    })
  }, [hoveredBox, audioEnabled, individualAudioStates, isMobile])
  
  const handleMouseEnter = (boxId: number, index: number) => {
    if (isMobile) return // No hover effects on mobile
    
    setHoveredBox(boxId)
    const boxEl = boxRefs.current[index]
    if (boxEl) {
      const currentWidth = boxEl.offsetWidth
      const targetHeight = currentWidth * (9 / 16) // Just the video aspect ratio
      
      gsap.to(boxEl, {
        height: targetHeight,
        duration: 0.3,
        ease: "back.out(1.7)",
        transformOrigin: "center center"
      })
    }
  }
  
  const handleMouseLeave = (index: number) => {
    if (isMobile) return // No hover effects on mobile
    
    setHoveredBox(null)
    const boxEl = boxRefs.current[index]
    if (boxEl) {
      gsap.to(boxEl, {
        height: 200,
        duration: 0.3,
        ease: "back.out(1.7)",
        transformOrigin: "center center"
      })
    }
  }

  return (
    <section className="pt-4 pb-16 px-6">
      <div className="w-full mx-auto px-0">
        
        {/* Filter Buttons Section */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3 justify-start">
            {filterCategories.map((filter) => (
              <Button
                key={filter}
                variant="outlineTech"
                size="sm"
                onClick={() => handleFilterChange(filter)}
                className={`transition-all duration-200 ${
                  activeFilter === filter 
                    ? 'bg-gray-500/20 border-gray-100 text-white' 
                    : 'border-gray-400 text-gray-300 hover:bg-gray-500/10 hover:border-gray-200'
                }`}
              >
                {filter}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-x-4 gap-y-0">
           {videoBoxes.map((box, index) => (
             <div
               key={box.id}
               className="flex flex-col justify-center items-center h-[280px]"
               style={{ opacity: 1 }}
             >
                                              <a
                ref={(el) => { boxRefs.current[index] = el }}
                href={box.link}
                target={box.link === "#" ? "_self" : "_blank"}
                rel="noopener noreferrer"
                className={`shadow-md shadow-black/70 border border-[#252525] overflow-hidden rounded-12 cursor-pointer w-full relative block group ${
                  isMobile ? 'h-auto' : 'h-[200px]'
                }`}
                onMouseEnter={() => handleMouseEnter(box.id, index)}
                onMouseLeave={() => handleMouseLeave(index)}
                style={{ 
                  opacity: 1,
                  height: isMobile ? 'auto' : undefined
                }}
              >
                 <div className={`relative z-10 m-[1px] rounded-12 overflow-hidden bg-fill-glass-secondary backdrop-blur-2xl ${
                   isMobile ? 'h-auto' : 'h-full'
                 }`}>
                   <div className={`bg-[#1a1a1a] relative overflow-hidden rounded-12 ${
                     isMobile ? 'h-auto' : 'h-full'
                   }`}>
                     <div style={{ 
                       position: "relative", 
                       height: isMobile ? "auto" : "100%"
                     }}>
                                             {/* Video Background */}
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
                        {/* Preview Image */}
                        <img
                          src={getPreviewUrl(box.videoSrc)}
                          alt={`${box.title} preview`}
                          className={`w-full h-full object-cover object-center brightness-75 transition-opacity duration-300 ${
                            isMobile 
                              ? (loadedVideos.has(box.id) && !videoLoadingStates[box.id] ? 'opacity-0' : 'opacity-100')
                              : (hoveredBox === box.id && loadedVideos.has(box.id) && !videoLoadingStates[box.id] ? 'opacity-0' : 'opacity-100')
                          }`}
                        />
                        
                        {/* Video */}
                        {loadedVideos.has(box.id) && (
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
                        <div
                          className={`absolute inset-0 bg-gradient-to-t from-black/50 to-transparent transition-opacity duration-300 ${
                            isMobile ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                          }`}
                        ></div>
                      </div>
 
                                             {/* Content (Title, etc.) - Always visible */}
                      <div
                        className={`z-[40] h-full flex flex-col justify-center items-center font-mono uppercase ${
                          isMobile 
                            ? 'absolute top-0 left-1/2 transform -translate-x-1/2 w-full transition-opacity duration-300 opacity-100' 
                            : 'relative'
                        }`}
                      >
                         <div className="pt-[0em]" style={{ transform: "none" }}>
                           <div className="font-impact text-sm text-center text-[#dadada]">
                             {box.subtitle}
                           </div>
                           <div className="font-impact text-4xl text-[#fff] tracking-widest sm:text-heading-large text-center">
                             {box.title}
                           </div>
                         </div>
                       </div>
 
                                               {/* Bottom container for button only */}
                        <div
                          className={`absolute bottom-0 left-0 right-0 z-30 transition-opacity duration-300 ${
                            isMobile || hoveredBox === box.id ? 'opacity-100' : 'opacity-0'
                          }`}
                        >
                          {/* Watch Full Video Button */}
                          <button
                           className="w-full bg-[#1f1f1f] transition duration-200 cursor-pointer hover:bg-black/30 hover:backdrop-blur-sm text-white font-mono text-xs py-3 px-4 flex items-center justify-center gap-2"
                           onClick={(e) => {
                             e.preventDefault();
                             e.stopPropagation();
                             window.open(box.link, box.link === '#' ? '_self' : '_blank');
                           }}
                         >
                           <span>WATCH FULL VIDEO</span>
                           <svg
                             className="w-3 h-3"
                             fill="none"
                             stroke="currentColor"
                             viewBox="0 0 24 24"
                           >
                             <path
                               strokeLinecap="round"
                               strokeLinejoin="round"
                               strokeWidth={2}
                               d="M7 17L17 7M17 7H7M17 7V17"
                             />
                           </svg>
                         </button>
                       </div>
 
                       {/* Audio Control Button */}
                       {(isMobile || hoveredBox === box.id) && (
                         <button
                           onClick={isMobile ? (e) => handleIndividualAudioToggle(box.id, e) : handleAudioToggle}
                           className="cursor-pointer absolute top-3 right-3 z-50 w-8 h-8 bg-black/60 hover:bg-black/80 border border-white/30 rounded-full flex items-center justify-center transition-colors"
                         >
                           {isMobile ? (
                             individualAudioStates[box.id] ? (
                               <HiVolumeUp className="w-4 h-4 text-white" />
                             ) : (
                               <HiVolumeOff className="w-4 h-4 text-white" />
                             )
                           ) : (
                             audioEnabled ? (
                               <HiVolumeUp className="w-4 h-4 text-white" />
                             ) : (
                               <HiVolumeOff className="w-4 h-4 text-white" />
                             )
                           )}
                         </button>
                       )}
                     </div>
                   </div>
                 </div>
             </a>
            
            {/* Subtitle below each video */}
            <div className="mt-2 text-center md:text-start me-auto px-4">
              <p className="text-xs text-[#dedede] font-mono">
                {box.subtleText}
              </p>
            </div>
        </div>
          ))}
      </div>
      </div>
    </section>
  )
}
