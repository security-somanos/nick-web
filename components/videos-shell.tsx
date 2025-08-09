"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { useVideosLayout } from "@/components/videos-layout-context"
import VideosSidebar from "@/components/videos-sidebar"

export default function VideosShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
  const {
    query, setQuery,
    years, countries, activeYear, setActiveYear, activeCountry, setActiveCountry,
    sidebarOpen, setSidebarOpen, isCollapsed, setIsCollapsed,
    categories, activeCategory, setActiveCategory,
  } = useVideosLayout()

  const showCategories = pathname === "/videos" || pathname === "/videos/"

  return (
    <div className="min-h-screen text-white">
      {/* Top Bar */}
      <div className="sticky top-0 z-40 bg-[#0a0a0a]/90 backdrop-blur border-b border-white/10">
        <div className="flex items-center gap-4 px-4 py-3">
          <button
            className="cursor-pointer p-2 rounded hover:bg-white/10"
            aria-label="Toggle menu"
            onClick={() => {
              if (typeof window !== 'undefined' && window.matchMedia('(min-width: 768px)').matches) {
                setIsCollapsed(v => !v)
              } else {
                setSidebarOpen(v => !v)
              }
            }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <Link href="/videos" className="font-impact tracking-widest text-xl hover:opacity-90 transition-opacity">Nick Spanos</Link>
          {/* Desktop search */}
          <div className="hidden md:flex flex-1 items-center justify-center">
            <div className="w-full max-w-3xl flex items-center gap-2 bg-[#121212] border border-white/10 rounded-full px-4 py-2">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search"
                className="bg-transparent outline-none flex-1 text-sm"
              />
              <button className="cursor-pointer px-3 py-1 rounded-full bg-white/10 hover:bg-white/20">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"/></svg>
              </button>
            </div>
          </div>
          {/* Mobile search button */}
          <div className="md:hidden ml-auto">
            <button
              className="cursor-pointer p-2 rounded-full bg-white/10 hover:bg-white/20"
              aria-label="Toggle search"
              onClick={() => setMobileSearchOpen((open) => !open)}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"/></svg>
            </button>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <label className="text-xs text-gray-400">Year</label>
            <select
              value={activeYear}
              onChange={(e) => setActiveYear(e.target.value)}
              className="bg-[#121212] border border-white/10 rounded-md text-sm px-2 py-1"
            >
              <option value="All">All</option>
              {years.map(y => (<option key={y} value={String(y)}>{y}</option>))}
            </select>
            <label className="text-xs text-gray-400">Country</label>
            <select
              value={activeCountry}
              onChange={(e) => setActiveCountry(e.target.value)}
              className="bg-[#121212] border border-white/10 rounded-md text-sm px-2 py-1"
            >
              <option value="All">All</option>
              {countries.map(c => (<option key={c} value={c}>{c}</option>))}
            </select>
          </div>
        </div>
      </div>

      {/* Mobile search overlay */}
      {mobileSearchOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 bg-[#0a0a0a]/95"
          onClick={() => setMobileSearchOpen(false)}
        >
          <div
            className="flex items-center gap-2 px-4 py-3 border-b border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="cursor-pointer p-2 rounded hover:bg-white/10"
              aria-label="Close search"
              onClick={() => setMobileSearchOpen(false)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
            <form
              className="flex-1 flex items-center bg-[#121212] border border-white/10 rounded-full px-4 py-2"
              onSubmit={(e) => { e.preventDefault(); setMobileSearchOpen(false); }}
            >
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search"
                className="bg-transparent outline-none flex-1 text-sm"
              />
              <button type="submit" className="cursor-pointer px-2 py-1 rounded-full hover:bg-white/10" aria-label="Submit search">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"/></svg>
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="flex">
        {sidebarOpen && (
          <div className="fixed inset-0 top-[64px] bg-black/50 z-20 md:hidden" onClick={() => setSidebarOpen(false)} />
        )}
        <VideosSidebar
          items={[
            {
              id: 'home',
              label: 'Home',
              icon: (<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>),
              onClick: () => {
                setQuery("")
                setActiveCategory("All")
                setActiveYear("All")
                setActiveCountry("All")
                window.location.href = "/videos"
              }
            },
            {
              id: 'return',
              label: 'Return to site',
              icon: (<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>),
              href: '/'
            }
          ]}
          isCollapsed={isCollapsed}
          sidebarOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          years={years}
          countries={countries}
          activeYear={activeYear}
          setActiveYear={setActiveYear}
          activeCountry={activeCountry}
          setActiveCountry={setActiveCountry}
        />
        <main className="flex-1 md:ml-0 ml-0">
          {showCategories && (
            <div className="px-6 pt-4 pb-2 w-100 md:w-full">
              <div className="flex gap-2 items-center overflow-x-auto pb-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    className={`cursor-pointer whitespace-nowrap px-3 py-1 rounded-full text-sm border ${activeCategory === cat ? 'bg-white text-black border-white' : 'bg-transparent text-white border-white/20 hover:bg-white/10'}`}
                    onClick={() => setActiveCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          )}
          {children}
        </main>
      </div>
    </div>
  )
}


