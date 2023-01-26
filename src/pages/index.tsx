import BarLoader from 'react-spinners/BarLoader'
import { useRandomUsers, useRouterParams } from '@/hooks'
import { FilterList } from '@/components/FilterList'
import { Pagination } from '@/components/Pagination'
import { ListingTool } from '@/components/ListingTool'
import { BasicLayout } from '@/layouts'
import { SortSelect } from '@/components/SortSelect'
import { Card, Footer, Header } from '@/components'

import styles from '../styles/Home.module.css'
import { PageLimitSelect } from '@/components/Select/PageLimitSelect'

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
            select={<SortSelect options={sort} />}
            select2={<PageLimitSelect />}
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
