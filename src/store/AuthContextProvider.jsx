import React, { useState } from 'react'
import AuthContext from './AuthContext'

const AuthContextProvider = (props) => {
    const [isLogin, setIsLogin] = useState(true);


    const loginHandler = () => {
        setIsLogin(!isLogin);
    }

    const data = {
        isLogin: isLogin,
        changeLogin: loginHandler,
    }
    return (
        <AuthContext.Provider value={data}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider