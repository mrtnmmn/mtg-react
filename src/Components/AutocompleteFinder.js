import { useState, useEffect } from 'react';
import { Autocomplete, TextField } from '@mui/material';

import '../Css/Autocomplete.css'

import Card from './Card.js'
import { borderRadius } from '@mui/system';

function AutocompleteFinder(props) {

    const [cardNames, setCardNames] = useState([])
    const [card, setCard] = useState()
    const [cardName, setCardName] = useState("")
    const setCardDeckCreator = props.setCard

    const apiAutocomplete = 'https://api.scryfall.com/cards/autocomplete?q='   
    const apiFindByName = 'https://api.scryfall.com/cards/named?fuzzy='
     
    useEffect(() => {
        if (cardNames.length === 1) {
            fetchApiCard(cardNames[0])
        }
    }, [cardNames])

    useEffect(() => {
        if(props.setCard) {
            setCardDeckCreator(card)
        }
    }, [card])

    let handleSubmit = async (e) => {

        e.preventDefault();

        if (cardName !== "") {
            parseInput()
            setCardName("")    
        }

    }

    let handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "card") {
            setCardName(value)
            fetchAPI(value)
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

        fetch(apiAutocomplete + name)
        .then((res) => res.json())
        .then((data) => setCardNames(data.data))

    }

    function fetchApiCard(name) {
        
        fetch(apiFindByName + name)
        .then((res) => res.json())
        .then((data) => setCard(data))

    }

    function handleInputChange(event, value) {
        fetchAPI(value)
        setCardName(value)
    }

    return (  
        <div className='mainDivAutocomplete'>
            <div className='divFinder'>
                <div className='autocompleteAndFind'>
                    <div className='autocompleteDiv'>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={cardNames}
                            //sx={{  }}
                            //sx={{background: '#ffffff'}}
                            className='finder'
                            name="card"
                            value={cardName}
                            onInputChange={handleInputChange}
                            //onChange={() => (console.log("change"))}
                            renderInput={(params) => <TextField {...params} label="" />}
                        />
                    </div>
                    <button onClick={() => fetchApiCard(cardName)} className="findButton">find</button>
                </div>
            </div>

            <div className="mainAutocompleteResultDiv">
                {card && 
                    <div className="cardDiv">
                        <Card card={card}/>
                    </div>
                }
            </div>
        </div>
    );
}

export default AutocompleteFinder;