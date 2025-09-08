import { MessageCircle, Mail, Send, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function ContactSection() {
  return (
    <section className="space-y-8">
      <div className="flex items-center gap-3">
        <MessageCircle size={24} />
        <h2 className="text-2xl font-bold">Contact</h2>
      </div>


      <div className="grid grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="space-y-6">
          <div className="bg-[#101010] border border-[#ffffff1a] rounded-2xl p-3 flex items-center gap-4">
            <div className="w-12 h-12 border border-white rounded-xl flex items-center justify-center">
              <Mail size={24} className="text-white" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Media Contact</p>
              <a href="mailto:media@nickspanos.com" className="font-semibold">media@nickspanos.com</a>
            </div>
          </div>
          <div className="bg-[#101010] border border-[#ffffff1a] rounded-2xl p-3 flex items-center gap-4">
            <div className="w-12 h-12 border border-white rounded-xl flex items-center justify-center">
              <Globe size={24} className="text-white" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Official Website</p>
              <a href="https://www.nickspanos.com" className="font-semibold">www.nickspanos.com</a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="space-y-4">
          <Input placeholder="Full Name" className="bg-transparent border-[#c0c0c0] text-[#f0f0f0] focus:border-gray-400 placeholder:text-gray-400" />
          <Input
            placeholder="Email"
            type="email"
            className="bg-transparent border-[#c0c0c0] text-[#f0f0f0] focus:border-gray-400 placeholder:text-gray-400"
          />
          <Input
            placeholder="Phone Number"
            className="bg-transparent border-[#c0c0c0] text-[#f0f0f0] focus:border-gray-400 placeholder:text-gray-400"
          />
          <Textarea
            placeholder="Message"
            rows={6}
            className="bg-transparent border-[#c0c0c0] text-[#f0f0f0] focus:border-gray-400 placeholder:text-gray-400 resize-none"
          />
          <Button className="cursor-pointer w-full border border-white text-white hover:bg-white hover:text-black font-medium py-3 transition-colors">
            <Send className="mr-2 h-5 w-5" />
            Send Message
          </Button>
        </div>
      </div>

    </section>
  )
}