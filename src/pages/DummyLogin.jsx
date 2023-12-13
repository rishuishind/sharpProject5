import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom';
import Navbar from '../components/Navbar';

const DummyLogin = () => {

    const handleVerifyEmail = () => {
        const token = localStorage.getItem('token');
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyD8ycB6q6pys2MMvD6gP4F308TdRu3RshI', {
            method: 'POST',
            body: JSON.stringify({
                requestType: 'VERIFY_EMAIL',
                idToken: token
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (res.ok) {
                return res.json();
            } else {
                return res.json().then(data => {
                    let errorMsg = 'Authentication Failed';
                    throw new console.error(errorMsg);
                })
            }
        }).then(data => {
            console.log(data);
        }).catch(err => {
            alert(err);
        })
    }

    return (
        <>
            <Navbar />
            <h1>This is a dummy login page</h1>
            <Link to='/updateProfile'>
                <h1 className=' text-blue-800'>Your Profile is incomplete!! Complete now</h1>
            </Link>

            <button onClick={handleVerifyEmail} className=' bg-red-500 text-white p-2 mt-5 rounded-lg'>Verify Email</button>
        </>
    )
}

export default DummyLogin;