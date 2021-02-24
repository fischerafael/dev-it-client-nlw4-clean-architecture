import React from 'react'
import { formatTimeInSeconds } from '../../../utils'
import styles from './TimerContainer.module.scss'

const TimerContainer = ({ timeInSeconds }: { timeInSeconds: number }) => {
    const {
        firstNumber,
        secondNumber,
        thirdNumber,
        fourthNumber
    } = formatTimeInSeconds(timeInSeconds)

    return (
        <div className={styles.TimerContainer}>
            <span>{firstNumber}</span>
            <span>{secondNumber}</span>
            <span>:</span>
            <span>{thirdNumber}</span>
            <span>{fourthNumber}</span>
        </div>
    )
}

export default TimerContainer
