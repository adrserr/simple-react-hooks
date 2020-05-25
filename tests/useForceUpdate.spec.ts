import { renderHook, act } from '@testing-library/react-hooks'
import { useForceUpdate } from '../src'

describe('useForceUpdate', () => {
  afterEach(() => {})

  it('should return forceUpdate function', () => {
    const { result } = renderHook(() => useForceUpdate())

    const forceUpdate = result.current

    expect(forceUpdate).toBeInstanceOf(Function)
  })

  it('should re-render component on forceUpdate call', () => {
    let timesCalled = 0

    const { result } = renderHook(() => {
      timesCalled += 1
      return useForceUpdate()
    })

    expect(timesCalled).toBe(1)
    const forceUpdate = result.current

    act(() => forceUpdate())
    expect(timesCalled).toBe(2)

    act(() => forceUpdate())
    expect(timesCalled).toBe(3)
  })

  it('should return always same forceUpdate function', () => {
    const { result, rerender } = renderHook(() => useForceUpdate())

    const firstFn = result.current

    rerender()
    expect(firstFn).toBe(result.current)
  })
})
