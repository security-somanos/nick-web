import useSWR from "swr"
import { fetchPostBySlug, type WPPost } from "@/lib/wp"

export function usePost(slug?: string) {
  const { data, error, isLoading } = useSWR<WPPost>(
    slug ? ["post", slug] : null,
    ([, s]) => fetchPostBySlug(s as string)
  )
  return { post: data, isLoading, isError: !!error }
}


