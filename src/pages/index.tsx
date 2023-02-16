import BarLoader from 'react-spinners/BarLoader'

import { SortSelect, PageLimitSelect } from '@/shared/components/Select'
import { useRandomUsers, useRouterParams } from '@/shared/hooks'
import { BasicLayout } from '@/shared/layouts'
import {
  Card,
  Footer,
  Header,
  FilterList,
  Pagination,
  ListingTool
} from '@/shared/components'

import styles from '../styles/Home.module.css'

export default function Home() {
  const { randomUsersData } = useRandomUsers()

  const { getParamValue } = useRouterParams()

  const randomUsers = randomUsersData.data?.users ?? []

  const total = randomUsersData.data?.total

  const sort = randomUsersData.data?.sort

  const results = randomUsersData.data?.users.length

  const searchParam = getParamValue('search')

  const messageSearch = searchParam
    ? `, para o resultado da pesquisa: "${searchParam}"`
    : ''

  const subtitle = results
    ? `Exibindo ${results} resultados de ${total}` + messageSearch
    : ''

  return (
    <>
      <Header />
      <BasicLayout
        title="Usuários aleatórios"
        subtitle={subtitle}
        filterList={<FilterList />}
        listingTool={
          <ListingTool
            selectPrimary={<SortSelect options={sort} />}
            selectSecondary={<PageLimitSelect />}
          />
        }
      >
        <div className={styles.grid}>
          {randomUsersData.isLoading && (
            <BarLoader width="100%" cssOverride={{ gridColumn: '1/-1' }} />
          )}
          {randomUsers.map(randomUser => (
            <Card key={randomUser.login.uuid} randomUser={randomUser} />
          ))}
        </div>
        {!randomUsersData.isLoading && <Pagination length={total} />}
      </BasicLayout>
      <Footer />
    </>
  )
}
