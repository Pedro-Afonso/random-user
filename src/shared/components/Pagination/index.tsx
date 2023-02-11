import { useRouterParams } from '@/shared/hooks'

import styles from './Pagination.module.css'

interface IPaginationProps {
  length?: number
}

export const Pagination: React.FC<IPaginationProps> = props => {
  const { setParam, getParamValue } = useRouterParams({ shallow: false })

  const limitParam = getParamValue('limit')
  const pageParam = getParamValue('page')

  const limit = Array.isArray(limitParam) ? 9 : Number(limitParam || 9)
  const page = Array.isArray(pageParam) ? 1 : Number(pageParam || 1)

  const length = props.length ?? limit

  const lastPage = Math.ceil(length / limit)

  const pages = Array.from(
    { length: lastPage <= 5 ? lastPage : 5 },
    (_, index) => (page <= 3 ? index + 1 : index + page - 2)
  )

  const isActive = (p: number): string =>
    p === Number(page) ? styles['pagination--active'] : ''

  const onChangePage = (page: number) => {
    setParam('page', page.toString())
  }

  return (
    <>
      {length ? (
        <div className={styles['pagination']}>
          <button
            className={styles['pagination-arrow']}
            disabled={page === 1}
            onClick={() => onChangePage(page - 1)}
          ></button>

          {page > 3 && <span>...</span>}

          {pages.map(
            (p, key) =>
              p <= lastPage && (
                <button
                  key={key}
                  onClick={() => onChangePage(p)}
                  className={styles['pagination-button'] + ' ' + isActive(p)}
                >
                  {p}
                </button>
              )
          )}

          {(lastPage > 5 || (page > 3 && page <= lastPage - 3)) &&
            page < lastPage - 3 && <span>...</span>}

          <button
            className={styles['pagination-arrow']}
            disabled={page === lastPage}
            onClick={() => onChangePage(page + 1)}
          ></button>
        </div>
      ) : null}
    </>
  )
}
