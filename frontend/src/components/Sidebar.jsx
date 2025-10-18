import { useState } from 'react'

import styles from '../styles/sidebar.module.css'

import dashboard from '../assets/dashboard.svg'
import library from '../assets/library.svg'
import borrowedBooks from '../assets/borrowedBooks.svg'
import settings from '../assets/settings.svg'

export default function Sidebar({ onNavigate, isOpen }){

    const [focused, setFocused] = useState("dashboard");
    const [extended, setExtended] = useState(false);

    return(
        <>
            <div className={`${styles.sidebar} ${extended ? styles.extended : ""}`}>
                <div className={styles.header}>
                    <p className={styles.burger} onClick={() => extended ? setExtended(false) : setExtended(true)}>☰</p>
                    <h1>LibraSphere</h1>
                </div>
                <hr className={styles.divider} />
                <div className={styles.buttons}>

                    <div onClick={() => {setFocused("dashboard"); onNavigate("dashboard")}} className={focused === "dashboard" ? styles.focused : ""}>
                        <img src={dashboard} className={styles.icons}/>
                        <p>Dashboard</p>
                    </div>

                    <div onClick={() => {setFocused("library"); onNavigate("library")}} className={focused === "library" ? styles.focused : ""}>
                        <img src={library} className={styles.icons}/>
                        <p>Library</p>
                    </div>

                    <div onClick={() => {setFocused("borrowedBooks"); onNavigate("borrowedBooks")}} className={focused === "borrowedBooks" ? styles.focused : ""}>
                        <img src={borrowedBooks} className={styles.icons}/>
                        <p>Borrowed Books</p>
                    </div>

                    <div onClick={() => isOpen(true)} className={styles.settingsButton}>
                        <img src={settings} className={styles.icons}/>
                        <p>Settings</p>
                    </div>

                </div>
                <div className={styles.footer}>
                    <p>LibraSphere v1.0 | Copyright © by SOFE311 TEAM</p>
                </div>
            </div>
        </>
    );
}