import { Button } from "@/components/ui/button"
import { Download, User, Briefcase, GraduationCap, Building, MessageSquare, Home, Star } from "lucide-react"
import { FaFacebook, FaInstagram, FaYoutube, FaLinkedin, FaTelegram, FaXTwitter } from "react-icons/fa6"
import { SiClubhouse } from "react-icons/si"
import Image from "next/image"
import Link from "next/link"

export function ProfileSidebar() {
  return (
    <div className="bg-[#1a1a1a] border border-[#ffffff1a] rounded-3xl p-6 h-fit">
      {/* Profile Image */}
      <div className="relative mb-6">
        <div className="w-full aspect-square rounded-2xl overflow-hidden bg-gray-800">
          <Image
            src="/press/nick-spanos.png"
            alt="Nick Spanos"
            width={300}
            height={300}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Name */}
      <h1 className="text-2xl font-bold text-center">Nick Spanos</h1>
    <div className="text-center text-xs text-gray-400 mb-6">Blockchain Pioneer</div>

      {/* Social Icons */}
      <div className="flex justify-center gap-3 mb-6">
        <Link href="https://www.facebook.com/RealNickSpanos" target="_blank" rel="noopener noreferrer">
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-transparent cursor-pointer p-0">
            <FaFacebook size={20} />
          </Button>
        </Link>
        <Link href="https://instagram.com/realnickspanos" target="_blank" rel="noopener noreferrer">
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-transparent cursor-pointer p-0">
            <FaInstagram size={20} />
          </Button>
        </Link>
        <Link href="https://www.youtube.com/channel/UCOznMq4wNdaHYsOb2LUCGjg" target="_blank" rel="noopener noreferrer">
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-transparent cursor-pointer p-0">
            <FaYoutube size={20} />
          </Button>
        </Link>
        <Link href="https://www.linkedin.com/in/nick-spanos/" target="_blank" rel="noopener noreferrer">
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-transparent cursor-pointer p-0">
            <FaLinkedin size={20} />
          </Button>
        </Link>
        <Link href="https://www.clubhouse.com/@nickspanos" target="_blank" rel="noopener noreferrer">
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-transparent cursor-pointer p-0">
            <SiClubhouse size={20} />
          </Button>
        </Link>
        <Link href="https://x.com/nickspanos" target="_blank" rel="noopener noreferrer">
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-transparent cursor-pointer p-0">
            <FaXTwitter size={20} />
          </Button>
        </Link>
      </div>

      {/* Navigation Menu */}
      <div className="space-y-3">
        <Button 
          className="cursor-pointer w-full border border-white text-white hover:bg-white hover:text-black font-medium transition-colors"
          onClick={() => document.getElementById('hello')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <Home size={16} className="mr-2" />
          About
        </Button>
        <Button 
          className="cursor-pointer w-full border border-white text-white hover:bg-white hover:text-black font-medium transition-colors"
          onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <Star size={16} className="mr-2" />
          Key Highlights & Stats
        </Button>
        <Button 
          className="cursor-pointer w-full border border-white text-white hover:bg-white hover:text-black font-medium transition-colors"
          onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <Building size={16} className="mr-2" />
          Merchandising
        </Button>
        <Button 
          className="cursor-pointer w-full border border-white text-white hover:bg-white hover:text-black font-medium transition-colors"
          onClick={() => document.getElementById('stakes')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <MessageSquare size={16} className="mr-2" />
          Media partners
        </Button>
        <Button 
          className="cursor-pointer w-full border border-white text-white hover:bg-white hover:text-black font-medium transition-colors"
          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <MessageSquare size={16} className="mr-2" />
          Contact
        </Button>
      </div>
    </div>
  )
}


