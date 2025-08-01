'use client'

import { useEffect, useRef } from 'react'

interface GlitchEffectProps {
  className?: string
  children?: React.ReactNode
}

export function GlitchEffect({ className, children }: GlitchEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<any>(null)
  const rendererRef = useRef<any>(null)

  useEffect(() => {
    let mounted = true

    const initGlitch = () => {
      if (!containerRef.current) return

      // Check if Three.js is available globally
      if (typeof window !== 'undefined' && (window as any).THREE) {
        const THREE = (window as any).THREE
        
        try {
          // Initialize Three.js scene
          const scene = new THREE.Scene()
          const camera = new THREE.PerspectiveCamera(
            75,
            containerRef.current.clientWidth / containerRef.current.clientHeight,
            0.1,
            1000
          )

          const renderer = new THREE.WebGLRenderer({ 
            alpha: true,
            antialias: true 
          })
          renderer.setSize(
            containerRef.current.clientWidth,
            containerRef.current.clientHeight
          )
          renderer.setClearColor(0x000000, 0)

          containerRef.current.appendChild(renderer.domElement)

          // Position camera
          camera.position.z = 5

          // Add some basic geometry for testing
          const geometry = new THREE.BoxGeometry()
          const material = new THREE.MeshBasicMaterial({ 
            color: 0x00ff00,
            wireframe: true 
          })
          const cube = new THREE.Mesh(geometry, material)
          scene.add(cube)

          // Animation loop
          const animate = () => {
            if (!mounted) return

            requestAnimationFrame(animate)
            cube.rotation.x += 0.01
            cube.rotation.y += 0.01
            renderer.render(scene, camera)
          }

          animate()

          // Store refs
          sceneRef.current = scene
          rendererRef.current = renderer

          // Handle resize
          const handleResize = () => {
            if (!containerRef.current || !rendererRef.current) return
            
            const width = containerRef.current.clientWidth
            const height = containerRef.current.clientHeight
            
            camera.aspect = width / height
            camera.updateProjectionMatrix()
            rendererRef.current.setSize(width, height)
          }

          window.addEventListener('resize', handleResize)

          return () => {
            window.removeEventListener('resize', handleResize)
          }
        } catch (error) {
          console.error('Error initializing glitch effect:', error)
        }
      } else {
        console.warn('Three.js not available')
      }
    }

    // Wait a bit for scripts to load
    const timer = setTimeout(initGlitch, 100)

    return () => {
      mounted = false
      clearTimeout(timer)
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement)
        rendererRef.current.dispose()
      }
    }
  }, [])

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  )
} 