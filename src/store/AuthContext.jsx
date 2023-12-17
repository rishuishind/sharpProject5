import { createContext } from "react";

const AuthContext = createContext({
    isLogin: true,
    changeLogin: () => { },
});

export default AuthContext;