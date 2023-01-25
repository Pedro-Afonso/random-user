import axios from 'axios'
import { QueryClient } from 'react-query'
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

const apiClient = axios.create({
  baseURL: publicRuntimeConfig.backendUrl
})

const queryClient = new QueryClient()

export { apiClient, queryClient }
