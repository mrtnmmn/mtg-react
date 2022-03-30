import { useEffect, useState } from 'react';
import '../Css/RandomCard.css'
import logo from '../Assets/logoMtg.webp'

import Card from './Card';

function RandomCard() {

    const [card, setCard] = useState()
    const [loadedImg, setLoadedImg] = useState(false)

    const api = 'http://localhost:5300/random'

    useEffect(() => {

        getCard()

    } ,[] );

    function getCard() {
        fetch(api)
        .then((res) => res.json())
        .then((data) => setCard(data.data))
    }

    return (  
        <div className='mainDivRandom'>
            <div>{card ?
                <div>
                    <Card card={card}/> 
                </div>
                : 'Loading...'}
            </div>
            <button onClick={getCard} className='refreshButton'>Refresh card</button>
        </div>
    );
}

export default RandomCard;