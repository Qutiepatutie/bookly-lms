import { useEffect, useState } from 'react'

import './styles/theme.css'

import styles from './styles/app.module.css'
import Sidebar from './components/Sidebar.jsx'
import Header from './components/Header.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Library from './pages/Library.jsx'
import BorrowedBooks from './pages/BorrowedBooks.jsx'
import AddBooks from './pages/AddBooks.jsx'

import ViewBook from "./components/ViewBook.jsx"
import Settings from './components/Settings.jsx'

import Auth from './pages/Auth.jsx'

export default function App(){

    const [currentPage, setCurrentPage] = useState("Dashboard");
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [viewBook, setViewBook] = useState(false);

    const [role, setRole] = useState("");

    const [bookTitle, setBookTitle] = useState("");
    const [bookAuthor, setBookAuthor] = useState("");
    const [bookCoverURL, setBookCoverURL] = useState("");
    const [workKey, setWorkKey] = useState("");

    useEffect(() => {
        const loggedIn = sessionStorage.getItem("isLoggedIn") === "true";
        if(loggedIn){
            setIsAuthorized(true);
            /* setRole(localStorage.getItem("role")); */
        }
    }, []);

    return (
        <>  
            <Auth onLogIn={setIsAuthorized} isAuthorized={isAuthorized} setRole={setRole}/>
            {isAuthorized &&
                <div className={`${styles.main} ${sessionStorage.getItem("role") === "admin" ? "admin" : ""}`}>
                    <Sidebar onNavigate={setCurrentPage} isOpen={setIsOpen} role={role}/>
                    <Header currentPage={currentPage}/>
                    <Settings isOpen={isOpen} setIsOpen={setIsOpen} onLogOut={setIsAuthorized} setCurrentPage={setCurrentPage}/>
                    <ViewBook
                        viewBook={viewBook}
                        setViewBook={setViewBook}
                        bookTitle={bookTitle}
                        bookAuthor={bookAuthor}
                        bookCoverURL={bookCoverURL}
                        workKey={workKey}
                    />

                    {currentPage === "Dashboard" && <Dashboard />}
                    {currentPage === "Library" &&  <Library 
                                                        setViewBook={setViewBook}
                                                        setBookTitle={setBookTitle}
                                                        setBookAuthor={setBookAuthor}
                                                        setBookCoverURL={setBookCoverURL}
                                                        setWorkKey={setWorkKey} 
                                                    />}

                    {currentPage === "Borrowed Books" && <BorrowedBooks />}
                    {currentPage === "Add Books" && <AddBooks />}
                </div>
            }
            
        </>
    )
}