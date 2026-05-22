import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { useMediaQuery } from '@hooks/useMediaQuery'
import '@styles/cursor.css'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const isTouch = useMediaQuery('(pointer: coarse)')

  // Store quickTo instances
  const xDot = useRef(null)
  const yDot = useRef(null)
  const xRing = useRef(null)
  const yRing = useRef(null)

  useEffect(() => {
    if (isTouch) return

    // Add class to body to hide native cursor
    document.body.classList.add('has-custom-cursor')

    // Create quickTo instances for smooth interpolation
    xDot.current = gsap.quickTo(dotRef.current, 'x', { duration: 0.15, ease: 'power2.out' })
    yDot.current = gsap.quickTo(dotRef.current, 'y', { duration: 0.15, ease: 'power2.out' })
    xRing.current = gsap.quickTo(ringRef.current, 'x', { duration: 0.5, ease: 'power2.out' })
    yRing.current = gsap.quickTo(ringRef.current, 'y', { duration: 0.5, ease: 'power2.out' })

    const handleMouseMove = (e) => {
      xDot.current(e.clientX)
      yDot.current(e.clientY)
      xRing.current(e.clientX)
      yRing.current(e.clientY)
    }

    const handleMouseOver = (e) => {
      const target = e.target.closest('[data-cursor]')
      if (!target) return

      const type = target.getAttribute('data-cursor')
      if (type === 'hover') {
        ringRef.current?.classList.add('is-hovering')
      } else if (type === 'view') {
        ringRef.current?.classList.add('is-viewing')
      }
    }

    const handleMouseOut = (e) => {
      const target = e.target.closest('[data-cursor]')
      if (!target) return

      ringRef.current?.classList.remove('is-hovering')
      ringRef.current?.classList.remove('is-viewing')
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)

    return () => {
      document.body.classList.remove('has-custom-cursor')
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
    }
  }, [isTouch])

  // Don't render on touch devices
  if (isTouch) return null

  return (
    <>
      <div className="cursor-dot" ref={dotRef} />
      <div className="cursor-ring" ref={ringRef}>
        <span className="cursor-text">View</span>
      </div>
    </>
  )
}
