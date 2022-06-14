import { useEffect, useState } from 'react';
import '../Css/RandomCard.css'
import logo from '../Assets/logoMtg.webp'

import Card from './Card';
import CustomButton from './CustomButton';

function RandomCard(props) {

    const [card, setCard] = useState()
    const [loadedImg, setLoadedImg] = useState(false)

    const addCard = props.addCard
    const isAdmin = props.isAdmin

    const api = 'https://api.scryfall.com/cards/random'

    //uncomment next line for backend-using frontend
    //const api = 'http://localhost:5300/random'

    useEffect(() => {

        getCard()

    } ,[] );

    function getCard() {
        fetch(api)
        .then((res) => res.json())
        //uncomment for backend usong server 
        //.then((data) => setCard(data.data))
        .then((data) => setCard(data))
    }

    return (  
        <div className='mainDivRandom'>
            <div className='cardContainer'>
                {card ?
                    <Card card={card} isAdmin={isAdmin} addCard={addCard}/> 
                : <img src={logo} className='loadingImage'></img>
            }
            </div>
            {card && 
                <div className='refreshButtonDiv'>
                    <CustomButton text={"Get another card"} class={"green"} buttonFunction={() => {getCard()}}/>
                </div>
            }
        </div>
    );
}

export default RandomCard;