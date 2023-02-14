/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { fireEvent, screen } from '@testing-library/react'

import { renderWithProviders } from '@/providers'

import { Checkbox } from '..'

describe('Checkbox', () => {
  const props = {
    defaultChecked: false,
    handleCheckbox: jest.fn(),
    name: 'testName'
  }

  it('should render Checkbox', () => {
    renderWithProviders(<Checkbox {...props} />)

    const checkbox = screen.getByRole('checkbox')
    const checkboxLabel = screen.getByText(new RegExp(props.name, 'gi'))

    expect(checkbox).toBeInTheDocument()
    expect(checkboxLabel).toBeInTheDocument()
  })

  it('should call handleCheckbox function', () => {
    renderWithProviders(<Checkbox {...props} />)

    const checkbox = screen.getByRole('checkbox')

    fireEvent.click(checkbox)

    expect(props.handleCheckbox).toHaveBeenCalled()
  })
})
