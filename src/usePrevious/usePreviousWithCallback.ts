import { useRef, useEffect } from 'react'

export const usePreviousWithCallback = <T>(
  value: T,
  callback: (prevValue: T | undefined, currentValue: T) => void
): T => {
  const ref = useRef<T>()

  useEffect(() => {
    callback(ref.current, value)
    ref.current = value
  }, [callback, value])

  return ref.current as T
}
