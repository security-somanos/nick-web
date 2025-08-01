import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, ExternalLink, Calendar, Tv, Radio, Newspaper, MapPin, Users, Award } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function NickSpanosLanding() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video autoPlay muted loop playsInline className="w-full h-full object-cover opacity-30">
            <source src="/placeholder-video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/80" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-left px-4 max-w-6xl mx-auto">
          <div className="mb-6 animate-fade-in-up">
            <Badge variant="outline" className="border-orange-500 text-orange-400 mb-4 animate-pulse">
              Bitcoin Pioneer Since 2013
            </Badge>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white animate-fade-in-up animation-delay-200">
            Nick Spanos
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed animate-fade-in-up animation-delay-400">
            Founder of Bitcoin Center NYC • Early Bitcoin Adopter • Crypto Visionary
          </p>

          <div className="bg-black/40 backdrop-blur-sm border border-orange-500/20 rounded-lg p-6 mb-8 animate-fade-in-up animation-delay-600">
            <blockquote className="text-lg md:text-xl italic text-orange-300">
              "Bitcoin isn't just a currency, it's a revolution. I've dedicated my life to building the infrastructure
              that makes this revolution accessible to everyone."
            </blockquote>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-800">
            <Button
              size="lg"
              className="bg-orange-600 hover:bg-orange-700 text-white transform hover:scale-105 transition-all duration-300"
            >
              <Play className="mr-2 h-5 w-5" />
              Watch My Story
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-orange-500 text-orange-400 hover:bg-orange-500/10 bg-transparent transform hover:scale-105 transition-all duration-300"
            >
              <ExternalLink className="mr-2 h-5 w-5" />
              Contact Me
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-orange-500 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-orange-500 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Bitcoin Center NYC Section */}
      <section className="py-20 px-4 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-left">
              <Badge variant="outline" className="border-orange-500 text-orange-400 mb-4">
                Founding Story
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Bitcoin Center NYC</h2>
              <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                In 2013, I founded the world's first Bitcoin Center in the heart of New York's Financial District.
                Located across from the NYSE, it became the epicenter of Bitcoin education, trading, and community
                building.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-orange-500" />
                  <span className="text-gray-300">40 Broad Street, Financial District, NYC</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-orange-500" />
                  <span className="text-gray-300">Thousands of visitors and Bitcoin enthusiasts</span>
                </div>
                <div className="flex items-center gap-3">
                  <Award className="h-5 w-5 text-orange-500" />
                  <span className="text-gray-300">First physical Bitcoin trading floor</span>
                </div>
              </div>
              <Button className="bg-orange-600 hover:bg-orange-700">Learn More About Bitcoin Center</Button>
            </div>
            <div className="relative animate-fade-in-right">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Bitcoin Center NYC"
                width={600}
                height={400}
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Media Appearances Section */}
      <section className="py-20 px-4 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="outline" className="border-orange-500 text-orange-400 mb-4">
              In The Spotlight
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Media Appearances</h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Featured across major media outlets sharing insights on Bitcoin, cryptocurrency, and the future of
              finance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                type: "TV",
                outlet: "CNBC",
                title: "Bitcoin's Future in Traditional Finance",
                date: "2024",
                icon: Tv,
              },
              {
                type: "Podcast",
                outlet: "The Bitcoin Podcast",
                title: "Building Bitcoin Infrastructure",
                date: "2024",
                icon: Radio,
              },
              {
                type: "Article",
                outlet: "CoinDesk",
                title: "The Evolution of Bitcoin Centers",
                date: "2023",
                icon: Newspaper,
              },
              {
                type: "TV",
                outlet: "Bloomberg",
                title: "Cryptocurrency Regulation Discussion",
                date: "2023",
                icon: Tv,
              },
              {
                type: "Podcast",
                outlet: "Unchained",
                title: "Early Bitcoin Adoption Stories",
                date: "2023",
                icon: Radio,
              },
              {
                type: "Article",
                outlet: "Bitcoin Magazine",
                title: "The NYC Bitcoin Scene",
                date: "2023",
                icon: Newspaper,
              },
            ].map((item, index) => (
              <Card
                key={index}
                className={`bg-black/50 border-gray-800 hover:border-orange-500/50 transition-all duration-500 group cursor-pointer transform hover:scale-105 animate-fade-in-up animation-delay-${index * 100}`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-orange-500/10 rounded-lg group-hover:bg-orange-500/20 transition-colors">
                      <item.icon className="h-5 w-5 text-orange-500" />
                    </div>
                    <div>
                      <Badge variant="secondary" className="bg-gray-800 text-gray-300">
                        {item.type}
                      </Badge>
                    </div>
                  </div>
                  <h3 className="font-semibold text-white mb-2 group-hover:text-orange-400 transition-colors">
                    {item.outlet}
                  </h3>
                  <p className="text-gray-300 text-sm mb-3">{item.title}</p>
                  <p className="text-gray-500 text-xs">{item.date}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-20 px-4 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <blockquote className="text-2xl md:text-3xl font-light italic text-white mb-6 leading-relaxed">
            "The future belongs to those who understand that Bitcoin is more than technology—it's the foundation of a
            new economic paradigm. Every day, we're building that future."
          </blockquote>
          <cite className="text-orange-400 font-semibold">— Nick Spanos</cite>
        </div>
      </section>

      {/* Conferences Timeline Section */}
      <section className="py-20 px-4 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="outline" className="border-orange-500 text-orange-400 mb-4 animate-bounce">
              Speaking Engagements
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white animate-fade-in-up">Conferences & Events</h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
              Sharing knowledge and insights at premier Bitcoin and cryptocurrency conferences worldwide.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-orange-500 h-full animate-pulse"></div>

            {/* Upcoming Events */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-orange-400 text-center mb-8 animate-fade-in-left">
                Upcoming Events
              </h3>

              <div className="space-y-8">
                {[
                  {
                    name: "Bitcoin 2025",
                    location: "Las Vegas, NV",
                    date: "July 2025",
                    role: "Keynote Speaker",
                    topic: "The Next Decade of Bitcoin Infrastructure",
                    side: "left",
                  },
                  {
                    name: "Consensus 2025",
                    location: "Austin, TX",
                    date: "May 2025",
                    role: "Panel Discussion",
                    topic: "Building Sustainable Bitcoin Communities",
                    side: "right",
                  },
                ].map((event, index) => (
                  <div
                    key={index}
                    className={`flex items-center ${event.side === "left" ? "justify-start" : "justify-end"} animate-slide-in-${event.side} animation-delay-${(index + 1) * 200}`}
                  >
                    <Card
                      className={`w-full max-w-md bg-black border-gray-800 hover:border-orange-500 transition-all duration-500 transform hover:scale-105 ${event.side === "right" ? "mr-8" : "ml-8"}`}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <Badge className="bg-green-500/10 text-green-400 border-green-500/20 animate-pulse">
                            Upcoming
                          </Badge>
                          <Badge className="bg-orange-500/10 text-orange-400 border-orange-500/20">{event.role}</Badge>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">{event.name}</h3>
                        <div className="flex items-center gap-2 text-gray-400 mb-1">
                          <MapPin className="h-4 w-4" />
                          <span className="text-sm">{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400 mb-3">
                          <Calendar className="h-4 w-4" />
                          <span className="text-sm">{event.date}</span>
                        </div>
                        <p className="text-gray-300 mb-4">{event.topic}</p>
                        <Button
                          size="sm"
                          className="bg-orange-600 hover:bg-orange-700 transform hover:scale-105 transition-all duration-300"
                        >
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Learn More
                        </Button>
                      </CardContent>
                    </Card>

                    {/* Timeline Dot */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-green-500 rounded-full border-4 border-gray-900 animate-ping"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Past Events */}
            <div>
              <h3 className="text-2xl font-bold text-gray-400 text-center mb-8 animate-fade-in-right">Past Events</h3>

              <div className="space-y-8">
                {[
                  {
                    name: "Bitcoin 2024",
                    location: "Nashville, TN",
                    date: "July 2024",
                    role: "Keynote Speaker",
                    topic: "The Evolution of Bitcoin Infrastructure",
                    side: "right",
                  },
                  {
                    name: "Consensus 2024",
                    location: "Austin, TX",
                    date: "May 2024",
                    role: "Panel Discussion",
                    topic: "Building Bitcoin Communities",
                    side: "left",
                  },
                  {
                    name: "Bitcoin Miami",
                    location: "Miami, FL",
                    date: "April 2024",
                    role: "Workshop Leader",
                    topic: "Setting Up Bitcoin Centers",
                    side: "right",
                  },
                  {
                    name: "Adopting Bitcoin",
                    location: "San Salvador, El Salvador",
                    date: "November 2023",
                    role: "Featured Speaker",
                    topic: "Global Bitcoin Adoption",
                    side: "left",
                  },
                ].map((event, index) => (
                  <div
                    key={index}
                    className={`flex items-center ${event.side === "left" ? "justify-start" : "justify-end"} animate-slide-in-${event.side} animation-delay-${(index + 3) * 200}`}
                  >
                    <Card
                      className={`w-full max-w-md bg-gray-800 border-gray-700 hover:border-gray-600 transition-all duration-500 transform hover:scale-105 ${event.side === "right" ? "mr-8" : "ml-8"}`}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <Badge className="bg-gray-500/10 text-gray-400 border-gray-500/20">Past</Badge>
                          <Badge className="bg-orange-500/10 text-orange-400 border-orange-500/20">{event.role}</Badge>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">{event.name}</h3>
                        <div className="flex items-center gap-2 text-gray-400 mb-1">
                          <MapPin className="h-4 w-4" />
                          <span className="text-sm">{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400 mb-3">
                          <Calendar className="h-4 w-4" />
                          <span className="text-sm">{event.date}</span>
                        </div>
                        <p className="text-gray-300 mb-4">{event.topic}</p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-gray-600 text-gray-400 hover:bg-gray-700 transform hover:scale-105 transition-all duration-300 bg-transparent"
                        >
                          <ExternalLink className="mr-2 h-4 w-4" />
                          View Recap
                        </Button>
                      </CardContent>
                    </Card>

                    {/* Timeline Dot */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gray-500 rounded-full border-4 border-gray-900"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-12 px-4 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4 bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                Nick Spanos
              </h3>
              <p className="text-gray-400 mb-4">
                Bitcoin pioneer, educator, and community builder dedicated to advancing cryptocurrency adoption
                worldwide.
              </p>
              <div className="flex gap-4">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-orange-500/50 text-orange-400 hover:bg-orange-500/10 bg-transparent"
                >
                  Twitter
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-orange-500/50 text-orange-400 hover:bg-orange-500/10 bg-transparent"
                >
                  LinkedIn
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-orange-500/50 text-orange-400 hover:bg-orange-500/10 bg-transparent"
                >
                  YouTube
                </Button>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-orange-400 transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-orange-400 transition-colors">
                    Bitcoin Center NYC
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-orange-400 transition-colors">
                    Speaking
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-orange-400 transition-colors">
                    Media Kit
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Speaking Inquiries</li>
                <li>Media Requests</li>
                <li>Collaboration</li>
                <li>
                  <Button className="mt-2 bg-orange-600 hover:bg-orange-700">Get In Touch</Button>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-500">
              © {new Date().getFullYear()} Nick Spanos. All rights reserved. | Building the future of Bitcoin, one block
              at a time.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
