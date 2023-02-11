import Image from 'next/image'

import { IRandomUser } from '@/shared/interface'

import styles from './Card.module.css'

interface ICardProps {
  randomUser: IRandomUser
}
export const Card: React.FC<ICardProps> = ({ randomUser }) => {
  const {
    picture: { medium },
    name: { first, last },
    location: { street, state, city, postcode },
    dob
  } = randomUser

  return (
    <article className={styles.card}>
      <section>
        <Image src={medium} alt={first} width={80} height={80} priority />
        <h3>{first + ' ' + last}</h3>
        <span>Idade: {dob.age}</span>
        <address>
          <p>{street.name + street.number}</p>
          <p>{city}</p>
          <p>{state + '- CEP:' + postcode}</p>
        </address>
      </section>
    </article>
  )
}
