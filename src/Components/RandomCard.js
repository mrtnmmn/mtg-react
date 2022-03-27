import { useEffect, useState } from 'react';
import '../Css/RandomCard.css'

function RandomCard() {

    const [card, setCard] = useState()

    const api = 'https://api.scryfall.com/cards/random'

    useEffect(() => {

        fetch(api)
        .then((res) => res.json())
        .then((data) => setCard(data))

    } ,[] );

    return (  
        <div className='mainDivRandom'>
            <div>{card ?
                <div className='cardDiv'>
                    <img className='cardImg' src={card.image_uris.png}></img>
                    <p>{card.name}</p> 
                </div> 
                : 'Loading...'}
            </div>
        </div>
    );
}

export default RandomCard;