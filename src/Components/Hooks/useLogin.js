import { useEffect, useState } from "react";

function useLogin() {

    const [login, setLogin] = useState()

    const setFalse = () => {
        setLogin(false)
        sessionStorage.removeItem('token')
    }

    const setTrue = (token) => {
        setLogin(true)
        sessionStorage.setItem('token', token)
    }

    useEffect(() => {
    
        if (sessionStorage.getItem('token')) {
            setLogin(true)
        }
    
    }, [])
    

    return [login, setFalse, setTrue]
}

export default useLogin;