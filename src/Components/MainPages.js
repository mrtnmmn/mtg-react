import '../Css/MainPage.css'
import { Link } from 'react-router-dom';

import banner from '../Assets/banner.png'

function MainPage() {
    return (  
        <div className="mainPageDiv">
            <div className='bannerDiv'>
                <img src={banner} className='banner'></img>
            </div>
            <div className='contentDiv'>
                <div className="mtgInfo">
                    <h1 className='title'>Welcome to MagikaTG Store</h1>                    
                    <div className='mainText'>
                        <h1>Who are we?</h1>
                        <p className='bodyText'>We are an Online Magic The Gathering shop, with the aditional feature of letting you create your own 
                        decks and see many statistics before you buy!</p> 
                        <div className='decksLinkDiv'>
                            <Link className='decksLink' to="/decks">Go chek out our deck creator!</Link>
                        </div>
                    </div>
                </div>
                <div className="contactInfo">
                    <h1 className='contactInfoTitles'>Contact with us!</h1>
                    <p className='contactInfoText'>Email: magikaTG@gmail.com</p>
                    <p className='contactInfoText'>RRSS: @magikaTG</p>
                </div>
            </div>
        </div>
    );
}

export default MainPage;