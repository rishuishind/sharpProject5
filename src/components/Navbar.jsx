import React from 'react'
import { useHistory } from 'react-router-dom';

const Navbar = () => {
    const token = localStorage.getItem('token');
    const history = useHistory();

    const handleLogout = () => {
        localStorage.removeItem('token');
        history.replace('/')
    }
    return (
        <>
            <nav className="flex justify-between m-2 p-2 list-none">
                <h1>MY WEBLINK</h1>
                <li>Home</li>
                <li>Products</li>
                <li>About us</li>
                {token && <li><button onClick={handleLogout} className=' bg-red-700 text-white p-2 rounded-lg'>Logout</button></li>}
            </nav>
        </>
    )
}

export default Navbar