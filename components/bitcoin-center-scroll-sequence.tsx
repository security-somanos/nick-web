"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"

gsap.registerPlugin(ScrollTrigger)

export default function BitcoinCenterScrollSequence() {
  const triggerRef = useRef<HTMLDivElement>(null) // Provides the scroll distance
  const pinnedSectionRef = useRef<HTMLDivElement>(null) // The element that gets pinned
  
  // Elements inside the pinned section
  const timeIsMoneyRef = useRef<HTMLHeadingElement>(null)
  const btcCenterTextRef = useRef<HTMLParagraphElement>(null)
  const youtubeRef = useRef<HTMLDivElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Ensure all refs are connected
    const triggerEl = triggerRef.current
    const pinnedEl = pinnedSectionRef.current
    const timeIsMoneyEl = timeIsMoneyRef.current
    const btcCenterTextEl = btcCenterTextRef.current
    const youtubeEl = youtubeRef.current
    const galleryEl = galleryRef.current

    if (triggerEl && pinnedEl && timeIsMoneyEl && btcCenterTextEl && youtubeEl && galleryEl) {
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerEl,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          pin: pinnedEl,
        },
      })

      // 1. Set initial states
      gsap.set(btcCenterTextEl, { opacity: 0 });
      gsap.set(youtubeEl, { opacity: 0 });
      // Start the gallery below the viewport
      gsap.set(galleryEl, { y: window.innerHeight, opacity: 1 });

      // 2. Fade out "Time is Money"
      tl.to(timeIsMoneyEl, { 
        opacity: 0,
        duration: 2,
      });

      // 3. Fade in "Bitcoin Center NYC" text
      tl.to(btcCenterTextEl, {
        opacity: 1,
        duration: 2,
      }, "-=1"); // Overlap with previous animation

      // 4. Animate the gallery
      // First, the "fade up" effect
      tl.to(galleryEl, {
        y: 0, // Move it into view
        duration: 4,
      })
      // Then, scroll the gallery by translating it up
      .to(galleryEl, {
        y: () => -(galleryEl.scrollHeight - window.innerHeight), // Move up by its full scrollable height
        duration: 15, // This is the main part of the scroll
        ease: "none",
      });

      // 5. Fade out "Bitcoin Center NYC" text towards the end
      tl.to(btcCenterTextEl, {
        opacity: 0,
        duration: 2,
      }, "-=3"); // Start fading out before the gallery finishes

      // 6. Fade in the YouTube video at the very end
      tl.to(youtubeEl, {
        opacity: 1,
        duration: 3,
      });
    }
  }, [])

  return (
    // This trigger div provides the scrollable height for the animation
    <div ref={triggerRef} style={{ height: '400vh' }} className="relative">
      
      {/* This section will be pinned and will act as a viewport for the animations */}
      <section ref={pinnedSectionRef} className="h-screen w-full overflow-hidden relative">
        
        {/* Texts and Video Container (on top of gallery) */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div ref={timeIsMoneyRef} className="absolute text-center">
            <h2 className="text-[90px] font-semibold text-[#dadada] font-impact leading-[70px]">
              <span>IF</span> <span>TIME</span> <span>IS</span> <span className="flicker-effect">MONEY</span>,
              <br />
              <span>AND</span> <span>THEY</span> <span>ARE</span> <span className="flicker-effect">PRINTING</span> <span>MORE</span> <span>MONEY.</span>
              <br />
              <span>THEY</span> <span>ARE</span> <span className="flicker-effect">STEALING</span> <span>TIME</span>
              <br />
              <span>FROM</span> <span className="flicker-effect">YOU.</span>
            </h2>
          </div>
          <p ref={btcCenterTextRef} className="absolute text-2xl max-w-4xl text-center text-gray-300 font-content">
            Bitcoin Center NYC was dedicated to promoting Bitcoin, educating the public, and hosting the local Bitcoin community.
          </p>
          <div ref={youtubeRef} className="absolute w-full max-w-6xl px-4">
            <iframe
              width="100%"
              height="600"
              src="https://www.youtube.com/embed/_FPh2XmU3SY?si=a6UrEhTmnys2h4Ko"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-2xl shadow-2xl w-full h-[400px] md:h-[500px] lg:h-[600px]"
            ></iframe>
          </div>
        </div>

        {/* Gallery Container (behind the text) */}
        <div ref={galleryRef} className="absolute inset-0 z-0 bg-black">
          <div className="container mx-auto px-4 py-20">
            <div className="grid grid-cols-3 gap-8 space-y-128 mb-128">
              {/* Column 1 */}
              <div className="space-y-128 flex flex-col items-start mt-64">
                <Image src="/images/btc_center.webp" alt="Bitcoin Center 1" width={400} height={600} className="rounded-lg shadow-lg" />
                <Image src="/images/btc_center.webp" alt="Bitcoin Center 4" width={400} height={600} className="rounded-lg shadow-lg" />
              </div>
              {/* Column 2 */}
              <div className="space-y-128 flex flex-col items-center mt-128">
                <Image src="/images/btc_center.webp" alt="Bitcoin Center 2" width={400} height={600} className="rounded-lg shadow-lg" />
              </div>
              {/* Column 3 */}
              <div className="space-y-128 flex flex-col items-end">
                <Image src="/images/btc_center.webp" alt="Bitcoin Center 5" width={400} height={600} className="rounded-lg shadow-lg" />
                <Image src="/images/btc_center.webp" alt="Bitcoin Center 3" width={400} height={600} className="rounded-lg shadow-lg" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
