import { screen } from '@testing-library/react'

import { renderWithProviders } from '@/providers'

import { ListingTool } from '..'

jest.mock('next/router', () => require('next-router-mock'))

describe('ListingTool', () => {
  it('should render ListingTool', () => {
    renderWithProviders(<ListingTool />)

    const listingToolId = screen.getByTestId('listing-tool-id')

    expect(listingToolId).toBeInTheDocument()
  })

  it('should have selectPrimary or selectSecondary', () => {
    const props = {
      selectPrimary: <p>selectPrimary</p>,
      selectSecondary: <p>selectSecondary</p>
    }
    renderWithProviders(<ListingTool {...props} />)

    const selectPrimary = screen.getByText('selectPrimary')
    const selectSecondary = screen.getByText('selectSecondary')

    expect(selectPrimary).toBeInTheDocument()
    expect(selectSecondary).toBeInTheDocument()
  })
})
