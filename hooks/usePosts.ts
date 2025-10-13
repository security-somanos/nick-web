import useSWR from "swr"
import { fetchPosts, type WPPost } from "@/lib/wp"

type PostsKey = ["posts", number, number]
const fetcher = (_key: PostsKey, page: number, perPage: number) =>
  fetchPosts({ page, perPage })

export function usePosts(page = 1, perPage = 10) {
  const { data, error, isLoading } = useSWR<Awaited<ReturnType<typeof fetchPosts>>>(
    ["posts", page, perPage],
    ([, p, pp]) => fetcher(["posts", p, pp], p, pp),
    { keepPreviousData: true }
  )
  return {
    posts: data?.data ?? ([] as WPPost[]),
    total: data?.total ?? 0,
    totalPages: data?.totalPages ?? 0,
    isLoading,
    isError: !!error,
  }
}


