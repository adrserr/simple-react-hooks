# `usePrevious`

React hook to save previous state or prop value. Optionally a callback could be passed as a param. The callback function will receive the previous and current value.

## Usage

```tsx
import { usePrevious } from 'simple-react-hooks'

const App = (props: AppProps) => {
  const [count, setCount] = useState(0)

  const prevCount = usePrevious<number>(count, (prev, current) =>
    console.log(prev, current)
  )

  return (
    <div>
      <button type="button" onClick={() => setCount((c) => c + 1)}>
        Current count: {count}, Previous count: {prevCount}
      </button>
    </div>
  )
}
```

## Examples

```tsx
usePrevious<string>(text)
usePrevious<number>(count, (prev, current) => console.log(prev, current))
```
