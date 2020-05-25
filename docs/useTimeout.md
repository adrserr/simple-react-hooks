# `useTimeout`

React hook to use a declarative setTimeout.<br/>

It will receive a function to be called, an optional delay in ms and autoStart property. The `autoStart` param enables you to decide whether timeout is run on component mount or when you call `restart` function. The `delay` as default is `0` and `autoStart` as default is `false`.<br/><br/>
This hook return an array with a `restart` and `clear` method, and `isActive` boolean. The array: `[restart, clear, isActive]`. It is important take into account the order.

- `restart: () => void` — restarts timeout
- `clear: () => void` — clears the timeout
- `isActive: boolean | null` — state variable

  - `true` — timeout has been called
  - `false` — timeout is yet to be called (pending)
  - `null` — timeout has been cancelled

### Important

This hook:

- re-render component when isActive change
- cancel timeout on clear.
- restart timeout when delay changes and `autoStart` is `true`
- timeout won't be restarted if callback function changes. You need to restart it manually.

## Usage

```tsx
import React from 'react'
import { useState } from 'react'
import { useTimeout } from 'simple-react-hooks'

const App = (props: AppProps) => {
  const [title, setTitle] = useState('')
  const [delay, setDelay] = useState(500)
  const [restart, clear, isActive] = useTimeout(
    () => setTitle('Hello World'),
    delay,
    true
  )

  return (
    <div>
      <button type="button" onClick={restart}>
        Start Timeout
      </button>
      <button type="button" onClick={clear}>
        Clear Timeout
      </button>
      <input
        type="text"
        onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
          // Changing delay will restart timeout if autoStart is true, if not you need to click de button again
          setDelay(Number(ev.target.value))
        }}
      />
    </div>
  )
}
```
