import { useRandomUsers } from '@/hooks'
import { useEffect, useState } from 'react'
import { Details } from '../Details'
import BarLoader from 'react-spinners/BarLoader'

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
