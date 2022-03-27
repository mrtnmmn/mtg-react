import { useEffect, useState } from 'react';
import '../Css/RandomCard.css'
import logo from '../Assets/logoMtg.webp'

function RandomCard() {

    const [card, setCard] = useState()
    const [loadedImg, setLoadedImg] = useState(false)

    const api = 'https://api.scryfall.com/cards/random'

    useEffect(() => {

        getCard()

    } ,[] );

    function getCard() {
        fetch(api)
        .then((res) => res.json())
        .then((data) => setCard(data))
        .then(console.log(card))
    }

    return (  
        <div className='mainDivRandom'>
            <div>{card ?
                <div className='cardDiv'>
                    <img className='cardImg' src={card.image_uris.png}></img>
                    <p>{card.name}</p> 
                </div> 
                : 'Loading...'}
            </div>
            <button onClick={getCard}>Refresh card</button>
        </div>
    );
}

export default RandomCard;