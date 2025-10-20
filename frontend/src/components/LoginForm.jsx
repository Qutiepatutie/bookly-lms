import { useState } from 'react';
import { login } from '../api/users.js'

import styles from '../styles/loginform.module.css'
import FormSwitcher from './FormSwitcher'

export default function LoginForm({onSetForm, onLogIn}) {

    const [emailInput, setEmailInput] = useState("");
    const [passInput, setPassInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [emptyEmail, setEmptyEmail] = useState(false);
    const [emptyPass, setEmptyPass] = useState(false);
    const [invalid, setInvalid] = useState(false);

    const handleLogIn = async () => {
        if(!emailInput || !passInput || loading){
            setEmptyEmail((!emailInput) ? true : false);
            setEmptyPass((!passInput) ? true : false);
            return;
        }

        setLoading(true);
        const data = await login(emailInput, passInput);
        setLoading(false);
        
        if(data.status == 'success'){
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("user", data.user);

            setInvalid(false);
            onLogIn(true);
            setEmailInput("");
            setPassInput("");
        
        }else if(data.status == 'failed'){
            console.log(data.status);
            setInvalid(true);
        }
    }

    return(
        <>
            <div className={styles.container}>
                <div className={styles.header}> {/*Header*/}
                   <p>LibraSphere</p>
                </div>

                <FormSwitcher onSetForm={onSetForm} isFocused = "login"/>

                <div className={(!invalid) ? styles.hidden : ""}>
                    <p className={styles.message}>Invalid Email/Password</p>
                </div>
                <form className={styles.form} onSubmit={(e) => {e.preventDefault(); handleLogIn;}}> {/*Forms*/}
                    <label>Email</label>
                       <input className={(emptyEmail) ? styles.empty : ""}
                            type="text"
                            name="email"
                            value={emailInput}
                            onChange={(e) => {
                                setEmailInput(e.target.value)
                                setEmptyEmail(false);
                            }}
                        /> 

                    <label>Password</label>
                        <input className={(emptyPass) ? styles.empty : ""}
                            type="password"
                            name="password"
                            value={passInput}
                            onChange={(e) => {
                                setPassInput(e.target.value)
                                setEmptyPass(false);
                            }}
                        /> 
                    <div className={styles.button}> {/*Button*/}
                        <div className={styles.forgotPass}><u>Forgot Password?</u></div>

                        <button type ="submit" onClick={handleLogIn} className={styles.loginButton}>
                            {(loading) ? "Loggin in..." : "Login"}
                        </button>
                    </div>
                </form>
                
            </div>
        </>
    )
}