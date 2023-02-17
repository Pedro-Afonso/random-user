import BarLoader from 'react-spinners/BarLoader'

import { useRandomUsers } from '@/hooks'
import { BasicLayout } from '@/layouts'
import {
  Card,
  Footer,
  Header,
  FilterList,
  Pagination,
  ListingTool,
  SortSelect,
  PageLimitSelect,
  Subtitle
} from '@/components'

import styles from '../styles/Home.module.css'

export default function Home() {
  const { users, total, sort, isLoading } = useRandomUsers()

  return (
    <>
      <Header />
      <BasicLayout
        title="Usuários aleatórios"
        subtitle={<Subtitle />}
        filterList={<FilterList />}
        listingTool={
          <ListingTool
            selectPrimary={<SortSelect options={sort} />}
            selectSecondary={<PageLimitSelect />}
          />
        }
      >
        <div className={styles.grid}>
          {isLoading && (
            <BarLoader width="100%" cssOverride={{ gridColumn: '1/-1' }} />
          )}
          {users.map(randomUser => (
            <Card key={randomUser.login.uuid} randomUser={randomUser} />
          ))}
        </div>
        {!isLoading && <Pagination length={total} />}
      </BasicLayout>
      <Footer />
    </>
  )
}
