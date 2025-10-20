import styles from '../styles/header.module.css'

import placeholder from '../assets/placeholder.jpg'

export default function Header({currentPage}) {
    return (
        <>
            <div className={styles.container}>
                <div>
                    <p style={{fontSize: 25}}>{currentPage}</p>
                </div>
                <div className={styles.userContainer}>
                    <img src={placeholder} className={styles.icon}/>
                    <div>
                        <p>{localStorage.getItem("user")}</p>
                        <p className={styles.id}>ID: xxxxxxx</p>
                    </div>
                </div>
            </div>
        </>
    )
}