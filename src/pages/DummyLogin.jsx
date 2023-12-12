import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom';

const DummyLogin = () => {
    return (
        <>
            <h1>This is a dummy login page</h1>
            <Link to='/updateProfile'>
                <h1 className=' text-blue-800'>Your Profile is incomplete!! Complete now</h1>
            </Link>
        </>
    )
}

export default DummyLogin;