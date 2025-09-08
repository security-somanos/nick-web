import { Button } from "@/components/ui/button"
import { FaFacebook, FaInstagram, FaLinkedin, FaTelegram, FaXTwitter, FaYoutube } from "react-icons/fa6"
import { SiClubhouse } from "react-icons/si"
import Link from "next/link"

export function FooterSection() {
  return (
    <footer className="pt-12 pb-4 px-4">
      <div className="max-w-6xl mx-auto">

        <div className="border-t border-[#252525] pt-4 text-center">
          <p className="text-gray-500 font-content text-sm">
            © {new Date().getFullYear()} Nick Spanos. All rights reserved. <br className="block md:hidden"/><span className="hidden md:inline">|</span> Building the future of
            Bitcoin, <br className="block md:hidden"/> one block
            at a time.
          </p>
        </div>
      </div>
    </footer>
  )
}
