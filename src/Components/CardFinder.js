import { useState } from 'react';
import '../Css/CardFinder.css'

import Card from './Card.js'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { famagnifyingglass } from '@fortawesome/free-solid-svg-icons'

function CardFinder() {

    const [cardName, setCardName] = useState("")
    const [card, setCard] = useState()
    const api = 'https://api.scryfall.com/cards/named?fuzzy='    

    let handleSubmit = async (e) => {

        e.preventDefault();

        if (cardName !== "") {
            parseInput()
            setCardName("")    
        }
    }

    function parseInput() {

        let auxString = cardName.trim()
        let finalString = ''

        for (let i = 0; i < auxString.length; i++) {
            if (auxString[i] === ' ') {
                finalString += '+'
            } else {
                finalString += auxString[i]
            }
        }

        fetchAPI(finalString)
    }

    function fetchAPI(name) {

        console.log(api+name)

        fetch(api + name)
        .then((res) => res.json())
        .then((data) => setCard(data))

    }

    let handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "card") setCardName(value);
    }
 
    return (  
        <div className='mainDivFinder'>
            <form onSubmit={handleSubmit} className='divFinder'>
                <input type="text" name="card" value={cardName} onChange={handleChange} className='finder'/>
                <button type='submit' className='findButton'>find</button>
            </form>
            {card ? 
            <div><Card card={card}/> </div>
            : <></>
            }
        </div>
    );
}

export default CardFinder;