import Link from "next/link"
import { Badge } from "@/components/ui/badge"

export default function BlogPostNotFound() {
  return (
    <div className="min-h-screen text-white pt-24 md:pt-32">
      <div className="max-w-4xl mx-auto px-6 pb-16">
        <div className="mb-8">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-200 transition-colors font-mono group">
            <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>
        </div>

        <div className="text-center py-20">
          <Badge variant="outline" className="border-gray-400 text-gray-300 mb-6">
            404
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-title mb-6">
            POST NOT FOUND
          </h1>
          <p className="text-gray-400 text-lg font-content mb-8 max-w-2xl mx-auto">
            The blog post you're looking for doesn't exist or has been removed.
          </p>
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-gray-600 text-gray-200 hover:border-gray-300 hover:bg-white/5 transition-all font-mono"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            View all articles
          </Link>
        </div>
      </div>
    </div>
  )
}


