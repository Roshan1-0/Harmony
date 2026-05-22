import { forwardRef, useRef, useMemo } from 'react'
import '@styles/splittext.css'

/**
 * SplitText — Splits text content into individually animatable spans.
 * Use with GSAP by accessing the inner spans via the forwarded ref.
 *
 * @param {string} children - The text string to split
 * @param {'words'|'chars'} type - Split by words or characters
 * @param {string} className - Additional class name
 * @param {string} tag - HTML tag to render (default: 'div')
 */
const SplitText = forwardRef(function SplitText(
  { children, type = 'words', className = '', tag: Tag = 'div' },
  ref
) {
  const innerRef = useRef(null)

  // Merge forwarded ref with internal ref
  const setRef = (node) => {
    innerRef.current = node
    if (typeof ref === 'function') ref(node)
    else if (ref) ref.current = node
  }

  const pieces = useMemo(() => {
    if (typeof children !== 'string') return []
    if (type === 'chars') return children.split('')
    return children.split(/\s+/).filter(Boolean)
  }, [children, type])

  const wrapperClass = type === 'words' ? 'split-word' : 'split-char'
  const innerClass = type === 'words' ? 'split-word__inner' : 'split-char__inner'

  return (
    <Tag
      ref={setRef}
      className={`split-text ${className}`.trim()}
      aria-label={children}
    >
      {pieces.map((piece, i) => (
        <span key={`${piece}-${i}`}>
          <span className={wrapperClass}>
            <span className={innerClass} aria-hidden="true">
              {piece}
            </span>
          </span>
          {type === 'words' && i < pieces.length - 1 && '\u00A0'}
        </span>
      ))}
    </Tag>
  )
})

export default SplitText
