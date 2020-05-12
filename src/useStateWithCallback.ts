import { useState, useEffect } from 'react'

export default function useStateWithCallback<T>(
  initialValue: T,
  callback: (value: T) => void
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(initialValue)

  useEffect(() => {
    callback(value)
  }, [callback, value])

  return [value, setValue]
}
