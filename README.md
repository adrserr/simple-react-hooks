# simple-react-hooks

Custom React Hooks. A great variety of simple, yet powerful custom hooks.

# Install

Just this simple.

```
npm i simple-react-hooks
```

# Usage

- ## usePrevious(value)
  Hook to get previous prop or state

```TSX
import { usePrevious } from 'simple-react-hooks'

.....
const App = (props: AppProps) => {
  const [count, setCount] = useState(0)

  const prevCount = usePrevious<number>(count)

return (
  <div>
    <button type="button" onClick={() => setCount(c => c + 1)>
    Current count: {count}, Previous count: {prevCount}
    </button>
  </div>
  )
}
```

- ## usePrevious(value)
  Hook to get previous prop or state, with a callback to be executed when the value is updated.

```TSX
import { usePreviousWithCallback } from 'simple-react-hooks'
.....
const App = (props: AppProps) => {
  const [count, setCount] = useState(0)

  const callback = useCallback((prev, current) => {
    console.log(prev,current)
  })

  const prevCount = usePreviousWithCalback<number>(count, callback)

return (
  <div>
    <button type="button" onClick={() => setCount(c => c + 1)>
    Current count: {count}, Previous count: {prevCount}
    </button>
  </div>
  )
}
```

# Author

Adrián Serrano

# Contact

adrserr@hotmail.com
