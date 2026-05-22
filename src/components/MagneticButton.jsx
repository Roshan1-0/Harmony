import { useRef, useCallback } from 'react'
import gsap from 'gsap'

/**
 * MagneticButton — Reusable button wrapper that subtly follows
 * the cursor within its bounds for a tactile, magnetic feel.
 */
export default function MagneticButton({
  children,
  className = '',
  onClick,
  strength = 0.3,
  tag = 'button',
  href,
  ...rest
}) {
  const ref = useRef(null)

  const handleMouseMove = useCallback((e) => {
    const el = ref.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    gsap.to(el, {
      x: x * strength,
      y: y * strength,
      duration: 0.3,
      ease: 'power2.out',
    })
  }, [strength])

  const handleMouseLeave = useCallback(() => {
    const el = ref.current
    if (!el) return

    gsap.to(el, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'power3.out',
    })
  }, [])

  const isLink = tag === 'a' && href
  const Tag = isLink ? 'a' : 'button'

  return (
    <Tag
      ref={ref}
      className={className}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor="hover"
      href={isLink ? href : undefined}
      {...rest}
    >
      {children}
    </Tag>
  )
}
