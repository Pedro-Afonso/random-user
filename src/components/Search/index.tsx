import { useState } from 'react'

import { useRouterParams } from '@/hooks'

import styles from './Search.module.css'

export const Search = () => {
  const { clearAndSetParam, getParamValue, clearParams } = useRouterParams()

  const [search, setSearch] = useState(getParamValue('search') ?? '')

  const handleSearchParams = () => {
    if (search) {
      clearAndSetParam('search', search)
    } else {
      clearParams('search', 'Estado', 'Gênero', 'page')
    }
  }

  return (
    <div className={styles['search-wrapper']}>
      <input
        className={styles['search-input']}
        type="text"
        placeholder="Pesquisar..."
        value={search}
        onKeyDown={e => (e.key === 'Enter' ? handleSearchParams() : undefined)}
        onChange={e => setSearch(e.target.value)}
      />
      <button className={styles['search-button']} onClick={handleSearchParams}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <defs></defs>
          <circle cx="11" cy="11" r="8"></circle>
          <path d="M21 21l-4.35-4.35"></path>
        </svg>
      </button>
    </div>
  )
}
