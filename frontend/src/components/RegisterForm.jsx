import { useState,useEffect } from 'react'

import styles from '../styles/registerform.module.css'
import FormSwitcher from './FormSwitcher';

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
                <div className={styles.header}>
                    LibraSphere
                </div>

                <FormSwitcher onSetForm={onSetForm} isFocused = "register"/>
                
                <div className={styles.formContainer}>
                    <div className={styles.form}>
                        <div>
                            <label>First Name</label>
                            <input 
                                className={emptyFName ? styles.empty : ""}
                                type="text"
                                name="first_name"
                                value={registerData.first_name}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>Middle Name</label>
                            <input
                                type="text"
                                name="middle_name"
                                value={registerData.middle_name}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                           <label>Last Name</label>
                            <input
                                className={emptyLName ? styles.empty : ""}
                                type="text"
                                name="last_name"
                                value={registerData.last_name}
                                onChange={handleChange}
                            /> 
                        </div>
                    </div>
                    <div className={styles.sexContainer}>
                        <label>Sex</label>
                        <div className={styles.sexChoice}>
                            <div
                                onClick={() => {
                                    setRegisterData({ ...registerData, sex: "male" })
                                    setSex("male")}}
                                className={`${styles.male} ${sex == "male" ? styles.maleFocus : ""}`}
                                >
                                Male
                            </div>
                            <div
                                onClick={() => {
                                    setRegisterData({ ...registerData, sex: "female" })
                                    setSex("female")}}
                                className={`${styles.male} ${sex == "female" ? styles.femaleFocus : ""}`}
                                >
                                Female
                            </div>
                        </div>
                    </div>
                    <div className={styles.form}>
                        <div>
                            <label>Student Number</label>
                            <input
                                className={emptyStudNumber ? styles.empty : ""}
                                type="text" name="student_number"
                                value={registerData.student_number}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>Program</label>
                            <select name="program" value={registerData.program} className={emptyProgram ? styles.empty : ""} onChange={handleChange}>
                                <option value="" disabled hidden></option>
                                <option value="BSCS">BSCS</option>
                                <option value="BSN">BSN</option>
                                <option value="BSPT">BSPT</option>
                                <option value="BSMLS">BSMLS</option>
                                <option value="BSCRIM">BSCRIM</option>
                            </select>
                        </div>
                        <div>
                            <label>Email</label>
                            <input
                                className={emptyEmail ? styles.empty : ""}
                                type="text"
                                name="email"
                                value={registerData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>Password</label>
                            <input
                                className={emptyPassword ? styles.empty : ""}
                                type="password"
                                name="password"
                                value={registerData.password}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>Confirm Password</label>
                            <input
                                className={emptyConfirmPassword ? styles.empty : ""}
                                type="password"
                                name="confirm_password"
                                value={registerData.confirm_password}
                                onChange={handleChange}
                                />
                        </div>
                    </div>
                </div>
                <div className={styles.button}>
                    <div className={styles.message}>
                        {confirmPassError ? "Passwords Must Match!" : ""}
                        {invalidEmailError ? "Invalid Email" : ""}
                    </div>
                    <button onClick={handleRegister}>{loading ? "Processing..." : "Register"}</button>
                </div>
            </div>
        </>
    )
}