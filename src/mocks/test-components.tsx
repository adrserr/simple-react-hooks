import * as React from 'react'
import { useState } from 'react'
import { usePrevious } from '../usePrevious'
import { usePreviousWithCallback } from '../usePrevious/usePreviousWithCallback'

export const Previous = () => {
  const [count, setCount] = useState(0)

  const prevCount = usePrevious<number>(count)

  return (
    <div>
      <div data-testid="prev">{prevCount}</div>
      <div data-testid="current">{count}</div>
      <button type="button" onClick={() => setCount((c) => c + 1)}>
        Add
      </button>
    </div>
  )
}

export const PreviousWithCallback = () => {
  const [count, setCount] = useState(0)

  const callback = (prev: any, current: any) => console.log(prev, current)
  const prevCount = usePreviousWithCallback<number>(count, callback)

  return (
    <div>
      <div data-testid="prev">{prevCount}</div>
      <div data-testid="current">{count}</div>
      <button type="button" onClick={() => setCount((c) => c + 1)}>
        Add
      </button>
    </div>
  )
}
