import { useState } from 'react'

import styles from '../styles/formswitcher.module.css'

export default function FormSwitcher({onSetForm, isFocused}) {

    /* const [isFocused, setIsFocused] = useState("login"); */

    return (
        <div className={styles.switcher}> {/*Switcher*/}
            <div
                onClick={() => {onSetForm("login")}}
                className={`${styles.login} ${isFocused == "login" ? styles.focus : ""}`}>
                Login
            </div>

            <div
                onClick={() => {onSetForm("register")}} 
                className={`${styles.register} ${isFocused == "register" ? styles.focus : ""}`}>
                Register
            </div>
        </div>
    )
}