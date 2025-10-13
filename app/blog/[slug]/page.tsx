import type { Metadata } from "next"
import sanitizeHtml from "sanitize-html"
import Link from "next/link"
import { notFound } from "next/navigation"
import { fetchPostBySlug } from "@/lib/wp"
import { Badge } from "@/components/ui/badge"
import BlogContactForm from "@/components/blog-contact-form"

export const revalidate = 60

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  try {
    const { slug } = await params
    const post = await fetchPostBySlug(slug)
    const titleText = post.title.rendered.replace(/<[^>]+>/g, "")
    return {
      title: titleText,
      description: post.excerpt?.rendered ? stripHtml(post.excerpt.rendered).slice(0, 160) : undefined,
      alternates: { canonical: `/blog/${post.slug}` },
      openGraph: {
        title: titleText,
        description: post.excerpt?.rendered ? stripHtml(post.excerpt.rendered).slice(0, 200) : undefined,
        type: "article",
        url: `/blog/${post.slug}`,
      },
      twitter: {
        card: "summary_large_image",
        title: titleText,
        description: post.excerpt?.rendered ? stripHtml(post.excerpt.rendered).slice(0, 200) : undefined,
      },
    }
  } catch {
    return {}
  }
}

function stripHtml(html: string) {
  return html.replace(/<[^>]*>?/gm, "").trim()
}

function formatDate(input?: string) {
  if (!input) return ""
  try {
    return new Intl.DateTimeFormat("en-US", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(input))
  } catch {
    return input
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  
  let post
  try {
    post = await fetchPostBySlug(slug)
  } catch (error) {
    notFound()
  }

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

        <article className="space-y-6">
          <header className="space-y-4">
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="border-gray-400 text-gray-300">
                Article
              </Badge>
              <span className="text-xs text-gray-500 font-mono uppercase">{formatDate(post.date)}</span>
            </div>
            <h1 
              className="text-3xl md:text-4xl lg:text-5xl font-content leading-tight" 
              dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.title.rendered) }} 
            />
          </header>

          <div className="shadow-md shadow-black/50 border border-white/10 rounded-12 p-6 md:p-8 bg-black/40 backdrop-blur">
            <div
              className="prose prose-invert prose-lg max-w-none 
                prose-headings:font-title prose-headings:text-white
                prose-p:text-gray-300 prose-p:leading-relaxed
                prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
                prose-strong:text-white prose-strong:font-semibold
                prose-code:text-gray-200 prose-code:bg-white/10 prose-code:px-1 prose-code:rounded
                prose-pre:bg-[#0a0a0a] prose-pre:border prose-pre:border-white/10
                prose-img:rounded-lg prose-img:shadow-lg
                prose-blockquote:border-l-4 prose-blockquote:border-gray-600 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-400
                prose-ul:text-gray-300 prose-ol:text-gray-300
                prose-li:text-gray-300"
              dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.content?.rendered || "", {
                allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'figure', 'figcaption', 'iframe']),
                allowedAttributes: {
                  ...sanitizeHtml.defaults.allowedAttributes,
                  img: ['src', 'alt', 'title', 'width', 'height', 'loading', 'class'],
                  iframe: ['src', 'width', 'height', 'frameborder', 'allowfullscreen', 'class'],
                  a: ['href', 'target', 'rel', 'class'],
                  '*': ['class', 'id']
                }
              }) }}
            />
          </div>

          <div className="pt-8 border-t border-white/10">
            <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-200 transition-colors font-mono group">
              <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to all articles
            </Link>
          </div>
        </article>

        {/* Contact Form - only show if ACF field is set */}
        {(() => {
          try {
            const acf = post.acf
            if (acf && typeof acf === 'object' && !Array.isArray(acf) && acf.with_contact_form === true) {
              return <BlogContactForm />
            }
          } catch (error) {
            // Silently ignore any errors
          }
          return null
        })()}
      </div>
    </div>
  )
}


