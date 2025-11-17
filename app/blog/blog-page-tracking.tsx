"use client"

import { useEffect } from "react"
import { trackViewContent, trackBlogPagination } from "@/lib/facebook-pixel"

interface BlogPageTrackingProps {
  page: number
  totalPages: number
}

export default function BlogPageTracking({ page, totalPages }: BlogPageTrackingProps) {
  // Track page view
  useEffect(() => {
    trackViewContent({
      content_name: "Blog Index",
      content_category: "blog",
      content_type: "page",
    })
  }, [])

  // Track pagination
  useEffect(() => {
    if (page > 1) {
      trackBlogPagination({
        page_number: page,
        total_pages: totalPages,
      })
    }
  }, [page, totalPages])

  // Track pagination clicks
  useEffect(() => {
    const handlePaginationClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const link = target.closest('a')
      if (link && link.href.includes('/blog?page=')) {
        const urlParams = new URLSearchParams(link.href.split('?')[1])
        const newPage = Number(urlParams.get('page') || 1)
        if (newPage !== page) {
          trackBlogPagination({
            page_number: newPage,
            total_pages: totalPages,
          })
        }
      }
    }

    document.addEventListener('click', handlePaginationClick)
    return () => {
      document.removeEventListener('click', handlePaginationClick)
    }
  }, [page, totalPages])

  return null
}

