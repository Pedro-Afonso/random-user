import { BarLoader } from 'react-spinners'

import { Card, Pagination } from '@/components'
import { useRandomUsers } from '@/hooks'

import styles from './CardList.module.css'

export const CardList = () => {
  const { users, total, isLoading, isFetching } = useRandomUsers()

  return (
    <>
      <div className={styles.grid}>
        {(isLoading || isFetching) && (
          <BarLoader
            data-testid="bar-loader-id"
            width="100%"
            cssOverride={{ gridColumn: '1/-1' }}
          />
        )}
        {users.map(randomUser => (
          <Card key={randomUser.login.uuid} randomUser={randomUser} />
        ))}
      </div>
      {!isLoading && <Pagination length={total} />}
    </>
  )
}
