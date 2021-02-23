import React from 'react'
import Link from 'next/link'
import styles from './NavBar.module.scss'
import DefaultButton from '../../atoms/DefaultButton'

const NavBar = () => {
    return (
        <div className={styles.NavBar}>
            <Link href="/">
                <a>
                    <img src="/dev-it-logo.svg" alt="DevIt" />
                </a>
            </Link>
            <DefaultButton>Entrar</DefaultButton>
        </div>
    )
}

export default NavBar
