import styles from './Checkbox.module.css'

interface ICheckboxProps {
  value: string
  defaultChecked: boolean
  handleCheckbox: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const Checkbox: React.FC<ICheckboxProps> = ({
  value,
  defaultChecked,
  handleCheckbox
}) => {
  return (
    <label className={styles['form-control']}>
      <input
        type="checkbox"
        name={value}
        value={value}
        onChange={handleCheckbox}
        checked={defaultChecked}
      />
      {value}
    </label>
  )
}
