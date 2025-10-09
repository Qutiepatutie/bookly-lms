import { useState } from 'react'

import styles from '../styles/sidebar.module.css'

import dashboard from '../assets/dashboard.svg'
import library from '../assets/library.svg'
import borrowedBooks from '../assets/borrowedBooks.svg'
import settings from '../assets/settings.svg'

export default function Sidebar({ onNavigate }){

    const [focused, setFocused] = useState("dashboard");

    return(
        <>
            <div className={styles.sidebar}>
                <div className={styles.header}>
                    <h1>LibraSphere</h1>
                </div>
                <hr className={styles.divider} />
                <div className={styles.buttons}>

                    <div onClick={() => {setFocused("dashboard"); onNavigate("dashboard")}} className={focused === "dashboard" ? styles.focused : ""}>
                        <img src={dashboard} className={styles.icons}/>
                        Dashboard
                    </div>

                    <div onClick={() => {setFocused("library"); onNavigate("library")}} className={focused === "library" ? styles.focused : ""}>
                        <img src={library} className={styles.icons}/>
                        Library
                    </div>

                    <div onClick={() => {setFocused("borrowedBooks"); onNavigate("borrowedBooks")}} className={focused === "borrowedBooks" ? styles.focused : ""}>
                        <img src={borrowedBooks} className={styles.icons}/>
                        Borrowed Books
                    </div>

                    <div onClick={() => {setFocused("settings"); onNavigate("settings")}} className={focused === "settings" ? styles.focused : ""}>
                        <img src={settings} className={styles.icons}/>
                        Settings
                    </div>

                </div>
                <div className={styles.footer}>
                    <p>Bookly v1.0 | Copyright © by SOFE311 TEAM</p>
                </div>
            </div>
        </>
    );
}