import { useEffect, useState } from "react";

function useLogin() {

    const [login, setLogin] = useState()
    const [admin, setAdmin] = useState()

    const setFalse = () => {
        setLogin(false)
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('email')
        sessionStorage.removeItem('userId')
    }

    const setTrue = (token) => {
        setLogin(true)
        sessionStorage.setItem('token', token)
    }

    const setAdminFalse = () => {
        setAdmin(false)
    }

    const setAdminTrue = () => {
        setAdmin(true)
    }

    useEffect(() => {
    
        if (sessionStorage.getItem('token')) {
            setLogin(true)
        }

        if (sessionStorage.getItem('admin')) {
            setAdminTrue()
        }
    
    }, [])
    

    return [login, admin, setFalse, setTrue, setAdminFalse, setAdminTrue]
}

export default useLogin;