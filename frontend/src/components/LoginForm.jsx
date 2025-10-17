import { useState } from 'react';

import styles from '../styles/loginform.module.css'
import FormSwitcher from './FormSwitcher'

export default function LoginForm({onSetForm, onLogIn}) {

    const [emailInput, setEmailInput] = useState("");
    const [passInput, setPassInput] = useState("");

    const email = "email";
    const pass = "pass";

    const handleLogIn = () => {
        if(email == emailInput && pass == passInput){
            onLogIn(true);
        }
    }

    return(
        <>
            <div className={styles.container}>
                <div className={styles.header}> {/*Header*/}
                   LibraSphere
                </div>

                <FormSwitcher onSetForm={onSetForm} isFocused = "login"/>

                <div className={styles.form}> {/*Forms*/}
                    <label>Email</label>
                       <input
                            type="text"
                            name="email"
                            value={emailInput}
                            onChange={(e) => setEmailInput(e.target.value)}
                        /> 

                    <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={passInput}
                            onChange={(e) => setPassInput(e.target.value)}/> 
                </div>
                <div className={styles.button}> {/*Button*/}
                    <div className={styles.forgotPass}><u>forgot password</u></div>
                    <button onClick={handleLogIn} className={styles.next}>Login</button>
                </div>
            </div>
        </>
    )
}