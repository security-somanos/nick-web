"use client"

import { useCallback } from "react"
import {
  trackSocialLinkClick,
  trackExternalLinkClick,
  trackButtonClick,
  trackMenuOpen,
  trackVideoGridClick,
  trackSectionView,
  trackScrollDepth,
  trackViewContent,
} from "@/lib/facebook-pixel"

export function useFacebookPixel() {
  const handleSocialLinkClick = useCallback(
    (platform: string, url: string, location?: string) => {
      trackSocialLinkClick({
        social_platform: platform,
        link_url: url,
        link_location: location,
      })
    },
    []
  )

  const handleExternalLinkClick = useCallback(
    (
      linkType: "external_article" | "external_resource" | "other",
      url: string,
      contentName?: string,
      location?: string
    ) => {
      trackExternalLinkClick({
        link_type: linkType,
        link_url: url,
        content_name: contentName,
        link_location: location,
      })
    },
    []
  )

  const handleButtonClick = useCallback(
    (buttonName: string, location: string, category?: string) => {
      trackButtonClick({
        button_name: buttonName,
        button_location: location,
        content_category: category,
      })
    },
    []
  )

  const handleMenuOpen = useCallback((location: string) => {
    trackMenuOpen({
      menu_location: location,
    })
  }, [])

  const handleVideoGridClick = useCallback(
    (videoId: string, videoTitle?: string, category?: string, location?: string) => {
      trackVideoGridClick({
        video_id: videoId,
        video_title: videoTitle,
        category,
        grid_location: location,
      })
    },
    []
  )

  const handleSectionView = useCallback((sectionName: string, pageType?: string) => {
    trackSectionView({
      section_name: sectionName,
      page_type: pageType,
    })
  }, [])

  const handleScrollDepth = useCallback(
    (depth: number, pageType?: string, contentName?: string) => {
      trackScrollDepth({
        scroll_depth: depth,
        page_type: pageType,
        content_name: contentName,
      })
    },
    []
  )

  const handleViewContent = useCallback(
    (
      contentName: string,
      category: string,
      contentIds?: string[],
      contentType?: string
    ) => {
      trackViewContent({
        content_name: contentName,
        content_category: category,
        content_ids: contentIds,
        content_type: contentType,
      })
    },
    []
  )

  return {
    handleSocialLinkClick,
    handleExternalLinkClick,
    handleButtonClick,
    handleMenuOpen,
    handleVideoGridClick,
    handleSectionView,
    handleScrollDepth,
    handleViewContent,
  }
}

