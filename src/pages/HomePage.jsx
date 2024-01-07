import React from 'react'
import Authentication from '../components/Authentication'
import { Typewriter } from 'react-simple-typewriter'

const HomePage = () => {

    return (
        <>
            <h1 className='absolute dark:text-white text-slate-800 font-bold text-5xl w-[50%] ml-4'>
                <Typewriter words={['Welcome to my all new Expense Tracker WebApp', 'Login/SignUp to continue!!']} loop={false} />
            </h1>
            <Authentication />
        </>
    )
}

export default HomePage;