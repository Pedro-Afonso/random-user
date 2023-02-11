import { useRouter } from 'next/router'
import { useQuery } from 'react-query'

import { Data } from '@/pages/api/random-user'
import { apiClient } from '@/services'
import { useMemo } from 'react'

export const useRandomUsers = () => {
  const router = useRouter()

  const randomUsersData = useQuery<Data>(
    ['random-user', router.query],
    () =>
      apiClient
        .get('random-user', { params: router.query })
        .then(res => res.data),
    {
      staleTime: Infinity,
      cacheTime: Infinity,
      keepPreviousData: true
    }
  )

  const filter = randomUsersData.data?.filter ?? []

  const page = router.query.page
  const limit = router.query.limit

  return { randomUsersData, page, limit, filter }
}
