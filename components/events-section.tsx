"use client"

import { useMemo } from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"

type Event = {
  title: string
  eventName: string
  date: string // Format: "MM/DD/YYYY"
  time: string // Format: "H:MM AM/PM"
  location?: string
  link: string
  image: string
  alt: string
}

const events: Event[] = [
  {
    title: "Why We Are Unstoppable: The Bitcoin Revolution",
    eventName: "LABITCONF",
    date: "11/7/2025",
    time: "9:30 AM",
    location: "Buenos Aires, Argentina",
    link: "https://labitconf.com/",
    image: "/images/events/labitconf.webp",
    alt: "LABITCONF",
  },
  {
    title: "Consumer Protection Trends in Bitcoin",
    eventName: "BTC in DC",
    date: "9/30/2025",
    time: "4:45 PM",
    link: "https://btcindc.com/",
    image: "/images/events/bdc.jpg",
    location: "Washington, DC",
    alt: "BTC in DC",
  },
  {
    title: "UAE can become the next Wall Street",
    eventName: "World Blockchain Summit",
    date: "6/14/2024",
    time: "9:00 AM",
    location: "Dubai, UAE",
    link: "https://hodlsummit.com/blog/uae-can-become-the-next-wall-street-says-nick-spanos-at-world-blockchain-summit-in-dubai/?utm_source=chatgpt.com",
    image: "/images/events/world-blockchain-summit.png",
    alt: "World Blockchain Summit",
  },
  {
    title: "Shaping Frontier Technologies",
    eventName: "AIBC Summit",
    date: "2/25/2024",
    time: "9:00 AM",
    location: "Dubai, UAE",
    link: "https://sigma.world/news/aibc-eurasia-attracts-top-tier-kols-and-vip-speakers-to-dubai-event/",
    image: "/images/events/aibc.webp",
    alt: "AIBC Summit",
  },
]

function EventCard({ event }: { event: Event }) {
  const isUpcoming = useMemo(() => {
    const [month, day, year] = event.date.split("/").map(Number)
    
    // Parse time (format: "H:MM AM/PM" or "HH:MM AM/PM")
    const timeMatch = event.time.match(/(\d+):(\d+)\s*(AM|PM)/i)
    if (!timeMatch) return false
    
    let hours = parseInt(timeMatch[1], 10)
    const minutes = parseInt(timeMatch[2], 10)
    const period = timeMatch[3].toUpperCase()
    
    // Convert to 24-hour format
    if (period === "PM" && hours !== 12) {
      hours += 12
    } else if (period === "AM" && hours === 12) {
      hours = 0
    }
    
    const eventDateTime = new Date(year, month - 1, day, hours, minutes)
    const now = new Date()
    
    return eventDateTime >= now
  }, [event.date, event.time])

  return (
    <a
      href={event.link}
      target={event.link !== "#" ? "_blank" : undefined}
      rel={event.link !== "#" ? "noopener noreferrer" : undefined}
      onClick={event.link === "#" ? (e) => e.preventDefault() : undefined}
      className="group cursor-pointer h-full flex"
    >
      <div className="shadow-md shadow-black/50 border border-white/10 rounded-12 overflow-hidden bg-black/40 backdrop-blur hover:border-white/30 transition-all flex flex-col w-full">
        <div className="relative aspect-video grayscale flex-shrink-0">
          <Image
            src={event.image}
            alt={event.alt}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <div className="flex flex-col gap-2 mb-2">
            {isUpcoming ? (
              <Badge variant="outline" className="border-green-500/50 text-green-400 bg-green-500/10 w-fit text-xs">
                Upcoming
              </Badge>
            ) : (
              <Badge variant="outline" className="border-gray-500/30 text-gray-500 bg-gray-500/5 w-fit text-xs">
                Past
              </Badge>
            )}
            <span className="text-xs text-gray-500 font-mono">{event.date} • {event.time}</span>
          </div>
          <h3 className="text-base md:text-lg font-semibold mb-2 group-hover:text-gray-300 transition-colors font-content line-clamp-2">
            {event.title}
          </h3>
          <p className="text-gray-400 text-sm font-content mb-1 mt-auto">
            {event.eventName}
          </p>
          {event.location && (
            <p className="text-gray-500 text-xs font-content mb-1">
              {event.location}
            </p>
          )}
          {!event.location && <div className="mb-3" />}
          <div className="flex items-center gap-1 text-xs text-gray-500 group-hover:text-gray-300 transition-colors mt-2">
            Learn more
            <svg className="w-3 h-3 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </a>
  )
}

export default function EventsSection() {
  return (
    <section id="events-section" className="py-16 px-0">
      <div className="w-full">
        <div className="flex items-end justify-between mb-8 px-3 md:px-4 lg:px-6">
          <div>
            <Badge variant="outline" className="border-gray-400 text-gray-300 mb-3">Recent / Upcoming</Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-title text-white leading-tight">
              EVENTS
            </h2>
            <p className="text-gray-400 text-sm md:text-base mt-2 font-content">
              Join Nick Spanos at upcoming conferences and speaking engagements
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 px-3 md:px-4 lg:px-6 items-stretch">
          {events.map((event, index) => (
            <EventCard key={index} event={event} />
          ))}
        </div>
      </div>
    </section>
  )
}

