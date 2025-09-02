"use client"

import { useEffect, useRef, useState } from "react"
import ReelView from "@/components/reels/reel"
import { useSearchParams } from "next/navigation"
import reelsData from "@/lib/reels"

export default function ShortsFeed() {
  const search = useSearchParams()
  const autoSound = search?.get("autosound") === "1" || search?.get("autosound") === "true"
  const base = reelsData
  const baseLength = base.length
  const [feed, setFeed] = useState<Array<(typeof base)[number]>>([])
  const isAppendingRef = useRef(false)
  const remainingOrderRef = useRef<number[]>([])
  const lastAppendedIdRef = useRef<string | null>(null)

  useEffect(() => {
    if (baseLength === 0) return
    appendChunk(5)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseLength])

  function appendChunk(count = 5) {
    if (isAppendingRef.current) return
    isAppendingRef.current = true
    const items: Array<(typeof base)[number]> = []
    for (let i = 0; i < count; i++) {
      // Refill the remaining order if empty
      if (remainingOrderRef.current.length === 0) {
        const newOrder = shuffle(Array.from({ length: baseLength }, (_, idx) => idx))
        // Avoid immediate repeat across cycles
        if (lastAppendedIdRef.current && base[newOrder[0]].id === lastAppendedIdRef.current && newOrder.length > 1) {
          // rotate by one
          const first = newOrder.shift() as number
          newOrder.push(first)
        }
        remainingOrderRef.current = newOrder
      }
      const nextIdx = remainingOrderRef.current.shift() as number
      const nextItem = base[nextIdx]
      items.push(nextItem)
      lastAppendedIdRef.current = nextItem.id
    }
    setFeed((prev) => {
      isAppendingRef.current = false
      return [...prev, ...items]
    })
  }

  const handleActive = (idx: number) => {
    if (feed.length - idx <= 2) {
      appendChunk(5)
    }
  }

  if (baseLength === 0) return null

  return (
    <div className="h-[calc(100vh-64px)] overflow-y-auto snap-y snap-mandatory bg-transparent">
      {feed.map((item, idx) => (
        <ReelView key={`reel-${idx}`} reel={item} index={idx} onActive={handleActive} autoSound={autoSound} />
      ))}
    </div>
  )
}

function shuffle<T>(input: T[]): T[] {
  const arr = input.slice()
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const tmp = arr[i]
    arr[i] = arr[j]
    arr[j] = tmp
  }
  return arr
}


