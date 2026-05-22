import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { createCounter } from '@utils/animations'
import ScrollReveal from '@components/ScrollReveal'
import '@styles/about.css'

gsap.registerPlugin(ScrollTrigger)

const STATS = [
  { value: 12, suffix: '+', label: 'Years of Craft' },
  { value: 200, suffix: '+', label: 'Projects Delivered' },
  { value: 47, suffix: '', label: 'Awards & Recognitions' },
]

/**
 * About — Studio introduction section with text, decorative visual,
 * and animated stat counters.
 */
export default function About() {
  const sectionRef = useRef(null)
  const visualRef = useRef(null)
  const statRefs = useRef([])

  const setStatRef = (index) => (el) => {
    statRefs.current[index] = el
  }

  useGSAP(() => {
    const section = sectionRef.current
    if (!section) return

    // Parallax float on the decorative SVG
    if (visualRef.current) {
      gsap.to(visualRef.current, {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: {
          trigger: visualRef.current,
          scrub: 0.8,
          start: 'top bottom',
          end: 'bottom top',
        },
      })
    }

    // Stats counter animation
    statRefs.current.forEach((el, i) => {
      if (!el) return

      const stat = STATS[i]
      const counter = createCounter(el, stat.value, {
        duration: 2.2,
        suffix: stat.suffix,
      })

      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        onEnter: () => counter.play(),
      })
    })
  }, { scope: sectionRef })

  return (
    <section id="about" className="about section" ref={sectionRef}>
      <div className="container">
        <div className="about-grid">
          {/* Left column: text content */}
          <div className="about-copy">
            <ScrollReveal>
              <span className="about-label">About Us</span>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h2 className="about-heading">Where intention meets craft</h2>
            </ScrollReveal>

            <div className="about-text">
              <ScrollReveal delay={0.15}>
                <p>
                  Founded in 2018, Harmony began as a small collective of
                  designers and developers who believed digital experiences could
                  carry the same weight and warmth as physical ones.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.25}>
                <p>
                  We don&rsquo;t chase trends or fill screens with noise. Every
                  decision&nbsp;&mdash; from typeface pairings to transition
                  curves&nbsp;&mdash; is deliberate. We obsess over the details
                  that most people feel but can&rsquo;t quite name.
                </p>
              </ScrollReveal>
            </div>
          </div>

          {/* Right column: decorative visual */}
          <div className="about-visual" aria-hidden="true">
            <svg
              ref={visualRef}
              viewBox="0 0 440 480"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Large base circle */}
              <circle
                cx="220"
                cy="240"
                r="160"
                fill="var(--color-ice)"
                opacity="0.5"
              />
              {/* Offset organic blob */}
              <path
                d="M260 100c70 30 130 100 120 190s-80 150-160 160-150-30-170-110 20-140 80-190 70-70 130-50z"
                fill="var(--color-sage)"
                opacity="0.3"
              />
              {/* Overlapping mint shape */}
              <ellipse
                cx="270"
                cy="280"
                rx="110"
                ry="130"
                fill="var(--color-mint)"
                opacity="0.2"
                transform="rotate(-15 270 280)"
              />
              {/* Small accent circles */}
              <circle
                cx="150"
                cy="160"
                r="35"
                fill="var(--color-mint)"
                opacity="0.35"
              />
              <circle
                cx="320"
                cy="350"
                r="22"
                fill="var(--color-sage)"
                opacity="0.25"
              />
              {/* Fine stroke ring */}
              <circle
                cx="230"
                cy="230"
                r="120"
                stroke="var(--color-mint)"
                strokeWidth="1"
                fill="none"
                opacity="0.35"
              />
              {/* Dotted detail */}
              <circle
                cx="180"
                cy="370"
                r="8"
                fill="var(--color-charcoal)"
                opacity="0.08"
              />
              <circle
                cx="340"
                cy="180"
                r="6"
                fill="var(--color-charcoal)"
                opacity="0.06"
              />
            </svg>
          </div>
        </div>

        {/* Stats row */}
        <div className="about-stats">
          {STATS.map((stat, i) => (
            <div className="about-stat" key={stat.label}>
              <div
                className="about-stat-number"
                ref={setStatRef(i)}
              >
                0{stat.suffix}
              </div>
              <div className="about-stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
