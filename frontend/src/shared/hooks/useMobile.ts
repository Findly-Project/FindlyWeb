import { useEffect, useState } from 'react'

export const useMobile = () => {
  const [width, setWidth] = useState(window.innerWidth)
  const [debounceTimeout, setDebounceTimout] = useState<NodeJS.Timeout | null>(null)
  const handleResize = () => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout)
    }
    const timeout = setTimeout(() => {
      setWidth(window.innerWidth)
    }, 300)
    setDebounceTimout(timeout)
  }
  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(debounceTimeout!)
    }
  }, [debounceTimeout])

  return width <= 768
}
