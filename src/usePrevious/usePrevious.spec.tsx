import { renderHook } from '@testing-library/react-hooks'
import { usePrevious } from './usePrevious'

const setUp = () =>
  renderHook(({ state }) => usePrevious(state), { initialProps: { state: 0 } })

describe('usePrevious', () => {
  it('should return undefined on first run', () => {
    const { result } = setUp()

    expect(result.current).toBeUndefined()
  })

  it('should return previous value after each update', () => {
    const { result, rerender } = setUp()

    rerender({ state: 1 })
    expect(result.current).toBe(0)

    rerender({ state: 4 })
    expect(result.current).toBe(1)

    rerender({ state: 10 })
    expect(result.current).toBe(4)
  })
})
