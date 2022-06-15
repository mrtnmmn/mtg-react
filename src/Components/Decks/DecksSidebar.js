import '../../Css/DecksSidebar.css'
import ColorsChart from '../Charts/ColorsChart'
import ManaCostsChart from '../Charts/ManaCostsCharts'
import { MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import { useState } from "react";
import DeckCreatorStatistics from "./DeckCreatorStatistics";

function DecksSidebar(props) {

    const selectedDeck = props.deck
    const setSelectedDeck = props.setSelectedDeck
    const creating = props.creating
    const setCreating = props.setCreating
    const deletedOne = props.deletedOne
    const addDeck = props.addDeck

    const [selectedChart, setSelectedChart] = useState('cardColors')

    function enterNew() {
        setSelectedDeck({})
        setCreating(true)
    }

    function enterEdit() {
        setCreating(true)
    }

    function deleteDeck() {
        setSelectedDeck({})
        fetch("https://magikatg.herokuapp.com/deck/", {
            method: 'DELETE', 
            body: JSON.stringify({_id: selectedDeck._id}), // data can be `string` or {object}!
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(deletedOne(selectedDeck._id))
    }

    function addDeckToCart() {
        addDeck(selectedDeck)
    }

    return (  
        <div className='mainDivContainer'>
            <button className="newDeckButton" onClick={enterNew}>+ Add New Deck</button>
            {selectedDeck._id ? 
                <div className='selectedDeckDiv'>
                    <button className='editDeckButton' onClick={enterEdit}>Edit Deck</button>
                    <button className='deleteDeckButton' onClick={deleteDeck}>Delete Deck</button>
                    <button className='shopingCartButton' onClick={addDeckToCart}>
                        <div>Add shopping cart</div>
                        &nbsp;
                        {selectedDeck.deckPrice ? 
                            <div>({selectedDeck.deckPrice}€)</div> 
                        : 
                            <></>
                        }
                    </button>
                    <h1 className='titles'>{selectedDeck.deckName}</h1>
                    <DeckCreatorStatistics colors={selectedDeck.cardColors} cardCosts={selectedDeck.cardCosts} types={selectedDeck.cardTypes} lands={selectedDeck.landsColors}/>
                </div>:
                <></>
            }
        </div>
    );
}

export default DecksSidebar;