import { useState } from 'react';
import { Link } from "react-router-dom";

import '../Css/Register.css'

function Register() {

    const [username, setUsername] = useState() 
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [response, setResponse] = useState({})


    function fetchRegister() {

        fetch("http://localhost:5300/users/register", {
            method: 'POST', 
            body: JSON.stringify({username, email, password}), // data can be `string` or {object}!
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => setResponse(response));


    }

    let handleSubmit = async (e) => {

        e.prevetDefault()

        fetchRegister()
        setUsername("")
        setEmail("")
        setPassword("")
    }

    let handleChange = async (e) => {

        const { name, value } = e.target;
        if (name === "username") setUsername(value)
        if (name === "email") setEmail(value);
        if (name === "password") setPassword(value)

    }

    return (  
        <div className='mainRegisterDiv'>
            <form onSubmit={handleSubmit} className='registerForm'>
                <label>Username: </label>
                <br></br>
                <input type='text' value={username} name='username' onChange={handleChange}/>
                <br></br>
                <label>Email: </label>
                <br></br>
                <input type='text' value={email} name='email' onChange={handleChange}/>
                <br></br>
                <label>Password</label>
                <br></br>
                <input type='password' value={password} name='password' onChange={handleChange} />
                <div>
                    <Link to="/login" className="linkLogin">Already have an account?</Link>
                    <button type='submit' className="loginFormButton">Register</button>
                </div>
            </form>
        </div>
    );
}

export default Register;