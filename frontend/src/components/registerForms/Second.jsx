import styles from '../../styles/authPage/registerForm/second.module.css'

export default function Second({ sex, setSex, handleChange, setRegisterData, registerData, emptyProgram, emptyStudNumber }) {
    return (
        <>
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

            <label>Program</label>
            <select name="program" value={registerData.program} onChange={handleChange} className={emptyProgram ? styles.empty : ""}>
                <option value="" disabled hidden></option>
                <option value="BSCS">BSCS</option>
                <option value="BSN">BSN</option>
                <option value="BSPT">BSPT</option>
                <option value="BSMLS">BSMLS</option>
                <option value="BSCRIM">BSCRIM</option>
            </select>

            <label>Student Number</label>
            <input
                type="text"
                name="student_number"
                value={registerData.student_number}
                onChange={handleChange}
                className={emptyStudNumber ? styles.empty : ""}
            />
        </>
    )
}