import React, { useEffect, useState } from 'react'
import styles from './ExperienceBar.module.scss'

interface Props {
    initialTime: number
    currentTime: number
    maxExp: number
    score: number
    setScore(e: any): void
}

const ExperienceBar = ({
    initialTime,
    currentTime,
    maxExp,
    score,
    setScore
}: Props) => {
    const [progress, setProgress] = useState(
        getPercentage(initialTime, currentTime)
    )

    console.log(progress)

    useEffect(() => {
        setProgress(getPercentage(initialTime, currentTime))
    }, [currentTime])

    useEffect(() => {
        const calculatedExp = calculateExp(progress, maxExp)
        setScore(calculatedExp)
    }, [progress])

    const showScore = score !== 0 && score < maxExp && `${score} xp`

    return (
        <header className={styles.header}>
            <span>0 xp</span>
            <div className={styles.experienceBar}>
                <div style={{ width: `${progress}%` }} />
                <span style={{ left: `${progress}%` }}>{showScore}</span>
            </div>
            <span>{maxExp} xp</span>
        </header>
    )
}

export default ExperienceBar

function getPercentage(initialTime: number, currentTime: number) {
    const timeSpent = initialTime - currentTime
    const percentage = (timeSpent / initialTime) * 100
    if (percentage < 100) {
        return +percentage
    }
    return 100
}

function calculateExp(progress: number, maxExp: number) {
    const exp = ((maxExp * progress) / 100).toFixed(0)
    return +exp
}
