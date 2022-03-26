import '../Css/NavBar.css'
import logo from '../Assets/logoMtg.webp'

function NavBar() {
    return (  
        <div className="mainDivNav">
            <div className='innerDiv'>
                <img src={logo} className='logo'></img>
                <a href='https://magic.wizards.com/es' className='links'>MTG</a>
                <div className='links'>prueba</div>
            </div>
            <div className='innerDiv'>
                prueba
            </div>
        </div>
    );
}

export default NavBar;