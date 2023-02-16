import { QueryClientProvider } from 'react-query'
import { render } from '@testing-library/react'
import { PropsWithChildren } from 'react'

import { AppFilterProvider } from '@/contexts'
import { queryClient } from '@/services'

export function renderWithProviders(ui: React.ReactElement) {
  function Wrapper({ children }: PropsWithChildren): JSX.Element {
    return (
      <AppFilterProvider>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </AppFilterProvider>
    )
  }

  return { ...render(ui, { wrapper: Wrapper }) }
}
