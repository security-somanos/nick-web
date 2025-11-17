"use client"

import Link from "next/link"
import { trackSocialLinkClick, trackExternalLinkClick } from "@/lib/facebook-pixel"

interface TrackedLinkProps {
  href: string
  children: React.ReactNode
  className?: string
  target?: string
  rel?: string
  linkType?: "social" | "external_article" | "external_resource" | "other"
  socialPlatform?: string
  contentName?: string
  linkLocation?: string
}

export default function TrackedLink({
  href,
  children,
  className,
  target,
  rel,
  linkType = "other",
  socialPlatform,
  contentName,
  linkLocation,
}: TrackedLinkProps) {
  const handleClick = () => {
    if (linkType === "social" && socialPlatform) {
      trackSocialLinkClick({
        social_platform: socialPlatform,
        link_url: href,
        link_location: linkLocation,
      })
    } else if (linkType === "external_article" || linkType === "external_resource") {
      trackExternalLinkClick({
        link_type: linkType,
        link_url: href,
        content_name: contentName,
        link_location: linkLocation,
      })
    }
  }

  return (
    <Link
      href={href}
      className={className}
      target={target}
      rel={rel}
      onClick={handleClick}
    >
      {children}
    </Link>
  )
}

