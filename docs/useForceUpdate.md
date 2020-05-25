# `useForceUpdate`

Hook that return a function to force a component re-render. Try to avoid using or use the least you can.

## Usage

```tsx
import { useForceUpdate } from 'simple-react-hooks'

const App = (props: AppProps) => {
  const forceUpdate = useForceUpdate()

  console.log('I have rendered')

  return (
    <div>
      <button type="button" onClick={() => setCount((c) => c + 1)}>
        Re-render component
      </button>
    </div>
  )
}
```
