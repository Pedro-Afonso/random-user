import { useRouter } from 'next/router'
import { useQuery } from 'react-query'

import { Data } from '@/pages/api/random-user'
import { apiClient } from '@/services'

export const useRandomUsers = () => {
  const router = useRouter()

  const randomUsersData = useQuery<Data>(
    ['random-user', router.query],
    () =>
      apiClient
        .get('random-user', { params: router.query })
        .then(res => res.data)
        // eslint-disable-next-line no-console
        .catch(console.log),
    {
      staleTime: Infinity,
      cacheTime: Infinity,
      keepPreviousData: true
    }
  )

  const users = randomUsersData.data?.users ?? []
  const filter = randomUsersData.data?.filter ?? []
  const total = randomUsersData.data?.total
  const sort = randomUsersData.data?.sort
  const isLoading = randomUsersData.isLoading
  const page = router.query.page
  const limit = router.query.limit

  return {
    randomUsersData,
    users,
    page,
    limit,
    filter,
    total,
    sort,
    isLoading
  }
}
