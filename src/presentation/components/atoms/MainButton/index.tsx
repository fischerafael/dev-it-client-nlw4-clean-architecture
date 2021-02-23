import React, { ReactNode } from 'react'
import styles from './MainButton.module.scss'

interface Props {
    children: ReactNode
    onClick(e: any): Promise<void>
}

const MainButton = ({ children, onClick }: Props) => {
    return (
        <button onClick={onClick} className={styles.MainButton}>
            {children}
        </button>
    )
}

export default MainButton
