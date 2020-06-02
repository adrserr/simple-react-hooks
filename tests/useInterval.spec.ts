import {
  cleanup,
  renderHook,
  RenderHookResult
} from '@testing-library/react-hooks'
import { useInterval } from '../src'

const setup = (
  fn: () => void = jest.fn(),
  ms: number | null = 0
): [
  Function,
  RenderHookResult<{ cb: Function; delay: number | null }, void>
] => {
  return [
    fn,
    renderHook(({ cb, delay = 0 }) => useInterval(cb, delay), {
      initialProps: { cb: fn, delay: ms }
    })
  ]
}

describe('useInterval', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })
  afterEach(() => {
    jest.clearAllTimers()
    cleanup()
  })

  it('should init hook if delay is null', () => {
    const [cb, hook] = setup(undefined, null)

    expect(hook.result.current).toBeUndefined()
    expect(setInterval).not.toHaveBeenCalled()
    expect(cb).not.toHaveBeenCalled()
  })

  it('should init hook with custom delay', () => {
    const [cb, hook] = setup(undefined, 100)

    expect(hook.result.current).toBeUndefined()
    expect(setInterval).toHaveBeenCalled()
    expect(cb).not.toHaveBeenCalled()
  })

  it('should start with 0 if delay is not provided', () => {
    const [, hook] = setup()

    expect(hook.result.current).toBeUndefined()
    expect(setInterval).toHaveBeenCalledTimes(1)

    expect(setInterval).toHaveBeenCalledWith(expect.any(Function), 0)
  })

  it('should execute callback repeatedly with custom delay', () => {
    const [cb] = setup(undefined, 100)

    expect(cb).not.toHaveBeenCalled()

    jest.advanceTimersByTime(99)
    expect(cb).not.toHaveBeenCalled()

    jest.advanceTimersByTime(1)
    expect(cb).toHaveBeenCalledTimes(1)

    jest.advanceTimersByTime(100)
    expect(cb).toHaveBeenCalledTimes(2)
  })

  it('should not clear interval if callback changes', () => {
    const cb2 = jest.fn()

    const [cb, hook] = setup(undefined, 100)

    expect(cb).not.toHaveBeenCalled()

    jest.advanceTimersByTime(50)
    expect(cb).not.toHaveBeenCalled()

    hook.rerender({ cb: cb2, delay: 100 })

    jest.advanceTimersByTime(50)
    expect(cb).not.toHaveBeenCalled()
    expect(cb2).toHaveBeenCalled()
  })

  it('should clear interval on delay change', () => {
    const cb = jest.fn()
    let delay = 100
    const { rerender } = renderHook(() => useInterval(cb, delay))

    expect(cb).not.toHaveBeenCalled()

    jest.advanceTimersByTime(50)

    delay = 100 + 20
    rerender()
    expect(clearInterval).toHaveBeenCalled()

    jest.advanceTimersByTime(50)
    expect(cb).not.toHaveBeenCalled()

    jest.advanceTimersByTime(50 + 20)
    expect(cb).toHaveBeenCalled()
  })

  it('should clear interval on unmount', () => {
    const cb = jest.fn()
    const { unmount } = renderHook(() => useInterval(cb, 100))

    expect(setInterval).toHaveBeenCalled()
    expect(cb).not.toHaveBeenCalled()

    jest.advanceTimersByTime(50)
    unmount()

    expect(clearInterval).toHaveBeenCalled()
    expect(cb).not.toHaveBeenCalled()
  })
})
