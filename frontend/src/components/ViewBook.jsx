import { useState, useEffect } from "react";
import { editBook,getBooks } from "../api/books";

import close from "../assets/close-icon.svg"
import styles from "../styles/viewbook.module.css"

export default function ViewBook({ viewBook, setViewBook, book, setBook}) {

    if(!viewBook || !book) return null;

    const [savedBookData, setSavedBookData] = useState(book);
    const [bookData, setBookData] = useState(book);
    const [editing, setEditing] = useState(false);
    const [confirmMessage, setConfirmMessage] = useState("");
    const [show, setShow] = useState(false);

    const notify = () => {
        setShow(true);
        setTimeout(() => setShow(false), 2000);
    };

    const handleChange = (e) => {
        const {name, value} = e.target;

        setBookData({ ...bookData, [name]: value});
        console.log(value);
    }

    const handleCancel = () => {
        setBookData(savedBookData);
        setEditing(false);
    }

    const handleConfirm = async () => {

        if(JSON.stringify(bookData) === JSON.stringify(savedBookData)){
            setEditing(false);
            return;
        }

        const data = await editBook(bookData);
        setConfirmMessage(data.message);
        setSavedBookData(bookData);
        notify();
        setEditing(false);

        setBook({...bookData});
    }

    return (
        <>
            {/*TODO: ADD BORROW BOOK FUNCTION */}

            <div className={`${styles.toast} ${show ? styles.show : ""}`}>{confirmMessage}</div>

            <div className={viewBook ? styles.container : styles.hidden}>
                <div className={styles.viewBook}>
                    <div className={styles.bookCoverContainer}>
                        <img src={book.cover_path} className={styles.bookCover} />
                    </div>

                    <div className={styles.bookInfo}>
                        <div className={styles.infoHeader}>
                            <div>
                                <h2>{book.title}</h2>
                                <h4>{book.author}</h4>
                            </div>
                        </div>
                        <hr style={{marginTop: "10px"}}/>
                        <p className={styles.description}>
                            <textarea
                                name="description"
                                value={bookData.description}
                                onChange={handleChange}
                                readOnly={!editing}
                                className={!editing ? styles.noEdit : ""}
                            />    
                        </p>
                        <div className={styles.details}>
                            <p><span>CALL NUMBER:</span>
                                <input
                                    name="callNumber"
                                    value={bookData.call_number}
                                    onChange={handleChange}
                                    readOnly={!editing}
                                    className={!editing ? styles.noEdit : ""}
                                />
                            </p>
                            <p><span>ISBN:</span>
                                <input
                                    name="isbn"
                                    value={bookData.ISBN}
                                    onChange={handleChange}
                                    readOnly={!editing}
                                    className={!editing ? styles.noEdit : ""}
                                />
                            </p>
                            <p><span>PAGES:</span>
                                <input
                                    name="pages"
                                    value={bookData.pages}
                                    onChange={handleChange}
                                    readOnly={!editing}
                                    className={!editing ? styles.noEdit : ""}
                                />
                            </p>
                            <p><span>PUBLISHER:</span>
                                <input
                                    name="publisher"
                                    value={bookData.publisher}
                                    onChange={handleChange}
                                    readOnly={!editing}
                                    className={!editing ? styles.noEdit : ""}
                                />
                            </p>
                            <p><span>YEAR PUBLISHED:</span>
                                <input
                                    name="yearPublished"
                                    value={bookData.year_published}
                                    onChange={handleChange}
                                    readOnly={!editing}
                                    className={!editing ? styles.noEdit : ""}
                                />
                            </p>
                            <p><span>TAGS:</span>
                                <input
                                        name="tags"
                                        value={bookData.tags}
                                        onChange={handleChange}
                                        readOnly={!editing}
                                        className={!editing ? styles.noEdit : ""}
                                    />
                                
                            </p> 
                        </div>
                        
                    </div>
                    <div className={styles.close} onClick={() => setViewBook(false)}>
                        <img src={close} />
                    </div>
                    <div className={styles.buttons}>

                      {sessionStorage.getItem("role") !== "admin" && <button>Borrow Book</button>}

                      {sessionStorage.getItem("role") === "admin" && 
                      <>
                        {!editing && <button onClick={() => setEditing(true)}>Edit Book</button>}

                        {editing &&
                            <div className={styles.editButtons}>
                                <button onClick={handleCancel}>Cancel</button>
                                <button onClick={handleConfirm}>Save</button>
                            </div>
                        }
                      </>   }
                      
                      
                    </div>
                    
                </div>
            </div>
        </>
    )
}