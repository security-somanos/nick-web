import type { Metadata } from "next"
import Link from "next/link"
import sanitizeHtml from "sanitize-html"
import { fetchPosts } from "@/lib/wp"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Blog - Nick Spanos | Bitcoin Pioneer & Blockchain Insights",
  description: "Latest writings on Bitcoin, blockchain, and the future of finance from Nick Spanos, Bitcoin pioneer and founder of Bitcoin Center NYC.",
}

export const revalidate = 60

function formatDate(input?: string) {
  if (!input) return ""
  try {
    return new Intl.DateTimeFormat("en-US", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(input))
  } catch {
    return input
  }
}

export default async function BlogIndexPage({ searchParams }: { searchParams?: Promise<{ page?: string }> }) {
  const sp = (await searchParams) || {}
  const page = Number(sp.page || 1)
  const perPage = 12
  const { data: posts, totalPages } = await fetchPosts({ page, perPage })

  return (
    <div className="min-h-screen text-white pt-24 md:pt-32">
      <div className="max-w-6xl mx-auto px-6 pb-16">
        <div className="mb-6">
          <Link href="/">
            <Button variant="outlineTech" size="sm" className="border-gray-400 text-gray-300 hover:bg-gray-400 hover:text-black transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Site
            </Button>
          </Link>
        </div>
        
        <div className="mb-12">
          <Badge variant="outline" className="border-gray-400 text-gray-300 mb-4">
            Insights & Updates
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-title mb-4">BLOG</h1>
          <p className="text-gray-400 text-lg font-content">Latest writings on Bitcoin, blockchain, and the future of finance.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <article key={post.id} className="group shadow-md shadow-black/50 border border-white/10 rounded-12 overflow-hidden bg-black/40 backdrop-blur hover:border-white/30 transition-all">
              <Link href={`/blog/${post.slug}`} className="block p-6">
                <div className="mb-3 text-xs text-gray-500 font-mono uppercase">{formatDate(post.date)}</div>
                <h2 className="text-xl font-semibold mb-3 group-hover:text-gray-300 transition-colors font-content">
                  {post.title.rendered.replace(/<[^>]+>/g, "")}
                </h2>
                {post.excerpt?.rendered ? (
                  <div
                    className="prose prose-invert prose-sm max-w-none text-gray-400 line-clamp-3"
                    dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.excerpt.rendered, { allowedTags: [] }) }}
                  />
                ) : null}
                <div className="mt-4 text-sm text-gray-500 group-hover:text-gray-300 transition-colors flex items-center gap-1">
                  Read more
                  <svg className="w-3 h-3 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 mt-12">
            <Pagination page={page} totalPages={totalPages} />
          </div>
        )}
      </div>
    </div>
  )
}

function Pagination({ page, totalPages }: { page: number; totalPages: number }) {
  const prev = page > 1 ? page - 1 : 1
  const next = page < totalPages ? page + 1 : totalPages
  return (
    <div className="inline-flex items-center gap-3 text-sm font-mono">
      <Link href={`/blog?page=${prev}`} className="px-4 py-2 rounded-full border border-gray-600 text-gray-200 hover:border-gray-300 hover:bg-white/5 transition-all">← Prev</Link>
      <span className="text-gray-400 px-2">Page {page} / {totalPages}</span>
      <Link href={`/blog?page=${next}`} className="px-4 py-2 rounded-full border border-gray-600 text-gray-200 hover:border-gray-300 hover:bg-white/5 transition-all">Next →</Link>
    </div>
  )
}


