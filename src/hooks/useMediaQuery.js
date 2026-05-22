import { useEffect, useRef, useState } from 'react'

/**
 * Media query hook — returns whether the given query matches.
 * Responds to changes in real time.
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false)
  const mediaRef = useRef(null)

  useEffect(() => {
    mediaRef.current = window.matchMedia(query)
    setMatches(mediaRef.current.matches)

    const handler = (e) => setMatches(e.matches)
    mediaRef.current.addEventListener('change', handler)

    return () => {
      mediaRef.current?.removeEventListener('change', handler)
    }
  }, [query])

  return matches
}
