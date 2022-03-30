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
    const [convertedMana, setConvertedMana] = useState([black,red])

    const [prueba, setPrueba] = useState(['hola'])
    
    let hasStats = true

    if (!card.power) {
        hasStats = false
    }

    console.log(mana)
    console.log('mana: ' + typeof(convertedMana))

    useEffect(() => {
        setConvertedMana([])
        for (let i = 0; i < mana.length; i = i + 3) {
            console.log(card.mana_cost[i+1])
            switch (mana[i+1]) {
                case 'B':
                    setConvertedMana(convertedMana => [...convertedMana, black])
                    break;
                case 'G': 
                    setConvertedMana(convertedMana => [...convertedMana, green])
                    break;
                case 'U':
                    setConvertedMana(convertedMana => [...convertedMana, blue])
                    break;
                case 'R':
                    setConvertedMana(convertedMana => [...convertedMana, red])
                    break;
                case 'W':
                    setConvertedMana(convertedMana => [...convertedMana, white])
                    break;
            }
        }

        setPrueba(setPrueba => [...prueba, 'fire'])
    } ,[cardProp.card])

    return (  
        <div className="mainDivCard">
            {card.image_uris ? <img src={card.image_uris.png}></img> : 'no image disponible' }
            <div className='divInfo'>
                <h2 className='name'>{card.name}</h2>
                <div className='innerInfo'>
                    <p>{card.type_line}</p>
                    {
                        card.type_line !== 'Land' ? 
                        <p>Cost: 
                            {convertedMana.map((item, index) => <img key={index} src={item} className='mana'></img>)}
                        </p> :
                        <></>
                    }
                    {hasStats && <p>Stats: {card.power} / {card.toughness}</p>}
                    <p>Description: {card.oracle_text}</p>
                    <p>Artist: {card.artist}</p>
                </div>
                <div className='buyDiv'>
                    {card.purchase_uris.tcgplayer && <a href={card.purchase_uris.tcgplayer}>TCGPlayer</a>}
                    {card.purchase_uris.cardmarket && <a href={card.purchase_uris.cardkmarket}>Cardmarket</a>}
                    {card.purchase_uris.cardhoarder && <a href={card.purchase_uris.cardhoarder}>Cardhoarder</a>}
                </div> 
            </div>
        </div>
    );
}

export default Card;