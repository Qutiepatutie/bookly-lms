import { useState,useEffect } from "react"

import close from "../assets/close-icon.svg"
import styles from "../styles/viewbook.module.css"
import { viewBookInfo } from "../api/books";

export default function ViewBook({viewBook, setViewBook}) {

    const [description, setDescription] = useState("none");
    const [callNumber, setCallNumber] = useState("none");
    const [isbn, setIsbn] = useState("none");
    const [pages, setpages] = useState("unknown");
    const [publisher, setPublisher] = useState("unknown");
    const [yearPublished, setyearPublished] = useState("unknown");
    const [genre, setGenre] = useState("unknown");

    useEffect(() => {
        async function loadInfo() {

            setCallNumber("Loading..")
            setDescription("Loading..");
            setIsbn("Loading..");
            setpages("Loading..");
            setPublisher("Loading..");
            setyearPublished("Loading..");
        }

        loadInfo();
        
    }, [viewBook]);

    return (
        <>
            {/*TODO: FIX VIEW BOOKS FUNCTION */}
            <div className={viewBook ? styles.container : styles.hidden}>
                <div className={styles.viewBook}>
                    <div className={styles.bookCoverContainer}>
                        {/* <img src="none" className={styles.bookCover} /> */}
                    </div>

                    <div className={styles.bookInfo}>
                        <div className={styles.infoHeader}>
                            <div>
                                {/* <h2>{bookTitle}</h2> */}
                                {/* <h4 className={styles.author}>{bookAuthor}</h4> */}
                            </div>
                        </div>
                        <hr style={{marginTop: "10px"}}/>
                        <p className={styles.description}>
                            {description}    
                        </p>
                        <div className={styles.details}>
                            <p><span>CALL NUMBER:</span>{callNumber}</p>
                            <p><span>ISBN:</span>{isbn}</p>
                            <p><span>PAGES:</span>{pages}</p>
                            <p><span>PUBLISHER:</span>{publisher}</p>
                            <p><span>YEAR PUBLISHED:</span>{yearPublished}</p>
                            <p><span>GENRE:</span>{genre}</p> 
                        </div>
                        
                    </div>
                    <img src={close} className={styles.close} onClick={() => setViewBook(false)}/>
                    <button className={styles.borrowButton}>Borrow Book</button>
                </div>
            </div>
        </>
    )
}