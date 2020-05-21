# `useStateWithCallbackSync`

React hook with the same functionality as `useStateWithCallback`, but callback it is call synchronously.

## Usage

```tsx
import { useStateWithCallbackSync } from 'simple-react-hooks'

const App = (props: AppProps) => {
  const [count, setCount] = useStateWithCallbackSync<number>(0, (count) => console.log(count))

return (
  <div>
    <button type="button" onClick={() => setCount(c => c + 1)>
    Current count: {count}
    </button>
  </div>
  )
}
```
