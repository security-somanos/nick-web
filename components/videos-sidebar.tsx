"use client"

import React from "react"

interface SidebarItem {
  id: string
  label: string
  icon: React.ReactNode
  href?: string
  onClick?: () => void
}

interface VideosSidebarProps {
  items: SidebarItem[]
  isCollapsed: boolean
  sidebarOpen: boolean
  onClose: () => void
  years?: number[]
  countries?: string[]
  activeYear?: string | "All"
  setActiveYear?: (v: string | "All") => void
  activeCountry?: string | "All"
  setActiveCountry?: (v: string | "All") => void
}

export default function VideosSidebar({ items, isCollapsed, sidebarOpen, onClose, years, countries, activeYear, setActiveYear, activeCountry, setActiveCountry }: VideosSidebarProps) {
  const handleItemClick = (item: SidebarItem) => {
    if (item.onClick) {
      item.onClick()
    } else if (item.href) {
      window.location.href = item.href
    }
    onClose()
  }

  return (
    <aside
      className={`fixed top-[64px] bottom-0 left-0 z-30 w-64 bg-[#0a0a0a] border-r border-white/10 p-2 transform transition-transform duration-300 md:static md:transform-none
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        ${isCollapsed ? 'md:w-20' : 'md:w-56'}`}
    >
      {items.map(item => (
        <button
          key={item.id}
          className={`cursor-pointer w-full flex ${isCollapsed ? 'justify-center' : 'items-center'} gap-3 px-3 py-2 rounded-lg hover:bg-white/10 text-sm text-left`}
          onClick={() => handleItemClick(item)}
          title={item.label}
        >
          <span className="opacity-80">{item.icon}</span>
          {!isCollapsed && <span>{item.label}</span>}
        </button>
      ))}
      {/* Mobile filters */}
      {years && countries && (
        <div className="md:hidden mt-3 border-t border-white/10 pt-3">
          <div className="flex items-start flex-col gap-2 mb-6">
            <label className="text-xs text-gray-400">Year</label>
            <select
              value={activeYear}
              onChange={(e) => setActiveYear && setActiveYear(e.target.value as any)}
              className="flex-1 w-full bg-[#121212] border border-white/10 rounded-md text-sm px-2 py-1"
            >
              <option value="All">All</option>
              {years.map(y => (<option key={y} value={String(y)}>{y}</option>))}
            </select>
          </div>
          <div className="flex items-start flex-col gap-2">
            <label className="text-xs text-gray-400">Country</label>
            <select
              value={activeCountry}
              onChange={(e) => setActiveCountry && setActiveCountry(e.target.value as any)}
              className="flex-1 w-full bg-[#121212] border border-white/10 rounded-md text-sm px-2 py-1"
            >
              <option value="All">All</option>
              {countries.map(c => (<option key={c} value={c}>{c}</option>))}
            </select>
          </div>
        </div>
      )}

      

{!isCollapsed && (
        <div className="mt-4 text-[7pt] text-gray-400 px-3">Nick Spanos<br />@ 2025 All rights reserved.</div>
      )}

    </aside>
  )
}


