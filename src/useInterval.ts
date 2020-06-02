import { useRef, useEffect } from 'react'

export default function useInterval(
  callback: () => void,
  delay: number | null
) {
  const savedCallback = useRef<() => void>(callback)

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    const cb = () => {
      savedCallback.current()
    }
    if (delay !== null) {
      const timeout = setInterval(cb, delay || 0)
      return () => clearInterval(timeout)
    }
    return undefined
  }, [delay])
}
