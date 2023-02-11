import { useEffect, useState } from 'react'

import { useRandomUsers } from '@/hooks'
import { Details } from '@/components'

export const FilterList = () => {
  const [filter, setFilter] = useState<{ name: string; list: string[] }[]>([
    { name: '', list: [] }
  ])
  const { randomUsersData } = useRandomUsers()

  useEffect(() => {
    if (!randomUsersData.data) return

    setFilter(randomUsersData.data.filter)
  }, [randomUsersData.data])

  return (
    <>
      {filter.map(props => (
        <Details key={props.name} {...props} />
      ))}
    </>
  )
}
