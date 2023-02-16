import { fireEvent, screen } from '@testing-library/react'
import mockRouter from 'next-router-mock'

import { renderWithProviders } from '@/providers'

import { PageLimitSelect } from '..'

jest.mock('next/router', () => require('next-router-mock'))

describe('PageLimitSelect', () => {
  it('should render PageLimitSelect', () => {
    renderWithProviders(<PageLimitSelect />)

    const select = screen.getByRole('combobox')

    expect(select).toBeInTheDocument()
  })

  it('should have 9 as default value', () => {
    renderWithProviders(<PageLimitSelect />)

    const select = screen.getByRole('combobox')

    expect(select).toHaveValue('9')
  })

  it('should have 12 as default value', () => {
    mockRouter.push('?limit=12')
    renderWithProviders(<PageLimitSelect />)

    const select = screen.getByRole('combobox')

    expect(select).toHaveValue('12')
  })

  it('should select the 18 value', () => {
    renderWithProviders(<PageLimitSelect />)

    const select = screen.getByRole('combobox')

    fireEvent.change(select, { target: { value: '18' } })

    expect(select).toHaveValue('18')
    expect(mockRouter.asPath).toBe('?page=1&limit=18')
  })
})
