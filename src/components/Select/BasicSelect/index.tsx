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
  return (
    <>
      <div className={styles['select-wrapper']}>
        <select onChange={handleSelect}>
          <option value=""></option>
          {options?.map(opt => (
            <option
              key={opt.value}
              selected={defaultParam === opt.value}
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
