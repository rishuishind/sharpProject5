import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginActions } from '../store/AuthContext';
import toast from 'react-hot-toast';

const Authentication = () => {
    const loginCtx = useSelector(state => state.login.isLogin);
    const dispatch = useDispatch();


    const loginApi = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD8ycB6q6pys2MMvD6gP4F308TdRu3RshI';
    const signUpApi = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD8ycB6q6pys2MMvD6gP4F308TdRu3RshI'

    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    const history = useNavigate();

    const handleLogin = () => {
        dispatch(loginActions.changeLogin());
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        let api;
        if (loginCtx) {
            api = loginApi;
        } else {
            if (passwordRef.current.value === confirmPasswordRef.current.value) {
                api = signUpApi
            } else {
                alert('passwords do not match');
                return;
            }
        }
        const fetchingFun = async () => {
            console.log('entered fetching');
            console.log(api);
            const response = await fetch(api, {
                method: 'POST',
                body: JSON.stringify({
                    email: emailRef.current.value,
                    password: passwordRef.current.value,
                    returnSecureToken: true
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (!response.ok) {
                throw new Error('Authentication Failed');
            }
            const data = await response.json();
            toast.success('logged In successfully')
            dispatch(loginActions.setToken(data.idToken));
            localStorage.setItem('token', data.idToken);
            localStorage.setItem('email', emailRef.current.value)
            history('/login')
        }
        fetchingFun().catch(err => alert(err));
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
                alert('Reset link sent succesfully, check your email');
            }).catch(err => {
                alert(err);
            })
    }

    return (
        <div className=' flex-col p-12 rounded-md border absolute border-black top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-slate-100'>
            <div>
                <h1 className=' text-lg font-semibold'>{loginCtx ? 'Login Page:' : 'SignUp Page:'}</h1>
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input ref={emailRef} className='border p-1.5 m-1' type="email" placeholder='email' />
                    </div>
                    <div>
                        <input ref={passwordRef} className='border p-1.5 m-1' type="password" placeholder='password' />
                    </div>
                    {!loginCtx && <div>
                        <input ref={confirmPasswordRef} className='border p-1.5 m-1' type="password" placeholder='confirm password' />
                    </div>}
                    {loginCtx && <h1 onClick={handleForget} className=' text-red-600 cursor-pointer'>Forget Password ?</h1>}
                    <div>
                        <button type='submit' className='p-2 bg-black text-white rounded-md mt-3'>{loginCtx ? 'Login' : 'SignUp'}</button>
                    </div>
                </form>
                <button onClick={handleLogin} className=' bg-gray-500 px-3 rounded mt-3 text-white'>{loginCtx ? 'Dont have an account?' : 'Already have an account'}</button>
            </div>
        </div>
    )
}
export default Authentication