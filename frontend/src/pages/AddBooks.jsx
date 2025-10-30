import styles from "../styles/addbooks.module.css"

export default function AddBooks() {
    return(
        <>
            <div className={styles.container}>
                <div className={styles.addBookContainer}>
                    <div className={styles.coverContainer}>
                        <p>Add Book<br/> Cover</p>
                    </div>
                    <div className={styles.infos}>
                        <div className={styles.fields}>
                            <div>
                                <label>ISBN</label>
                                <input type="text" />
                            </div>
                            <div>
                                <label>TITLE</label>
                                <input type="text" />
                            </div>
                            <div>
                                <label>AUTHOR</label>
                                <input type="text" />
                            </div>
                            <div>
                                <label>EDITION</label>
                                <input type="text" />
                            </div>
                            <div>
                                <label>PUBLISHER</label>
                                <input type="text" />
                            </div>
                            <div>
                                <label>DESCRIPTION</label>
                                <textarea type="text" className={styles.description}/>
                            </div>
                            <div>
                                <label>YEAR PUBLISHED</label>
                                <input type="text" />
                            </div>
                            <div>
                                <label>DATE ACQUIRED</label>
                                <input type="text" />
                            </div>
                            <div>
                                <label>PAGES</label>
                                <input type="text"/>
                            </div>
                            <div>
                                <label>CALL NUMBER</label>
                                <input type="text" />
                            </div>
                            <div>
                                <label>CLASSIFICATION</label>
                                <input type="text" />
                            </div>
                            <div>
                                <label>TAGS</label>
                                <input type="text" />
                            </div>
                        </div>
                        <div className={styles.buttons}>
                            <button>Clear</button>
                            <button>Add</button>
                        </div>
                        
                    </div>
                </div>
            </div>
            
        </>
    )
}