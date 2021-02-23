import React from 'react'
import styles from './HeroImage.module.scss'

const HeroImage = () => {
    return (
        <img
            className={styles.HeroImage}
            src="/hero-img.svg"
            alt="Dev It Imagem Inicial"
        />
    )
}

export default HeroImage
