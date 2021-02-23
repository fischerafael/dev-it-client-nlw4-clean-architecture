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
            <MainButton>Cadastrar</MainButton>
        </div>
    )
}

export default HeroActions
