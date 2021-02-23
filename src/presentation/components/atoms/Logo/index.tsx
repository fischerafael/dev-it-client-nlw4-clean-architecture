import Link from 'next/link'
import React from 'react'
import styles from './Logo.module.scss'

const Logo = () => {
    return (
        <Link href="/">
            <a>
                <img
                    className={styles.Logo}
                    src="/dev-it-logo.svg"
                    alt="DevIt"
                />
            </a>
        </Link>
    )
}

export default Logo
