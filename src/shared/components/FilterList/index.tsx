import { useRandomUsers } from '@/hooks'
import { Details } from '@/components'

export const FilterList = () => {
  const { filter } = useRandomUsers()

  return (
    <>
      {filter.map(props => (
        <Details key={props.name} {...props} />
      ))}
    </>
  )
}
