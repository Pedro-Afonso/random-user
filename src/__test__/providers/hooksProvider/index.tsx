import { renderHook } from '@testing-library/react'
import { QueryClientProvider } from 'react-query'

import { AppFilterProvider } from '@/contexts'
import { queryClient } from '@/services'

import { RenderHooksProviderProps, WrapperProps } from './types'

const wrapper = ({ children }: WrapperProps) => (
  <AppFilterProvider>
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  </AppFilterProvider>
)

export const renderHooksProvider = (children: RenderHooksProviderProps) =>
  renderHook(children, { wrapper })
