"use client"

import { useLayoutEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import VideoBackground from "./video-background"

gsap.registerPlugin(ScrollTrigger)

export default function BitcoinCenterScrollSequence() {
  const component = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLDivElement>(null)
  const pinnedSectionRef = useRef<HTMLDivElement>(null)
  const timeIsMoneyRef = useRef<HTMLHeadingElement>(null)
  const btcCenterTextRef = useRef<HTMLParagraphElement>(null)
  const videoRef = useRef<HTMLDivElement>(null)
  const paragraph1Ref = useRef<HTMLDivElement>(null)
  const paragraph2Ref = useRef<HTMLDivElement>(null)
  const paragraph3Ref = useRef<HTMLDivElement>(null)
  const paragraph4Ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      const setupAnimations = () => {
        const triggerEl = triggerRef.current
        const pinnedEl = pinnedSectionRef.current
        const timeIsMoneyEl = timeIsMoneyRef.current
        const btcCenterTextEl = btcCenterTextRef.current
        const videoEl = videoRef.current
        const paragraph1El = paragraph1Ref.current
        const paragraph2El = paragraph2Ref.current
        const paragraph3El = paragraph3Ref.current
        const paragraph4El = paragraph4Ref.current

        if (triggerEl && pinnedEl && timeIsMoneyEl && btcCenterTextEl && videoEl && paragraph1El && paragraph2El && paragraph3El && paragraph4El) {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: triggerEl,
              start: "top top",
              end: "bottom bottom",
              scrub: 1,
              pin: pinnedEl,
            },
          })

          gsap.set(btcCenterTextEl, { opacity: 0 });
          gsap.set(paragraph1El, { opacity: 0 });
          gsap.set(paragraph2El, { opacity: 0 });
          gsap.set(paragraph3El, { opacity: 0 });
          gsap.set(paragraph4El, { opacity: 0 });

          tl.to({}, { duration: 12 });

          tl.to(timeIsMoneyEl, { 
            opacity: 0,
            duration: 8,
          });

          tl.to(btcCenterTextEl, {
            opacity: 1,
            duration: 8,
          }, "-=3");

          tl.to({}, { duration: 12 });

          tl.to(videoEl, {
            opacity: 0,
            duration: 8,
          });
          
          const durationDelay = 20;
          const fadeInDuration = 8;
          const fadeOutDuration = 12

          tl.to(btcCenterTextEl, {
            opacity: 0,
            duration: 8,
          }, "-=2");

          tl.to({}, { duration: durationDelay });

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
          
          tl.to(paragraph4El, {
            opacity: 1,
            duration: fadeInDuration,
          });

          tl.to({}, { duration: durationDelay });
        }
      }

      // matchMedia aLlows for responsive animations
      ScrollTrigger.matchMedia({
        // Desktop
        "(min-width: 768px)": function() {
          setupAnimations()
        },
        // Mobile
        "(max-width: 767px)": function() {
          setupAnimations()
        }
      });

    }, component)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={component}>
      <div ref={triggerRef} style={{ height: '530vh' }} className="relative">
        <section ref={pinnedSectionRef} className="h-screen w-full overflow-hidden relative">
          <div 
            className="absolute top-0 left-0 w-full h-20 z-20"
            style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)' }}
          ></div>
          <div ref={videoRef}>
            <VideoBackground />
          </div>
          <div className="absolute inset-0 flex items-center justify-center z-10">
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
        </section>
      </div>
    </div>
  )
}
