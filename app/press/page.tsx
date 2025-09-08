import NoiseEffect from "@/components/noise-effect"
import { ProfileSidebar } from "./_components/profile-sidebar"
import { HelloSection } from "./_components/hello-section"
import { ExperienceSection } from "./_components/experience-section"
import { ProjectsSection } from "./_components/projects-section"
import { EducationSection } from "./_components/education-section"
import { StakesSection } from "./_components/stakes-section"
import { ContactSection } from "./_components/contact-section"
import { FooterSection } from "./_components/footer-section"

export default function PressPage() {
  return (
    <>
      <NoiseEffect />
      <div className="min-h-screen text-white">
        <div className="flex max-w-7xl mx-auto gap-[70px]">
          {/* Left Sidebar */}
          <div className="max-w-[360px] w-full p-6 sticky top-0 h-screen flex-shrink-0">
            <ProfileSidebar />
          </div>

          {/* Right Content */}
          <div className="flex-1 p-6 space-y-16">
            <HelloSection />
            <ExperienceSection />
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


