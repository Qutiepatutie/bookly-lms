import { useState,useEffect } from "react"

import close from "../assets/close-icon.svg"
import styles from "../styles/viewbook.module.css"
import huh from "../assets/placeholder.jpg"

export default function ViewBook({ viewBook, setViewBook, book}) {

    if(!viewBook || !book) return null;

    return (
        <>
            <div className={viewBook ? styles.container : styles.hidden}>
                <div className={styles.viewBook}>
                    <div className={styles.bookCoverContainer}>
                        <img src={book.cover_path} className={styles.bookCover} />
                    </div>

                    <div className={styles.bookInfo}>
                        <div className={styles.infoHeader}>
                            <div>
                                <h2>{book.title}</h2>
                                <h4 className={styles.author}>{book.author}</h4>
                            </div>
                        </div>
                        <hr style={{marginTop: "10px"}}/>
                        <p className={styles.description}>
                            {book.description}    
                        </p>
                        <div className={styles.details}>
                            <p><span>CALL NUMBER:</span>{book.call_number}</p>
                            <p><span>ISBN:</span>{book.ISBN}</p>
                            <p><span>PAGES:</span>{book.pages}</p>
                            <p><span>PUBLISHER:</span>{book.publisher}</p>
                            <p><span>YEAR PUBLISHED:</span>{book.year_published}</p>
                            <p><span>TAGS:</span>{book.tags}</p> 
                        </div>
                        
                    </div>
                    <img src={close} className={styles.close} onClick={() => setViewBook(false)}/>
                    <button className={styles.borrowButton}>Borrow Book</button>
                </div>
            </div>
        </>
    )
}