import React, { ReactNode } from 'react'
import styles from './BoxContainer.module.scss'

interface Props {
    fixed?: boolean
    children: ReactNode
}

const BoxContainer = ({ children, fixed }: Props) => {
    return (
        <div
            className={styles.BoxContainer}
            style={
                fixed && {
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                    minHeight: '60vh'
                }
            }
        >
            {children}
        </div>
    )
}

export default BoxContainer
