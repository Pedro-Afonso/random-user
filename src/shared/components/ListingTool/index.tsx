import { useFilterContext } from '@/contexts'
import { Search } from '@/components'

import styles from './ListingTool.module.css'

interface IListingToolProps {
  selectPrimary?: React.ReactNode
  selectSecondary?: React.ReactNode
  hasSearch?: boolean
  hasNewButton?: boolean
}

export const ListingTool: React.FC<IListingToolProps> = ({
  selectPrimary,
  selectSecondary,
  hasSearch = true,
  hasNewButton = true
}) => {
  const { toggleFilter } = useFilterContext()

  const hasSelect = !!selectSecondary || !!selectPrimary

  return (
    <div data-testid="listing-tool-id" className={styles.listing}>
      {hasSearch && <Search />}
      <div className={styles.actions}>
        {hasSelect && (
          <div className={styles.selects}>
            {selectSecondary}
            {selectPrimary}
          </div>
        )}
        {hasNewButton && (
          <button className={styles.button} onClick={toggleFilter}>
            <svg
              style={{ color: 'white' }}
              height="32px"
              width="32px"
              id="Layer_1"
              version="1.1"
              viewBox="0 0 32 32"
              xmlSpace="preserve"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <path
                d="M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2 s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2 S29.104,22,28,22z"
                fill="white"
              ></path>
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}
