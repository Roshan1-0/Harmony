import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import '@styles/work.css'

gsap.registerPlugin(ScrollTrigger)

const PROJECTS = [
  {
    title: 'Solara Wellness',
    category: 'Brand Identity & Web',
    bg: 'var(--color-sage)',
    gradient: 'linear-gradient(145deg, var(--color-sage), #7a9e98)',
    pattern: (
      <svg viewBox="0 0 400 300" preserveAspectRatio="none" aria-hidden="true">
        <circle cx="320" cy="60" r="80" fill="rgba(255,255,255,0.12)" />
        <circle cx="80" cy="220" r="120" fill="rgba(255,255,255,0.07)" />
        <rect x="200" y="150" width="160" height="2" rx="1" fill="rgba(255,255,255,0.1)" transform="rotate(-15 280 151)" />
      </svg>
    ),
  },
  {
    title: 'Arclight Studios',
    category: 'Digital Experience',
    bg: 'var(--color-charcoal-30)',
    gradient: 'linear-gradient(160deg, var(--color-charcoal-30), rgba(59,65,60,0.15))',
    pattern: (
      <svg viewBox="0 0 300 400" preserveAspectRatio="none" aria-hidden="true">
        <rect x="40" y="60" width="100" height="100" rx="8" fill="rgba(255,255,255,0.08)" transform="rotate(12 90 110)" />
        <circle cx="230" cy="300" r="60" fill="rgba(255,255,255,0.06)" />
        <line x1="20" y1="200" x2="280" y2="180" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    title: 'Meridian Finance',
    category: 'Product Design',
    bg: 'var(--color-ice)',
    gradient: 'linear-gradient(135deg, var(--color-ice), #b8ddd9)',
    pattern: (
      <svg viewBox="0 0 400 250" preserveAspectRatio="none" aria-hidden="true">
        <polygon points="350,20 400,120 300,120" fill="rgba(59,65,60,0.06)" />
        <circle cx="100" cy="180" r="90" fill="rgba(59,65,60,0.04)" />
        <rect x="180" y="60" width="80" height="80" rx="40" fill="rgba(59,65,60,0.05)" />
      </svg>
    ),
  },
  {
    title: 'Volta Collective',
    category: 'E-Commerce',
    bg: 'var(--color-mint-40)',
    gradient: 'linear-gradient(150deg, var(--color-mint-40), rgba(148,209,190,0.2))',
    pattern: (
      <svg viewBox="0 0 300 300" preserveAspectRatio="none" aria-hidden="true">
        <ellipse cx="150" cy="80" rx="120" ry="60" fill="rgba(59,65,60,0.05)" />
        <rect x="50" y="200" width="200" height="3" rx="1.5" fill="rgba(59,65,60,0.07)" />
        <circle cx="250" cy="240" r="40" fill="rgba(59,65,60,0.04)" />
      </svg>
    ),
  },
]

export default function WorkShowcase() {
  const sectionRef = useRef(null)

  useGSAP(() => {
    const cards = sectionRef.current.querySelectorAll('.work-grid-item')

    cards.forEach((card, i) => {
      gsap.from(card, {
        scale: 0.95,
        opacity: 0,
        duration: 0.9,
        delay: i * 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
          once: true,
        },
      })

      // Subtle parallax on inner visual
      const visual = card.querySelector('.work-item-visual')
      if (visual) {
        gsap.to(visual, {
          y: -20,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.6,
          },
        })
      }
    })
  }, { scope: sectionRef })

  return (
    <section id="work" className="work section" ref={sectionRef}>
      <div className="container">
        <div className="work-header">
          <h2 className="work-heading">Selected Work</h2>
          <span className="work-count">Featured projects</span>
        </div>

        <div className="work-grid">
          {PROJECTS.map((project) => (
            <article
              key={project.title}
              className="work-grid-item"
              data-cursor="view"
            >
              <div
                className="work-item-visual"
                style={{ background: project.gradient }}
              >
                {project.pattern}
              </div>
              <div className="work-item-info">
                <h3 className="work-item-title">{project.title}</h3>
                <p className="work-item-category">{project.category}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
