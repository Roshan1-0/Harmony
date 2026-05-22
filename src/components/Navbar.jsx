import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import '@styles/navbar.css'

const NAV_LINKS = [
  { label: 'About', target: '#about' },
  { label: 'Services', target: '#services' },
  { label: 'Work', target: '#work' },
  { label: 'Testimonials', target: '#testimonials' },
  { label: 'Contact', target: '#contact' },
]

const SCROLL_THRESHOLD = 80
const HIDE_DELTA = 60

export default function Navbar({ isMenuOpen, setIsMenuOpen, lenisRef }) {
  const navRef = useRef(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const lastScrollY = useRef(0)

  // Scroll tracking — direction + threshold
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY

      // Backdrop blur when scrolled past threshold
      setIsScrolled(currentY > SCROLL_THRESHOLD)

      // Hide on scroll down, show on scroll up
      const delta = currentY - lastScrollY.current
      if (delta > HIDE_DELTA && currentY > SCROLL_THRESHOLD) {
        setIsHidden(true)
      } else if (delta < 0) {
        setIsHidden(false)
      }

      lastScrollY.current = currentY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Entrance animation — staggered fade in after loader
  useGSAP(() => {
    const logo = navRef.current?.querySelector('.navbar-logo')
    const links = navRef.current?.querySelectorAll('.navbar-link')

    if (!logo || !links?.length) return

    const targets = [logo, ...links]

    gsap.set(targets, { opacity: 0, y: -12 })

    gsap.to(targets, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      stagger: 0.06,
      ease: 'power3.out',
      delay: 3.6, // After loader finishes (~3.4s total)
    })
  }, { scope: navRef })

  const handleNavClick = (e, target) => {
    e.preventDefault()
    lenisRef?.current?.lenis?.scrollTo(target, { offset: -80 })
    if (isMenuOpen) setIsMenuOpen(false)
  }

  const navClasses = [
    'navbar',
    isScrolled ? 'is-scrolled' : '',
    isHidden && !isMenuOpen ? 'is-hidden' : '',
  ]
    .filter(Boolean)
    .join(' ')

  const toggleClasses = [
    'menu-toggle',
    isMenuOpen ? 'is-open' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <nav className={navClasses} ref={navRef} aria-label="Main navigation">
      <div className="navbar-inner">
        <a
          href="#"
          className="navbar-logo"
          data-cursor="hover"
          aria-label="Harmony — Back to top"
        >
          Harmony
        </a>

        <div className="navbar-links" role="menubar">
          {NAV_LINKS.map(({ label, target }) => (
            <button
              key={label}
              className="navbar-link"
              data-cursor="hover"
              role="menuitem"
              onClick={(e) => handleNavClick(e, target)}
            >
              {label}
            </button>
          ))}
        </div>

        <button
          className={toggleClasses}
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
          data-cursor="hover"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>
  )
}
