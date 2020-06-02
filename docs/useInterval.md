# `useInterval`

React hook to use a declarative setInterval.<br/>

This hook will receive a callback and a delay. The callback will be executed repeatedly, each time the delay expires.
If the delay is null, the interval will be paused, if no delay is provided setInterval will be call with 0.
Any delay change will clear the interval. However, any callback change won't clear the interval.

## Usage

```tsx
import React from 'react'
import { useState } from 'react'
import { useInterval } from 'simple-react-hooks'

const App = (props: AppProps) => {
  const [delay, setDelay] = useState(500)
  const [count, setCount] = useState(0)

  useInterval(() => setCount((c) => c + 1))

  return (
    <div>
      <h3>Count: {count}</h3>
      <input
        type="text"
        value={delay}
        onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
          setDelay(Number(ev.target.value))
        }}
      />
    </div>
  )
}
```
