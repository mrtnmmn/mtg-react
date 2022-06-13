import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import '../Css/Login.css'
import useLogin from './Hooks/useLogin'

function Login(props) {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [logged, setLogged] = useState()
    const [response, setResponse] = useState({})
    const [user, setUser] = useState({})
    const [loginError, setLoginError] = useState(false)

    const setTrue = props.setTrue
    const login = props.login
    const setAdminTrue = props.setAdminTrue

    useEffect(() => {
        if(sessionStorage.getItem('token')) {
            setLogged(true)
        }
    })

    useEffect(() => {
        if (response.token) {
            sessionStorage.setItem('token', response.token)
        }
    }, [response])

    useEffect(() => {

        if (user.admin) {
            sessionStorage.setItem('admin', true)
            setAdminTrue()
        }

        if (user.userId) {
            sessionStorage.setItem('userId', user.userId)
        }

    }, [user])

    let handleSubmit = async (e) => {

        e.preventDefault();
        
        sessionStorage.setItem('email', email)

        fetchLogin()
        setEmail("")
        setPassword("")

    }

    function fetchLogin() {
        fetch("http://localhost:5300/user/login", {
            method: 'POST', 
            body: JSON.stringify({email, password}), // data can be `string` or {object}!
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {           
            console.log(response)
            if (response.error) {
                setLoginError(true)
            } else {
                setTrue(response.token)
                getUser()
            }
        })


    }

    function getUser() {
        console.log('getting user')
        fetch("http://localhost:5300/user/", {
            method: 'POST', 
            body: JSON.stringify({email: sessionStorage.getItem('email')}), // data can be `string` or {object}!
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => setUser(response.user))
    }

    let handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "email") setEmail(value);
        if (name === "password") setPassword(value)
    }

    return (  
        <div className="mainLoginDiv">
            {!login ? 
                <form onSubmit={handleSubmit} className="loginFormDiv">
                    <label>Email: </label>
                    <br></br>
                    <input type="text" value={email} name="email" onChange={handleChange}></input>
                    <br></br>
                    <label>Password: </label>
                    <br></br>
                    <input type="password" value={password} name="password" onChange={handleChange}></input>
                    <br></br>
                    <div>
                        <Link to="/register" className="linkRegister">Don't have an account?</Link>
                        <button type='submit' className="loginFormButton">LogIn</button>
                    </div>
                    {loginError && 
                        <div className="loginError">
                            The email / password combination is incorrect
                        </div>
                    }
                </form>
            :
                <h1 className="alreadyLogged"><Link to="/">Already Logged! Return to main page</Link></h1>
            }
        </div>
    );
}

export default Login;