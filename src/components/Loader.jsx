import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import '@styles/loader.css'

export default function Loader({ onComplete }) {
  const loaderRef = useRef(null)
  const counterRef = useRef(null)
  const brandRef = useRef(null)
  const curtainTopRef = useRef(null)
  const curtainBottomRef = useRef(null)

  useGSAP(() => {
    // Lock body scroll during loading
    document.body.style.overflow = 'hidden'

    const counter = { value: 0 }
    const tl = gsap.timeline({
      onComplete: () => {
        // Unlock body scroll
        document.body.style.overflow = ''

        // Remove loader from DOM flow
        if (loaderRef.current) {
          loaderRef.current.style.pointerEvents = 'none'
        }

        onComplete?.()
      },
    })

    // Phase 1: Counter 0 → 100 (1.8s)
    tl.to(counter, {
      value: 100,
      duration: 1.8,
      ease: 'power2.inOut',
      onUpdate() {
        if (counterRef.current) {
          counterRef.current.textContent = Math.round(counter.value)
        }
      },
    })

    // Phase 2: Fade in brand name, hold (0.4s)
    tl.to(
      brandRef.current,
      {
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out',
      },
      '-=0.3'
    )

    // Brief hold
    tl.to({}, { duration: 0.4 })

    // Phase 3: Fade out content
    tl.to(
      [counterRef.current, brandRef.current],
      {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
      }
    )

    // Phase 4: Curtains split apart (0.8s)
    tl.to(
      curtainTopRef.current,
      {
        yPercent: -100,
        duration: 0.8,
        ease: 'power3.inOut',
      },
      '-=0.1'
    )

    tl.to(
      curtainBottomRef.current,
      {
        yPercent: 100,
        duration: 0.8,
        ease: 'power3.inOut',
      },
      '<'
    )

    // Fade out the loader background simultaneously
    tl.to(
      loaderRef.current,
      {
        opacity: 0,
        duration: 0.4,
        ease: 'power2.in',
      },
      '-=0.4'
    )
  }, { scope: loaderRef })

  return (
    <div className="loader" ref={loaderRef} aria-hidden="true">
      <div className="loader-content">
        <span className="loader-counter" ref={counterRef}>
          0
        </span>
        <span className="loader-brand" ref={brandRef}>
          Harmony
        </span>
      </div>

      <div
        className="loader-curtain loader-curtain--top"
        ref={curtainTopRef}
      />
      <div
        className="loader-curtain loader-curtain--bottom"
        ref={curtainBottomRef}
      />
    </div>
  )
}
