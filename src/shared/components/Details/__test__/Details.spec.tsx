import { fireEvent, screen } from '@testing-library/react'

import { renderWithProviders } from '@/providers'

import { Details } from '..'

jest.mock('next/router', () => require('next-router-mock'))

describe('Details', () => {
  it('should render Details', () => {
    const props = {
      name: 'test-name',
      list: ['1', '2']
    }
    renderWithProviders(<Details {...props} />)

    const name = screen.getByText(new RegExp(props.name, 'i'))
    const checkbox = screen.getAllByRole('checkbox')

    expect(name).toBeInTheDocument()
    expect(checkbox).toHaveLength(props.list.length)
  })

  it('should render Details', () => {
    const props = {
      name: 'test-name',
      list: ['1', '2']
    }
    renderWithProviders(<Details {...props} />)

    const checkbox = screen.getAllByRole('checkbox')

    expect(checkbox[0]).not.toBeChecked()

    fireEvent.click(checkbox[0])

    expect(checkbox[0]).toBeChecked()
  })
})
