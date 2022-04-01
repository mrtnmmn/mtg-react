import '../Css/Card.css'
import { useState, useEffect } from 'react';

import red from '../Assets/mana/red.png'
import blue from '../Assets/mana/blue.png'
import white from '../Assets/mana/white.png'
import green from '../Assets/mana/green.png'
import black from '../Assets/mana/black.png'

function Card(cardProp) {
    
    const card = cardProp.card
    const mana = card.mana_cost
    const [convertedMana, setConvertedMana] = useState([])

    console.log(card)

    let hasStats = true

    if (!card.power) {
        hasStats = false
    }

    useEffect(() => {
        setConvertedMana([])
        for (let i = 0; i < mana.length; i = i + 3) {
            console.log(card.mana_cost[i+1])
            switch (mana[i+1]) {
                case 'B':
                    setConvertedMana(convertedMana => [...convertedMana, <img src={black} className='mana'></img>])
                    break;
                case 'G': 
                    setConvertedMana(convertedMana => [...convertedMana, <img src={green} className='mana'></img>])
                    break;
                case 'U':
                    setConvertedMana(convertedMana => [...convertedMana, <img src={blue} className='mana'></img>])
                    break;
                case 'R':
                    setConvertedMana(convertedMana => [...convertedMana, <img src={red} className='mana'></img>])
                    break;
                case 'W':
                    setConvertedMana(convertedMana => [...convertedMana, <img src={white} className='mana'></img>])
                    break;
                default: 
                    setConvertedMana(convertedMana => [...convertedMana, <h3 className='blankMana'>{mana[i+1]}</h3>])
            }
        }
    } ,[cardProp.card])

    return (  
        <div className="mainDivCard">
            {card.image_uris ? <img src={card.image_uris.png} className="cardImg"></img> : 'no image disponible' }
            <div className='divInfo'>
                <h2 className='name'>{card.name}</h2>
                <div className='innerInfo'>
                    <p>Type: {card.type_line}</p>
                    {
                        card.type_line !== 'Land' ? 
                        <div className='divCost'>
                            <p>Cost:&nbsp; </p>
                            {convertedMana.map((item) => item)}
                        </div>:
                        <></>
                    }
                    {hasStats && <p>Stats: {card.power} / {card.toughness}</p>}
                    <p>Description: {card.oracle_text}</p>
                    <p>Artist: {card.artist}</p>
                </div>
                {card.purchase_uris ? 
                <div>
                    <h3 className='buyTitle'>Buy options: </h3>
                    <div className='buyDiv'>
                        {card.purchase_uris.tcgplayer && <a href={card.purchase_uris.tcgplayer} className='buyLink'>TCGPlayer</a>}
                        {card.purchase_uris.cardmarket && <a href={card.purchase_uris.cardmarket} className='buyLink'>Cardmarket</a>}
                        {card.purchase_uris.cardhoarder && <a href={card.purchase_uris.cardhoarder} className='buyLink'>Cardhoarder</a>}
                    </div> 
                </div>:
                <p>No purchase options available</p>}
            </div>
        </div>
    );
}

export default Card;