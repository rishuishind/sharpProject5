import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginActions } from '../store/AuthContext';

const Navbar = () => {
    const token = localStorage.getItem('token');
    const dispatch = useDispatch();
    const history = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        dispatch(loginActions.setToken(''));
        history('/')
    }
    return (
        <>
            <nav className="flex justify-between p-2 h-20 list-none bg-slate-800 text-slate-100 w-full">
                <h1 className='font-bold text-2xl'>Expense Tracker</h1>
                <div className='flex w-[90%] justify-evenly p-5'>
                    <li className='cursor-pointer'>Home</li>
                    <li className='cursor-pointer'>Products</li>
                    <li className='cursor-pointer'>About us</li>
                </div>
                {token && <li className='p-4'><button onClick={handleLogout} className=' bg-red-700 text-white p-2 rounded-lg'>Logout</button></li>}
            </nav>
        </>
    )
}

export default Navbar