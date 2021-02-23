import React from 'react'
import styles from './MainButton.module.scss'

const MainButton = ({ children }) => {
    return <button className={styles.MainButton}>{children}</button>
}

export default MainButton
