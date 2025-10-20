import { useEffect, useState } from 'react'

import styles from './styles/app.module.css'
import Sidebar from './components/Sidebar.jsx'
import Header from './components/Header.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Library from './pages/Library.jsx'
import BorrowedBooks from './pages/BorrowedBooks.jsx'
import Settings from './components/Settings.jsx'

import Auth from './pages/Auth.jsx'

export default function App(){

    const [currentPage, setCurrentPage] = useState("Dashboard");
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [user, setUser] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const loggedIn = localStorage.getItem("isLoggedIn") === "true";
        if(loggedIn) setIsAuthorized(true);
    }, []);

    return (
        <>
            <Auth onLogIn={setIsAuthorized} isAuthorized={isAuthorized} setUser={setUser}/>
            {isAuthorized && (
                <div className={styles.main}>
                    <Sidebar onNavigate={setCurrentPage} isOpen={setIsOpen}/>
                    <Header currentPage={currentPage} currUser={user}/>
                    <Settings isOpen={isOpen} setIsOpen={setIsOpen} onLogOut={setIsAuthorized} setCurrentPage={setCurrentPage}/>
                
                    {currentPage === "Dashboard" && <Dashboard />}
                    {currentPage === "Library" && <Library />}
                    {currentPage === "Borrowed Books" && <BorrowedBooks />}
                </div>
            )}
            
        </>
    )
}