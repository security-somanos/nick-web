"use client"

import React, { createContext, useContext, useMemo, useState, Dispatch, SetStateAction } from "react"
import { videos as allVideosData } from "@/lib/videos"

type VideosLayoutContextValue = {
  // data
  allVideos: typeof allVideosData
  filteredVideos: typeof allVideosData
  categories: string[]
  years: number[]
  countries: string[]
  // filters
  query: string
  setQuery: Dispatch<SetStateAction<string>>
  activeCategory: string
  setActiveCategory: Dispatch<SetStateAction<string>>
  activeYear: string | "All"
  setActiveYear: Dispatch<SetStateAction<string | "All">>
  activeCountry: string | "All"
  setActiveCountry: Dispatch<SetStateAction<string | "All">>
  // layout
  sidebarOpen: boolean
  setSidebarOpen: Dispatch<SetStateAction<boolean>>
  isCollapsed: boolean
  setIsCollapsed: Dispatch<SetStateAction<boolean>>
}

const VideosLayoutContext = createContext<VideosLayoutContextValue | null>(null)

export function VideosLayoutProvider({ children }: { children: React.ReactNode }) {
  const [query, setQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")
  const [activeYear, setActiveYear] = useState<string | "All">("All")
  const [activeCountry, setActiveCountry] = useState<string | "All">("All")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)

  const categories = useMemo(() => ["All", "Conferences", "Interviews", "Bitcoin", "Blockchain", "Web3", "Politics"], [])
  const years = useMemo(() => Array.from(new Set(allVideosData.map(v => v.year))).sort((a, b) => b - a), [])
  const countries = useMemo(() => Array.from(new Set(allVideosData.map(v => v.country))).sort(), [])

  const filteredVideos = useMemo(() => {
    const q = query.trim().toLowerCase()
    return allVideosData.filter(v => {
      const matchQuery = !q || [v.title, v.subtitle, v.subtleText].some(s => s.toLowerCase().includes(q))
      const matchCat = activeCategory === "All" || v.subtitle.toLowerCase().includes(activeCategory.toLowerCase())
      const matchYear = activeYear === "All" || v.year === Number(activeYear)
      const matchCountry = activeCountry === "All" || v.country === activeCountry
      return matchQuery && matchCat && matchYear && matchCountry
    })
  }, [query, activeCategory, activeYear, activeCountry])

  const value: VideosLayoutContextValue = {
    allVideos: allVideosData,
    filteredVideos,
    categories,
    years,
    countries,
    query,
    setQuery,
    activeCategory,
    setActiveCategory,
    activeYear,
    setActiveYear,
    activeCountry,
    setActiveCountry,
    sidebarOpen,
    setSidebarOpen,
    isCollapsed,
    setIsCollapsed,
  }

  return (
    <VideosLayoutContext.Provider value={value}>{children}</VideosLayoutContext.Provider>
  )
}

export function useVideosLayout() {
  const ctx = useContext(VideosLayoutContext)
  if (!ctx) throw new Error("useVideosLayout must be used within VideosLayoutProvider")
  return ctx
}


