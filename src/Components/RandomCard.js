import { useEffect, useState } from 'react';
import '../Css/RandomCard.css'
import logo from '../Assets/logoMtg.webp'

import Card from './Card';

function RandomCard() {

    const [card, setCard] = useState()
    const [loadedImg, setLoadedImg] = useState(false)

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
            <div className='cardContainer'>{card ?
                    <Card card={card}/> 
                : <img src={logo} className='loadingImage'></img>
            }
            </div>
            {card && <button onClick={getCard} className='refreshButton'>Refresh card</button>}
        </div>
    );
}

export default RandomCard;