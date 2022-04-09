import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import '../Css/Login.css'

function Login() {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [logged, setLogged] = useState()
    const [response, setResponse] = useState({})

    useEffect(() => {
        if(localStorage.getItem('token')) {
            setLogged(true)
        }
    })

    useEffect(() => {
        if (response.token) {
            localStorage.setItem('token', response.token)
        }
    }, [response])

    let handleSubmit = async (e) => {

        e.preventDefault();
        
        fetchLogin()
        setEmail("")
        setPassword("")

    }

    function fetchLogin() {
        fetch("http://localhost:5300/users/login", {
            method: 'POST', 
            body: JSON.stringify({email, password}), // data can be `string` or {object}!
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => setResponse(response));

    }

    let handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "email") setEmail(value);
        if (name === "password") setPassword(value)
    }

    return (  
        <div className="mainLoginDiv">
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
            </form>
            {logged && <h1 className="alreadyLogged">Already logged!</h1>}
        </div>
    );
}

export default Login;