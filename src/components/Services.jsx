import { useState, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import '@styles/services.css'

gsap.registerPlugin(ScrollTrigger)

const SERVICES = [
  {
    number: '01',
    title: 'Brand Strategy',
    description:
      'We define the core narrative, positioning, and visual language that makes your brand unmistakable. From market research to brand architecture, every element serves the story.',
    color: 'var(--color-sage)',
  },
  {
    number: '02',
    title: 'Digital Design',
    description:
      'Interfaces that balance beauty with usability. We design responsive experiences across web and mobile, grounded in user research and refined through iteration.',
    color: 'var(--color-mint)',
  },
  {
    number: '03',
    title: 'Development',
    description:
      'Clean, performant code that brings designs to life. We build with modern frameworks, prioritizing speed, accessibility, and long-term maintainability.',
    color: 'var(--color-charcoal-30)',
  },
  {
    number: '04',
    title: 'Motion & Interaction',
    description:
      'Purposeful animation that guides, delights, and communicates. From micro-interactions to full page transitions, movement with meaning.',
    color: 'var(--color-ice)',
  },
]

export default function Services() {
  const [activeIndex, setActiveIndex] = useState(-1)
  const sectionRef = useRef(null)

  const handleToggle = (index) => {
    setActiveIndex((prev) => (prev === index ? -1 : index))
  }

  useGSAP(() => {
    const items = sectionRef.current.querySelectorAll('.service-item')

    gsap.from(items, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        once: true,
      },
    })
  }, { scope: sectionRef })

  return (
    <section id="services" className="services section" ref={sectionRef}>
      <div className="container">
        <div className="services-header">
          <span className="text-label services-label">What We Do</span>
          <h2 className="services-heading">Services</h2>
        </div>

        <div className="services-list" role="list">
          {SERVICES.map((service, index) => (
            <div
              key={service.number}
              className={`service-item${activeIndex === index ? ' is-active' : ''}`}
              onClick={() => handleToggle(index)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  handleToggle(index)
                }
              }}
              role="listitem"
              tabIndex={0}
              data-cursor="hover"
              aria-expanded={activeIndex === index}
            >
              <div className="service-item-header">
                <span className="service-item-number">{service.number}</span>
                <h3 className="service-item-title">{service.title}</h3>
                <svg
                  className="service-item-arrow"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </div>

              <div className="service-item-content">
                <p className="service-item-description">{service.description}</p>
              </div>

              {/* Hover image placeholder */}
              <div className="service-item-image" aria-hidden="true">
                <div
                  className="service-item-image-inner"
                  style={{
                    background: `linear-gradient(135deg, ${service.color}, var(--color-charcoal-10))`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
