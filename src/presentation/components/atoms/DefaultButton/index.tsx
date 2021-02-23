import React from 'react'
import styles from './DefaultButton.module.scss'

const DefaultButton = ({ children }) => {
    return <button className={styles.DefaultButton}>{children}</button>
}

export default DefaultButton
