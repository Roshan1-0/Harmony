import { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ReactLenis } from 'lenis/react'

import Loader from '@components/Loader'
import CustomCursor from '@components/CustomCursor'
import Navbar from '@components/Navbar'
import MobileMenu from '@components/MobileMenu'
import Hero from '@components/Hero'
import About from '@components/About'
import Services from '@components/Services'
import WorkShowcase from '@components/WorkShowcase'
import Testimonials from '@components/Testimonials'
import Contact from '@components/Contact'
import Footer from '@components/Footer'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [loaderDone, setLoaderDone] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const lenisRef = useRef(null)

  // Sync Lenis with GSAP ticker for perfect ScrollTrigger alignment
  useEffect(() => {
    function update(time) {
      lenisRef.current?.lenis?.raf(time * 1000)
    }
    gsap.ticker.add(update)

    // Give ScrollTrigger a moment to recalculate after loader exit
    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 200)

    return () => {
      gsap.ticker.remove(update)
      clearTimeout(refreshTimeout)
    }
  }, [])

  // Refresh ScrollTrigger when loader finishes
  useEffect(() => {
    if (loaderDone) {
      // Delay refresh to let all sections render and settle
      const timer = setTimeout(() => {
        ScrollTrigger.refresh(true)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [loaderDone])

  const handleLoaderComplete = () => {
    setIsLoading(false)
    // Small delay before marking loader as done
    // so Hero can start its entrance animation smoothly
    setTimeout(() => {
      setLoaderDone(true)
    }, 100)
  }

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        autoRaf: false,
        lerp: 0.1,
        duration: 1.4,
        smoothWheel: true,
        syncTouch: false,
        touchMultiplier: 2,
      }}
    >
      {/* Skip to content link for accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Custom cursor — desktop only */}
      <CustomCursor />

      {/* Loading screen */}
      {isLoading && <Loader onComplete={handleLoaderComplete} />}

      {/* Navigation */}
      <Navbar
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        lenisRef={lenisRef}
      />

      {/* Mobile navigation overlay */}
      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        lenisRef={lenisRef}
      />

      {/* Main content */}
      <main id="main-content">
        <Hero loaderDone={loaderDone} />
        <About />
        <Services />
        <WorkShowcase />
        <Testimonials />
        <Contact />
      </main>

      <Footer lenisRef={lenisRef} />
    </ReactLenis>
  )
}
