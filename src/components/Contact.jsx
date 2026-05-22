import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { splitTextIntoSpans } from '@utils/animations'
import MagneticButton from '@components/MagneticButton'
import '@styles/contact.css'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)

  useGSAP(() => {
    // Split heading into words for staggered reveal
    const words = splitTextIntoSpans(headingRef.current, 'words')

    gsap.from(words, {
      y: '110%',
      rotationZ: 2,
      opacity: 0,
      duration: 0.8,
      stagger: 0.04,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        once: true,
      },
    })

    // Fade up body + CTA
    gsap.from(
      sectionRef.current.querySelectorAll('.contact-body, .contact-cta, .contact-links'),
      {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
        delay: 0.3,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          once: true,
        },
      }
    )
  }, { scope: sectionRef })

  return (
    <section id="contact" className="contact section" ref={sectionRef}>
      <div className="container">
        <div className="contact-content">
          <span className="text-label contact-label">Get in Touch</span>

          <h2 className="contact-heading" ref={headingRef}>
            Let's create something extraordinary together
          </h2>

          <p className="contact-body">
            We&rsquo;re always open to discussing new projects, creative ideas,
            or opportunities to be part of your vision.
          </p>

          <div className="contact-cta">
            <MagneticButton
              tag="a"
              href="mailto:hello@harmony.studio"
              className="contact-button"
              strength={0.25}
            >
              Start a Conversation
              <span className="contact-button-arrow" aria-hidden="true">
                →
              </span>
            </MagneticButton>
          </div>

          <div className="contact-links">
            <div className="contact-link-group">
              <span className="contact-link-label">Email</span>
              <a
                href="mailto:hello@harmony.studio"
                className="contact-link-value"
                data-cursor="hover"
              >
                hello@harmony.studio
              </a>
            </div>
            <div className="contact-link-group">
              <span className="contact-link-label">Phone</span>
              <a
                href="tel:+15552345678"
                className="contact-link-value"
                data-cursor="hover"
              >
                +1 (555) 234-5678
              </a>
            </div>
            <div className="contact-link-group">
              <span className="contact-link-label">Location</span>
              <span className="contact-link-value">New York, NY</span>
            </div>
          </div>
        </div>

        {/* Decorative background shape */}
        <svg
          className="contact-decoration"
          viewBox="0 0 500 500"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M250 50c110 0 200 90 200 200s-90 200-200 200c-60 0-120-30-160-75 40-20 70-65 70-115 0-70-55-125-120-130C65 65 150 50 250 50z"
            fill="currentColor"
          />
          <circle cx="120" cy="350" r="80" fill="currentColor" opacity="0.5" />
        </svg>
      </div>
    </section>
  )
}
