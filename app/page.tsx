"use client"
import BitcoinCenterScrollSequence from "@/components/bitcoin-center-scroll-sequence";
import NoiseEffect from "@/components/noise-effect";
import HoverTrigger from "@/components/hover-trigger";
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, ExternalLink, Calendar, Tv, Radio, Newspaper, MapPin, Users, Award, Lightbulb } from "lucide-react"
import { FaFacebook, FaInstagram, FaYoutube, FaLinkedin, FaTelegram, FaXTwitter } from "react-icons/fa6"
import { SiClubhouse } from "react-icons/si"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import PartnersSection from "@/components/partners-section";
import Image from "next/image"

gsap.registerPlugin(ScrollTrigger)

export default function NickSpanosLanding() {
  const desktopVideoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Menu refs
  const menuRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLDivElement>(null);
  const contactButtonRef = useRef<HTMLDivElement>(null);
  const bottomLeftRef = useRef<HTMLDivElement>(null);
  const bottomRightRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Timeline for hero animations
    const tl = gsap.timeline();
    
    // 1a. Nick Spanos falls from above (cut off initially)
    // 1b. Founder text rises from below (simultaneously)
    tl.set("#nick-title", { y: -100, opacity: 0, overflow: "hidden", immediateRender: false })
      .set("#founder-text", { y: 100, opacity: 0, immediateRender: false })
      .set("#buttons-container", { y: 50, opacity: 0, immediateRender: false })
      .set("#badge-container", { opacity: 0, immediateRender: false })
      
      // Animate Nick Spanos falling down and founder text rising up simultaneously
      .to("#nick-title", { 
        y: 0, 
        duration: 0.8, 
        opacity: 1,
        ease: "power2.out" 
      })
      .to("#founder-text", { 
        y: 0, 
        opacity: 1, 
        duration: 0.6, 
        ease: "power2.out" 
      }, "-=0.6") // Start at the same time
      
      // 2. Buttons start rising (with delay)
      .to("#buttons-container", { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        ease: "power2.out" 
      }, "-=0.4") // Start 0.4s before the previous animation ends
      
      // 3. Badge fades in after everything else
      .to("#badge-container", { 
        opacity: 1, 
        duration: 0.6, 
        ease: "power2.out" 
      }, "-=0.6")
      
      // 4. HoverTrigger fades in last
      .to(".button-hold", { 
        opacity: 1, 
        duration: 0.8, 
        ease: "power2.out" 
      }, "-=0.6");
      
  }, []);

  // Menu animations
  useEffect(() => {
    if (isMenuOpen && menuRef.current) {
      // Block scroll when menu is open
      // document.body.style.overflow = 'hidden';
      
      const tl = gsap.timeline();
      
      // Set initial states
      gsap.set(menuRef.current, { y: "100%", opacity: 0 });
      gsap.set(menuItemsRef.current?.children || [], { y: 50, opacity: 0 });
      gsap.set(contactButtonRef.current, { y: -100, opacity: 0 });
      gsap.set(bottomLeftRef.current, { y: 100, opacity: 0 });
      gsap.set(bottomRightRef.current, { y: 100, opacity: 0 });
      
      // 1. Menu slides up with opacity
      tl.to(menuRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out"
      })
      
      // 2. After menu is complete, animate all other elements simultaneously
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
      }, "-=0.8");
    } else {
      // Restore scroll when menu is closed
      //document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  // Video and audio control functions
  const playVideo = () => {
    if (desktopVideoRef.current && mobileVideoRef.current && audioRef.current) {
      desktopVideoRef.current.style.opacity = "1";
      mobileVideoRef.current.style.opacity = "1";
      desktopVideoRef.current.play();
      mobileVideoRef.current.play();
      audioRef.current.play();
    }
  };

  const stopVideo = () => {
    if (desktopVideoRef.current && mobileVideoRef.current && audioRef.current) {
      desktopVideoRef.current.style.opacity = "0";
      mobileVideoRef.current.style.opacity = "0";
      desktopVideoRef.current.pause();
      mobileVideoRef.current.pause();
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  // Menu close function with animation
  const closeMenu = () => {
    if (menuRef.current) {
      const tl = gsap.timeline({
        onComplete: () => setIsMenuOpen(false)
      });
      
      // Animate menu sliding down with opacity
      tl.to(menuRef.current, {
        y: "100%",
        opacity: 0,
        duration: 0.6,
        ease: "power2.out"
      });
    }
  };
  
  return (
    <div className="min-h-screen text-white overflow-x-hidden">
      {/* Header with 4 dots */}
      <header 
        className="rounded-xl p-3 fixed z-[101] top-0 left-1/2 transform -translate-x-1/2 mt-4 md:mt-8 cursor-pointer hover:rotate-45 transition-transform duration-300"
        onClick={() => setIsMenuOpen(true)}
      >
        <div className="w-[18px] h-[18px] flex flex-col justify-between">
          {/* Top row - 2 dots */}
          <div className="flex justify-between">
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-white rounded-full"></div>
          </div>
          {/* Bottom row - 2 dots */}
          <div className="flex justify-between">
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-white rounded-full"></div>
          </div>
        </div>
      </header>

      {/* Menu Overlay */}
      {isMenuOpen && (
        <div ref={menuRef} className="fixed inset-0 bg-black z-101">
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
            
            {/* Content */}
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
                  <div className="text-[40px] md:text-[120px] font-bold text-white font-impact cursor-pointer hover:text-[#7f7f7f] active:text-[#7f7f7f] touch-manipulation overflow-hidden leading-[30px] md:leading-[90px]">
                    HOME
                  </div>
                  <div className="text-[40px] md:text-[120px] font-bold text-white font-impact cursor-pointer hover:text-[#7f7f7f] active:text-[#7f7f7f] touch-manipulation overflow-hidden leading-[30px] md:leading-[90px]">
                    WORK
                  </div>
                  <Link
                    href="/contact"
                    className="text-[40px] md:text-[120px] font-bold text-white font-impact cursor-pointer hover:text-[#7f7f7f] active:text-[#7f7f7f] touch-manipulation overflow-hidden leading-[30px] md:leading-[90px] block"
                  >
                    CONTACT
                  </Link>
                </div>
              </div>

              {/* Bottom Section */}
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 justify-center md:justify-between items-end pb-8 px-8 mt-auto">
                {/* Social Links - Centered on mobile, right on desktop */}
                <div ref={bottomRightRef} className="flex flex-col mx-auto md:mx-0 md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 text-white order-1 md:order-2">
                  <div className="flex items-center space-x-4">
                    <Link href="https://www.facebook.com/RealNickSpanos" target="_blank" rel="noopener noreferrer">
                      <FaFacebook className="w-6 h-6 text-[#dadada] hover:text-[#fafafa] transition-colors" />
                    </Link>
                    <Link href="https://instagram.com/realnickspanos" target="_blank" rel="noopener noreferrer">
                      <FaInstagram className="w-6 h-6 text-[#dadada] hover:text-[#fafafa] transition-colors" />
                    </Link>
                    <Link href="https://www.youtube.com/channel/UCOznMq4wNdaHYsOb2LUCGjg" target="_blank" rel="noopener noreferrer">
                      <FaYoutube className="w-6 h-6 text-[#dadada] hover:text-[#fafafa] transition-colors" />
                    </Link>
                    <Link href="https://www.linkedin.com/in/nick-spanos/" target="_blank" rel="noopener noreferrer">
                      <FaLinkedin className="w-6 h-6 text-[#dadada] hover:text-[#fafafa] transition-colors" />
                    </Link>
                    <Link href="https://www.clubhouse.com/@nickspanos" target="_blank" rel="noopener noreferrer">
                      <SiClubhouse className="w-6 h-6 text-[#dadada] hover:text-[#fafafa] transition-colors" />
                    </Link>
                    <Link href="https://t.me/bitcoin_for_sale" target="_blank" rel="noopener noreferrer">
                      <FaTelegram className="w-6 h-6 text-[#dadada] hover:text-[#fafafa] transition-colors" />
                    </Link>
                    <Link href="https://x.com/nickspanos" target="_blank" rel="noopener noreferrer">
                      <FaXTwitter className="w-6 h-6 text-[#dadada] hover:text-[#fafafa] transition-colors" />
                    </Link>
                  </div>
                  <p className="text-gray-400 text-sm italic font-content">
                    I will never DM you first
                  </p>
                </div>

                {/* Copyright - At the end on mobile, left on desktop */}
                <div ref={bottomLeftRef} className="text-white mx-auto md:mx-0 text-xl md:text-2xl font-impact order-2 md:order-1">
                  © {new Date().getFullYear()} ALL RIGHTS RESERVED
                </div>
              </div>
            </div>
          
                      {/* Contact Now Button - Positioned relative to 1480px container */}
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

      {/* Hero Section */}
      <section
        className="mb-[-50vh] md:mb-[-30vh] bg-[#111111] crt relative h-screen flex items-center justify-center overflow-hidden"
        style={{
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)",
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)",
        }}
      >
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          {/* Desktop Video */}
          <video
            ref={desktopVideoRef}
            className="absolute inset-0 w-full h-full object-cover opacity-0"
            muted
            playsInline
            loop
          >
            <source src="/videos/hero-video.mp4" type="video/mp4" />
          </video>
          
          {/* Mobile Video */}
          <video
            ref={mobileVideoRef}
            className="absolute inset-0 w-full h-full object-cover opacity-0 md:hidden"
            muted
            playsInline
            loop
          >
            <source src="/videos/hero-video-responsive.mp4" type="video/mp4" />
          </video>
          
          {/* Audio */}
          <audio
            ref={audioRef}
            className="hidden"
            loop
          >
            <source src="/sounds/brainjack.m4a" type="audio/mp4" />
          </audio>
          
          {/* Fallback background */}
          <div className="absolute inset-0 bg-transparent" />
        </div>

        {/* Hover Trigger Component */}
        <HoverTrigger 
          onTriggerStart={playVideo}
          onTriggerEnd={stopVideo}
        />

        {/* Hero Content */}
        <div className="flex flex-col justify-center crt absolute z-10 text-center px-4  inset-0 py-6 bg-black/50">
          <div className="mb-6 opacity-0" id="badge-container">
            <Badge variant="outline" className="border-gray-400 text-gray-300 mb-0 py-1 px-3">
              Bitcoin Pioneer
            </Badge>
          </div>

          <div className="overflow-hidden">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 text-white font-title initial-offscreen-top" id="nick-title">
              NICK SPANOS
            </h1>
          </div>

          <p className="text-lg md:text-lg text-gray-300 mb-8 leading-relaxed font-content opacity-0" id="founder-text">
            Founder of Bitcoin Center NYC • Inventor • Serial Entrepreneur • Blockchain Visionary <br /> Philosopher • Activist
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0" id="buttons-container">
            <Link
              href="https://banned.video/watch?id=6887cd20fbec835b8f6e3e4a"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full md:w-auto"
            >
              <Button
                size="lg"
                className="w-full md:w-auto"
                variant="outlineTech"
              >
                <Play className="mr-2 h-5 w-5" />
                Latest interview
              </Button>
            </Link>
            <Link href="/contact" className="w-full md:w-auto">
              <Button
                size="lg"
                className="w-full md:w-auto"
                variant="outlineTech"
              >
                <ExternalLink className="mr-2 h-5 w-5" />
                Contact Me
              </Button>
            </Link>
          </div>
        </div>


      </section>

      {/* Noise Effect - Applied to everything except hero */}
      <NoiseEffect />
      
      {/* Time is Money & Bitcoin Center Section */}
      <BitcoinCenterScrollSequence />

      {/* Video Section */}
      <section className="relative w-full h-[90vh] md:h-[180vh] mt-[-220px] md:mt-[0] overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            WebkitMaskImage: `
              linear-gradient(
                to bottom,
                transparent 0%,
                black 10%,
                black 90%,
                transparent 100%
              )
            `,
            maskImage: `
              linear-gradient(
                to bottom,
                transparent 0%,
                black 10%,
                black 90%,
                transparent 100%
              )
            `
          }}
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/videos/video-section.webm" type="video/webm" />
          <source src="/videos/video-section.mp4" type="video/mp4" />
        </video>
        
        {/* Title Overlay */}
        <div className="absolute inset-0 flex items-center mt-[-10vh] justify-start px-8 md:px-16">
          <div>
            <h2 
              className="text-3xl md:text-6xl lg:text-7xl text-[#dadada] uppercase font-mono font-bold leading-[0.9]"
            >
              Conferences,<br />
              Key Links &<br />
              Media Partners
            </h2>
            <p className="text-stone-400 text-md md:text-lg lg:text-xl mt-4 font-content">
              A decentralized trail of ideas, alliances, and media shaping the future
            </p>
            
            {/* Links */}
            <div className="mt-8 space-y-4 space-x-4">
              <Button
                variant="outlineTech"
                size="sm"
                className="border-stone-400 text-stone-300 hover:bg-stone-400 hover:text-black transition-colors"
                asChild
              >
                <a 
                  href="https://tv.apple.com/us/movie/banking-on-bitcoin/umc.cmc.61gus6jq1w8py6echnpktyjan" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Play className="mr-2 h-4 w-4" />
                  Watch Banking on Bitcoin
                </a>
              </Button>
              
              <Button
                variant="outlineTech"
                size="sm"
                className="border-stone-400 text-stone-300 hover:bg-stone-400 hover:text-black transition-colors"
                asChild
              >
                <a 
                  href="https://scholar.google.com/citations?user=0aWFyQgAAAAJ" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Research Profile
                </a>
              </Button>
              
              <Button
                variant="outlineTech"
                size="sm"
                className="border-stone-400 text-stone-300 hover:bg-stone-400 hover:text-black transition-colors"
                asChild
              >
                <a 
                  href="https://bitcoinwiki.org/wiki/nick-spanos" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  BitcoinWiki Profile
                </a>
              </Button>
              
              <Button
                variant="outlineTech"
                size="sm"
                className="border-stone-400 text-stone-300 hover:bg-stone-400 hover:text-black transition-colors"
                asChild
              >
                <a 
                  href="https://www.youtube.com/watch?v=tepwPaYE0Ro" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Lightbulb className="mr-2 h-4 w-4" />
                  Inventor of slidechain
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Media Appearances Section */}
      <section className="py-20 px-0">
        <div className="">
          <div className="text-left mb-12 px-6">
            <Badge variant="outline" className="border-gray-400 text-gray-300  mb-4">
              In The Spotlight
            </Badge>
            <h2 className="text-4xl md:text-3xl font-bold mb-6 text-white font-title">MEDIA PARTNERS</h2>
            <p className="
            text-right text-gray-300 text-md max-w-lg 2xl:max-w-lg md:ms-auto md:pe-10  font-content">
              Featured across major media outlets sharing insights on Bitcoin, cryptocurrency
            </p>
          </div>

          <div className="space-y-0">
            {[
              {
                outlet: "FORBES",
                description: "BITCOIN BREAKS THROUGH $60,000, BUILDING MOMENTUM TO REACH FRESH HIGHS",
                link: "https://www.forbes.com/sites/cbovaird/2021/10/15/bitcoin-breaks-through-60000-building-momentum-to-reach-fresh-highs/"
              },
              {
                outlet: "BITCOINIS",
                description: "BITCOIN CENTER NYC LAUNCHES A STARTUP INCUBATOR",
                link: "https://bitcoinist.com/bitcoin-center-nyc-launches-startup-incubator/"
              },
              {
                outlet: "COINTELEGRAPH",
                description: "CHINA PROVES BITCOIN IS AN UNSTOPPABLE MACHINE: BITCOIN CENTER FOUNDER",
                link: "https://cointelegraph.com/news/china-proves-bitcoin-is-an-unstoppable-machine-bitcoin-center-founder"
              },
              {
                outlet: "BITWALA",
                description: "BITCOIN VISIONARY NICK SPANOS ADVOCATES 'END THE FED' MOVEMENT",
                link: "https://bitwala.com/blog/bitcoin-visionary-nick-spanos-advocates-end-the-fed-movement?utm_source=chatgpt.com"
              },
              {
                outlet: "COINTELEGRAPH",
                description: "HYBRID SMART CONTRACTS WILL REPLACE THE LEGAL SYSTEM",
                link: "https://cointelegraph.com/news/hybrid-smart-contracts-will-replace-the-legal-system?utm_source=chatgpt.com"
              },
              {
                outlet: "POLITICO MAGAZINE",
                description: "RON PAUL'S REVENGE",
                link: "https://www.politico.com/news/magazine/2022/04/05/ron-paul-crypto-00022354"
              },
              {
                outlet: "PARK MAGAZINE NY",
                description: "How to Embrace Innovation Like Spanos, Weiner & Gallagher",
                link: "https://parkmagazineny.com/bitcoin-pioneer-nick-spanos-zack-weiner-joe-gallagher/?utm_source=chatgpt.com"
              },
              {
                outlet: "BITCOIN MAGAZINE",
                description: "NICK SPANOS'S ZAP JOLTS REAL ESTATE WITH BLOCKCHAIN-BASED SMART CONTRACTS",
                link: "https://bitcoinmagazine.com/business/nick-spanoss-zap-jolts-real-estate-blockchain-based-smart-contracts?utm_source=chatgpt.com"
              },
              {
                outlet: "BITCOIN MAGAZINE",
                description: "NICK SPANOS: SAUDI ARABIA IS 'KICKING THE TIRES — AND THAT'S HUGE'",
                link: "https://bitcoinmagazine.com/culture/nick-spanos-saudi-arabia-kicking-tires-and-s-huge?utm_source=chatgpt.com"
              },
              {
                outlet: "BITCOIN MAGAZINE",
                description: "OP-ED: BITCOIN DECLARATION OF OUR MONETARY INDEPENDENCE",
                link: "https://bitcoinmagazine.com/culture/op-ed-bitcoin-declaration-our-monetary-independence?utm_source=chatgpt.com"
              },
              {
                outlet: "NBE NEXT BLOCK EXPO",
                description: "NICK SPANOS BITCOIN PIONEER, FOUNDER OF BITCOIN CENTER NYC",
                link: "https://nextblockexpo.com/nick-spanos/?utm_source=chatgpt.com"
              },
              {
                outlet: "THE NATIONAL NEWS",
                description: "WORLD GOVERNMENT SUMMIT: WHERE DOES THE FUTURE LIE FOR BITCOIN?",
                link: "https://www.thenationalnews.com/uae/science/world-government-summit-where-does-the-future-lie-for-bitcoin-1.704243"
              },
              /*{
                outlet: "BAD CRYPTO PODCAST",
                description: "BITCOIN CENTER NYC WITH NICK SPANOS",
                link: "https://badcryptopodcast.com/2020/08/03/bcp-432-bitcoin-center-nyc-with-nick-spanos/?utm_source=chatgpt.com"
              },*/
              {
                outlet: "MEDIUM",
                description: "EMBRACING INNOVATION AND RISK: COVID ERA INTERVIEW",
                link: "https://medium.com/%40nickspanos/embracing-innovation-and-risk-covid-era-interview-3883dad34087"
              },
              {
                outlet: "MEDIUM",
                description: "EXPLORING THE INSIGHTS OF NICK SPANOS: A BITCOIN PIONEER",
                link: "https://medium.com/%40nickspanos/exploring-the-insights-of-nick-spanos-a-bitcoin-pioneer-dda881e8d570"
              },
            ].map((item, index) => (
              <a 
                key={index}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group cursor-pointer transition-all duration-350 hover:bg-white active:bg-white touch-manipulation overflow-hidden block"
              >
                                  <div className="border-t border-white/20 group-hover:border-black/40 group-active:border-black/40 transition-colors">
                  <div className="flex items-center justify-between py-4 md:py-6 px-3 md:px-10 relative">
                    <div className="flex-1 relative overflow-hidden h-18 md:h-12 pr-2 md:pr-0">
                      {/* Title Container */}
                      <div className="overflow-hidden h-6 relative">
                        <div className="flex flex-col transition-transform duration-350 group-hover:-translate-y-6 group-active:-translate-y-6">
                          {/* Title - Original */}
                          <div className="text-white font-semibold text-base md:text-lg tracking-wide h-6 flex items-center text-nowrap">
                            {item.outlet}
                          </div>
                          {/* Title - Duplicate */}
                          <div className="text-black font-semibold text-base md:text-lg tracking-wide h-6 flex items-center text-nowrap">
                            {item.outlet}
                          </div>
                        </div>
                      </div>

                      {/* Description Container */}
                      <div className="overflow-hidden h-10 md:h-6 relative mt-1">
                        <div className="flex flex-col transition-transform duration-350 group-hover:-translate-y-10 md:group-hover:-translate-y-6 group-active:-translate-y-10 md:group-active:-translate-y-6">
                          {/* Description - Original */}
                          <div className="text-white/70 text-xs md:text-sm tracking-wide h-10 md:h-6 flex items-center">
                            {item.description}
                          </div>
                          {/* Description - Duplicate */}
                          <div className="text-black/70 text-xs md:text-sm tracking-wide h-10 md:h-6 flex items-center">
                            {item.description}
                          </div>
                        </div>
                      </div>
                    </div>
                    <Button 
                      variant="outlineTech" 
                      size="sm"
                      className="ml-2 md:ml-6 !bg-transparent !border-gray-400 !text-gray-300 group-hover:!bg-[#3f3f3f] group-hover:!border-gray-200 group-hover:!text-white group-active:!bg-[#101010] group-active:!border-gray-200 group-active:!text-white text-xs md:text-sm px-2 md:px-4"
                    >
                      <span className="hidden sm:inline">READ ARTICLE</span>
                      <span className="sm:hidden">READ</span>
                      <svg 
                        className="w-3 h-3 md:w-4 md:h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-active:translate-x-1 group-active:-translate-y-1" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                      </svg>
                    </Button>
                  </div>
                </div>
              </a>
            ))}
            
            {/* Bottom border for last item */}
            <div className="border-t border-white/20"></div>
          </div>
        </div>
      </section>
      
      {/* Partners Section - positioned after the scroll sequence */}
      <PartnersSection />

      {/* Quote Section */}
      <section className="hidden py-20 px-4 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <blockquote className="text-2xl md:text-3xl font-light italic text-white mb-6 leading-relaxed font-content">
            "The future belongs to those who understand that Bitcoin is more than technology—it's the foundation of a
            new economic paradigm. Every day, we're building that future."
          </blockquote>
          <cite className="text-orange-400 font-semibold font-title">— Nick Spanos</cite>
        </div>
      </section>

      {/* Conferences Timeline Section */}
      <section className="hidden py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="outline" className="border-orange-500 text-orange-400 mb-4 animate-bounce">
              Speaking Engagements
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white animate-fade-in-up font-title">Conferences & Events</h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto animate-fade-in-up animation-delay-200 font-content">
              Sharing knowledge and insights at premier Bitcoin and cryptocurrency conferences worldwide.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-orange-500 h-full animate-pulse"></div>

            {/* Upcoming Events */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-orange-400 text-center mb-8 animate-fade-in-left font-title">
                Upcoming Events
              </h3>

              <div className="space-y-8">
                {[
                  {
                    name: "Bitcoin 2025",
                    location: "Las Vegas, NV",
                    date: "July 2025",
                    role: "Keynote Speaker",
                    topic: "The Next Decade of Bitcoin Infrastructure",
                    side: "left",
                  },
                  {
                    name: "Consensus 2025",
                    location: "Austin, TX",
                    date: "May 2025",
                    role: "Panel Discussion",
                    topic: "Building Sustainable Bitcoin Communities",
                    side: "right",
                  },
                ].map((event, index) => (
                  <div
                    key={index}
                    className={`flex items-center ${event.side === "left" ? "justify-start" : "justify-end"} animate-slide-in-${event.side} animation-delay-${(index + 1) * 200}`}
                  >
                    <Card
                      className={`w-full max-w-md border-gray-800 hover:border-orange-500 transition-all duration-500 transform hover:scale-105 ${event.side === "right" ? "mr-8" : "ml-8"}`}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <Badge className="bg-green-500/10 text-green-400 border-green-500/20 animate-pulse">
                            Upcoming
                          </Badge>
                          <Badge className="bg-orange-500/10 text-orange-400 border-orange-500/20">{event.role}</Badge>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2 font-title">{event.name}</h3>
                        <div className="flex items-center gap-2 text-gray-400 mb-1">
                          <MapPin className="h-4 w-4" />
                          <span className="text-sm font-content">{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400 mb-3">
                          <Calendar className="h-4 w-4" />
                          <span className="text-sm font-content">{event.date}</span>
                        </div>
                        <p className="text-gray-300 mb-4 font-content">{event.topic}</p>
                        <Button
                          size="sm"
                          className="bg-orange-600 hover:bg-orange-700 transform hover:scale-105 transition-all duration-300"
                        >
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Learn More
                        </Button>
                      </CardContent>
                    </Card>

                    {/* Timeline Dot */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-green-500 rounded-full border-4 border-gray-900 animate-ping"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Past Events */}
            <div>
              <h3 className="text-2xl font-bold text-gray-400 text-center mb-8 animate-fade-in-right font-title">Past Events</h3>

              <div className="space-y-8">
                {[
                  {
                    name: "Bitcoin 2024",
                    location: "Nashville, TN",
                    date: "July 2024",
                    role: "Keynote Speaker",
                    topic: "The Evolution of Bitcoin Infrastructure",
                    side: "right",
                  },
                  {
                    name: "Consensus 2024",
                    location: "Austin, TX",
                    date: "May 2024",
                    role: "Panel Discussion",
                    topic: "Building Bitcoin Communities",
                    side: "left",
                  },
                  {
                    name: "Bitcoin Miami",
                    location: "Miami, FL",
                    date: "April 2024",
                    role: "Workshop Leader",
                    topic: "Setting Up Bitcoin Centers",
                    side: "right",
                  },
                  {
                    name: "Adopting Bitcoin",
                    location: "San Salvador, El Salvador",
                    date: "November 2023",
                    role: "Featured Speaker",
                    topic: "Global Bitcoin Adoption",
                    side: "left",
                  },
                ].map((event, index) => (
                  <div
                    key={index}
                    className={`flex items-center ${event.side === "left" ? "justify-start" : "justify-end"} animate-slide-in-${event.side} animation-delay-${(index + 3) * 200}`}
                  >
                    <Card
                      className={`w-full max-w-md bg-gray-800 border-gray-700 hover:border-gray-600 transition-all duration-500 transform hover:scale-105 ${event.side === "right" ? "mr-8" : "ml-8"}`}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <Badge className="bg-gray-500/10 text-gray-400 border-gray-500/20">Past</Badge>
                          <Badge className="bg-orange-500/10 text-orange-400 border-orange-500/20">{event.role}</Badge>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2 font-title">{event.name}</h3>
                        <div className="flex items-center gap-2 text-gray-400 mb-1">
                          <MapPin className="h-4 w-4" />
                          <span className="text-sm font-content">{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400 mb-3">
                          <Calendar className="h-4 w-4" />
                          <span className="text-sm font-content">{event.date}</span>
                        </div>
                        <p className="text-gray-300 mb-4 font-content">{event.topic}</p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-gray-600 text-gray-400 hover:bg-gray-700 transform hover:scale-105 transition-all duration-300 bg-transparent"
                        >
                          <ExternalLink className="mr-2 h-4 w-4" />
                          View Recap
                        </Button>
                      </CardContent>
                    </Card>

                    {/* Timeline Dot */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gray-500 rounded-full border-4 border-gray-900"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Conferences section with full width image and linear gradient mask */}
      <div className="w-full my-16 relative hidden">
        <Image
          src="/images/conferences.png"
          alt="Conferences"
          width={1920}
          height={600}
          className="w-full h-auto object-cover rounded-xl shadow-lg"
          priority
          style={{
            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)',
            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)',
          }}
        />
      </div>

      {/* Water Video Section */}
      <section className="relative w-full h-[350px] md:h-[200px] 2xl:h-[720px] overflow-hidden mt-0 md:mt-0">
        {/* Background phrase behind everything */}
        <span
          className="pointer-events-none text-md md:text-[1.4rem] top-[4%] md:top-[8%] md:max-w-2xl mx-auto select-none absolute inset-0 flex items-start justify-center z-0"
          aria-hidden="true"
          style={{
            opacity: 0.7,
            letterSpacing: '0.05em',
            left: 0,
            right: 0,
            fontWeight: 600,
            textAlign: 'center',
            textShadow: '0 2px 16px rgba(0,0,0,0.5)',
            userSelect: 'none',
            width: '100%',
            lineHeight: 1.2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <span>
            A beast you will never become unless you eat beasts
          </span>
          <span
            className="text-sm md:text-[1rem]"
            style={{
              fontWeight: 400,
              opacity: 0.7,
              marginTop: '0.5em',
              letterSpacing: '0.02em',
              fontStyle: 'italic',
              display: 'block',
            }}
          >
            — George Manoli Spanos
          </span>
        </span>
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover filter grayscale-70 z-10"
          style={{
            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)',
            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)',
          }}
        >
          <source src="/videos/water.mp4" type="video/mp4" />
          <source src="/videos/water.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4 bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent font-title">
                Nick Spanos
              </h3>
              <p className="text-gray-400 mb-4 font-content">
                Bitcoin pioneer, educator, and community builder dedicated to advancing cryptocurrency adoption
                worldwide.
              </p>
              <div className="flex gap-4 mb-4">
                <Link href="https://www.facebook.com/RealNickSpanos" target="_blank" rel="noopener noreferrer">
                  <FaFacebook className="w-6 h-6 text-[#dadada] hover:text-[#fafafa] transition-colors" />
                </Link>
                <Link href="https://instagram.com/realnickspanos" target="_blank" rel="noopener noreferrer">
                  <FaInstagram className="w-6 h-6 text-[#dadada] hover:text-[#fafafa] transition-colors" />
                </Link>
                <Link href="https://www.youtube.com/channel/UCOznMq4wNdaHYsOb2LUCGjg" target="_blank" rel="noopener noreferrer">
                  <FaYoutube className="w-6 h-6 text-[#dadada] hover:text-[#fafafa] transition-colors" />
                </Link>
                <Link href="https://www.linkedin.com/in/nick-spanos/" target="_blank" rel="noopener noreferrer">
                  <FaLinkedin className="w-6 h-6 text-[#dadada] hover:text-[#fafafa] transition-colors" />
                </Link>
                <Link href="https://www.clubhouse.com/@nickspanos" target="_blank" rel="noopener noreferrer">
                  <SiClubhouse className="w-6 h-6 text-[#dadada] hover:text-[#fafafa] transition-colors" />
                </Link>
                <Link href="https://t.me/bitcoin_for_sale" target="_blank" rel="noopener noreferrer">
                  <FaTelegram className="w-6 h-6 text-[#dadada] hover:text-[#fafafa] transition-colors" />
                </Link>
                <Link href="https://x.com/nickspanos" target="_blank" rel="noopener noreferrer">
                  <FaXTwitter className="w-6 h-6 text-[#dadada] hover:text-[#fafafa] transition-colors" />
                </Link>
              </div>
              <p className="text-gray-500 text-sm italic">
                I will never DM you first
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-4 font-title">Quick Links</h4>
              <ul className="space-y-2 text-gray-400 font-content">
                <li>
                  <Link href="#" className="hover:text-orange-400 transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-orange-400 transition-colors">
                    Bitcoin Center NYC
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-orange-400 transition-colors">
                    Speaking
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-orange-400 transition-colors">
                    Media Kit
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-4 font-title">Contact</h4>
              <ul className="space-y-2 text-gray-400 font-content">
                <li>Speaking Inquiries</li>
                <li>Media Requests</li>
                <li>Collaboration</li>
                <li>
                  <Link href="/contact">
                    <Button variant="outlineTech" className="rounded-lg mt-2 border-gray-400 text-gray-300 ">Get In Touch</Button>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-[#252525] pt-8 text-center">
            <p className="text-gray-500 font-content">
              © {new Date().getFullYear()} Nick Spanos. All rights reserved. | Building the future of Bitcoin, one block
              at a time.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
