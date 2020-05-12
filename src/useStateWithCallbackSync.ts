import { useState, useLayoutEffect } from 'react'

export default function useStateWithCallbackSync<T>(
  initialValue: T,
  callback: (value: T) => void
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(initialValue)

  useLayoutEffect(() => {
    callback(value)
  }, [callback, value])

  return [value, setValue]
}
