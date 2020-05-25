# `useWatch`

React hook that watches a prop or state value. Each time the value is updated the previous and current value will be printed on console.
By default if no callback is passed to the hook, `console.log` is used. Optionally a callback can be used with another logger system. Custom callback will receive new and old value.

`useWatch` is only for dev purpose.

## Usage

```tsx
import { useWatch } from 'simple-react-hooks'

const App = (props: AppProps) => {
  const [count, setCount] = useState(0)

  useWatch<number>(count, (prev, current) => console.log(prev, current))

  return (
    <div>
      <button type="button" onClick={() => setCount((c) => c + 1)}>
        Current count: {count}
      </button>
    </div>
  )
}
```

## Examples

```tsx
useWatch<string>(text)
useWatch<number>(count, (prev, current) => console.log(prev, current))
```
