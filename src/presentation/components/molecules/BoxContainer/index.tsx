import React from 'react'
import styles from './BoxContainer.module.scss'

const BoxContainer = ({ children }) => {
    return <div className={styles.BoxContainer}>{children}</div>
}

export default BoxContainer
