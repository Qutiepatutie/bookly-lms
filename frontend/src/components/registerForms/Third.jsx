import styles from '../../styles/authPage/registerForm/third.module.css'

export default function Third({ handleChange, registerData, emptyEmail, emptyPassword, emptyConfirmPassword}) {
    return (
        <>
            <label>Email</label>
            <input
                type="text"
                name="email"
                value={registerData?.email}
                onChange={handleChange}
                className={emptyEmail ? styles.empty : ""}
            />

            <label>Password</label>
            <input
                type="password"
                name="password"
                value={registerData?.password}
                onChange={handleChange}
                className={emptyPassword ? styles.empty : ""}
            />

            <label>Confirm Password</label>
            <input
                type="password"
                name="confirm_password"
                value={registerData?.confirm_password}
                onChange={handleChange}
                className={emptyConfirmPassword ? styles.empty : ""}
            />
        </>
    )
}