import { useState,useEffect } from "react"

import close from "../assets/close-icon.svg"
import styles from "../styles/viewbook.module.css"
import { viewBookInfo } from "../api/books";

export default function ViewBook({viewBook, setViewBook, bookTitle, bookAuthor, bookCoverURL, workKey}) {

    const [description, setDescription] = useState("none");
    const [callNumber, setCallNumber] = useState("none");
    const [isbn10, setIsbn10] = useState("none");
    const [isbn13, setIsbn13] = useState("none");
    const [pages, setpages] = useState("unknown");
    const [publisher, setPublisher] = useState("unknown");
    const [yearPublished, setyearPublished] = useState("unknown");
    const [genre, setGenre] = useState("unknown");

    useEffect(() => {
        async function loadInfo() {

            if(!viewBook || !workKey) return;

            setCallNumber("Loading..")
            setDescription("Loading..");
            setIsbn10("Loading..");
            setIsbn13("Loading..");
            setpages("Loading..");
            setPublisher("Loading..");
            setyearPublished("Loading..");

            const info = await viewBookInfo(workKey);

            setCallNumber(generateCallNumber("001", bookAuthor, info[0].yearPublished));
            setDescription(info[0].description);
            setIsbn10(info[0].isbn10);
            setIsbn13(info[0].isbn13);
            setpages(info[0].pages);
            setPublisher(info[0].publisher);
            setyearPublished(info[0].yearPublished);
        }

        loadInfo();
        
    }, [viewBook, workKey]);

    return (
        <>
            <div className={viewBook ? styles.container : styles.hidden}>
                <div className={styles.viewBook}>
                    <div className={styles.bookCoverContainer}>
                        <img src={bookCoverURL} className={styles.bookCover} />
                    </div>

                    <div className={styles.bookInfo}>
                        <div className={styles.infoHeader}>
                            <div>
                                <h2>{bookTitle}</h2>
                                <h4 className={styles.author}>{bookAuthor}</h4>
                            </div>
                        </div>
                        <hr style={{marginTop: "10px"}}/>
                        <p className={styles.description}>
                            {description}    
                        </p>
                        <div className={styles.details}>
                            <p><span>CALL NUMBER:</span>{callNumber}</p>
                            <p><span>ISBN 10:</span>{isbn10}</p>
                            <p><span>ISBN 13:</span>{isbn13}</p>
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

 function generateCallNumber(subjectCode, authorName, year) {
    if (!year) year = "Unknown";

    // Get last name (assumes last word)
    const lastName = authorName.trim().split(" ").pop().toLowerCase();
    const firstLetter = lastName[0].toUpperCase();

    // Helper to map letters to 1–26
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    const getVal = (ch) => {
        if(!ch || alphabet.indexOf(ch) === -1) return "";
        const index = alphabet.indexOf(ch) + 1;
        return index < 10 ? index : Math.ceil(index/10);
    }

    // Grab next two letters
    const second = getVal(lastName[1]);
    const third = getVal(lastName[2]);
    const fourth = getVal(lastName[3]);

    // Simpler numeric pattern (like J + 2nd + 3rd)
    const numericCode = `${second}${third}${fourth}`;

    // Return Dewey-style call number
    return `${subjectCode}.${firstLetter}${numericCode} ${year}`;
}