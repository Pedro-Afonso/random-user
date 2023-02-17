import { screen } from '@testing-library/react'
import mockRouter from 'next-router-mock'
import { setupServer } from 'msw/node'
import { rest } from 'msw'

import { renderWithProviders } from '@/providers'
import { randomUserData } from '@/mocks'

import { SortSelect } from '..'

jest.mock('next/router', () => require('next-router-mock'))

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

describe('SortSelect', () => {
  const { sort } = randomUserData
  it('should render SortSelect', async () => {
    renderWithProviders(<SortSelect />)

    const select = await screen.findByRole('combobox')

    expect(select).toBeInTheDocument()
    expect(select).toHaveValue('')
  })

  it(`should have ${sort[0].value} as default value`, async () => {
    mockRouter.push(`?sort=${sort[0].value}`)
    renderWithProviders(<SortSelect />)

    await screen.findByRole('option', { name: sort[0].name })
    const select = await screen.findByRole('combobox')

    expect(select).toHaveValue(sort[0].value)
  })
})
