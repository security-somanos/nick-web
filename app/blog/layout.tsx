"use client"

import Link from "next/link"
import NoiseEffect from "@/components/noise-effect"
import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Button } from "@/components/ui/button"
import { FaFacebook, FaInstagram, FaYoutube, FaLinkedin, FaTelegram, FaXTwitter } from "react-icons/fa6"
import { SiClubhouse } from "react-icons/si"

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const menuItemsRef = useRef<HTMLDivElement>(null)
  const contactButtonRef = useRef<HTMLDivElement>(null)
  const bottomLeftRef = useRef<HTMLDivElement>(null)
  const bottomRightRef = useRef<HTMLDivElement>(null)
  const anchorRef = useRef<HTMLDivElement>(null)
  const anchorAnimationRef = useRef<NodeJS.Timeout | null>(null)
  const anchorPositionRef = useRef(0)

  // Anchor sprite animation
  useEffect(() => {
    const frameWidth = 100
    const totalFrames = 120
    
    anchorAnimationRef.current = setInterval(() => {
      if (anchorRef.current) {
        anchorPositionRef.current += frameWidth
        
        if (anchorPositionRef.current >= frameWidth * totalFrames) {
          anchorPositionRef.current = 0
        }

        gsap.to(anchorRef.current, {
          duration: 0,
          ease: 'none',
          backgroundPositionX: -anchorPositionRef.current,
        })
      }
    }, 30)

    return () => {
      if (anchorAnimationRef.current) {
        clearInterval(anchorAnimationRef.current)
        anchorAnimationRef.current = null
      }
    }
  }, [])

  // Menu animations
  useEffect(() => {
    if (isMenuOpen && menuRef.current) {
      const tl = gsap.timeline()
      
      gsap.set(menuRef.current, { y: "100%", opacity: 0 })
      gsap.set(menuItemsRef.current?.children || [], { y: 50, opacity: 0 })
      gsap.set(contactButtonRef.current, { y: -100, opacity: 0 })
      gsap.set(bottomLeftRef.current, { y: 100, opacity: 0 })
      gsap.set(bottomRightRef.current, { y: 100, opacity: 0 })
      
      tl.to(menuRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out"
      })
      .to(menuItemsRef.current?.children || [], {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.1
      }, "-=0.2")
      .to(contactButtonRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.8")
      .to([bottomLeftRef.current, bottomRightRef.current], {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.8")
    }
  }, [isMenuOpen])

  const closeMenu = () => {
    if (menuRef.current) {
      const tl = gsap.timeline({
        onComplete: () => setIsMenuOpen(false)
      })
      
      tl.to(menuRef.current, {
        y: "100%",
        opacity: 0,
        duration: 0.6,
        ease: "power2.out"
      })
    }
  }

  const scrollToHome = () => {
    closeMenu()
    setTimeout(() => {
      window.location.href = "/"
    }, 600)
  }

  return (
    <>
      <NoiseEffect />
      
      {/* Header with 4 dots */}
      <header 
        className="rounded-xl p-3 fixed z-[50] top-0 left-1/2 transform -translate-x-1/2 mt-4 md:mt-8 cursor-pointer hover:rotate-45 transition-transform duration-300"
        onClick={() => setIsMenuOpen(true)}
      >
        <div className="w-[18px] h-[18px] flex flex-col justify-between">
          <div className="flex justify-between">
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-white rounded-full"></div>
          </div>
          <div className="flex justify-between">
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-white rounded-full"></div>
          </div>
        </div>
      </header>

      {/* Menu Overlay */}
      {isMenuOpen && (
        <div ref={menuRef} className="fixed inset-0 bg-[#0a0a0a] z-50">
          <div className="relative w-full h-full max-w-[1480px] mx-auto">
            {/* Background Pattern */}
            <div 
              className="absolute inset-0 opacity-[0.08]"
              style={{
                backgroundImage: 'url(/images/bg-menu.svg)',
                backgroundRepeat: 'repeat',
                backgroundPosition: 'left top',
                backgroundSize: '13px'
              }}
            ></div>
            
            {/* Anchor Logo */}
            <div className="absolute top-8 left-8 z-[60]">
              <div 
                ref={anchorRef}
                className="w-[100px] h-[100px] cursor-pointer transition-transform duration-300 hover:scale-110"
                style={{
                  backgroundImage: 'url(/images/sprite-min.png)',
                  backgroundSize: 'cover',
                  backgroundPosition: '0 0',
                  backgroundRepeat: 'no-repeat',
                  pointerEvents: 'none'
                }}
              />
            </div>
            
            <div className="relative z-10 h-full flex flex-col">
              {/* Close Button */}
              <div className="flex justify-center pt-16 md:pt-8">
                <button 
                  onClick={closeMenu}
                  className="w-12 h-12 bg-[#0f0f0f] rounded-full flex items-center justify-center hover:bg-white transition-colors cursor-pointer"
                >
                  <svg 
                    className="w-6 h-6 text-[rgb(128,128,128)] hover:text-black" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Main Menu Items */}
              <div className="flex-1 flex items-center justify-center overflow-hidden">
                <div ref={menuItemsRef} className="text-center space-y-4 overflow-hidden">
                  <div 
                    className="mb-0 flex items-center justify-center gap-4 md:gap-8 text-[40px] md:text-[120px] font-bold text-white font-impact cursor-pointer hover:text-[#7f7f7f] active:text-[#7f7f7f] touch-manipulation overflow-hidden leading-[30px] md:leading-[90px]"
                    onClick={scrollToHome}
                  >
                    <span className="mb-0">HOME</span>
                    <svg 
                      className="w-[40px] h-[40px] md:w-[120px] md:h-[120px] transition-transform hover:translate-x-1 hover:-translate-y-1" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </div>
                  <Link
                    href="/videos"
                    className="mb-0 flex items-center justify-center gap-4 md:gap-8 text-[40px] md:text-[120px] font-bold text-white font-impact cursor-pointer hover:text-[#7f7f7f] active:text-[#7f7f7f] touch-manipulation overflow-hidden leading-[30px] md:leading-[90px]"
                  >
                    <span>MEDIA</span>
                    <svg 
                      className="w-[40px] h-[40px] md:w-[120px] md:h-[120px] transition-transform hover:translate-x-1 hover:-translate-y-1" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </Link>
                  <Link
                    href="/blog"
                    className="mb-0 flex items-center justify-center gap-4 md:gap-8 text-[40px] md:text-[120px] font-bold text-white font-impact cursor-pointer hover:text-[#7f7f7f] active:text-[#7f7f7f] touch-manipulation overflow-hidden leading-[30px] md:leading-[90px]"
                  >
                    <span>BLOG</span>
                    <svg 
                      className="w-[40px] h-[40px] md:w-[120px] md:h-[120px] transition-transform hover:translate-x-1 hover:-translate-y-1" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </Link>
                  <Link
                    href="/contact"
                    className="mb-0 flex items-center justify-center gap-4 md:gap-8 text-[40px] md:text-[120px] font-bold text-white font-impact cursor-pointer hover:text-[#7f7f7f] active:text-[#7f7f7f] touch-manipulation overflow-hidden leading-[30px] md:leading-[90px]"
                  >
                    <span>CONTACT</span>
                    <svg 
                      className="w-[40px] h-[40px] md:w-[120px] md:h-[120px] transition-transform hover:translate-x-1 hover:-translate-y-1" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Bottom Section */}
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 justify-center md:justify-between items-end pb-8 px-8 mt-auto">
                <div ref={bottomRightRef} className="flex flex-col mx-auto md:mx-0 md:flex-col items-center space-y-0 md:space-y-0 md:space-x-6 text-white order-1 md:order-2">
                  <div className="flex items-center space-x-4">
                    <Link href="https://www.facebook.com/RealNickSpanos" target="_blank" rel="noopener noreferrer">
                      <FaFacebook className="w-6 h-6 text-[#dadada] hover:text-[#fafafa] transition-colors"/>
                    </Link>
                    <Link href="https://instagram.com/realnickspanos" target="_blank" rel="noopener noreferrer">
                      <FaInstagram className="w-6 h-6 text-[#dadada] hover:text-[#fafafa] transition-colors"/>
                    </Link>
                    <Link href="https://www.youtube.com/channel/UCOznMq4wNdaHYsOb2LUCGjg" target="_blank" rel="noopener noreferrer">
                      <FaYoutube className="w-6 h-6 text-[#dadada] hover:text-[#fafafa] transition-colors"/>
                    </Link>
                    <Link href="https://www.linkedin.com/in/nick-spanos/" target="_blank" rel="noopener noreferrer">
                      <FaLinkedin className="w-6 h-6 text-[#dadada] hover:text-[#fafafa] transition-colors"/>
                    </Link>
                    <Link href="https://www.clubhouse.com/@nickspanos" target="_blank" rel="noopener noreferrer">
                      <SiClubhouse className="w-6 h-6 text-[#dadada] hover:text-[#fafafa] transition-colors"/>
                    </Link>
                    <Link href="https://t.me/bitcoin_for_sale" target="_blank" rel="noopener noreferrer">
                      <FaTelegram className="w-6 h-6 text-[#dadada] hover:text-[#fafafa] transition-colors"/>
                    </Link>
                    <Link href="https://x.com/nickspanos" target="_blank" rel="noopener noreferrer">
                      <FaXTwitter className="w-6 h-6 text-[#dadada] hover:text-[#fafafa] transition-colors"/>
                    </Link>
                  </div>
                </div>

                <div ref={bottomLeftRef} className="text-[#dadada] mx-auto md:mx-0 text-[14px] font-impact order-2 md:order-1">
                  NICK SPANOS © {new Date().getFullYear()} ALL RIGHTS RESERVED
                </div>
              </div>
            </div>
          
            <div ref={contactButtonRef} className="absolute top-8 right-8 z-[102] hidden md:block">
              <Link href="/contact">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="cursor-pointer border-white text-white bg-transparent hover:bg-white hover:text-black transition-colors font-impact"
                >
                  CONTACT NOW
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className="min-h-screen">
        {children}
      </div>
    </>
  )
}

