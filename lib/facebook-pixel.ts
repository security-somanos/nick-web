/**
 * Facebook Pixel Event Tracking Utility
 * Provides type-safe methods for tracking Facebook Pixel events
 */

declare global {
  interface Window {
    fbq: (
      action: string,
      eventName: string,
      params?: Record<string, any>
    ) => void
  }
}

/**
 * Check if Facebook Pixel is loaded
 */
export function isFacebookPixelLoaded(): boolean {
  return typeof window !== 'undefined' && typeof window.fbq === 'function'
}

/**
 * Track a Facebook Pixel event
 */
export function trackEvent(
  eventName: string,
  params?: Record<string, any>
): void {
  if (!isFacebookPixelLoaded()) {
    console.warn('Facebook Pixel not loaded')
    return
  }

  try {
    window.fbq('track', eventName, params || {})
  } catch (error) {
    console.error('Error tracking Facebook Pixel event:', error)
  }
}

/**
 * Track a custom Facebook Pixel event
 */
export function trackCustomEvent(
  eventName: string,
  params?: Record<string, any>
): void {
  if (!isFacebookPixelLoaded()) {
    console.warn('Facebook Pixel not loaded')
    return
  }

  try {
    window.fbq('trackCustom', eventName, params || {})
  } catch (error) {
    console.error('Error tracking custom Facebook Pixel event:', error)
  }
}

/**
 * Track PageView (usually handled automatically, but can be used for SPA navigation)
 */
export function trackPageView(): void {
  if (!isFacebookPixelLoaded()) return
  try {
    window.fbq('track', 'PageView')
  } catch (error) {
    console.error('Error tracking PageView:', error)
  }
}

/**
 * Track ViewContent event
 */
export function trackViewContent(params: {
  content_name?: string
  content_category?: string
  content_ids?: string[]
  content_type?: string
  value?: number
  currency?: string
}): void {
  trackEvent('ViewContent', params)
}

/**
 * Track Lead event
 */
export function trackLead(params: {
  content_name?: string
  content_category?: string
  value?: number
  currency?: string
  form_type?: string
  form_location?: string
}): void {
  trackEvent('Lead', params)
}

/**
 * Track InitiateCheckout event (form start)
 */
export function trackInitiateCheckout(params: {
  content_name?: string
  content_category?: string
  form_type?: string
  form_location?: string
}): void {
  trackEvent('InitiateCheckout', params)
}

/**
 * Track CompleteRegistration event
 */
export function trackCompleteRegistration(params: {
  content_name?: string
  status?: string
  form_type?: string
}): void {
  trackEvent('CompleteRegistration', params)
}

/**
 * Track VideoView event
 */
export function trackVideoView(params: {
  video_id: string
  video_title?: string
  video_type?: string
  video_duration?: number
  content_category?: string
}): void {
  trackEvent('VideoView', params)
}

/**
 * Track VideoPlay event
 */
export function trackVideoPlay(params: {
  video_id: string
  video_title?: string
  video_type?: string
}): void {
  trackEvent('VideoPlay', params)
}

/**
 * Track VideoProgress event
 */
export function trackVideoProgress(params: {
  video_id: string
  video_title?: string
  progress_percentage: number
  video_duration?: number
}): void {
  trackCustomEvent('VideoProgress', params)
}

/**
 * Track SocialLinkClick event
 */
export function trackSocialLinkClick(params: {
  social_platform: string
  link_url: string
  link_location?: string
}): void {
  trackCustomEvent('SocialLinkClick', params)
}

/**
 * Track ExternalLinkClick event
 */
export function trackExternalLinkClick(params: {
  link_type: 'external_article' | 'external_resource' | 'other'
  link_url: string
  content_name?: string
  link_location?: string
}): void {
  trackCustomEvent('ExternalLinkClick', params)
}

/**
 * Track ButtonClick event
 */
export function trackButtonClick(params: {
  button_name: string
  button_location: string
  content_category?: string
}): void {
  trackCustomEvent('ButtonClick', params)
}

/**
 * Track MenuOpen event
 */
export function trackMenuOpen(params: {
  menu_location: string
}): void {
  trackCustomEvent('MenuOpen', params)
}

/**
 * Track VideoGridClick event
 */
export function trackVideoGridClick(params: {
  video_id: string
  video_title?: string
  category?: string
  grid_location?: string
}): void {
  trackCustomEvent('VideoGridClick', params)
}

/**
 * Track SectionView event
 */
export function trackSectionView(params: {
  section_name: string
  page_type?: string
}): void {
  trackCustomEvent('SectionView', params)
}

/**
 * Track ScrollDepth event
 */
export function trackScrollDepth(params: {
  scroll_depth: number
  page_type?: string
  content_name?: string
}): void {
  trackCustomEvent('ScrollDepth', params)
}

/**
 * Track TimeOnPage event
 */
export function trackTimeOnPage(params: {
  time_seconds: number
  page_type?: string
  content_name?: string
}): void {
  trackCustomEvent('TimeOnPage', params)
}

/**
 * Track BlogPagination event
 */
export function trackBlogPagination(params: {
  page_number: number
  total_pages?: number
}): void {
  trackCustomEvent('BlogPagination', params)
}

/**
 * Track Search event
 */
export function trackSearch(params: {
  search_string?: string
  content_category?: string
}): void {
  trackEvent('Search', params)
}

