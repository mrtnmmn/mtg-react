import '../Css/NavBar.css'
import logo from '../Assets/logoMtg.webp'
import { Link } from 'react-router-dom';

function NavBar() {
    return (  
        <div className="mainDivNav">
            <div className='innerDiv'>
                <a href='https://magic.wizards.com/es' className='links'><img src={logo} className='logo'></img></a>
                <Link to="/random" className='links'>Random Card</Link> 
            </div>
            <div className='innerDiv'>
                prueba
            </div>
        </div>
    );
}

export default NavBar;