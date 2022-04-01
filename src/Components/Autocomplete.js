import { useState, useEffect } from 'react';

import '../Css/Autocomplete.css'

import Card from '../Components/Card.js'

function Autocomplete() {

    const [cardNames, setCardNames] = useState([])
    const [card, setCard] = useState()
    const [cardName, setCardName] = useState("")

    const apiAutocomplete = 'https://api.scryfall.com/cards/autocomplete?q='   
    const apiFindByName = 'https://api.scryfall.com/cards/named?fuzzy='    
     
    useEffect(() => {
        console.log('cambio')
        if (cardNames.length === 1) {
            fetchApiCard(cardNames[0])
            setCardNames([])
        }
    }, [cardNames])

    let handleSubmit = async (e) => {

        e.preventDefault();

        if (cardName !== "") {
            parseInput()
            setCardName("")    
        }
    }

    let handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "card") setCardName(value);
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

        console.log(apiAutocomplete+name)

        fetch(apiAutocomplete + name)
        .then((res) => res.json())
        .then((data) => setCardNames(data.data))
        .then(() => {if(cardNames.length === 1) {fetchApiCard(cardNames[0])}})
        .catch(console.log('too many cards'))

    }

    function fetchApiCard(name) {
        
        fetch(apiFindByName + name)
        .then((res) => res.json())
        .then((data) => setCard(data))

    }

    return (  
        <div className='mainDivAutocomplete'>
            <form onSubmit={handleSubmit} className='divFinder'>
                <input type="text" name="card" value={cardName} onChange={handleChange} className='finder'/>
                <button type='submit' className='findButton'>find</button>
            </form>
            <div className="mainAutocompleteResultDiv">
                {cardNames.length !== 0 && 
                    <div className="listDiv">
                        {cardNames.map((element, index) => <li key={index} onClick={() => fetchApiCard(element)}>{element}</li>)}
                    </div>
                }
                {card && 
                    <div className="cardDiv">
                        <Card card={card}/>
                    </div>
                }
            </div>
        </div>
    );
}

export default Autocomplete;