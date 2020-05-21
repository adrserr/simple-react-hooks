# `useStateWithCallback`

React hook simulate old setState callback. This callback will receive the new value, it will be executed after each state update.

## Usage

```tsx
import { useStateWithCallback } from 'simple-react-hooks'

const App = (props: AppProps) => {
  const [count, setCount] = useStateWithCallback<number>(0, (count) => console.log(count))

return (
  <div>
    <button type="button" onClick={() => setCount(c => c + 1)>
    Current count: {count}
    </button>
  </div>
  )
}
```
