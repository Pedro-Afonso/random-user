import { useRouterParams } from '@/hooks'
import { Checkbox } from '../Checkbox'

import styles from './Details.module.css'

interface IDetailsProps {
  name: string
  list: string[]
}

export const Details: React.FC<IDetailsProps> = ({ name, list }) => {
  const { toggleParam, hasParam } = useRouterParams()

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    toggleParam(name, e.currentTarget.value)
  }

  return (
    <details open className={styles.details}>
      <summary>{name}</summary>
      {list.map(value => (
        <Checkbox
          key={value}
          value={value}
          handleCheckbox={handleCheckbox}
          defaultChecked={hasParam(name, value)}
        />
      ))}
    </details>
  )
}
