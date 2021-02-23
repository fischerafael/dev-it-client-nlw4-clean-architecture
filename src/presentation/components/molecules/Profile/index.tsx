import React from 'react'
import { FaArrowUp } from 'react-icons/fa'
import styles from './Profile.module.scss'

const Profile = () => {
    return (
        <div className={styles.Profile}>
            <img
                src="https://github.com/fischerafael.png"
                alt="Rafael Fischer"
            />
            <div>
                <strong>Rafael Fischer</strong>
                <p>
                    <FaArrowUp
                        style={{
                            width: '0.5rem',
                            height: '0.5rem',
                            color: '#54adff'
                        }}
                    />
                    Nível 1
                </p>
            </div>
        </div>
    )
}

export default Profile
