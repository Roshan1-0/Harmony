import gsap from 'gsap'

/**
 * GSAP animation factory functions.
 * Creates reusable, consistent animation configurations.
 */

/* Standard easing curves */
export const EASE = {
  reveal: 'power3.out',
  smooth: 'power2.inOut',
  bounce: 'back.out(1.4)',
  snap: 'power4.out',
}

/**
 * Creates a staggered "reveal from below" animation for child elements.
 */
export function createStaggerReveal(targets, options = {}) {
  const {
    y = 60,
    duration = 0.9,
    stagger = 0.06,
    ease = EASE.reveal,
    delay = 0,
  } = options

  return gsap.from(targets, {
    y,
    opacity: 0,
    duration,
    stagger,
    ease,
    delay,
    paused: true,
  })
}

/**
 * Creates a text reveal animation — each word/char slides up from clipped container.
 */
export function createTextReveal(targets, options = {}) {
  const {
    y = '110%',
    duration = 0.8,
    stagger = 0.035,
    ease = EASE.reveal,
    delay = 0,
    rotationZ = 2.5,
  } = options

  return gsap.from(targets, {
    y,
    rotationZ,
    opacity: 0,
    duration,
    stagger,
    ease,
    delay,
    paused: true,
  })
}

/**
 * Creates a number counter animation for stats.
 */
export function createCounter(target, endValue, options = {}) {
  const {
    duration = 2,
    ease = 'power2.out',
    suffix = '',
    prefix = '',
  } = options

  const obj = { value: 0 }

  return gsap.to(obj, {
    value: endValue,
    duration,
    ease,
    paused: true,
    onUpdate() {
      if (target) {
        target.textContent = `${prefix}${Math.round(obj.value)}${suffix}`
      }
    },
  })
}

/**
 * Creates a parallax scroll effect configuration for ScrollTrigger.
 */
export function getParallaxConfig(speed = -20) {
  return {
    y: speed,
    ease: 'none',
    scrollTrigger: {
      scrub: 0.8,
    },
  }
}

/**
 * Splits text content of an element into wrapped spans for animation.
 * Returns an array of the created span elements.
 */
export function splitTextIntoSpans(element, type = 'words') {
  if (!element) return []

  const text = element.textContent
  element.innerHTML = ''
  element.setAttribute('aria-label', text)

  let parts
  if (type === 'chars') {
    parts = text.split('')
  } else if (type === 'lines') {
    parts = text.split('\n')
  } else {
    parts = text.split(/\s+/)
  }

  const spans = parts.map((part, i) => {
    const wrapper = document.createElement('span')
    wrapper.style.display = 'inline-block'
    wrapper.style.overflow = 'hidden'
    wrapper.style.verticalAlign = 'top'

    const inner = document.createElement('span')
    inner.style.display = 'inline-block'
    inner.textContent = part
    inner.setAttribute('aria-hidden', 'true')

    wrapper.appendChild(inner)
    element.appendChild(wrapper)

    // Add space between words (except last)
    if (type === 'words' && i < parts.length - 1) {
      const space = document.createTextNode('\u00A0')
      element.appendChild(space)
    }

    return inner
  })

  return spans
}
