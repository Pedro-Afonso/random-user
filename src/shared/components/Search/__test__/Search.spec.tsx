import { fireEvent, screen } from '@testing-library/react'
import mockRouter from 'next-router-mock'

import { renderWithProviders } from '@/providers'

import { Search } from '..'

jest.mock('next/router', () => require('next-router-mock'))

describe('Search', () => {
  it('should render Search component', () => {
    renderWithProviders(<Search />)

    const searchInput = screen.getByRole('textbox')
    // const searchButton = screen.getByRole('button')

    expect(searchInput).toHaveAttribute('placeholder', 'Pesquisar...')
    // expect(searchButton).toHaveAttribute('placeholder', 'Pesquisar...')
  })

  it('should set search query with the input text', () => {
    renderWithProviders(<Search />)

    const searchInput = screen.getByRole('textbox')
    const searchButton = screen.getByRole('button')

    fireEvent.change(searchInput, { target: { value: 'A' } })
    fireEvent.click(searchButton)

    expect(mockRouter.asPath).toBe('?limit=&search=A')
  })

  it('should set search query when the Enter key is pressed', () => {
    renderWithProviders(<Search />)

    const searchInput = screen.getByRole('textbox')

    fireEvent.keyDown(searchInput, { key: 'A' })
    fireEvent.keyDown(searchInput, { key: 'Enter' })

    expect(mockRouter.asPath).toBe('?limit=&search=A')
  })

  it('should remove search query from path', () => {
    mockRouter.push('?limit=&search=ABC')
    renderWithProviders(<Search />)

    const searchInput = screen.getByRole('textbox')
    const searchButton = screen.getByRole('button')

    fireEvent.change(searchInput, { target: { value: '' } })
    fireEvent.click(searchButton)

    expect(mockRouter.asPath).toBe('?limit=')
  })
})
