import { useState } from 'react';
import '../Css/CardFinder.css'

import Card from './Card.js'
import AutocompleteFinder from './AutocompleteFinder';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { famagnifyingglass } from '@fortawesome/free-solid-svg-icons'

function CardFinder(props) {

    const [cardName, setCardName] = useState("")
    const [card, setCard] = useState()
    const [findByName, setFindByName] = useState(true)

    const addCard = props.addCard 
    const isAdmin = props.isAdmin

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

        fetch(api + name)
        .then((res) => res.json())
        .then((data) => setCard(data))
        .catch(console.log('nombre no valido'))

    }

    let handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "card") setCardName(value);
    }
 
    return (  
        <div className='mainDivFinder'>
            {/*
            <div className='divButtons'>
                <button className='typeButtons' onClick={() => setFindByName(true)} disabled={findByName}>Find by name</button>
                <button className='typeButtons' onClick={() => setFindByName(false)} disabled={!findByName}>Other</button>
            </div>
            */}
            {findByName ? 
                /*
                <div className='divResult'>
                    <form onSubmit={handleSubmit} className='divFinder'>
                        <input type="text" name="card" value={cardName} onChange={handleChange} className='finder'/>
                        <button type='submit' className='findButton'>find</button>
                    </form>
                    {card ? 
                    <div><Card card={card}/> </div>
                    : <></>
                    }
                </div> */
                <AutocompleteFinder isAdmin={isAdmin} addCard={addCard}/>
                : 
                <div className='divResult'>
                    
                </div>
            }

        </div>
    );
}

export default CardFinder;