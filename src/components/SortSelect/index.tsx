import { useRouterParams } from '@/hooks'
import styles from './SortSelect.module.css'

interface ISelectProps {
  options?: { name: string; value: string }[]
}

export const SortSelect: React.FC<ISelectProps> = ({ options }) => {
  const { setSortParam, getParamValue } = useRouterParams()

  const sortParam = getParamValue('sort')

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortParam('sort', e.target.value)
  }

  return (
    <>
      <div className={styles['select-wrapper']}>
        <select onChange={handleSelect}>
          <option value=""></option>
          {options?.map(opt => (
            <option
              key={opt.value}
              selected={sortParam === opt.value}
              value={opt.value}
            >
              {opt.name}
            </option>
          ))}
        </select>
        <span className={styles['focus']}></span>
      </div>
    </>
  )
}
