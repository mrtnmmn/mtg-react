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

    const [selectedChart, setSelectedChart] = useState('cardColors')

    function enterNew() {
        setSelectedDeck({})
        setCreating(true)
    }

    function enterEdit() {
        setCreating(true)
    }

    return (  
        <div className='mainDivContainer'>
            <button className="newDeckButton" onClick={enterNew}>+ Add New Deck</button>
            {selectedDeck._id ? 
                <div className='selectedDeckDiv'>
                    <button className='editDeckButton' onClick={enterEdit}>Edit Deck</button>
                    <button className='deleteDeckButton'>Delete Deck</button>
                    <h1 className='titles'>{selectedDeck.deckName}</h1>
                    <DeckCreatorStatistics colors={selectedDeck.cardColors} cardCosts={selectedDeck.cardCosts} types={selectedDeck.cardTypes} lands={selectedDeck.landsColors}/>
                </div>:
                <></>
            }
        </div>
    );
}

export default DecksSidebar;