import { fireEvent, screen } from '@testing-library/react'
import mockRouter from 'next-router-mock'

import { renderWithProviders } from '@/providers'

import { Pagination } from '..'

jest.mock('next/router', () => require('next-router-mock'))

describe('Pagination', () => {
  it('should render Pagination component with 1 page button', () => {
    renderWithProviders(<Pagination />)

    const pages = screen.getAllByRole('button', { name: /^[0-9]/i })

    expect(pages).toHaveLength(1)
  })

  it('should render Pagination component with 3 page button', () => {
    mockRouter.push('?page=3&limit=9')
    renderWithProviders(<Pagination length={20} />)

    const pages = screen.getAllByRole('button', { name: /^[0-9]/i })

    expect(pages).toHaveLength(3)
  })

  it('should redirect page when the button to page 1 is clicked', () => {
    const initialPage = 2
    mockRouter.push(`?page=${initialPage}`)
    renderWithProviders(<Pagination length={20} />)

    const initialPageMinusOne = screen.getByRole('button', {
      name: (initialPage - 1).toString()
    })

    fireEvent.click(initialPageMinusOne)

    expect(mockRouter.asPath).toBe(`?page=${initialPage - 1}`)
  })

  it('should redirect page when the "previous page" button is clicked', () => {
    const initialPage = 3
    mockRouter.push(`?page=${initialPage}&limit=9&limit=9`)
    renderWithProviders(<Pagination length={20} />)

    const prevButton = screen.getByRole('button', { name: 'previous page' })

    fireEvent.click(prevButton)

    expect(mockRouter.asPath).toBe(`?limit=9&limit=9&page=${initialPage - 1}`)
  })

  it('should redirect page when the "next page" button is clicked', () => {
    const initialPage = 1
    mockRouter.push(`?page=${initialPage}&page=${initialPage}`)
    renderWithProviders(<Pagination length={20} />)

    const nextButton = screen.getByRole('button', { name: 'next page' })

    fireEvent.click(nextButton)

    expect(mockRouter.asPath).toBe(`?page=${initialPage + 1}`)
  })

  it('should show the "last page" button', () => {
    const initialPage = 6
    mockRouter.push(`?page=${initialPage}&limit=5`)
    renderWithProviders(<Pagination length={30} />)

    const lastButton = screen.getByRole('button', { name: '5' })

    expect(lastButton).toBeInTheDocument()
  })

  it('should show the "15°" button', () => {
    const initialPage = 15
    mockRouter.push(`?page=${initialPage}&limit=1`)
    renderWithProviders(<Pagination length={30} />)

    const lastButton = screen.getByRole('button', { name: '15' })

    expect(lastButton).toBeInTheDocument()
  })
})
