import '../../Css/DecksSidebar.css'
import ColorsChart from '../Charts/ColorsChart'
import ManaCostsChart from '../Charts/ManaCostsCharts'

function DecksSidebar(props) {

    const selectedDeck = props.deck
    const setSelectedDeck = props.setSelectedDeck
    const creating = props.creating
    const setCreating = props.setCreating

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
                    {selectedDeck.cardColors? <h3 className='titles'>Card Colors</h3> : <></>}
                    <ColorsChart colors={selectedDeck.cardColors}/>
                    {selectedDeck.cardCosts? <h3 className='titles'>Card costs</h3> : <></>}
                    <ManaCostsChart cardCosts={selectedDeck.cardCosts}/>
                </div>:
                <></>
            }
        </div>
    );
}

export default DecksSidebar;