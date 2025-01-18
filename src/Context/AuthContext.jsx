import {createContext, useContext, useState ,useEffect} from "react";

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [isLoggedIn,setIsLoggedIn] = useState(false)

    const logIn = () => setIsLoggedIn(true)
    const logOut = () => {
        localStorage.removeItem("token")
        setIsLoggedIn(false)
    }

    useEffect(() => {
        const token = localStorage.getItem("token") 
        if (token) {
            setIsLoggedIn(true);
        }else{
            localStorage.removeItem("name")
            localStorage.removeItem("userId")
        }
    }, [logOut]);

    return(
        <AuthContext.Provider value={{isLoggedIn,logIn,logOut}}>
            {children}
        </AuthContext.Provider>
    )
} 

export const useAuth = () => useContext(AuthContext)