"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Mail, Phone, MapPin, Send, ArrowLeft, FileText, User, Building, MessageSquare, Link as LinkIcon } from "lucide-react"
import { FaArrowRight, FaExclamationTriangle, FaRegClock, FaFacebook, FaInstagram, FaYoutube, FaLinkedin, FaTelegram, FaTwitter } from "react-icons/fa"
import { SiClubhouse } from "react-icons/si"
import Link from "next/link"
import NoiseEffect from "@/components/noise-effect"
import { useState } from "react"
import Footer from "@/components/layout/footer";

export default function ContactPage() {
  const [hasInteracted, setHasInteracted] = useState<string>("")
  const [showTooltip, setShowTooltip] = useState(false)
  return (
    <div className="min-h-screen text-white overflow-x-hidden">
      {/* Noise Effect */}
      <NoiseEffect />

      {/* Header */}
      <header className="mt-8 ms-4 lg:ms-6 flex justify-between">
        <Link href="/" className="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors w-auto">
          <ArrowLeft className="w-5 h-5" />
          <span className="font-impact">BACK TO HOME</span>
        </Link>
        <div className="flex items-center me-4 lg:me-8">
          <div className="relative">
            <FaExclamationTriangle 
              className="w-8 h-8 text-white cursor-help" 
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              onTouchStart={() => setShowTooltip(!showTooltip)}
            />
            {showTooltip && (
              <div className="absolute top-full right-0 mt-2 px-3 py-2 bg-[#1f1f1f] text-white text-sm rounded-lg whitespace-nowrap z-50">
                serious proposals only
                <div className="absolute bottom-full right-4 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-4xl 2xl:max-w-5xl mx-auto">
          {/* Header Section */}
                     <div className="text-center mb-16">
             <Badge variant="outline" className="border-gray-400 mx-auto text-gray-300 mb-6 flex items-center gap-2">
               <FaExclamationTriangle className="w-4 h-4" />
               Serious Inquiries Only
             </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white font-impact">
              PROPOSAL SUBMISSION
            </h1>
            <p className="text-md text-gray-300 max-w-3xl mx-auto font-content mb-2">
              Please use this form only for serious proposals or invitations aligned with Nick Spanos' work in Blockchain, Web3, or purpose-driven innovation.
            </p>
            <p className="text-sm text-gray-400 max-w-2xl mx-auto font-content">
            The best way to connect and interact with Nick’s latest media appearances is through his social media channels.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="space-y-8 bg-[#1f1f1f] p-6 rounded-lg border border-[#3a3a3a]">
                             <div>
                 <Badge variant="outline" className="text-lg py-1 px-4 border-gray-400 text-gray-300 mb-6 flex items-center gap-2">
                   <div>
                   <FileText className="w-5 h-5" />
                   </div>
                   <span className="text-lg">Submit Your Proposal</span>
                 </Badge>
                <form className="space-y-6">
                  {/* Full Name */}
                  <div>
                    <Label htmlFor="fullName" className="text-white font-impact flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Full Name *
                    </Label>
                    <Input 
                      id="fullName" 
                      type="text" 
                      className="mt-3 bg-transparent border-[#c0c0c0] text-[#f0f0f0] focus:border-gray-400"
                      placeholder="Your full name"
                      required
                    />
                  </div>

                                     {/* Company / Affiliation */}
                   <div>
                     <Label htmlFor="company" className="text-white font-impact flex items-center gap-2">
                       <Building className="w-4 h-4" />
                       Company / Affiliation
                     </Label>
                     <Input 
                       id="company" 
                       type="text" 
                       className="mt-3 bg-transparent border-[#c0c0c0] text-[#f0f0f0] focus:border-gray-400"
                       placeholder="Company name or 'Independent'"
                     />
                   </div>

                   {/* Email */}
                   <div>
                     <Label htmlFor="email" className="text-white font-impact flex items-center gap-2">
                       <Mail className="w-4 h-4" />
                       Email Address *
                     </Label>
                     <Input 
                       id="email" 
                       type="email" 
                       className="mt-3 bg-transparent border-[#c0c0c0] text-[#f0f0f0] focus:border-gray-400"
                       placeholder="your.email@example.com"
                       required
                     />
                   </div>

                   {/* Phone / Telegram / X */}
                   <div>
                     <Label htmlFor="contact" className="text-white font-impact flex items-center gap-2">
                       <Phone className="w-4 h-4" />
                       Phone / Telegram / X (Optional)
                     </Label>
                     <Input 
                       id="contact" 
                       type="text" 
                       className="mt-3 bg-transparent border-[#c0c0c0] text-[#f0f0f0] focus:border-gray-400"
                       placeholder="For faster follow-up"
                     />
                   </div>

                   {/* Type of Proposal */}
                   <div>
                     <Label htmlFor="proposalType" className="text-white font-impact flex items-center gap-2">
                       <FileText className="w-4 h-4" />
                       Type of Proposal *
                     </Label>
                     <Select required>
                       <SelectTrigger className="cursor-pointer w-full mt-3 bg-transparent border-[#c0c0c0] text-[#f0f0f0] focus:border-gray-400">
                         <SelectValue placeholder="Select proposal type" />
                       </SelectTrigger>
                       <SelectContent className="bg-[#1f1f1f] border-[#c0c0c0] text-[#f0f0f0]">
                         <SelectItem value="speaking">Speaking Invitation</SelectItem>
                         <SelectItem value="panel">Panel Collaboration</SelectItem>
                         <SelectItem value="podcast">Podcast Guest</SelectItem>
                         <SelectItem value="investment">Investment Proposal</SelectItem>
                         <SelectItem value="tech">Tech/Product Pitch</SelectItem>
                         <SelectItem value="partnership">Strategic Partnership</SelectItem>
                         <SelectItem value="press">Press/Media Inquiry</SelectItem>
                         <SelectItem value="other">Other</SelectItem>
                       </SelectContent>
                     </Select>
                   </div>

                   {/* Subject */}
                   <div>
                     <Label htmlFor="subject" className="text-white font-impact flex items-center gap-2">
                       <MessageSquare className="w-4 h-4" />
                       Subject or Title of Proposal *
                     </Label>
                                          <Input 
                        id="subject" 
                        type="text" 
                        className="mt-3 !normal-case bg-transparent border-[#c0c0c0] text-[#f0f0f0] focus:border-gray-400"
                        placeholder="Brief title of your proposal"
                        required
                      />
                   </div>

                   {/* Detailed Message */}
                   <div>
                     <Label htmlFor="message" className="text-white font-impact flex items-center gap-2">
                       <MessageSquare className="w-4 h-4" />
                       Detailed Message / Proposal Overview *
                     </Label>
                                          <Textarea 
                        id="message" 
                        rows={8}
                        className="mt-3 !normal-case bg-transparent border-[#c0c0c0] text-[#f0f0f0] focus:border-gray-400 resize-none"
                        placeholder="Please include who you are, what you're proposing, and why you believe it aligns with Nick's values or vision..."
                        required
                      />
                   </div>

                   {/* Relevant Links */}
                   <div>
                     <Label htmlFor="links" className="text-white font-impact flex items-center gap-2">
                       <LinkIcon className="w-4 h-4" />
                       Relevant Links (Optional)
                     </Label>
                                          <Textarea 
                        id="links" 
                        rows={3}
                        className="mt-3 !normal-case bg-transparent border-[#c0c0c0] text-[#f0f0f0] focus:border-gray-400 resize-none"
                        placeholder="LinkedIn, company site, pitch deck, X profile, etc."
                      />
                   </div>

                                     {/* Previous Interaction */}
                   <div>
                     <Label className="text-white font-impact mb-3 block">
                       Have you met or interacted with Nick Spanos before?
                     </Label>
                     <div className="flex gap-4">
                       <div className="flex items-center space-x-2">
                         <input 
                           type="radio" 
                           id="interaction-yes" 
                           name="interaction" 
                           value="yes" 
                           className="text-gray-400"
                           checked={hasInteracted === "yes"}
                           onChange={(e) => setHasInteracted(e.target.value)}
                         />
                         <Label htmlFor="interaction-yes" className="text-gray-300">Yes</Label>
                       </div>
                       <div className="flex items-center space-x-2">
                         <input 
                           type="radio" 
                           id="interaction-no" 
                           name="interaction" 
                           value="no" 
                           className="text-gray-400"
                           checked={hasInteracted === "no"}
                           onChange={(e) => setHasInteracted(e.target.value)}
                         />
                         <Label htmlFor="interaction-no" className="text-gray-300">No</Label>
                       </div>
                     </div>
                                           {hasInteracted === "yes" && (
                        <Textarea 
                          id="interaction-details" 
                          rows={3}
                          className="mt-3 !normal-case bg-[#e0e0e0] border-[#2a2a2a] text-[#101010] focus:border-gray-400 resize-none"
                          placeholder="Please explain when and how you met or interacted..."
                        />
                      )}
                   </div>

                  {/* Serious Business Checkbox */}
                  <div className="flex items-start space-x-3 pt-4">
                    <Checkbox id="serious-business" className="mt-1" />
                    <Label htmlFor="serious-business" className="text-gray-300 text-sm leading-relaxed">
                      I understand this is for serious business inquiries only. Spam, personal messages, and unrelated requests will be ignored.
                    </Label>
                  </div>
                  
                  <Button 
                    type="submit" 
                    size="lg"
                    variant="outlineTech"
                    className="w-full font-impact"
                  >
                    <Send className="mr-2 h-5 w-5" />
                    Submit Proposal
                  </Button>
                </form>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div className="hidden">
                <h2 className="text-3xl font-bold text-white mb-6 font-impact">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white font-impact mb-1">Email</h3>
                      <a href="mailto:nick@cryptos.com" className="text-gray-300 hover:text-white transition-colors">
                        nick@cryptos.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white font-impact mb-1">Phone</h3>
                      <a href="tel:+1234567890" className="text-gray-300 hover:text-white transition-colors">
                        +1 (234) 567-8900
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0">
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

                                                           {/* Auto-responder Notice */}
                <Card className="bg-[#222222] border-[#3a3a3a]">
                  <CardContent className="px-6 pt-0 pb-2">
                    <Badge variant="outline" className="border-gray-400 text-gray-300 mb-4 flex items-center gap-2">
                      <FaRegClock className="w-4 h-4" />
                      What Happens Next?
                      <FaArrowRight className="w-4 h-4" />
                    </Badge>
                    <p className="text-gray-300 mb-4 font-content text-sm text-pretty">
                      After submission, you'll receive an auto-response confirming receipt. If your proposal is relevant, someone from Nick's team will get back to you within 7–10 business days.
                    </p>
                    <div className="bg-[#4f4f4f] p-4 rounded-lg">
                      <p className="text-xs text-[#e0e0e0] font-content">
                        <strong>Note:</strong> This form is for serious business inquiries only. Personal messages and spam will be ignored.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                                                            {/* Alternative Contact */}
                 <Card className="bg-[#222222] border-[#3a3a3a]">
                   <CardContent className="px-6 pt-0 pb-2">
                     <Badge variant="outline" className="border-gray-400 text-gray-300 mb-4 flex items-center gap-2">
                       <Mail className="w-4 h-4" />
                       Join the Conversation
                       <FaArrowRight className="w-4 h-4" />
                     </Badge>
                     <p className="text-gray-300 mb-4 font-content text-sm text-pretty">
                      If you'd like to share your thoughts, or support Nick's latest interviews and media appearances, the best way is through his social media channels.
                     </p>
                     <div className="flex gap-4 justify-center">
                       <Link href="https://www.facebook.com/RealNickSpanos" target="_blank" rel="noopener noreferrer">
                         <FaFacebook className="w-5 h-5 text-[#dadada] hover:text-[#fafafa] transition-colors" />
                       </Link>
                       <Link href="https://instagram.com/realnickspanos" target="_blank" rel="noopener noreferrer">
                         <FaInstagram className="w-5 h-5 text-[#dadada] hover:text-[#fafafa] transition-colors" />
                       </Link>
                       <Link href="https://www.youtube.com/channel/UCOznMq4wNdaHYsOb2LUCGjg" target="_blank" rel="noopener noreferrer">
                         <FaYoutube className="w-5 h-5 text-[#dadada] hover:text-[#fafafa] transition-colors" />
                       </Link>
                       <Link href="https://www.linkedin.com/in/nick-spanos/" target="_blank" rel="noopener noreferrer">
                         <FaLinkedin className="w-5 h-5 text-[#dadada] hover:text-[#fafafa] transition-colors" />
                       </Link>
                       <Link href="https://www.clubhouse.com/@nickspanos" target="_blank" rel="noopener noreferrer">
                         <SiClubhouse className="w-5 h-5 text-[#dadada] hover:text-[#fafafa] transition-colors" />
                       </Link>
                       <Link href="https://t.me/bitcoin_for_sale" target="_blank" rel="noopener noreferrer">
                         <FaTelegram className="w-5 h-5 text-[#dadada] hover:text-[#fafafa] transition-colors" />
                       </Link>
                       <Link href="https://x.com/nickspanos" target="_blank" rel="noopener noreferrer">
                         <FaTwitter className="w-5 h-5 text-[#dadada] hover:text-[#fafafa] transition-colors" />
                       </Link>
                     </div>
                   </CardContent>
                 </Card>

                {/* Important Disclaimer */}
                <Card className="bg-[#222222] border-[#3a3a3a]">
                  <CardContent className="px-6 pt-0 pb-2">
                    <Badge variant="outline" className="border-gray-400 text-gray-300 mb-4 flex items-center gap-2">
                      <FaExclamationTriangle className="w-4 h-4" />
                      Important Disclaimer
                    </Badge>
                    <p className="text-gray-300 font-content text-sm leading-relaxed">
                      Please note: Nick Spanos will never direct message you first, ask for money, offer financial advice, or promote investment opportunities via private messages. If you receive such messages, they are not from him — please report and ignore them.
                    </p>
                  </CardContent>
                </Card>
                          </div>
            </div>
         </div>
       </div>
      <Footer />
     </div>
   )
} 