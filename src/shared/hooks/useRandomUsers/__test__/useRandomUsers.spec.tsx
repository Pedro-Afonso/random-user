import mockRouter from 'next-router-mock'
import { setupServer } from 'msw/node'
import { rest } from 'msw'

import { renderHooksProvider } from '@/providers'
import { randomUserData } from '@/mocks'

import { useRandomUsers } from '..'
import { waitFor } from '@testing-library/react'

jest.mock('next/router', () => require('next-router-mock'))

const handlers = [
  rest.get('http://localhost:3000/api/random-user', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(randomUserData))
  })
]

const server = setupServer(...handlers)

beforeAll(() => server.listen())

afterEach(() => server.resetHandlers())

afterAll(() => server.close())

describe('useRandomUsers hook', () => {
  it('should return randomUsersData and filter', async () => {
    const { result } = renderHooksProvider(() => useRandomUsers())

    await waitFor(() => result.current.randomUsersData.data.isSuccess)

    const users = result.current.randomUsersData.data.users
    const filter = result.current.filter

    expect(users).toEqual(randomUserData.users)
    expect(filter).toEqual(randomUserData.filter)
  })

  it('should return page and limit query params', () => {
    mockRouter.push('?page=1&limit=9')
    const { result } = renderHooksProvider(() => useRandomUsers())

    const page = result.current.page
    const limit = result.current.limit

    expect(page).toBe('1')
    expect(limit).toBe('9')
  })
})
