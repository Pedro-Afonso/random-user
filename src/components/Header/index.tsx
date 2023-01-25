import Image from 'next/image'
import Link from 'next/link'
import styles from './Header.module.css'

export const Header = () => {
  return (
    <header className={styles['header']}>
      <nav className="centralize">
        <a
          href="https://github.com/Pedro-Afonso?tab=repositories"
          rel="noreferrer"
          target="_blank"
        >
          <h1>
            <Image
              width={60}
              height={60}
              priority
              alt="Github"
              src="data:image/png;base64,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"
            />
          </h1>
        </a>
      </nav>
    </header>
  )
}
