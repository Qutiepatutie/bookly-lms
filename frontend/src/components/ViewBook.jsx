import { useState } from "react";

import close from "../assets/close-icon.svg"
import styles from "../styles/viewbook.module.css"

export default function ViewBook({ viewBook, setViewBook, book}) {

    if(!viewBook || !book) return null;

    const initialBookData = {
        isbn: book.ISBN,
        title: book.title,
        author: book.author,
        edition: book.edition,
        description: book.description,
        publisher: book.publisher,
        yearPublished: book.year_published,
        pages: book.pages,
        callNumber: book.call_number,
        tags: book.tags
    };

    const [bookData, setBookData] = useState(initialBookData);
    const [editing, setEditing] = useState(false);

    const handleChange = (e) => {
        const {name, value} = e.target;

        setBookData({ ...bookData, [name]: value});
        console.log(value);

        setEmptyFields(prev => ({ ...prev, [name]: value.trim() === ""}));
    }

    const handleCancel = () => {
        setBookData(initialBookData);
        setEditing(false);
    }
    

    return (
        <>
            {/*TODO: ADD BORROW BOOK FUNCTION */}

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
                                readonly={!editing}
                                className={!editing ? styles.noEdit : ""}
                            />    
                        </p>
                        <div className={styles.details}>
                            <p><span>CALL NUMBER:</span>
                                <input
                                    name="callNumber"
                                    value={bookData.callNumber}
                                    onChange={handleChange}
                                    readonly={!editing}
                                    className={!editing ? styles.noEdit : ""}
                                />
                            </p>
                            <p><span>ISBN:</span>
                                <input
                                    name="isbn"
                                    value={bookData.isbn}
                                    onChange={handleChange}
                                    readonly={!editing}
                                    className={!editing ? styles.noEdit : ""}
                                />
                            </p>
                            <p><span>PAGES:</span>
                                <input
                                    name="pages"
                                    value={bookData.pages}
                                    onChange={handleChange}
                                    readonly={!editing}
                                    className={!editing ? styles.noEdit : ""}
                                />
                            </p>
                            <p><span>PUBLISHER:</span>
                                <input
                                    name="publisher"
                                    value={bookData.publisher}
                                    onChange={handleChange}
                                    readonly={!editing}
                                    className={!editing ? styles.noEdit : ""}
                                />
                            </p>
                            <p><span>YEAR PUBLISHED:</span>
                                <input
                                    name="yearPublished"
                                    value={bookData.yearPublished}
                                    onChange={handleChange}
                                    readonly={!editing}
                                    className={!editing ? styles.noEdit : ""}
                                />
                            </p>
                            <p><span>TAGS:</span>
                                <input
                                        name="tags"
                                        value={bookData.tags}
                                        onChange={handleChange}
                                        readonly={!editing}
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
                                <button>Save</button>
                            </div>
                        }
                      </>   }
                      
                      
                    </div>
                    
                </div>
            </div>
        </>
    )
}