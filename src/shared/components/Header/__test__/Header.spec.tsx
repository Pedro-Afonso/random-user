import { screen } from '@testing-library/react'

import { renderWithProviders } from '@/providers'

import { Header } from '..'

describe('Header', () => {
  it('should render Header', () => {
    renderWithProviders(<Header />)

    const Logo = screen.getByRole('heading', { level: 1 })
    const githubIcon = screen.getByRole('img')

    expect(Logo).toBeInTheDocument()
    expect(githubIcon).toHaveAttribute('alt', 'Github')
  })
})
