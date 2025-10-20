import styles from '../styles/borrowedbooks.module.css'

import totalBorrowed from '../assets/borrowedbooks/total-borrowed-icon.svg'
import overdue from '../assets/borrowedbooks/overdue-icon.svg'
import due from '../assets/borrowedbooks/due-icon.svg'
import fine from '../assets/borrowedbooks/fine-icon.svg'

export default function BorrowedBooks(){
    return(
        <>
            <div className={styles.borrowedBooks}>
                <div className={styles.upper}>
                    <div className={styles.infoPanel}>
                        <div className={styles.header}>
                           <img src={totalBorrowed} className={styles.icon} />
                            <p>Total Borrowed</p> 
                        </div>
                        <p>0</p>
                    </div>
                    <div className={styles.infoPanel}>
                        <div className={styles.header}>
                            <img src={overdue} className={styles.icon} />
                            <p>Overdue Books</p>
                        </div>
                        <p>0</p>
                    </div>
                    <div className={styles.infoPanel}>
                        <div className={styles.header}>
                            <img src={due} className={styles.icon} />
                            <p>Due this week</p>
                        </div>
                        <p>0</p>
                    </div>
                    <div className={styles.infoPanel}>
                        <div className={styles.header}>
                            <img src={fine} className={styles.icon} />
                            <p>Fine</p>
                        </div>
                        <p>0</p>
                    </div>
                </div>
                
                <div className={styles.books}>

                </div>
            </div>
        </>
    )
}