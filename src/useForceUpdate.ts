import { useReducer } from 'react'

export default function useForceUpdate() {
  const [, forceUpdate] = useReducer((c) => c + 1, 0)
  return forceUpdate
}
