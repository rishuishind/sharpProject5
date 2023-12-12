import React, { useEffect, useRef } from 'react'

const UpdateProfile = () => {

    const nameRef = useRef();
    const urlRef = useRef();

    useEffect(() => {
        const token = localStorage.getItem('token');
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyD8ycB6q6pys2MMvD6gP4F308TdRu3RshI', {
            method: 'POST',
            body: JSON.stringify({
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
                    let errorMessage = 'Authentication Failed';
                    throw new Error(errorMessage);
                })
            }
        }).then(data => {
            nameRef.current.value = data.users[0].displayName;
            urlRef.current.value = data.users[0].email;
        }).catch(err => {
            alert(err);
        })
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyD8ycB6q6pys2MMvD6gP4F308TdRu3RshI', {
            method: 'POST',
            body: JSON.stringify({
                idToken: token,
                displayName: nameRef.current.value,
                photoUrl: urlRef.current.value,
                deleteAttribute: ['PHOTO_URL'],
                returnSecureToken: true
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (res.ok) {
                return res.json();
            } else {
                return res.json().then(data => {
                    let errorMessage = 'Authentication Failed';
                    throw new Error(errorMessage);
                })
            }
        }).then(data => {
            console.log(data);
        }).catch(err => {
            alert(err.message);
        })
    }

    return (
        <div className='flex justify-center items-center h-screen'>
            <div>
                <h1 className=' font-semibold text-lg'>Contact Details</h1>
                <form onSubmit={handleSubmit}>
                    <div className='flex'>
                        <div>
                            <label htmlFor="Name">Full Name:</label>
                            <input ref={nameRef} className=' bg-slate-200 rounded-md p-1 m-2' type="text" />
                        </div>
                        <div>
                            <label htmlFor="url">Profile Photo URL:</label>
                            <input ref={urlRef} className=' bg-slate-200 rounded-md p-1 m-2' type="text" />
                        </div>
                    </div>
                    <button type='submit' className=' bg-red-700 p-2 text-white rounded-lg'>Update</button>
                </form>
            </div>

        </div>
    )
}

export default UpdateProfile