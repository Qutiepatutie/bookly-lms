import styles from '../styles/library.module.css'
import searchIcon from '../assets/search-icon.svg'

import { useState, useEffect } from 'react';
import { getBooks } from '../api/books'

export default function Library({ setViewBook }){

    const [booksByCategory, setBooksByCategory] = useState({
        gen_info: [],
        phil_psych: [],
        religion: [],
        soc_sci: [],
        languange: [],
        science: [],
        technology: [],
        arts_rec: [],
        literature: [],
        hist_geo: [],
    });

    const [categories, setCategories] = useState({
            '001' : "General Information",
            '100' : "Philosophy & Psychology",
            '200' : "Religion",
            '300' : "Scocial Sciences",
            '400' : "Language",
            '500' : "Science",
            '600' : "Technology",
            '700' : "Arts & Recreation",
            '800' : "Literature",
            '900' : "History & Geology",
        });

    const [booksBySearch, setBooksBySearch] = useState([]);
    const [search, setSearch] = useState("");
    const [searching, setSearching] = useState(false);

    useEffect(() => {
        async function fetchBooks() {
            try{
                const fetchedBooks = await getBooks();

                const booksData = {};

                Object.keys(categories).forEach((key) => {
                    booksData[key.toLowerCase()] = [];
                });

                fetchedBooks.forEach((book) => {
                    const categoryKey = book.call_number.substring(0,3).toLowerCase();
                    console.log(book.book_cover_path);
                    if(booksData[categoryKey]) {
                        booksData[categoryKey].push(book);
                    }
                });

                setBooksByCategory(booksData);
            } catch (err) {
                console.log(err);
            }
        }
        
        fetchBooks();
    }, []);

    const handleSearch = async () => {

        if(!search.trim()){
            setSearching(false);
            return;
        }

        try {
            const data = await getBooks({ generalSearch: search});
            setBooksBySearch(data);
        }catch (err){
            console.log(err);
        }

        setSearching(true);
    };

    return(
        <>
            <div className={styles.library}>
                <div className={styles.header}>
                    <p>Find all the literatures you want in just one search</p>
                    <div className={styles.searchBarContainer}>
                        <input
                            type="text"
                            className={styles.searchBar}
                            placeholder='Subject,Title,Author...'
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <div className={styles.searchIconContainer} onClick={handleSearch}><img src={searchIcon}/></div>
                    </div>
                </div>

                {/*TODO: FIX SEARCH FUNCTION*/}

                <div className={`${styles.searchScroll} ${searching ? styles.show : ""}`}>
                    {booksBySearch.map((book, i) => (
                        <div key ={i} className={styles.bookPanels} onClick={() => handleViewBook(book.title, book.author, book.cover_url, book.work_key)}>
                            {book.cover_url && (
                                <img
                                    src={book.cover_path ? book.cover_path : searchIcon}
                                    alt="Cover"
                                    className={styles.bookCover}
                                />
                            )}
                            <p>{book.title}</p>
                            <p>{book.author}</p>
                        </div>
                    ))}
                </div>
                
                {/*TODO: ADD BORROW BOOK FUNCTION */}

                <div className={`${styles.scroll} ${searching ? styles.hide : ""}`}>
                    {Object.keys(categories).map((category, i) => (
                        <div key={i} className={styles.category}>
                            <div className={styles.categoryHeader}>
                                <p>{categories[category]}</p>
                            </div>
                            <div className={styles.books}>
                                {booksByCategory[category.toLowerCase()]?.length > 0 ? (
                                    booksByCategory[category.toLowerCase()].map((book, j) => (
                                        <div key={j} className={styles.bookPanels} onClick={() => setViewBook(true)}> {/*TODO: FIX VIEW BOOKS*/}
                                            {book.cover_path && (
                                                <img
                                                    src={book.cover_path}
                                                    alt={book.title}
                                                    className={styles.bookCover}
                                                />
                                            )}
                                            <p>{book.title}</p>
                                            <p>{book.author}</p>
                                        </div>
                                    ))
                                ) : (
                                    <div className={styles.noBooks}>
                                        <h1>No books available</h1>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </> 
    )
}