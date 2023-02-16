import { fireEvent, screen } from '@testing-library/react'
import mockRouter from 'next-router-mock'

import { renderWithProviders } from '@/providers'

import { SortSelect } from '..'

jest.mock('next/router', () => require('next-router-mock'))

describe('SortSelect', () => {
  const props = {
    options: [
      { name: 'name-1', value: 'value-1' },
      { name: 'name-2', value: 'value-2' }
    ]
  }
  it('should render SortSelect', () => {
    renderWithProviders(<SortSelect {...props} />)

    const select = screen.getByRole('combobox')

    expect(select).toBeInTheDocument()
    expect(select).toHaveValue('')
  })

  it('should have value-1 as default value', () => {
    mockRouter.push('?sort=value-1')
    renderWithProviders(<SortSelect {...props} />)

    const select = screen.getByRole('combobox')

    expect(select).toHaveValue('value-1')
  })

  it('should select the second value', () => {
    renderWithProviders(<SortSelect {...props} />)

    const select = screen.getByRole('combobox')

    fireEvent.change(select, { target: { value: 'value-2' } })

    expect(select).toHaveValue('value-2')
    expect(mockRouter.asPath).toBe('?page=1&sort=value-2')
  })
})
