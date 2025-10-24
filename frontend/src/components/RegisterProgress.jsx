import styles from '../styles/authPage/registerprogress.module.css'

import empty from '../assets/register/empty-register-icon.svg'
import filled from '../assets/register/filled-register-icon.svg'

export default function RegisterProgress({ currentForm }){
    return(
        <>
            <div className={styles.container}>
                <div className={`${styles.first} ${currentForm =="First" ? styles.current : styles.filled}`}>
                    <img 
                        className={`${styles.icon} ${currentForm == "First" ? styles.inverted : ""}`}
                        src={currentForm =="First" ? empty : filled}
                    />
                </div>
                <div className={`${styles.line} ${currentForm == "Second" ? styles.current : (currentForm == "Third" ? styles.filled : "")}`} />

                <div className={`${styles.second} ${currentForm == "Second" ? styles.current : (currentForm == "Third" ? styles.filled : "")}`}>
                    <img 
                        className={`${styles.icon} ${currentForm == "Second" ? styles.inverted : ""}`}
                        src={currentForm != "Second" && currentForm == "Third" ? filled : empty}
                    />
                </div>
                <div className={`${styles.line} ${currentForm == "Third" ? styles.current : (currentForm == "Third" ? styles.filled : "")}`} />

                <div className={`${styles.third} ${currentForm == "Third" ? styles.current : (currentForm == "Third" ? styles.filled : "")}`}>
                    <img 
                        className={`${styles.icon} ${currentForm == "Third" ? styles.inverted : ""}`}
                        src={empty}
                    />
                </div>
            </div>
        </>
    )
}