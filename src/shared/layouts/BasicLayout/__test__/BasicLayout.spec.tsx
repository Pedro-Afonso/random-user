import { screen } from '@testing-library/react'

import { renderWithProviders } from '@/providers'

import { BasicLayout } from '..'

jest.mock('next/router', () => require('next-router-mock'))

describe('BasicLayout', () => {
  const props = {
    title: 'title-test',
    subtitle: 'subtitle-test',
    listingTool: <p>listingTool-test</p>,
    filterList: <p>filterList-test</p>,
    children: <p>children-test</p>
  }
  it('should render BasicLayout', () => {
    renderWithProviders(<BasicLayout {...props} />)

    const title = screen.getByText('title-test')
    const subtitle = screen.getByText('subtitle-test')
    const listingTool = screen.getByText('listingTool-test')
    const filterList = screen.getByText('filterList-test')
    const children = screen.getByText('children-test')

    expect(title).toBeInTheDocument()
    expect(subtitle).toBeInTheDocument()
    expect(listingTool).toBeInTheDocument()
    expect(filterList).toBeInTheDocument()
    expect(children).toBeInTheDocument()
  })
})
