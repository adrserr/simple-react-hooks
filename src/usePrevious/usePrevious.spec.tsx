import * as React from 'react'
import { render, getByTestId, cleanup, getByText } from '@testing-library/react'
import { Previous } from '../mocks/test-components'

describe('usePrevious', () => {
  afterEach(cleanup)

  it('should return previous undefined on first run', () => {
    const { container } = render(<Previous />)
    const prev = getByTestId(container, 'prev')
    const current = getByTestId(container, 'current')
    expect(current.textContent).toBe('0')
    expect(prev.textContent).toBe('')
  })

  it('should return previous undefined on first run', () => {
    const { container } = render(<Previous />)
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
