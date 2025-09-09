import { GraduationCap } from "lucide-react"

export function EducationSection() {
  const education = [
    {
      title: "UI/UX Design Certification",
      institution: "Interaction Design Foundation, Online",
      period: "2018 - 2019",
      description:
        "Gained hands-on experience in UX research, prototyping, wireframing, and usability testing, focusing on designing seamless, user-friendly digital experiences.",
    },
    {
      title: "Bachelor of Design in Interaction Design",
      institution: "National University of Singapore, Singapore",
      period: "2015 - 2017",
      description:
        "Completed a comprehensive program focused on designing user-centered digital products, integrating aesthetics and functionality through practical interaction design principles.",
    },
  ]

  return (
    <section id="education" className="space-y-8 hidden">
      <div className="flex items-center gap-3">
        <GraduationCap className="w-6 h-6" />
        <h2 className="text-2xl font-bold">Education</h2>
      </div>

      <div className="space-y-6">
        {education.map((edu, index) => (
          <div key={index} className="bg-[#101010] border border-[#ffffff1a] rounded-2xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold mb-1">{edu.title}</h3>
                <p className="text-gray-400">{edu.institution}</p>
              </div>
              <span className="bg-gray-800 px-3 py-1 rounded-lg text-sm text-gray-300">{edu.period}</span>
            </div>
            <p className="text-gray-400 leading-relaxed">{edu.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}


