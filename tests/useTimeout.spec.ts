import {
  renderHook,
  RenderHookResult,
  act,
  cleanup
} from '@testing-library/react-hooks'
import { FnReturnType } from '../src/useTimeout'
import { useTimeout } from '../src'

// return fn to spy and renderHook result
const setup = (
  fn = jest.fn(),
  ms = 5,
  auto = false
): [
  Function,
  RenderHookResult<
    { cb: Function; delay: number; autoStart: boolean },
    FnReturnType
  >
] => {
  return [
    fn,
    renderHook(
      ({ cb, delay = 5, autoStart = false }) =>
        useTimeout(cb, delay, autoStart),
      {
        initialProps: { cb: fn, delay: ms, autoStart: auto }
      }
    )
  ]
}

const advanceTime = (time = 0) =>
  act(() => {
    jest.advanceTimersByTime(time)
  })

describe('useTimeout', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.clearAllTimers()
    cleanup()
  })

  it('should be defined', () => {
    expect(useTimeout).toBeDefined()
  })

  it('should return two functions and a boolean', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const { result } = renderHook(() => useTimeout(() => {}, 5, true))

    expect(result.current.length).toBe(3)
    expect(typeof result.current[0]).toBe('function')
    expect(typeof result.current[1]).toBe('function')
    expect(typeof result.current[2]).toBe('boolean')
  })

  it('should not run callback on setup when autoStart is false', () => {
    const [callback] = setup()

    expect(callback).not.toHaveBeenCalled()

    advanceTime(5)
    expect(callback).not.toHaveBeenCalled()
  })

  it('should run callback, after delay has finished, on setup when autoStart is true', () => {
    const [callback] = setup(undefined, undefined, true)

    // need add if not setState warning will be displayed
    advanceTime(5)

    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('first returned function should restart timeout', () => {
    const [cb, hook] = setup(undefined, undefined, true)

    advanceTime(3)
    expect(cb).not.toHaveBeenCalled()

    const [restart] = hook.result.current
    act(() => restart())

    advanceTime(2)
    expect(cb).not.toHaveBeenCalled()

    advanceTime(3)
    expect(cb).toHaveBeenCalled()
  })

  it('second returned function should clear timeout', () => {
    const [cb, hook] = setup(undefined, undefined, true)

    advanceTime(2)
    expect(cb).not.toHaveBeenCalled()

    const [, clear] = hook.result.current
    act(() => clear())

    advanceTime(3)
    expect(cb).not.toHaveBeenCalled()
  })

  it("third return value should return timeout's state in every moment", async () => {
    const [, hook] = setup()

    const [restart, , isActive] = hook.result.current
    expect(isActive).toBe(null)

    act(() => restart())
    expect(hook.result.current[2]).toBe(false)

    advanceTime(5)

    expect(hook.result.current[2]).toBe(true)

    act(() => hook.result.current[1]())
    expect(hook.result.current[2]).toBe(null)
  })

  it('should restart timeout on delay change when autoStart is true', () => {
    const [cb, hook] = setup(undefined, undefined, true)

    advanceTime(2)
    expect(cb).not.toHaveBeenCalledTimes(1)

    hook.rerender({ delay: 7, cb, autoStart: true })

    advanceTime(3)
    expect(cb).not.toHaveBeenCalledTimes(1)

    advanceTime(4)
    expect(cb).toHaveBeenCalledTimes(1)
  })

  it('should not restart timeout on delay change when autoStart is false', () => {
    const [cb, hook] = setup(undefined, 5, false)

    advanceTime(2)
    expect(cb).not.toHaveBeenCalledTimes(1)

    hook.rerender({ delay: 7, cb, autoStart: false })

    advanceTime(3)
    expect(cb).not.toHaveBeenCalledTimes(1)

    advanceTime(4)
    expect(cb).not.toHaveBeenCalledTimes(1)
  })

  it('should not restart on callback change', () => {
    const [cb, hook] = setup(undefined, 5)

    const [restart] = hook.result.current
    act(() => restart())

    advanceTime(2)

    const cb2 = jest.fn()
    hook.rerender({ delay: 5, autoStart: false, cb: cb2 })

    advanceTime(3)

    expect(cb).not.toHaveBeenCalled()
    expect(cb2).toHaveBeenCalledTimes(1)
  })
})
