"use client"

import { useEffect } from "react"
import NoiseEffect from "@/components/noise-effect"
import { ProfileSidebar } from "./_components/profile-sidebar"
import { HelloSection } from "./_components/hello-section"
import { ExperienceAccordion } from "./_components/experience-accordion"
import { ProjectsSection } from "./_components/projects-section"
import { EducationSection } from "./_components/education-section"
import { StakesSection } from "./_components/stakes-section"
import { ContactSection } from "./_components/contact-section"
import { FooterSection } from "./_components/footer-section"
import { trackViewContent } from "@/lib/facebook-pixel"

export default function PressPage() {
  // Track page view
  useEffect(() => {
    trackViewContent({
      content_name: "Press Page",
      content_category: "press",
      content_type: "page",
    })
  }, [])

  return (
    <>
      <NoiseEffect />
      <div className="min-h-screen text-white">
        <div className="flex flex-col lg:flex-row max-w-7xl mx-auto gap-6 lg:gap-[70px]">
          {/* Left Sidebar */}
          <div className="w-full lg:max-w-[360px] lg:w-auto p-4 lg:p-6 lg:sticky lg:top-0 lg:h-screen lg:flex-shrink-0">
            <ProfileSidebar />
          </div>

          {/* Right Content */}
          <div className="flex-1 p-4 lg:p-6 space-y-12 lg:space-y-16">
            <HelloSection />
            <ExperienceAccordion />
            <ProjectsSection />
            <EducationSection />
            <StakesSection />
            <ContactSection />
          </div>
        </div>
      </div>
      <FooterSection />
    </>
  )
}


