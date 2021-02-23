import React from 'react'
import styles from './CustomInput.module.scss'

interface Props {
    label: string
    value: any
    onChange(e: any): void
}

const CustomInput = ({ label, value, onChange }: Props) => {
    return (
        <label className={styles.CustomInput}>
            <span>{label}</span>
            <input type="text" value={value} onChange={onChange} />
        </label>
    )
}

export default CustomInput
