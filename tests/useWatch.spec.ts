import { renderHook } from '@testing-library/react-hooks'
import { useWatch } from '../src'

const setUp = () => renderHook((state) => useWatch(state), { initialProps: 0 })

const mockConsole = jest
  .spyOn(console, 'log')
  .mockImplementation((previous: any, current: any) => ({
    previous,
    current
  }))

const stub = jest.fn().mockImplementation((prev: any, current: any) => ({
  prev,
  current
}))

const setUpWithFn = () =>
  renderHook((state) => useWatch(state, stub), {
    initialProps: 0
  })

describe('useWatch', () => {
  afterEach(() => {
    stub.mockClear()
    mockConsole.mockClear()
  })

  it('should log with initial value on first render', () => {
    setUp()

    expect(mockConsole).toHaveBeenCalledWith({
      previous: undefined,
      current: 0
    })
    expect(mockConsole).toHaveBeenCalledTimes(1)
  })

  it('should log with initial value on first render', () => {
    const { rerender } = setUp()

    expect(mockConsole).toHaveBeenCalledWith({
      previous: undefined,
      current: 0
    })

    rerender(1)

    expect(mockConsole).toHaveBeenCalledWith({
      previous: 0,
      current: 1
    })

    expect(mockConsole).toHaveBeenCalledTimes(2)
  })

  it('should call custom function instead of console.log', () => {
    const { rerender } = setUpWithFn()

    expect(stub).toHaveBeenCalledWith(undefined, 0)

    rerender(1)
    expect(stub).toHaveBeenCalledWith(0, 1)

    expect(mockConsole).not.toHaveBeenCalled()
  })
})
