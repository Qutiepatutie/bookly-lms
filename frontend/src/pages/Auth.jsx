import { useState } from 'react';

import styles from '../styles/auth.module.css'

import LoginForm from '../components/LoginForm.jsx'
import RegisterForm from '../components/RegisterForm.jsx';

export default function Auth({onLogIn, isAuthorized, setRole}){

    const [form, setForm] = useState("login");

    const handleSetForm = (formName) => setForm(formName);

    return(
        <>
            <div className={isAuthorized ? styles.loggedIn : styles.page}>
                {form === "login" && <LoginForm onSetForm={handleSetForm} onLogIn={onLogIn} setRole={setRole}/>}
                {form === "register" && <RegisterForm onSetForm={handleSetForm}/>}
            </div>
        </>
    );
}