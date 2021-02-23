import React from 'react'
import styles from './OneColumnContainer.module.scss'

const OneColumnContainer = ({ children }) => {
    return <div className={styles.OneColumnContainer}>{children}</div>
}

export default OneColumnContainer
