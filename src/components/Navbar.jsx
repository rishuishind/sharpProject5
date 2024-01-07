import React from 'react'
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { loginActions } from '../store/AuthContext';

const Navbar = () => {
    const token = localStorage.getItem('token');
    const dispatch = useDispatch();
    const history = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        dispatch(loginActions.setToken(''));
        history('/')
    }
    return (
        <>
            <nav className="flex justify-between p-2 h-20 list-none bg-slate-900 text-slate-100 w-full">
                <h1 className='font-bold text-2xl'>Expense Tracker</h1>
                <div className='flex w-[90%] justify-evenly p-5'>
                    {!token && <li className='cursor-pointer'><NavLink to='/'>Home</NavLink></li>}
                    {token && <li className='cursor-pointer'><NavLink to='/login'>Expenses</NavLink></li>}
                    <li className='cursor-pointer'><NavLink to='/aboutus'>About Us</NavLink></li>
                </div>
                {token && <li className='p-4'><button onClick={handleLogout} className=' bg-red-700 text-white p-2 rounded-lg'>Logout</button></li>}
            </nav>
        </>
    )
}

export default Navbar