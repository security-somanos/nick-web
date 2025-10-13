const WP = process.env.WP_URL

export type WPPost = {
  id: number
  slug: string
  date: string
  title: { rendered: string }
  excerpt?: { rendered: string }
  content?: { rendered: string }
  acf?: {
    with_contact_form?: boolean
  } | [] | null
}

 export async function fetchPosts({ page = 1, perPage = 10 } = {}) {
   const res = await fetch(
     `${WP}/posts?per_page=${perPage}&page=${page}&_fields=id,slug,title,excerpt,date&_embed`,
     { next: { revalidate: 0 } }
   )
  if (!res.ok) throw new Error("WP error")
  const data: WPPost[] = await res.json()
  const total = Number(res.headers.get("X-WP-Total") || 0)
  const totalPages = Number(res.headers.get("X-WP-TotalPages") || 0)
  return { data, total, totalPages }
}

export async function fetchPostBySlug(slug: string) {
  const res = await fetch(`${WP}/posts?slug=${slug}&_fields=id,slug,title,content,date,acf&_embed`, { next: { revalidate: 0 } })
  if (!res.ok) throw new Error("WP error")
  const arr: WPPost[] = await res.json()
  if (!arr.length) throw new Error("Not found")
  return arr[0]
}


