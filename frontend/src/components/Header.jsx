import styles from '../styles/header.module.css'

import placeholder from '../assets/placeholder.jpg'

export default function Header({currentPage, currUser}) {
    return (
        <>
            <div className={styles.container}>
                <div>
                    <p style={{fontSize: 25}}>{currentPage}</p>
                </div>
                <div className={styles.userContainer}>
                    <img src={placeholder} className={styles.icon}/>
                    <div>
                        <p>{currUser}</p>
                        <p>ID: xxxxxxx</p>
                    </div>
                </div>
            </div>
        </>
    )
}