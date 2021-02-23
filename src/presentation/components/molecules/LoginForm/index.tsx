import React, { ReactNode } from 'react'
import styles from './LoginForm.module.scss'

interface Props {
    children: ReactNode
    title: string
    subTitle: string
    state: 'login' | 'register'
    setState(e: 'login' | 'register'): void
}

const LoginForm = ({ children, title, subTitle, state, setState }: Props) => {
    function handleSetLogin(e) {
        e.preventDefault()
        setState('login')
    }

    function handleSetRegister(e) {
        e.preventDefault()
        setState('register')
    }

    return (
        <form className={styles.LoginForm}>
            <h1>{title}</h1>
            <p>{subTitle}</p>

            {children}

            {state === 'login' && (
                <a onClick={handleSetRegister}>Ainda não sou cadastrado</a>
            )}
            {state === 'register' && (
                <a onClick={handleSetLogin}>Já sou cadastrado</a>
            )}
        </form>
    )
}

export default LoginForm
