import { ReactNode } from 'react'
import Head from 'next/head'

import styles from './BasicLayout.module.css'
import { useFilterContext } from '@/contexts/FilterContext'
import classNames from 'classnames'

interface IBasicLayoutProps {
  hasFilterList?: boolean

  listingTool: ReactNode
  filterList: ReactNode
  children: ReactNode
}

export const BasicLayout: React.FC<IBasicLayoutProps> = ({
  hasFilterList = true,

  listingTool,
  filterList,
  children
}) => {
  const { isFilterOpen } = useFilterContext()

  const cxFilter = classNames(styles['subcontainer-left'], {
    [styles['subcontainer-left--open']]: isFilterOpen
  })

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.wrapper + ' centralize'}>
        <div className={styles.title}>
          <h2>Usuários aleatórios</h2>
        </div>
        <div className={styles.container}>
          {hasFilterList && filterList && (
            <div className={cxFilter}>{filterList}</div>
          )}

          <div className={styles['subcontainer-right']}>
            {listingTool}

            {children}
          </div>
        </div>
      </div>
    </>
  )
}