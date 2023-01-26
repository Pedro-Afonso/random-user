import { useRouterParams } from '@/hooks'

import { BasicSelect } from '../BasicSelect'

export const PageLimitSelect = () => {
  const { setSortParam, getParamValue } = useRouterParams()

  const limitParam = getParamValue('limit')

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // setLimitParam
    setSortParam('limit', e.target.value)
  }

  return (
    <BasicSelect
      handleSelect={handleSelect}
      defaultParam={limitParam ?? '9'}
      options={[
        { name: '9 Pessoas', value: '9' },
        { name: '12 Pessoas', value: '12' },
        { name: '15 Pessoas', value: '15' },
        { name: '18 Pessoas', value: '18' },
        { name: '21 Pessoas', value: '21' },
        { name: '24 Pessoas', value: '24' },
        { name: '27 Pessoas', value: '27' },
        { name: '30 Pessoas', value: '30' }
      ]}
    />
  )
}
