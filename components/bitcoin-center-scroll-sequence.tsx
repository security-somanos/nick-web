"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import PartnersSection from "./partners-section"

gsap.registerPlugin(ScrollTrigger)

export default function BitcoinCenterScrollSequence() {
  const triggerRef = useRef<HTMLDivElement>(null) // Provides the scroll distance
  const pinnedSectionRef = useRef<HTMLDivElement>(null) // The element that gets pinned
  
  // Elements inside the pinned section
  const timeIsMoneyRef = useRef<HTMLHeadingElement>(null)
  const btcCenterTextRef = useRef<HTMLParagraphElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)
  
  // Individual paragraph refs for the final text
  const paragraph1Ref = useRef<HTMLDivElement>(null)
  const paragraph2Ref = useRef<HTMLDivElement>(null)
  const paragraph3Ref = useRef<HTMLDivElement>(null)
  const paragraph4Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Ensure all refs are connected
    const triggerEl = triggerRef.current
    const pinnedEl = pinnedSectionRef.current
    const timeIsMoneyEl = timeIsMoneyRef.current
    const btcCenterTextEl = btcCenterTextRef.current
    const galleryEl = galleryRef.current
    const paragraph1El = paragraph1Ref.current
    const paragraph2El = paragraph2Ref.current
    const paragraph3El = paragraph3Ref.current
    const paragraph4El = paragraph4Ref.current

    if (triggerEl && pinnedEl && timeIsMoneyEl && btcCenterTextEl && galleryEl && paragraph1El && paragraph2El && paragraph3El && paragraph4El) {
      
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
      gsap.set(paragraph1El, { opacity: 0 });
      gsap.set(paragraph2El, { opacity: 0 });
      gsap.set(paragraph3El, { opacity: 0 });
      gsap.set(paragraph4El, { opacity: 0 });
      // Start the gallery below the viewport
      gsap.set(galleryEl, { y: window.innerHeight, opacity: 1 });

      // 2. Add delay before starting the "Time is Money" fade out
      tl.to({}, { duration: 12 }); // 2 second delay

      // 3. Fade out "Time is Money"
      tl.to(timeIsMoneyEl, { 
        opacity: 0,
        duration: 8,
      });

      // 4. Fade in "Bitcoin Center NYC" text
      tl.to(btcCenterTextEl, {
        opacity: 1,
        duration: 8,
      }, "-=3"); // Overlap with previous animation

      // 5. Add small delay before gallery appears (and also fix opacity ;) )
      tl.to(galleryEl, { duration: 8, opacity: 1 });

      // 6. Animate the gallery
      // First, the "fade up" effect
      tl
      //     .to(galleryEl, {
      //   y: 0, // Move it into view
      //   duration: 4,
      // })
      // Then, scroll the gallery by translating it up
      .to(galleryEl, {
        y: () => -(galleryEl.scrollHeight - window.innerHeight), // Move up by its full scrollable height
        duration: 120, // This is the main part of the scroll
        ease: "power1.in", // No easing for a smooth scroll effect
      });

      tl.to({}, { duration: 4 });


      // 7. Fade out "Bitcoin Center NYC" text towards the end
      tl.to(btcCenterTextEl, {
        opacity: 0,
        duration: 8,
      }, "-=2"); // Start fading out before the gallery finishes

      const durationDelay = 20;
      const fadeInDuration = 8;
      const fadeOutDuration = 12

      tl.to({}, { duration: durationDelay });

      // 8. Fade in paragraphs one by one (each appears and stays visible)
      tl.to(paragraph1El, {
        opacity: 1,
        duration: fadeInDuration,
      });

      tl.to({}, { duration: durationDelay });
      
      tl.to(paragraph1El, {
        opacity: 0,
        duration: fadeOutDuration,
      });
      
      tl.to(paragraph2El, {
        opacity: 1,
        duration: fadeInDuration,
      });

      tl.to({}, { duration: durationDelay });
      
      tl.to(paragraph2El, {
        opacity: 0,
        duration: fadeOutDuration,
      });
      
      tl.to(paragraph3El, {
        opacity: 1,
        duration: fadeInDuration,
      });

      tl.to({}, { duration: durationDelay });
      
      tl.to(paragraph3El, {
        opacity: 0,
        duration: fadeOutDuration,
      });
      
      tl.to(paragraph4El, {
        opacity: 1,
        duration: fadeInDuration,
      });

      tl.to({}, { duration: durationDelay });
      
      // 9. Add delay after the last paragraph appears so user has to keep scrolling
      tl.to(paragraph4El, {
        opacity: 1, // Keep it visible
        duration: fadeInDuration, // For 6 more seconds
      });

      tl.to({}, { duration: durationDelay });
    }
  }, [])

  return (
    // This trigger div provides the scrollable height for the animation
    <div ref={triggerRef} style={{ height: '530vh' }} className="relative">
      
      {/* This section will be pinned and will act as a viewport for the animations */}
      <section ref={pinnedSectionRef} className="h-screen w-full overflow-hidden relative">
        
        {/* Texts and Video Container (on top of gallery) */}
        <div className="absolute inset-0 flex items-center justify-center z-1">
          <div ref={timeIsMoneyRef} className="absolute text-center">
            <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl xl:text-[90px] font-semibold text-[#dadada] font-impact leading-tight lg:leading-[70px]">
              <span>IF</span> <span>TIME</span> <span>IS</span> <span className="flicker-effect">MONEY</span>,
              <br />
              <span>AND</span> <span>THEY</span> <span>ARE</span> <span className="flicker-effect">PRINTING</span> <span>MORE</span> <span>MONEY.</span>
              <br />
              <span>THEY</span> <span>ARE</span> <span className="flicker-effect">STEALING</span> <span>TIME</span>
              <br />
              <span>FROM</span> <span className="flicker-effect">YOU.</span>
            </h2>
          </div>
          <div ref={btcCenterTextRef} className="py-32 absolute text-6xl max-w-6xl text-center text-gray-300 font-content opacity-0">
          <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl xl:text-[90px] font-semibold text-[#dadada] font-impact leading-tight lg:leading-[70px]">
              <span>THIS</span> <span>IS</span> <span>A</span> <span>MONETARY</span> <span>REVOLUTION</span>
            </h2>
          </div>
                     <div ref={paragraph1Ref} className="py-32 absolute text-2xl max-w-4xl text-center text-gray-300 font-content opacity-0">
             Nick Spanos is a pioneer in the bitcoin and blockchain technology space. In 2013, Spanos founded Bitcoin Center NYC -- the world's first-ever cryptocurrency trading floor, which initially opened directly across from the NYSE in 2013.
           </div>
           <div ref={paragraph2Ref} className="py-32 absolute text-2xl max-w-4xl text-center text-gray-300 font-content opacity-0">
             Spanos is also CEO of Blockchain Technologies Corp., which patented VoteWatcher, the first-ever blockchain voting platform.
           </div>
           <div ref={paragraph3Ref} className="py-32 absolute text-2xl max-w-4xl text-center text-gray-300 font-content opacity-0">
             He is a co-founder of Zap.org, which solves one of the biggest challenges for blockchain smart contracts, by allowing real-world data and events to trigger smart contract provisions for the first time.
           </div>
           <div ref={paragraph4Ref} className="py-32 absolute text-2xl max-w-4xl text-center text-gray-300 font-content opacity-0">
             Spanos was featured in the recent documentary, Banking on Bitcoin, and is a sought-after speaker at blockchain events worldwide.
           </div>
        </div>

        {/* Gallery Container (behind the text) */}
        <div ref={galleryRef} className="absolute inset-0 z-0 bg-transparent opacity-0 z-2">
          <div className="container mx-auto px-4 py-20">
            <div className="grid grid-cols-3 gap-8 space-y-160 mb-128">
              {/* Column 1 */}
              <div className="space-y-128 flex flex-col items-start mt-64">
                <Image src="/images/btc_center.webp" alt="Bitcoin Center 1" width={400} height={600} className="rounded-lg shadow-lg" />
                <Image src="/images/btc_center.webp" alt="Bitcoin Center 4" width={400} height={600} className="rounded-lg shadow-lg" />
              </div>
              {/* Column 2 */}
              <div className="space-y-160 flex flex-col items-center mt-128">
                <Image src="/images/btc_center.webp" alt="Bitcoin Center 2" width={400} height={600} className="rounded-lg shadow-lg" />
              </div>
              {/* Column 3 */}
              <div className="space-y-160 flex flex-col items-end">
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
