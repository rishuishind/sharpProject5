import React, { useRef, useState, useContext } from 'react';
import AuthContext from '../store/AuthContext';
import { useNavigate } from 'react-router-dom';

const Authentication = () => {
    const ctx = useContext(AuthContext);
    const apiKEY = 'AIzaSyD8ycB6q6pys2MMvD6gP4F308TdRu3RshI';
    const [api, setAPI] = useState('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=')

    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    const history = useNavigate()


    const handleSubmit = (e) => {
        e.preventDefault();
        if (ctx.isLogin) {
            setAPI(api + apiKEY);
        } else {
            if (passwordRef.current.value === confirmPasswordRef.current.value) {
                setAPI('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + apiKEY);
            } else {
                alert('passwords do not match');
                return;
            }
        }
        fetch(api, {
            method: 'POST',
            body: JSON.stringify({
                email: emailRef.current.value,
                password: passwordRef.current.value,
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
            localStorage.setItem('token', data.idToken);
            history('/login')
        }).catch(err => {
            alert(err.message);
        })
    }

    const handleForget = () => {
        if (emailRef.current.value.length < 1) {
            alert('Please enter email');
            return;
        }
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyD8ycB6q6pys2MMvD6gP4F308TdRu3RshI',
            {
                method: 'POST',
                body: JSON.stringify({
                    requestType: 'PASSWORD_RESET',
                    email: emailRef.current.value
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    return res.json().then(data => {
                        let errorMessage = 'Authentication failed';
                        throw new Error(errorMessage);
                    })
                }
            }).then(data => {
                console.log('this is forget data ', data);
                alert('Reset link sent succesfully, check your email');
            }).catch(err => {
                alert(err);
            })
    }

    return (
        <div className=' flex-col p-12 rounded-md border absolute border-black top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2'>
            <div>
                <h1 className=' text-lg font-semibold'>{ctx.isLogin ? 'Login Page:' : 'SignUp Page:'}</h1>
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input ref={emailRef} className='border p-1.5 m-1' type="email" placeholder='email' />
                    </div>
                    <div>
                        <input ref={passwordRef} className='border p-1.5 m-1' type="password" placeholder='password' />
                    </div>
                    {!ctx.isLogin && <div>
                        <input ref={confirmPasswordRef} className='border p-1.5 m-1' type="password" placeholder='confirm password' />
                    </div>}
                    {ctx.isLogin && <h1 onClick={handleForget} className=' text-red-600 cursor-pointer'>Forget Password ?</h1>}
                    <div>
                        <button type='submit' className='p-2 bg-black text-white rounded-md mt-3'>{ctx.isLogin ? 'Login' : 'SignUp'}</button>
                    </div>
                </form>
                <button onClick={ctx.changeLogin} className=' bg-gray-500 px-3 rounded mt-3 text-white'>{ctx.isLogin ? 'Dont have an account?' : 'Already have an account'}</button>
            </div>
        </div>
    )
}
export default Authentication