import { useState,useEffect } from 'react';

import styles from '../styles/authPage/registerform.module.css';
import FormSwitcher from './FormSwitcher';
import RegisterProgress from './RegisterProgress.jsx';

import First from './registerForms/First.jsx';
import Second from './registerForms/Second.jsx';
import Third from './registerForms/Third.jsx';

import { register } from '../api/users.js'

export default function RegisterForm({onSetForm}) {

    const [emptyFName, setEmptyFName] = useState(false);
    const [emptyLName, setEmptyLName] = useState(false);
    const [emptyStudNumber, setEmptyStudNumber] = useState(false);
    const [emptyProgram, setEmptyProgram] = useState(false);
    const [emptyEmail, setEmptyEmail] = useState(false);
    const [emptyPassword, setEmptyPassword] = useState(false);
    const [emptyConfirmPassword, setEmptyConfirmPassword] = useState(false);
    const [confirmPassError, setConfirmPassError] = useState(false);
    const [invalidEmailError, setInvalidEmailError] = useState(false);
    const [sex, setSex] = useState("male");

    const [loading, setLoading] = useState(false);
    const [showPopUp, setShowPopUp] = useState(false);
    const [message, setMessage] = useState("");

    const [currentForm, setCurrentForm] = useState("First");

    const [registerData, setRegisterData] = useState({
        first_name: "",
        middle_name: "",
        last_name: "",
        sex: "male",
        student_number: "",
        program: "",
        email: "",
        password: "",
        confirm_password: "",
        role: "student",
    });

    const setFields = () =>{
        setEmptyFName(!registerData.first_name ? true : false);
        setEmptyLName(!registerData.last_name ? true : false);
        setEmptyStudNumber(!registerData.student_number ? true : false);
        setEmptyProgram(!registerData.program ? true : false);
        setEmptyEmail(!registerData.email ? true : false);
        setEmptyPassword(!registerData.password ? true : false);
        setEmptyConfirmPassword(!registerData.confirm_password ? true : false);
    }

    const handleChange = (e) => {
        setRegisterData({ ...registerData, [e.target.name]: e.target.value });
    }

    const handleRegister = async () => {
        setFields();

        setConfirmPassError(false);
        setInvalidEmailError(false);
        
        if(!registerData.first_name ||
            !registerData.last_name ||
            !registerData.student_number ||
            !registerData.program ||
            !registerData.email ||
            !registerData.password ||
            !registerData.confirm_password){
                
            setFields();
            return;
        }

        if(registerData.password != registerData.confirm_password){
            setConfirmPassError(true);
            return;
        }

        let email = "";
        let role = "student"
        if(registerData.email.includes("student.fatima")){
            const first = registerData.first_name.toLowerCase().charAt(0);
            const second = (registerData.middle_name) ? registerData.middle_name.toLowerCase().charAt(0) : "";
            const last = registerData.last_name.toLowerCase();
            const num = registerData.student_number.substring(7);
            email = `${first}${second}${last}${num}lag@student.fatima.edu.ph`; 
        }else if(!registerData.email.includes("student")){
            const first = registerData.first_name.toLowerCase().charAt(0);
            const last = registerData.last_name.toLowerCase();
            email = `${first}${last}lag@fatima.edu.ph`; 
            role = "faculty";
        }else{
            setInvalidEmailError(true);
            return;
        }

        setRegisterData(prev => ({
            ...prev,
            role: role
        })); 

        if(email !== registerData.email){
            console.log(email);
            setInvalidEmailError(true);
            setEmptyEmail(true);
            return;
        }

        setLoading(true)
        const data = await register(registerData);
        console.log(data.message);
        setLoading(false)

        if(data.status == "failed"){
            setMessage(data.message);
            setShowPopUp(true);
            return;
        }

        setMessage(data.message);
        setShowPopUp(true);
        return;
    }

    const handleConfirm = () => {
        setShowPopUp(false);
        registerData.first_name = "";
        registerData.middle_name = "";
        registerData.last_name = "";
        registerData.sex = "male";
        registerData.student_number = "";
        registerData.program = "";
        registerData.email = "";
        registerData.password = "";
        registerData.confirm_password = "";
        registerData.role = "student";
    }

    const handleNext = () => {
        if(!registerData.first_name || !registerData.last_name){
            setFields();
            return;
        }
    }

    return (
        <>  {showPopUp && (
                <div className={styles.popupContainer}>
                    <div className={styles.popup}>
                        <h2>{message}</h2>
                        <button onClick={handleConfirm}>Confirm</button>
                    </div>
                </div>
            )}
            <div className={styles.container}>

                <FormSwitcher onSetForm={onSetForm} isFocused = "register"/>
                <RegisterProgress currentForm={currentForm}/>
                <div className={styles.formContainer}>
                    {currentForm === "First" && <First handleChange={handleChange} setRegisterData={setRegisterData} registerData={registerData}/>}
                    {currentForm === "Second" && <Second sex={sex} setSex={setSex} setRegisterData={setRegisterData} registerData={registerData}/>}
                    {currentForm === "Third" && <Third /> }
                </div>
                
                <div className={styles.button}>
                    <p className={styles.message}>
                        {confirmPassError ? "Passwords Must Match!" : ""}
                        {invalidEmailError ? "Invalid Email" : ""}
                    </p>
                    {currentForm === "First" && <button onClick={() => setCurrentForm("Second")}>Next</button>}
                    {currentForm === "Second" && (
                        <>
                            <div className={styles.next}>
                                <button className={styles.back} onClick={() => setCurrentForm("First")}>Back</button>
                                <button onClick={() => setCurrentForm("Third")}>Next</button>
                            </div>
                        </>
                    )}
                    {currentForm === "Third" && (
                        <>
                            <div className={styles.next}>
                                <button className={styles.back} onClick={() => setCurrentForm("Second")}>Back</button>
                                <button>Register</button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}