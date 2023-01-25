import BarLoader from 'react-spinners/BarLoader'
import { useRandomUsers } from '@/hooks'
import { FilterList } from '@/components/FilterList'
import { Pagination } from '@/components/Pagination'
import { ListingTool } from '@/components/ListingTool'
import { BasicLayout } from '@/layouts'
import { Select } from '@/components/Select'
import { Card, Footer, Header } from '@/components'

import styles from '../styles/Home.module.css'

export default function Home() {
  const { randomUsersData } = useRandomUsers()

  const randomUsers = randomUsersData.data?.users ?? []

  const total = randomUsersData.data?.total
  const sort = randomUsersData.data?.sort

  return (
    <>
      <Header />
      <BasicLayout
        filterList={<FilterList />}
        listingTool={
          <ListingTool
            select={
              <Select options={sort} onChange={test => console.log(test)} />
            }
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
