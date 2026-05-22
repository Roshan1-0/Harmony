import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import '@styles/parallaximage.css'

gsap.registerPlugin(ScrollTrigger)

/**
 * ParallaxImage — Reusable parallax image wrapper.
 *
 * @param {string} src - Image source
 * @param {string} alt - Alt text
 * @param {number} speed - Parallax speed (negative = moves up on scroll)
 * @param {string} className - Wrapper class
 * @param {string} imgClassName - Image element class
 * @param {boolean} reveal - Enable clip-path reveal on scroll
 */
export default function ParallaxImage({
  src,
  alt,
  speed = -20,
  className = '',
  imgClassName = '',
  reveal = false,
}) {
  const containerRef = useRef(null)
  const imgRef = useRef(null)

  useGSAP(() => {
    const container = containerRef.current
    const img = imgRef.current
    if (!container || !img) return

    // Parallax scroll movement
    gsap.to(img, {
      yPercent: speed,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        scrub: 0.6,
        start: 'top bottom',
        end: 'bottom top',
      },
    })

    // Optional clip-path reveal
    if (reveal) {
      gsap.to(img, {
        clipPath: 'inset(0% 0 0 0)',
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: container,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })
    }
  }, { scope: containerRef })

  const revealClass = reveal ? 'parallax-image--reveal' : ''

  return (
    <div
      ref={containerRef}
      className={`parallax-image ${revealClass} ${className}`.trim()}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={`parallax-image__img ${imgClassName}`.trim()}
        loading="lazy"
      />
    </div>
  )
}
