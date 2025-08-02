"use client"

import { useEffect, useRef } from 'react'

interface NoiseEffectProps {
  className?: string
}

export default function NoiseEffect({ className = "" }: NoiseEffectProps) {
  const noiseRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const noiseElement = noiseRef.current
    if (!noiseElement) return

    let animationId: number
    let time = 0

    const animate = () => {
      // Dame un random entre 0 y 25%
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      
      noiseElement.style.transform = `translate(${x}px, ${y}px)`
      
      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [])

  return (
    <div 
      ref={noiseRef}
      className={`noise-overlay ${className}`}
      style={{
        pointerEvents: 'none',
        position: 'fixed',
        // Make the overlay 25% bigger than the viewport in all directions
        top: '-25vh',
        left: '-25vw',
        width: '150vw',
        height: '150vh',
        zIndex: 9999,
        backgroundImage: 'url("/images/noise.png")',
        backgroundSize: '200px 200px',
        backgroundRepeat: 'repeat',
        opacity: 0.1,
        willChange: 'transform'
      }}
    />
  )
} 