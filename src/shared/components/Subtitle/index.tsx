import { useRandomUsers, useRouterParams } from '@/hooks'

export const Subtitle = () => {
  const { users, total } = useRandomUsers()

  const { getParamValue } = useRouterParams()

  const searchParam = getParamValue('search')

  const results = users.length

  const messageSearch = searchParam
    ? `, para o resultado da pesquisa: "${searchParam}"`
    : ''

  const subtitle = results
    ? `Exibindo ${results} resultados de ${total}` + messageSearch
    : ''

  return <h3>{subtitle}</h3>
}
