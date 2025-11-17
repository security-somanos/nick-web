"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"
import { trackLead, trackInitiateCheckout, trackCompleteRegistration } from "@/lib/facebook-pixel"

export default function BlogContactForm() {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [hasTrackedInitiate, setHasTrackedInitiate] = useState(false)

  const handleFieldInteraction = () => {
    if (!hasTrackedInitiate) {
      setHasTrackedInitiate(true)
      trackInitiateCheckout({
        content_name: "Blog Contact Form",
        content_category: "contact_form",
        form_type: "blog_contact",
        form_location: "blog_post",
      })
    }
  }

  return (
    <div className="mt-12 pt-8 border-t border-white/10">
      <div className="max-w-3xl mx-auto">
        <Badge variant="outline" className="border-gray-400 text-gray-300 mb-4">
          Get In Touch
        </Badge>
        <h2 className="text-2xl md:text-3xl font-title mb-6">CONTACT NICK SPANOS</h2>
        
        <form
          className="space-y-4"
          onSubmit={async (e) => {
            e.preventDefault()
            setSubmitError(null)
            setSubmitSuccess(false)
            setIsSubmitting(true)
            try {
              const payload = {
                full_name: fullName,
                email,
                phone,
                message,
              }
              const res = await fetch("/api/blog-contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
              })
              if (!res.ok) {
                const data = await res.json().catch(() => ({}))
                throw new Error(data?.error || `Failed with ${res.status}`)
              }
              
              // Track successful form submission
              trackLead({
                content_name: "Blog Contact Form",
                content_category: "contact_form",
                form_type: "blog_contact",
                form_location: "blog_post",
              })
              
              trackCompleteRegistration({
                content_name: "Blog Contact Form",
                status: "success",
                form_type: "blog_contact",
              })
              
              setSubmitSuccess(true)
              setFullName("")
              setEmail("")
              setPhone("")
              setMessage("")
              setHasTrackedInitiate(false)
            } catch (err: any) {
              setSubmitError(err?.message || "Submission failed")
            } finally {
              setIsSubmitting(false)
            }
          }}
        >
          <Input 
            placeholder="Full Name" 
            className="bg-transparent border-[#c0c0c0] text-[#f0f0f0] focus:border-gray-400 placeholder:text-gray-400"
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value)
              handleFieldInteraction()
            }}
            onFocus={handleFieldInteraction}
            required
          />
          <Input
            placeholder="Email"
            type="email"
            className="bg-transparent border-[#c0c0c0] text-[#f0f0f0] focus:border-gray-400 placeholder:text-gray-400"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              handleFieldInteraction()
            }}
            onFocus={handleFieldInteraction}
            required
          />
          <Input
            placeholder="Phone Number"
            className="bg-transparent border-[#c0c0c0] text-[#f0f0f0] focus:border-gray-400 placeholder:text-gray-400"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value)
              handleFieldInteraction()
            }}
            onFocus={handleFieldInteraction}
          />
          <Textarea
            placeholder="Message"
            rows={6}
            className="bg-transparent border-[#c0c0c0] text-[#f0f0f0] focus:border-gray-400 placeholder:text-gray-400 resize-none"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value)
              handleFieldInteraction()
            }}
            onFocus={handleFieldInteraction}
            required
          />
          <Button 
            type="submit"
            className="cursor-pointer w-full border border-white text-white hover:bg-white hover:text-black font-medium py-3 transition-colors"
            disabled={isSubmitting}
          >
            <Send className="mr-2 h-5 w-5" />
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>

          {submitError && (
            <div className="p-3 bg-red-500/10 border border-red-500/50 rounded text-red-400 text-sm font-content">
              {submitError}
            </div>
          )}

          {submitSuccess && (
            <div className="p-3 bg-green-500/10 border border-green-500/50 rounded text-green-400 text-sm font-content">
              Thank you! Your message has been sent successfully.
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

