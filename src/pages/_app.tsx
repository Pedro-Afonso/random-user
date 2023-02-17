import { QueryClientProvider } from 'react-query'
import type { AppProps } from 'next/app'

import { AppFilterProvider } from '@/contexts'
import { queryClient } from '@/services'

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
