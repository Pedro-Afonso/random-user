import { QueryClientProvider } from 'react-query'
import type { AppProps } from 'next/app'

import { AppFilterProvider } from '@/shared/contexts/FilterContext'
import { queryClient } from '@/shared/services'

import '@/styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppFilterProvider>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </AppFilterProvider>
  )
}
