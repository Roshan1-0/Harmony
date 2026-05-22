import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import '@styles/scrollreveal.css'

gsap.registerPlugin(ScrollTrigger)

/**
 * ScrollReveal — Wrapper that reveals children when scrolled into view.
 *
 * @param {ReactNode} children
 * @param {'up'|'left'|'right'} direction - Reveal direction
 * @param {number} delay - Animation delay in seconds
 * @param {number} duration - Animation duration in seconds
 * @param {number} distance - Pixel distance to travel
 * @param {string} className - Additional class name
 * @param {number} threshold - 0-1, how far into viewport to trigger
 * @param {boolean} once - If true, only plays once
 */
export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.8,
  distance = 50,
  className = '',
  threshold = 0.2,
  once = true,
}) {
  const wrapperRef = useRef(null)

  useGSAP(() => {
    const el = wrapperRef.current
    if (!el) return

    const fromVars = { opacity: 0 }

    if (direction === 'up') {
      fromVars.y = distance
    } else if (direction === 'left') {
      fromVars.x = distance
    } else if (direction === 'right') {
      fromVars.x = -distance
    }

    gsap.from(el, {
      ...fromVars,
      duration,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: `top bottom-=${Math.round(threshold * 100)}`,
        toggleActions: once
          ? 'play none none none'
          : 'play reverse play reverse',
      },
    })
  }, { scope: wrapperRef })

  return (
    <div ref={wrapperRef} className={`scroll-reveal ${className}`.trim()}>
      {children}
    </div>
  )
}
