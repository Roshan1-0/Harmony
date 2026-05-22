import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import '@styles/footer.css'

gsap.registerPlugin(ScrollTrigger)

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
]

const SERVICE_LINKS = [
  'Brand Strategy',
  'Digital Design',
  'Development',
  'Motion Design',
]

const SOCIAL_LINKS = [
  { label: 'Twitter', href: 'https://twitter.com' },
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'Dribbble', href: 'https://dribbble.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com' },
]

export default function Footer({ lenisRef }) {
  const footerRef = useRef(null)

  const handleBackToTop = () => {
    if (lenisRef?.current?.lenis) {
      lenisRef.current.lenis.scrollTo(0)
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  useGSAP(() => {
    const cols = footerRef.current.querySelectorAll('.footer-col')

    gsap.from(cols, {
      y: 30,
      opacity: 0,
      duration: 0.7,
      stagger: 0.08,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: footerRef.current,
        start: 'top 85%',
        once: true,
      },
    })

    gsap.from(footerRef.current.querySelector('.footer-bottom'), {
      y: 15,
      opacity: 0,
      duration: 0.6,
      ease: 'power3.out',
      delay: 0.3,
      scrollTrigger: {
        trigger: footerRef.current,
        start: 'top 85%',
        once: true,
      },
    })
  }, { scope: footerRef })

  return (
    <footer id="footer" className="footer" ref={footerRef}>
      <div className="container">
        <div className="footer-top">
          {/* Brand */}
          <div className="footer-col">
            <div className="footer-brand-name">Harmony</div>
            <p className="footer-brand-tagline">
              Crafting digital experiences that resonate with purpose and
              precision.
            </p>
          </div>

          {/* Navigate */}
          <nav className="footer-col" aria-label="Footer navigation">
            <h3 className="footer-col-title">Navigate</h3>
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="footer-col-link"
                data-cursor="hover"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Services */}
          <div className="footer-col">
            <h3 className="footer-col-title">Services</h3>
            {SERVICE_LINKS.map((service) => (
              <a
                key={service}
                href="#services"
                className="footer-col-link"
                data-cursor="hover"
              >
                {service}
              </a>
            ))}
          </div>

          {/* Connect */}
          <div className="footer-col">
            <h3 className="footer-col-title">Connect</h3>
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="footer-col-link"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="footer-bottom">
          <span className="footer-copyright">
            &copy; 2025 Harmony. All rights reserved.
          </span>
          <button
            className="footer-back-to-top"
            onClick={handleBackToTop}
            data-cursor="hover"
            aria-label="Back to top"
          >
            Back to top
            <span className="footer-back-to-top-arrow" aria-hidden="true">
              ↑
            </span>
          </button>
        </div>
      </div>
    </footer>
  )
}
