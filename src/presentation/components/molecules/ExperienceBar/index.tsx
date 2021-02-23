import React from 'react'
import styles from './ExperienceBar.module.scss'

const ExperienceBar = () => {
    return (
        <header className={styles.header}>
            <span>0 xp</span>
            <div className={styles.experienceBar}>
                <div style={{ width: '50%' }} />
                <span style={{ left: '50%' }}>300xp</span>
            </div>
            <span>600 xp</span>
        </header>
    )
}

export default ExperienceBar
