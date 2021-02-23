import React from 'react'
import styles from './TwoColumnContainer.module.scss'

const TwoColumnContainer = ({ children }) => {
    return <div className={styles.TwoColumnContainer}>{children}</div>
}

export default TwoColumnContainer
