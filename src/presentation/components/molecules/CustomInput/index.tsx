import React from 'react'
import styles from './CustomInput.module.scss'

interface Props {
    label: string
    value: any
    onChange(e: any): void
    number?: boolean
}

const CustomInput = ({ label, value, onChange, number }: Props) => {
    return (
        <label className={styles.CustomInput}>
            <span>{label}</span>
            <input
                type={number ? 'number' : 'text'}
                value={value}
                onChange={onChange}
            />
        </label>
    )
}

export default CustomInput
