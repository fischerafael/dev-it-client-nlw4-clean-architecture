import React from 'react'
import { FaArrowUp } from 'react-icons/fa'
import styles from './Profile.module.scss'

interface Props {
    name: string
    avatar: string
    totalExp: number
}

export function getLevel(exp: number) {
    const level = Math.floor(exp / 1000)

    if (exp < 1000) return { level: 1 }

    return {
        level
    }
}

const Profile = ({ name, avatar, totalExp }: Props) => {
    const { level } = getLevel(totalExp)

    return (
        <div className={styles.Profile}>
            <img src={avatar} alt={name} />
            <div>
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
            </div>
        </div>
    )
}

export default Profile
