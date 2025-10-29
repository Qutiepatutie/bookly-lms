import styles from '../styles/library.module.css'
import searchIcon from '../assets/search-icon.svg'

import { useState, useEffect } from 'react';
import { getBooks } from '../api/books'

export default function Library({ setViewBook, setBookTitle, setBookAuthor, setBookCoverURL, setWorkKey }){
    const [booksByCategory, setBooksByCategory] = useState({
        computer: [],
        math: [],
        science: [],
    });

    const [categories, setCategories] = useState(["Computer","Math","Science"]);

    const [booksBySearch, setBooksBySearch] = useState([]);
    const [search, setSearch] = useState("");
    const [searching, setSearching] = useState(false);

    useEffect(() => {
        async function fetchBooks() {
            try {
                const books = await Promise.all(
                    categories.map((category) => getBooks({category : category.toLowerCase()}))
                );

                const booksData = {};
                categories.forEach((category, index) => {
                    booksData[category.toLowerCase()] = books[index];
                });

                setBooksByCategory(booksData);
                /* booksData.computer.forEach((e) => console.log(e.work_key)); */ //make function for fetching book datas
            }catch (err) {
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

    const handleViewBook = (title, author, coverURL, work_key) => {
        setBookTitle(title);
        setBookAuthor(author);
        setBookCoverURL(coverURL);
        setWorkKey(work_key);
        setViewBook(true);
    }

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

                <div className={`${styles.searchScroll} ${searching ? styles.show : ""}`}>
                    {booksBySearch.map((book, i) => (
                        <div key ={i} className={styles.bookPanels} onClick={() => handleViewBook(book.title, book.author, book.cover_url, book.work_key)}>
                            {book.cover_url && (
                                <img
                                    src={book.cover_url ? book.cover_url : searchIcon}
                                    alt="Cover"
                                    className={styles.bookCover}
                                />
                            )}
                            <p>{book.title}</p>
                            <p>{book.author}</p>
                        </div>
                    ))}
                </div>

                <div className={`${styles.scroll} ${searching ? styles.hide : ""}`}>
                    {categories.map((category,i) => (
                     <div key={i} className={styles.category}>
                        <div className={styles.categoryHeader}>
                            <p>{category}</p>
                        </div>
                        <div className={styles.books}>
                            {booksByCategory[category.toLowerCase()]?.map((book, j) => (
                                <div key={j} className={styles.bookPanels} onClick={() => handleViewBook(book.title, book.author, book.cover_url, book.work_key)}>
                                    {book.cover_url && (
                                        <img
                                            src={book.cover_url}
                                            alt={book.title}
                                            className={styles.bookCover}
                                        />
                                    )}
                                    <p>{book.title}</p>
                                    <p>{book.author}</p>
                                </div>
                            ))}
                        </div>
                    </div>   
                    ))}
                </div>
            </div>
        </> 
    )
}