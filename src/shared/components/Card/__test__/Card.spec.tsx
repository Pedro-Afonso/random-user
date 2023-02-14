import { screen } from '@testing-library/react'

import { renderWithProviders } from '@/providers'
import { randomUser } from '@/mocks'

import { Card } from '..'

describe('Card', () => {
  it('should render Card', () => {
    renderWithProviders(<Card randomUser={randomUser} />)

    const firstName = screen.getByRole('heading', {
      level: 3,
      name: new RegExp(randomUser.name.first)
    })
    const lastName = screen.getByRole('heading', {
      level: 3,
      name: new RegExp(randomUser.name.last)
    })
    const street = screen.getByText(new RegExp(randomUser.name.first, 'gi'))
    const city = screen.getByText(new RegExp(randomUser.location.city, 'gi'))
    const avatar = screen.getByRole('img')

    expect(firstName).toBeInTheDocument()
    expect(lastName).toBeInTheDocument()
    expect(street).toBeInTheDocument()
    expect(city).toBeInTheDocument()
    expect(avatar).toBeInTheDocument()
  })
})
