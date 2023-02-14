import styles from './Checkbox.module.css'

interface ICheckboxProps {
  name: string
  defaultChecked: boolean
  handleCheckbox: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const Checkbox: React.FC<ICheckboxProps> = ({
  name,
  defaultChecked,
  handleCheckbox
}) => {
  return (
    <label className={styles['form-control']}>
      <input
        type="checkbox"
        name={name}
        value={name}
        onChange={handleCheckbox}
        checked={defaultChecked}
      />
      {name}
    </label>
  )
}
