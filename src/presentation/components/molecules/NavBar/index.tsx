import React from 'react'
import Link from 'next/link'
import styles from './NavBar.module.scss'
import DefaultButton from '../../atoms/DefaultButton'
import Logo from '../../atoms/Logo'

const NavBar = () => {
    return (
        <div className={styles.NavBar}>
            <Logo />
            <Link href="/login?state=login">
                <a>
                    <DefaultButton>Entrar</DefaultButton>
                </a>
            </Link>
        </div>
    )
}

export default NavBar
