import '../Css/NavBar.css'
import logo from '../Assets/logoMtg.webp'
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import useLogin from './Hooks/useLogin'

function NavBar(props) {

    const [token, setToken] = useState()
    const [prueba, setPrueba] = useState()
    const login = props.login
    const setFalse = props.setFalse

    useEffect(() => {
        let temporalTkn = sessionStorage.getItem('token')

        if (temporalTkn) {
            setToken(temporalTkn)
        }
    })

    function deleteToken() {
        sessionStorage.removeItem('token')
        setToken(null)
    }

    return (  
        <div className="mainDivNav">
            <div className='innerDiv'>
                <a href='https://magic.wizards.com/es' className='links'><img src={logo} className='logo'></img></a>
                <Link to="/random" className='links'>Random Card</Link> 
                <Link to="/finder" className='links'>Card Finder</Link> 
                <Link to="/decks" className='links'>Decks</Link>
            </div>
            <div className='innerDiv'>
                {login? 
                <a onClick={setFalse}>Log off</a> :
                <div>
                    <Link to="/register" className='links'>Register</Link>
                    <Link to="/login" className='links'>Login</Link>
                </div>
                }
            </div>
        </div>
    );
}

export default NavBar;