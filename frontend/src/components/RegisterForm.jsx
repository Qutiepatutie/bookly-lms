import { useState } from 'react'

import styles from '../styles/registerform.module.css'
import FormSwitcher from './FormSwitcher';

export default function RegisterForm({onSetForm}) {

    const [sex, setSex] = useState("Male");

    return (
        <>
            <div className={styles.container}>
                <div className={styles.header}>
                    LibraSphere
                </div>

                <FormSwitcher onSetForm={onSetForm} isFocused = "register"/>
                
                <div className={styles.formContainer}>
                    <div className={styles.form}>
                            <label>First Name</label>
                            <input type="text" name="fName"/>

                            <label>Middle Name</label>
                            <input type="text" name="mName"/>

                            <label>Last Name</label>
                            <input type="text" name="lName"/>
                    </div>
                    <div className={styles.sexChoice}>
                        <label>Sex</label>
                        <div className={styles.sexContainer}>
                            <div onClick={() => setSex("Male")} className={`${styles.male} ${sex == "Male" ? styles.maleFocus : ""}`}>Male</div>
                            <div onClick={() => setSex("Female")} className={`${styles.male} ${sex == "Female" ? styles.femaleFocus : ""}`}>Female</div>
                        </div>
                    </div>
                    <div className={styles.form}>
                            <label>Student Number</label>
                            <input type="text" name="studNum"/>

                            <label>Program</label>
                            <input type="text" name="program"/>

                            <label>Email</label>
                            <input type="text" name="email"/>

                            <label>Passowrd</label>
                            <input type="password" name="password"/>

                            <label>Confirm Password</label>
                            <input type="password" name="confirmPass"/>
                    </div>
                </div>
                <div className={styles.button}>
                    <div>
                        <input type='checkbox'/>
                        <label>I agree to the <u>Terms and conditions</u></label>
                    </div>
                    <button>Register</button>
                </div>
            </div>
        </>
    )
}