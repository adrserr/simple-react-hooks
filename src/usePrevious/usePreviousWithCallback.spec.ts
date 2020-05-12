import { renderHook } from '@testing-library/react-hooks'
import { usePreviousWithCallback } from './usePreviousWithCallback'

const stub = jest
  .fn()
  .mockImplementation((prev, current) => `Prev: ${prev}, Current: ${current}`)
const setUp = () =>
  renderHook(({ state }) => usePreviousWithCallback(state, stub), {
    initialProps: { state: 0 }
  })

describe('usePreviousWithCallback', () => {
  afterEach(() => {
    stub.mockClear()
  })

  it('should return undefined on first run', () => {
    const { result } = setUp()

    expect(result.current).toBeUndefined()
    expect(stub).toHaveBeenCalledTimes(1)
  })

  it('should return previous value after each update', () => {
    const { result, rerender } = setUp()

    rerender({ state: 1 })
    expect(result.current).toBe(0)

    rerender({ state: 4 })
    expect(result.current).toBe(1)

    rerender({ state: 10 })
    expect(result.current).toBe(4)

    expect(stub).toHaveBeenCalledTimes(4)
  })
})
