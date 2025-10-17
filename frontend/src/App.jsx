import { useEffect, useState } from 'react'

import styles from './styles/app.module.css'
import Sidebar from './components/Sidebar.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Library from './pages/Library.jsx'
import BorrowedBooks from './pages/BorrowedBooks.jsx'
import Settings from './pages/Settings.jsx'

import Auth from './pages/Auth.jsx'

export default function App(){

    const [currentPage, setCurrentPage] = useState("dashboard");
    const [isAuthorized, setIsAuthorized] = useState(false);

    return (
        <>
            <Auth onLogIn={setIsAuthorized} isAuthorized={isAuthorized}/>
            {isAuthorized && (
                <div className={styles.main}>
                    <Sidebar onNavigate={setCurrentPage}/>
                
                    {currentPage === "dashboard" && <Dashboard />}
                    {currentPage === "library" && <Library />}
                    {currentPage === "borrowedBooks" && <BorrowedBooks />}
                    {currentPage === "settings" && <Settings />}
                </div>
            )}
            
        </>
    )
}