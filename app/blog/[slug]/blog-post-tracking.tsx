"use client"

import { useEffect } from "react"
import { trackViewContent, trackScrollDepth, trackTimeOnPage } from "@/lib/facebook-pixel"
import sanitizeHtml from "sanitize-html"

interface BlogPostTrackingProps {
  post: {
    id: number
    slug: string
    title: { rendered: string }
    date?: string
  }
}

export default function BlogPostTracking({ post }: BlogPostTrackingProps) {
  useEffect(() => {
    // Track ViewContent when blog post is viewed
    const titleText = sanitizeHtml(post.title.rendered, { allowedTags: [] })
    trackViewContent({
      content_name: titleText,
      content_category: "blog_post",
      content_ids: [String(post.id)],
      content_type: "article",
    })

    // Track scroll depth
    let scrollDepthsTracked = new Set<number>()
    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      const scrollPercentage = Math.round((scrollTop / (documentHeight - windowHeight)) * 100)

      // Track at 25%, 50%, 75%, 100%
      const milestones = [25, 50, 75, 100]
      milestones.forEach((milestone) => {
        if (scrollPercentage >= milestone && !scrollDepthsTracked.has(milestone)) {
          scrollDepthsTracked.add(milestone)
          trackScrollDepth({
            scroll_depth: milestone,
            page_type: "blog_post",
            content_name: titleText,
          })
        }
      })
    }

    // Track time on page
    const startTime = Date.now()
    const timeInterval = setInterval(() => {
      const timeSpent = Math.floor((Date.now() - startTime) / 1000)
      if (timeSpent > 0 && timeSpent % 30 === 0) {
        // Track every 30 seconds
        trackTimeOnPage({
          time_seconds: timeSpent,
          page_type: "blog_post",
          content_name: titleText,
        })
      }
    }, 30000)

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      clearInterval(timeInterval)
    }
  }, [post])

  return null
}

