import { useRouterParams } from '@/hooks'
import { BasicSelect } from '../Select'

interface ISelectProps {
  options?: { name: string; value: string }[]
}

export const SortSelect: React.FC<ISelectProps> = ({ options }) => {
  const { setSortParam, getParamValue, isReady } = useRouterParams()

  const sortParam = getParamValue('sort')

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortParam('sort', e.target.value)
  }

  return (
    <>
      {isReady ? (
        <BasicSelect
          handleSelect={handleSelect}
          defaultParam={sortParam ?? ''}
          options={options}
        />
      ) : (
        <></>
      )}
    </>
  )
}
