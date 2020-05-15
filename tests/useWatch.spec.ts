import { renderHook } from '@testing-library/react-hooks'
import { useWatch } from '../src'

const setUp = () => renderHook((state) => useWatch(state), { initialProps: 0 })

const stub = jest.fn().mockImplementation((prev: any, current: any) => ({
  prev,
  current
}))

// const setUpWithFn = () =>
//   renderHook(({ state }) => useWatch(state, stub), {
//     initialProps: { state: 0 }
//   })

const mockConsole = jest
  .spyOn(console, 'log')
  .mockImplementation((prev: any, current: any) => ({
    previous: prev,
    current
  }))

describe('useWatch', () => {
  afterEach(function () {
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
})
