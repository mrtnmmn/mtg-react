import { useEffect, useState } from "react";

function useLogin() {

    const [login, setLogin] = useState()
    const [admin, setAdmin] = useState(false)

    const setFalse = () => {
        setLogin(false)
        sessionStorage.removeItem('token')
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

        console.log(admin)

    }, [admin])

    useEffect(() => {
    
        if (sessionStorage.getItem('token')) {
            setLogin(true)
        }

        if (sessionStorage.getItem('token')) {
            setAdmin(true)
        }
    
    }, [])
    

    return [login, admin, setFalse, setTrue, setAdminFalse, setAdminTrue]
}

export default useLogin;