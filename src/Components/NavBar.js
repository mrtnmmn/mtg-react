import '../Css/NavBar.css'
import logo from '../Assets/logoMtg.webp'
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'

import useLogin from './Hooks/useLogin'

function NavBar(props) {

    const [token, setToken] = useState()
    const login = props.login
    const setFalse = props.setFalse
    const setAdminFalse = props.setAdminFalse
    const admin = props.admin

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
                <Link to="/" className='links'>Home</Link>
                <Link to="/random" className='links'>Random Card</Link> 
                <Link to="/finder" className='links'>Card Finder</Link> 
                <Link to="/decks" className='links'>Decks</Link>
            </div>
            <div className='innerDiv'>
                {login? 
                    <div className='logged'>
                        <div>
                        {admin? 
                            <div>
                                <Link to="/stock" className='links'>Stock</Link>
                                <Link to="/purchaseOrders" className='links'>Purchase Orders</Link>
                            </div>
                        :
                            <div>
                                <Link to="/shoppingCart" className='links'>
                                    Cart&nbsp;
                                    <FontAwesomeIcon icon={faCartShopping} className='colored'/>
                                </Link>
                            </div>
                        }
                        </div>
                        <a onClick={() => {setFalse(); setAdminFalse()}} className='links' >Log off</a>
                    </div>
                    :
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