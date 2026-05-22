import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import '@styles/mobile-menu.css'

const NAV_LINKS = [
  { label: 'About', target: '#about' },
  { label: 'Services', target: '#services' },
  { label: 'Work', target: '#work' },
  { label: 'Testimonials', target: '#testimonials' },
  { label: 'Contact', target: '#contact' },
]

const SOCIAL_LINKS = [
  { label: 'Twitter', href: 'https://twitter.com' },
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'Dribbble', href: 'https://dribbble.com' },
]

export default function MobileMenu({ isOpen, onClose, lenisRef }) {
  const menuRef = useRef(null)
  const tlRef = useRef(null)

  // Build timeline once, then play/reverse based on isOpen
  useGSAP(() => {
    const menu = menuRef.current
    if (!menu) return

    const links = menu.querySelectorAll('.mobile-menu-link')
    const footer = menu.querySelector('.mobile-menu-footer')

    const tl = gsap.timeline({ paused: true })

    // Clip-path reveal
    tl.to(menu, {
      clipPath: 'inset(0 0 0% 0)',
      duration: 0.6,
      ease: 'power3.inOut',
    })

    // Stagger links in from below
    tl.from(
      links,
      {
        y: 40,
        opacity: 0,
        duration: 0.5,
        stagger: 0.06,
        ease: 'power3.out',
      },
      '-=0.2'
    )

    // Footer fade in
    if (footer) {
      tl.from(
        footer,
        {
          opacity: 0,
          y: 20,
          duration: 0.4,
          ease: 'power3.out',
        },
        '-=0.3'
      )
    }

    tlRef.current = tl
  }, { scope: menuRef })

  // Play / reverse based on isOpen
  useEffect(() => {
    if (!tlRef.current) return

    if (isOpen) {
      // Lock scroll
      document.body.style.overflow = 'hidden'
      tlRef.current.play()
    } else {
      tlRef.current.reverse()
      // Unlock scroll after reverse completes
      const duration = tlRef.current.duration() * 1000
      const timer = setTimeout(() => {
        document.body.style.overflow = ''
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  // Cleanup scroll lock on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  const handleLinkClick = (target) => {
    lenisRef?.current?.lenis?.scrollTo(target, { offset: -80 })
    onClose?.()
  }

  return (
    <div
      className="mobile-menu"
      ref={menuRef}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
    >
      <nav className="mobile-menu-links" role="navigation">
        {NAV_LINKS.map(({ label, target }) => (
          <button
            key={label}
            className="mobile-menu-link"
            onClick={() => handleLinkClick(target)}
            data-cursor="hover"
          >
            {label}
          </button>
        ))}
      </nav>

      <footer className="mobile-menu-footer">
        <a
          href="mailto:hello@harmony.studio"
          className="mobile-menu-email"
          data-cursor="hover"
        >
          hello@harmony.studio
        </a>

        <div className="mobile-menu-social">
          {SOCIAL_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
            >
              {label}
            </a>
          ))}
        </div>
      </footer>
    </div>
  )
}
