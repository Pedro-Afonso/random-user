import { useState } from 'react'
import styles from './BasicSelect.module.css'

interface IBasicSelectProps {
  defaultParam?: string | string[]
  handleSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void
  options?: { name: string; value: string }[]
}

export const BasicSelect: React.FC<IBasicSelectProps> = ({
  handleSelect,
  defaultParam,
  options
}) => {
  const [select, setSelect] = useState(defaultParam)

  const handleOnChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handleSelect(e)
    setSelect(e.target.value)
  }

  return (
    <>
      <div className={styles['select-wrapper']}>
        <select value={select} onChange={handleOnChangeSelect}>
          <option value=""></option>
          {options?.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.name}
            </option>
          ))}
        </select>
        <span className={styles['focus']}></span>
      </div>
    </>
  )
}
