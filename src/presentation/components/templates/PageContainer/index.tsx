import React from 'react'
import styles from './PageContainer.module.scss'

const PageContainer = ({ children }) => {
    return <main className={styles.Page}>{children}</main>
}

export default PageContainer
