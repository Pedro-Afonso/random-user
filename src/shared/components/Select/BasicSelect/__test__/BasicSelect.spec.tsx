import { fireEvent, screen } from '@testing-library/react'

import { renderWithProviders } from '@/providers'

import { BasicSelect } from '..'

jest.mock('next/router', () => require('next-router-mock'))

describe('BasicSelect', () => {
  it('should render BasicSelect', () => {
    const props = {
      handleSelect: jest.fn(),
      defaultParam: 'value-1',
      options: [
        { name: 'name-1', value: 'value-1' },
        { name: 'name-2', value: 'value-2' }
      ]
    }
    renderWithProviders(<BasicSelect {...props} />)

    const select = screen.getByRole('combobox')

    expect(select).toHaveValue('value-1')
  })

  it('should select the second value', () => {
    const props = {
      handleSelect: jest.fn(),
      defaultParam: 'value-1',
      options: [
        { name: 'name-1', value: 'value-1' },
        { name: 'name-2', value: 'value-2' }
      ]
    }
    renderWithProviders(<BasicSelect {...props} />)

    const select = screen.getByRole('combobox')
    fireEvent.change(select, { target: { value: 'value-2' } })

    expect(select).toHaveValue('value-2')
    expect(props.handleSelect).toHaveBeenCalled()
  })
})
