import { renderHook, act } from '@testing-library/react-hooks'
import { useStateWithCallbackSync } from '../src'

const stub = jest.fn().mockImplementation((value) => `Value: ${value}`)

const setUp = () =>
  renderHook((state) => useStateWithCallbackSync<number>(state, stub), {
    initialProps: 0
  })

describe('useStateWithCallbackSync', () => {
  afterEach(() => {
    stub.mockClear()
  })

  it('should return initial state', () => {
    const { result } = setUp()
    const [state] = result.current

    expect(state).toBe(0)
    expect(stub).toHaveBeenCalledTimes(1)
  })

  it('should execute instanly callback  on each update', () => {
    const { result } = setUp()

    const [state, setState] = result.current

    expect(state).toBe(0)

    act(() => {
      setState(1)
    })

    expect(result.current[0]).toBe(1)
    expect(stub).toHaveBeenCalledTimes(2)
  })
})
