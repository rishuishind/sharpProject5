import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
    const handleClick = () => {
        localStorage.removeItem('email');
        localStorage.removeItem('token');
    }
    return (
        <div>
            <p className='black:text-white'>This Page is not found or maybe you're trying to access a restricted page!! Go to the link below login again if you're already a user or to singup if you're new here</p>
            <Link onClick={handleClick} to='/'>Click here to login again</Link>
        </div>
    )
}

export default NotFound