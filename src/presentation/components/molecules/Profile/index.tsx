import React from 'react'
import { FaArrowUp } from 'react-icons/fa'
import { getTotalExp } from '../../../../../pages/newtask'
import styles from './Profile.module.scss'

interface Props {
    name: string
    avatar: string
    tasks?: any[]
    position?: number
}

export function getLevel(exp: number) {
    const level = Math.floor(exp / 1000)

    if (exp < 1000) return { level: 1 }

    return {
        level
    }
}

const Profile = ({ name, avatar, tasks, position }: Props) => {
    const { totalExp } = getTotalExp(tasks)
    const { level } = getLevel(totalExp)

    return (
        <div className={styles.Profile}>
            <img src={avatar} alt={name} />
            <div>
                {position >= 0 && <span>{position + 3}</span>}
                <strong>{name}</strong>
                <p>
                    <FaArrowUp
                        style={{
                            width: '0.75rem',
                            height: '0.75rem',
                            color: '#54adff'
                        }}
                    />
                    Nível {level} <span>{totalExp} XP</span>
                </p>
                <p></p>
            </div>
        </div>
    )
}

export default Profile
