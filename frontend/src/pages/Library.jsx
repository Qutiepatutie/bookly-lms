import styles from '../styles/library.module.css'
import searchIcon from '../assets/search-icon.svg'

export default function Library(){
    return(
        <>
            <div className={styles.library}>
                <div className={styles.header}>
                    <p>Find all the literatures you want in just one search</p>
                    <div className={styles.searchBarContainer}>
                        <input className={styles.searchBar}type='text' />
                        <div className={styles.searchIconContainer}><img src={searchIcon}/></div>
                    </div>
                </div>

                <div className={styles.scroll}>
                    
                    <div className={styles.category}>
                        <div className={styles.categoryHeader}>
                            <p>Computer Science</p>
                        </div>
                        <div className={styles.books}> {/* Temporary placeholders */}
                            <div className={styles.bookPanels}></div>
                            <div className={styles.bookPanels}></div>
                            <div className={styles.bookPanels}></div>
                            <div className={styles.bookPanels}></div>
                            <div className={styles.bookPanels}></div>
                            <div className={styles.bookPanels}></div>
                            <div className={styles.bookPanels}></div>
                            <div className={styles.bookPanels}></div>
                            <div className={styles.bookPanels}></div>
                            <div className={styles.bookPanels}></div>
                            <div className={styles.bookPanels}></div>
                            <div className={styles.bookPanels}></div>
                            <div className={styles.bookPanels}></div>
                            <div className={styles.bookPanels}></div>
                            <div className={styles.bookPanels}></div>
                            <div className={styles.bookPanels}></div>
                            <div className={styles.bookPanels}></div>
                            <div className={styles.bookPanels}></div>
                            <div className={styles.bookPanels}></div>
                            <div className={styles.bookPanels}></div>
                        </div>
                    </div>

                    <div className={styles.category}>
                        <div className={styles.categoryHeader}>
                            <p>Math</p>
                        </div>
                    </div>

                    <div className={styles.category}>
                        <div className={styles.categoryHeader}>
                            <p>Science</p>
                        </div>
                    </div>
                </div>
            </div>
        </> 
    )
}