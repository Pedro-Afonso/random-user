import { useRandomUsers, useRouterParams } from '@/hooks'

import { BasicSelect } from '../BasicSelect'

export const SortSelect: React.FC = () => {
  const { setSortParam, getParamValue } = useRouterParams()

  const { sort } = useRandomUsers()

  const sortParam = getParamValue('sort')

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortParam('sort', e.target.value)
  }

  return (
    <BasicSelect
      handleSelect={handleSelect}
      defaultParam={sortParam ?? ''}
      options={sort}
    />
  )
}
