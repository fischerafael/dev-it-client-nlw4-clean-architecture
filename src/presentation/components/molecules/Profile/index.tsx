import React from 'react'
import { FaArrowUp } from 'react-icons/fa'
import styles from './Profile.module.scss'

const Profile = ({ name, avatar }) => {
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
                    Nível 1 <span>67832 XP</span>
                </p>
            </div>
        </div>
    )
}

export default Profile
