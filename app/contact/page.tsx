"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, Phone, MapPin, Send, ArrowLeft } from "lucide-react"
import Link from "next/link"
import NoiseEffect from "@/components/noise-effect"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Noise Effect */}
      <NoiseEffect />
      
      {/* Header */}
      <header className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50 mt-8">
        <Link href="/" className="flex items-center space-x-2 text-white hover:text-orange-400 transition-colors">
          <ArrowLeft className="w-5 h-5" />
          <span className="font-impact">BACK TO HOME</span>
        </Link>
      </header>

      {/* Main Content */}
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <Badge variant="outline" className="border-orange-500 text-orange-400 mb-6">
              Get In Touch
            </Badge>
                         <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white font-impact">
               CONTACT
             </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto font-content">
              Ready to discuss Bitcoin, blockchain, or collaboration opportunities? 
              Let's connect and build the future together.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="space-y-8">
              <div>
                                 <h2 className="text-3xl font-bold text-white mb-6 font-impact">Send a Message</h2>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-white font-impact">First Name</Label>
                      <Input 
                        id="firstName" 
                        type="text" 
                        className="mt-2 bg-black border-gray-700 text-white focus:border-orange-500"
                        placeholder="Your first name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-white font-impact">Last Name</Label>
                      <Input 
                        id="lastName" 
                        type="text" 
                        className="mt-2 bg-black border-gray-700 text-white focus:border-orange-500"
                        placeholder="Your last name"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="text-white font-impact">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      className="mt-2 bg-black border-gray-700 text-white focus:border-orange-500"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="subject" className="text-white font-impact">Subject</Label>
                    <Input 
                      id="subject" 
                      type="text" 
                      className="mt-2 bg-black border-gray-700 text-white focus:border-orange-500"
                      placeholder="What's this about?"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="message" className="text-white font-impact">Message</Label>
                    <Textarea 
                      id="message" 
                      rows={6}
                      className="mt-2 bg-black border-gray-700 text-white focus:border-orange-500 resize-none"
                      placeholder="Tell me more about your inquiry..."
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    size="lg"
                    className="w-full bg-orange-600 hover:bg-orange-700 font-impact"
                  >
                    <Send className="mr-2 h-5 w-5" />
                    Send Message
                  </Button>
                </form>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                                 <h2 className="text-3xl font-bold text-white mb-6 font-impact">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white font-impact mb-1">Email</h3>
                      <a href="mailto:nick@cryptos.com" className="text-orange-400 hover:text-orange-300 transition-colors">
                        nick@cryptos.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white font-impact mb-1">Phone</h3>
                      <a href="tel:+1234567890" className="text-orange-400 hover:text-orange-300 transition-colors">
                        +1 (234) 567-8900
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white font-impact mb-1">Location</h3>
                      <p className="text-gray-300">
                        New York, NY<br />
                        United States
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Contact Card */}
              <Card className="bg-black border-gray-800">
                <CardContent className="p-6">
                                     <h3 className="text-xl font-bold text-white mb-4 font-impact">Speaking Inquiries</h3>
                  <p className="text-gray-300 mb-4 font-content">
                    Interested in having Nick speak at your event? Get in touch for availability and topics.
                  </p>
                  <Button 
                    variant="outline" 
                    className="border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-black font-impact"
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Request Speaking
                  </Button>
                </CardContent>
              </Card>

              {/* Media Kit Card */}
              <Card className="bg-black border-gray-800">
                <CardContent className="p-6">
                                     <h3 className="text-xl font-bold text-white mb-4 font-impact">Media Kit</h3>
                  <p className="text-gray-300 mb-4 font-content">
                    Press materials, high-res photos, and bio information for media coverage.
                  </p>
                  <Button 
                    variant="outline" 
                    className="border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-black font-impact"
                  >
                    Download Media Kit
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 