import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { splitTextIntoSpans, EASE } from '@utils/animations'
import '@styles/hero.css'

gsap.registerPlugin(ScrollTrigger)

/**
 * Hero — Full viewport opening section.
 * Displays the studio's headline with staggered text reveal,
 * an organic SVG decoration, and a scroll indicator.
 *
 * @param {boolean} loaderDone - If true, plays intro immediately; otherwise delays 3s
 */
export default function Hero({ loaderDone = false }) {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const taglineRef = useRef(null)
  const scrollIndicatorRef = useRef(null)
  const decorationRef = useRef(null)

  useGSAP(() => {
    const section = sectionRef.current
    if (!section) return

    const delay = loaderDone ? 0.2 : 3

    // Split heading into words and animate them
    const headingSpans = splitTextIntoSpans(headingRef.current, 'words')

    const tl = gsap.timeline({ delay })

    // Heading words reveal from bottom with stagger
    tl.from(headingSpans, {
      y: '110%',
      rotationZ: 2.5,
      opacity: 0,
      duration: 0.9,
      stagger: 0.045,
      ease: EASE.reveal,
    })

    // Tagline fades up
    tl.from(
      taglineRef.current,
      {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: EASE.reveal,
      },
      '-=0.3'
    )

    // Scroll indicator fades in last
    tl.from(
      scrollIndicatorRef.current,
      {
        opacity: 0,
        y: 10,
        duration: 0.5,
        ease: EASE.reveal,
      },
      '-=0.2'
    )

    // SVG decoration: subtle floating animation
    if (decorationRef.current) {
      gsap.to(decorationRef.current, {
        y: 18,
        duration: 6,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      })
    }
  }, { scope: sectionRef, dependencies: [loaderDone] })

  return (
    <section id="hero" className="hero" ref={sectionRef}>
      <div className="hero-content">
        <h1 className="hero-heading" ref={headingRef}>
          We craft digital experiences that resonate
        </h1>

        <p className="hero-tagline" ref={taglineRef}>
          A creative studio where strategy meets soul. We build brands and
          digital products that connect, inspire, and endure.
        </p>
      </div>

      {/* Abstract organic SVG decoration */}
      <div className="hero-decoration" ref={decorationRef} aria-hidden="true">
        <svg
          viewBox="0 0 600 700"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Large flowing blob */}
          <path
            d="M320 80c80 20 200 100 210 230s-60 200-150 260c-90 60-200 50-270 10S40 460 30 340 80 120 160 70s100-10 160 10z"
            fill="var(--color-sage)"
            opacity="0.35"
          />
          {/* Overlapping organic shape */}
          <path
            d="M380 160c60 50 130 140 100 250s-120 190-210 200-180-40-210-130 10-180 80-240 140-130 240-80z"
            fill="var(--color-mint)"
            opacity="0.3"
          />
          {/* Smaller accent blob */}
          <path
            d="M250 300c40-60 130-80 180-40s60 120 20 180-130 80-180 50-60-130-20-190z"
            fill="var(--color-ice)"
            opacity="0.5"
          />
          {/* Fine detail stroke */}
          <path
            d="M160 220c30-50 100-80 170-60s120 80 110 150-60 130-130 140-140-30-160-100 0-80 10-130z"
            stroke="var(--color-mint)"
            strokeWidth="1.5"
            fill="none"
            opacity="0.6"
          />
          {/* Small floating circle */}
          <circle
            cx="420"
            cy="180"
            r="25"
            fill="var(--color-sage)"
            opacity="0.2"
          />
          <circle
            cx="180"
            cy="480"
            r="15"
            fill="var(--color-mint)"
            opacity="0.25"
          />
        </svg>
      </div>

      {/* Scroll indicator */}
      <div
        className="hero-scroll-indicator"
        ref={scrollIndicatorRef}
        aria-hidden="true"
      >
        <span>Scroll</span>
        <div className="hero-scroll-line" />
      </div>
    </section>
  )
}
