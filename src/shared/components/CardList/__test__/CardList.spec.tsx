import { screen } from '@testing-library/react'
import { setupServer } from 'msw/node'
import { rest } from 'msw'

import { renderWithProviders } from '@/providers'
import { randomUserData } from '@/mocks'

import { CardList } from '..'

const handlers = [
  rest.get('http://localhost:3000/api/random-user', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(randomUserData))
  })
]

const server = setupServer(...handlers)

jest.mock('next/router', () => require('next-router-mock'))

beforeAll(() => server.listen())

afterEach(() => server.resetHandlers())

afterAll(() => server.close())

describe('CardList', () => {
  it('should show loading component', async () => {
    renderWithProviders(<CardList />)

    const barLoader = await screen.findByTestId('bar-loader-id')

    expect(barLoader).toBeInTheDocument()
  })

  it('should show 9 card component', async () => {
    renderWithProviders(<CardList />)

    const cards = await screen.findAllByTestId('card-id')

    expect(cards).toHaveLength(9)
  })
})
