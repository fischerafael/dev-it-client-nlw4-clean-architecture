import Link from 'next/link'
import React from 'react'
import MainButton from '../MainButton'
import styles from './HeroActions.module.scss'

const HeroActions = () => {
    return (
        <div className={styles.HeroActions}>
            <h1>Seja um DEV mais produtivo</h1>
            <h2>
                Utilize a técnica do Pomodoro para ser mais produtivo e mostre
                as tarefas que você realizou jogando com outros Devs.
            </h2>
            <Link href="/login?state=register">
                <a>
                    <MainButton>Cadastrar</MainButton>
                </a>
            </Link>
        </div>
    )
}

export default HeroActions
