import '../Css/Card.css'
import { useState, useEffect } from 'react';

import red from '../Assets/mana/red.png'
import blue from '../Assets/mana/blue.png'
import white from '../Assets/mana/white.png'
import green from '../Assets/mana/green.png'
import black from '../Assets/mana/black.png'
import CustomButton from './CustomButton';

function Card(props) {
    
    const card = props.card
    const mana = card.mana_cost
    const [convertedMana, setConvertedMana] = useState([])

    const isAdmin = props.isAdmin
    const addCard = props.addCard

    let hasStats = true

    if (!card.power) {
        hasStats = false
    }

    useEffect(() => {
        setConvertedMana([])
        if (mana) {
            for (let i = 0; i < mana.length; i = i + 3) {
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
        }
    } ,[props.card])

    function addOne(card) {
        let cardPrice 
        if (card.prices.eur !== null) {
            cardPrice = card.prices.eur
        } else {
            cardPrice = 0
        }

        fetch("https://magikatg.herokuapp.com/card/", {
            method: 'post', 
            body: JSON.stringify({_id: card.id, cardQuantity: 1, cardName: card.name, cardPrice: cardPrice}), 
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .catch(error => console.log('Error: ', error))
    }

    function subtractOne(card) {
        fetch("https://magikatg.herokuapp.com/card/subtractOne", {
            method: 'post', 
            body: JSON.stringify({_id: card.id}), 
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .catch(error => console.log('Error: ', error))
    }

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
                            {convertedMana.map((item) => <div key={item}>{item}</div>)}
                        </div>:
                        <></>
                    }
                    {hasStats && <p>Stats: {card.power} / {card.toughness}</p>}
                    <p>Description: {card.oracle_text}</p>
                    <p>Artist: {card.artist}</p>
                </div>
                {isAdmin ? 
                    <div className='adminButtons'>
                        <CustomButton text={"Add to stock"} class={"green"} buttonFunction={() => {addOne(card)}}/>
                        <CustomButton text={"Subtract from stock"} class={"red"} buttonFunction={() => {subtractOne(card)}}/>
                    </div>
                :
                    <CustomButton text={"Add to cart"} class={"green"} buttonFunction={() => {addCard(card)}}/>                        
                }
            </div>
        </div>
    );
}

/*
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
*/

export default Card;