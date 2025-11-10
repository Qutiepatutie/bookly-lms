import styles from '../styles/borrowerlogs.module.css'

export default function BorrowerLogs(){
    return(
        <>
            <div className={styles.borrowerLogs}>
                <div className={styles.header}>
                    <input type="text"/>
                </div>

                {/*TODO: AUTOMATIC ADDING OF CELLS*/}
                <div className={styles.table}>
                    <table>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Student ID</th>
                            <th>Email</th>
                            <th>Program</th>
                            <th>Status</th>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>Ralph Andre Layosa</td>
                            <td>06230002160</td>
                            <td>rmlayosa2160lag@student.fatima.edu.ph</td>
                            <td>BSCS</td>
                            <td><span className={styles.status}>Active</span></td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>Ralph Andre Layosa</td>
                            <td>06230002160</td>
                            <td>rmlayosa2160lag@student.fatima.edu.ph</td>
                            <td>BSCS</td>
                            <td><span className={styles.status}>Active</span></td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>Ralph Andre Layosa</td>
                            <td>06230002160</td>
                            <td>rmlayosa2160lag@student.fatima.edu.ph</td>
                            <td>BSCS</td>
                            <td><span className={styles.status}>Active</span></td>
                        </tr>
                    </table>
                </div>
            </div>
            
        </>
    )
}