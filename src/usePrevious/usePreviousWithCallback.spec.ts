import * as React from 'react'
import { PreviousWithCallback } from './../mocks/test-components'
import { render, getByTestId, cleanup, getByText } from '@testing-library/react'

describe('usePrevious', () => {
  afterEach(cleanup)

  it('should return previous undefined on first run', () => {
    const { container } = render(<PreviousWithCallback />)
    const prev = getByTestId(container, 'prev')
    const current = getByTestId(container, 'current')
    expect(current.textContent).toBe('0')
    expect(prev.textContent).toBe('')
  })

  it('should return previous undefined on first run', () => {
    const { container } = render(<PreviousWithCallback />)
    const prev = getByTestId(container, 'prev')
    const current = getByTestId(container, 'current')
    expect(current.textContent).toBe('0')
    expect(prev.textContent).toBe('')
    const button = getByText(container, 'Add')
    button.click()
    expect(current.textContent).toBe('1')
    expect(prev.textContent).toBe('0')
  })
})
