import { Suspense } from "react"
import ShortsFeed from "@/components/reels/shorts-feed"

export default function Page() {
  return (
    <div className="text-white">
      <Suspense>
        <ShortsFeed />
      </Suspense>
    </div>
  )
}


