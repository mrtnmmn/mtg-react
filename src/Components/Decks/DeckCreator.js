import { useEffect, useState } from "react";

import '../../Css/DeckCreator.css'
import AutocompleteFinder from "../AutocompleteFinder";
import DeckCreatorStatistics from "./DeckCreatorStatistics";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

function DeckCreator(props) {

    const [deckName, setDeckName] = useState("")
    //const [deckLegality, setDeckLegality] = useState()
    const [currentCard, setCurrentCard] = useState()
    const [currentCardLegality, setCurrentCardLegality] = useState()
    const [cards, setCards] = useState([])
    const [cardCosts, setCardCosts] = useState({c0: 0,c1: 0,c2: 0,c3: 0,c4: 0,c5: 0})
    const [cardColors, setCardColors] = useState({colorless: 0,white: 0,red: 0,blue: 0,green: 0, black: 0,multicolor: 0})
    const [cardTypes, setCardTypes] = useState({
        basicLand: 0,
        land: 0,
        creature: 0,
        instant: 0,
        sorcery: 0,
        enchantment: 0,
        artifact: 0, 
        other: 0
    })
    const [landsColors, setLandsColors] = useState({
        white: 0,
        red: 0,
        blue: 0,
        green: 0, 
        black: 0,
        multicolor: 0
    })
    const [deckPrice, setDeckPrice] = useState(parseFloat(0))
    const [deck, setDeck] = useState(props.deck)
    const [editing, setEditing] = useState(false)

    useEffect(() => {
        if (props.deck._id) {
            setDeckName(deck.deckName)
            setCards(deck.cards)
            setCardCosts(deck.cardCosts)
            setCardColors(deck.cardColors)
            setCardTypes(deck.cardTypes)
            setLandsColors(deck.landsColors)
            setEditing(true)
            setDeckPrice(deck.deckPrice)
        }
    }, [])

    useEffect(() => {
        generateDeck()
    },[cards])

    function generateDeck() {

        if (props.deck._id) {
            setDeck({
                _id: props.deck._id,
                deckName: deckName,
                user: sessionStorage.getItem('userId'),
                cards: cards,
                cardCosts: cardCosts,
                cardColors: cardColors,
                cardTypes: cardTypes,
                landsColors: landsColors,
                //deckLegality: deckLegality
                deckPrice: deckPrice.toFixed(2)
            })
        } else {
            setDeck({
                deckName: deckName,
                user: sessionStorage.getItem('userId'),
                cards: cards,
                cardCosts: cardCosts,
                cardColors: cardColors,
                cardTypes: cardTypes,
                landsColors: landsColors,
                //deckLegality: deckLegality
                deckPrice: deckPrice.toFixed(2)
            })
        }
    }

    let handleSubmit = async (e) => {

    }

    let handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "deckName") setDeckName(value);
        //if (name === 'legality') setDeckLegality(value)
        generateDeck()
    }

    const addCard = () => {

        let newCardType = currentCard.type_line
        newCardType = newCardType.split('—')[0]
        if ( newCardType.split(' ')[0] === 'Legendary') {
            newCardType = newCardType.split(' ')[1]
        } else {
            newCardType = newCardType.split(' ')[0]
        }

        switch (newCardType) {
            case ('Basic'):
                setCardTypes(cardTypes => ({...cardTypes, basicLand : cardTypes.basicLand + 1}))
                break
            case ('Land'): 
                setCardTypes(cardTypes => ({...cardTypes, land : cardTypes.land + 1}))
                break
            case ('Creature'): 
                setCardTypes(cardTypes => ({...cardTypes, creature : cardTypes.creature + 1}))
                break
            case ('Instant'): 
                setCardTypes(cardTypes => ({...cardTypes, instant : cardTypes.instant + 1}))
                break
            case ('Sorcery'): 
                setCardTypes(cardTypes => ({...cardTypes, sorcery : cardTypes.sorcery + 1}))
                break
            case ('Enchantment'): 
                setCardTypes(cardTypes => ({...cardTypes, enchantment : cardTypes.enchantment + 1}))
                break
            case ('Artifact'): 
                setCardTypes(cardTypes => ({...cardTypes, artifact : cardTypes.artifact + 1}))
                break
            default: 
                setCardTypes(cardTypes => ({...cardTypes, other : cardTypes.other + 1}))
                break
        }

        let newCardColor  

        if (newCardType !== 'Land' && newCardType !== 'Basic') {
            if (currentCard.color_identity.length === 0 ) {
                newCardColor = 'colorless'
                setCardColors(cardColors => ({...cardColors, colorless : cardColors.colorless + 1}))
            } else if (currentCard.color_identity.length > 1 ) {
                newCardColor = 'multicolor'
                setCardColors(cardColors => ({...cardColors, multicolor : cardColors.multicolor + 1}))
            } else {
                let currentCardColor = currentCard.color_identity[0]
                switch(currentCardColor) {
                    case ('W'):
                        newCardColor = 'white'
                        setCardColors(cardColors => ({...cardColors, white : cardColors.white + 1}))
                        break;
                    case ('U'): 
                        newCardColor = 'blue'
                        setCardColors(cardColors => ({...cardColors, blue : cardColors.blue + 1}))
                        break; 
                    case ('G'): 
                        newCardColor = 'green'
                        setCardColors(cardColors => ({...cardColors, green : cardColors.green + 1}))
                        break;
                    case ('R'): 
                        newCardColor = 'red'
                        setCardColors(cardColors => ({...cardColors, red : cardColors.red + 1}))
                        break;
                    case ('B'): 
                        newCardColor = 'black'
                        setCardColors(cardColors => ({...cardColors, black : cardColors.black + 1}))
                        break;
                }
            }
        } else {

            if (currentCard.color_identity.length === 0 ) {
                newCardColor = 'colorless'
                setLandsColors(landsColors => ({...landsColors, colorless : landsColors.colorless + 1}))
            } else if (currentCard.color_identity.length > 1 ) {
                newCardColor = 'multicolor'
                setLandsColors(landsColors => ({...landsColors, multicolor : landsColors.multicolor + 1}))
            } else {
                let currentCardColor = currentCard.color_identity[0]
                switch(currentCardColor) {
                    case ('W'):
                        newCardColor = 'white'
                        setLandsColors(landsColors => ({...landsColors, white : landsColors.white + 1}))
                        break;
                    case ('U'): 
                        newCardColor = 'blue'
                        setLandsColors(landsColors => ({...landsColors, blue : landsColors.blue + 1}))
                        break; 
                    case ('G'): 
                        newCardColor = 'green'
                        setLandsColors(landsColors => ({...landsColors, green : landsColors.green + 1}))
                        break;
                    case ('R'): 
                        newCardColor = 'red'
                        setLandsColors(landsColors => ({...landsColors, red : landsColors.red + 1}))
                        break;
                    case ('B'): 
                        newCardColor = 'black'
                        setLandsColors(landsColors => ({...landsColors, black : landsColors.black + 1}))
                        break;
                }
            }
        }

        let newCardCmc = currentCard.cmc

        if (newCardType !== 'Land' && newCardType !== 'Basic') {
            switch (newCardCmc) {
                case (0):
                    setCardCosts(cardCosts => ({...cardCosts, c0 : cardCosts.c0 + 1}))
                    break;
                case (1):
                    setCardCosts(cardCosts => ({...cardCosts, c1 : cardCosts.c1 + 1}))
                    break;
                case (2):
                    setCardCosts(cardCosts => ({...cardCosts, c2 : cardCosts.c2 + 1}))
                    break;
                case (3):
                    setCardCosts(cardCosts => ({...cardCosts, c3 : cardCosts.c3 + 1}))
                    break;
                case (4):
                    setCardCosts(cardCosts => ({...cardCosts, c4 : cardCosts.c4 + 1}))
                    break;
                default:
                    setCardCosts(cardCosts => ({...cardCosts, c5 : cardCosts.c5 + 1}))
                    break;
            }
        }

        const newCardCost = parseFloat(currentCard.prices.eur)

        if (currentCard.prices.eur) {
            let auxSum = parseFloat(deckPrice) + parseFloat(newCardCost)
            setDeckPrice(auxSum)
        }

        const filter = cards.filter(card => card.cardId === currentCard.id)

        if (filter.length === 0) {
            
            let newCard = {
                cardId: currentCard.id,
                cardName: currentCard.name, 
                cardQuantity: 1, 
                legalities: {
                    standard: currentCard.legalities.standard,
                    commander: currentCard.legalities.commander, 
                    legacy: currentCard.legalities.legacy, 
                    pauper: currentCard.legalities.pauper
                },
                cmc: currentCard.cmc,
                cardType: newCardType,
                color: newCardColor,
                cardPrice: newCardCost
            }

            setCards([...cards, newCard])
        } else {
            let actualizedCards = cards.map((card) => {
                if (card.cardId === currentCard.id) {
                    card.cardQuantity = card.cardQuantity + 1
                    // return {cardId: card.cardId, cardName: card.cardName, cardQuantity: card.cardQuantity + 1}
                    return card
                } else {
                    return card
                }
            })
            setCards([...actualizedCards])
        }

    }

    const deleteCard = (deleteCard) => {

        console.log(deleteCard)

        let deleteCardId = deleteCard.cardId

        let deleteCardType = deleteCard.type

        switch (deleteCardType) {
            case ('Basic'):
                setCardTypes(cardTypes => ({...cardTypes, basicLand : cardTypes.basicLand - 1}))
                break
            case ('Land'): 
                setCardTypes(cardTypes => ({...cardTypes, land : cardTypes.land - 1}))
                break
            case ('Creature'): 
                setCardTypes(cardTypes => ({...cardTypes, creature : cardTypes.creature - 1}))
                break
            case ('Instant'): 
                setCardTypes(cardTypes => ({...cardTypes, instant : cardTypes.instant - 1}))
                break
            case ('Sorcery'): 
                setCardTypes(cardTypes => ({...cardTypes, sorcery : cardTypes.sorcery - 1}))
                break
            case ('Enchantment'): 
                setCardTypes(cardTypes => ({...cardTypes, enchantment : cardTypes.enchantment - 1}))
                break
            case ('Artifact'): 
                setCardTypes(cardTypes => ({...cardTypes, artifact : cardTypes.artifact - 1}))
                break
            default: 
                setCardTypes(cardTypes => ({...cardTypes, other : cardTypes.other - 1}))
                break
        }

        let newCardColor  

        if (deleteCardType !== 'Land' && deleteCardType !== 'Basic') {
            if (currentCard.color_identity.length === 0 ) {
                newCardColor = 'colorless'
                setCardColors(cardColors => ({...cardColors, colorless : cardColors.colorless - 1}))
            } else if (currentCard.color_identity.length > 1 ) {
                newCardColor = 'multicolor'
                setCardColors(cardColors => ({...cardColors, multicolor : cardColors.multicolor - 1}))
            } else {
                let currentCardColor = currentCard.color_identity[0]
                switch(currentCardColor) {
                    case ('W'):
                        newCardColor = 'white'
                        setCardColors(cardColors => ({...cardColors, white : cardColors.white - 1}))
                        break;
                    case ('U'): 
                        newCardColor = 'blue'
                        setCardColors(cardColors => ({...cardColors, blue : cardColors.blue - 1}))
                        break; 
                    case ('G'): 
                        newCardColor = 'green'
                        setCardColors(cardColors => ({...cardColors, green : cardColors.green - 1}))
                        break;
                    case ('R'): 
                        newCardColor = 'red'
                        setCardColors(cardColors => ({...cardColors, red : cardColors.red - 1}))
                        break;
                    case ('B'): 
                        newCardColor = 'black'
                        setCardColors(cardColors => ({...cardColors, black : cardColors.black - 1}))
                        break;
                }
            }
        } else {

            if (currentCard.color_identity.length === 0 ) {
                newCardColor = 'colorless'
                setLandsColors(landsColors => ({...landsColors, colorless : landsColors.colorless - 1}))
            } else if (currentCard.color_identity.length > 1 ) {
                newCardColor = 'multicolor'
                setLandsColors(landsColors => ({...landsColors, multicolor : landsColors.multicolor - 1}))
            } else {
                let currentCardColor = currentCard.color_identity[0]
                switch(currentCardColor) {
                    case ('W'):
                        newCardColor = 'white'
                        setLandsColors(landsColors => ({...landsColors, white : landsColors.white - 1}))
                        break;
                    case ('U'): 
                        newCardColor = 'blue'
                        setLandsColors(landsColors => ({...landsColors, blue : landsColors.blue - 1}))
                        break; 
                    case ('G'): 
                        newCardColor = 'green'
                        setLandsColors(landsColors => ({...landsColors, green : landsColors.green - 1}))
                        break;
                    case ('R'): 
                        newCardColor = 'red'
                        setLandsColors(landsColors => ({...landsColors, red : landsColors.red - 1}))
                        break;
                    case ('B'): 
                        newCardColor = 'black'
                        setLandsColors(landsColors => ({...landsColors, black : landsColors.black - 1}))
                        break;
                }
            }
        }


        if (deleteCardType !== 'Land' && deleteCardType !== 'Basic') {
            switch (deleteCard.cmc) {
                case (0):
                    setCardCosts(cardCosts => ({...cardCosts, c0 : cardCosts.c0 - 1}))
                    break;
                case (1):
                    setCardCosts(cardCosts => ({...cardCosts, c1 : cardCosts.c1 - 1}))
                    break;
                case (2):
                    setCardCosts(cardCosts => ({...cardCosts, c2 : cardCosts.c2 - 1}))
                    break;
                case (3):
                    setCardCosts(cardCosts => ({...cardCosts, c3 : cardCosts.c3 - 1}))
                    break;
                case (4):
                    setCardCosts(cardCosts => ({...cardCosts, c4 : cardCosts.c4 - 1}))
                    break;
                default:
                    setCardCosts(cardCosts => ({...cardCosts, c5 : cardCosts.c5 - 1}))
                    break;
            }
        }

        setDeckPrice(deckPrice - deleteCard.cardPrice)

        let actualizedCards = cards.map((card) => {
            if (card.cardId === deleteCardId) {
                if (card.cardQuantity !== 1) {
                    card.cardQuantity = card.cardQuantity - 1
                    return card
                }
            } else {
                return card
            }
        })

        setCards([...actualizedCards])

    }

    function saveDeck() {
        fetch("http://localhost:5300/deck/", {
            method: 'POST', 
            body: JSON.stringify({deck, editing}), // data can be `string` or {object}!
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => console.log(response))
    }

    return (  
        <div className="mainDeckCreatorDiv">
            <div className="mainCreationDiv">    
                <div className="titleAndLegality">
                    <button className="returnButton" onClick={() => {props.setCreating(false)}}>
                        <FontAwesomeIcon icon={faArrowLeft} className='colored'/>
                    </button>
                    <form onSubmit={handleSubmit}>
                        <label>Title: </label>
                        <input type="text" value={deckName} name="deckName" onChange={handleChange} className='inputName'></input>
                    </form>
                </div>            
                {cards.length !== 0? 
                    <div className="cardListDiv">
                        {cards.map((card) =>  
                            <div className="cardListMainDiv">
                                { card ? 
                                    <div className="cardListItem">
                                        <div className="cardContent">
                                            <div className="cardTitle">
                                                <div className="spanCard">{card.cardName}</div>
                                                <div className="cardType">{card.cardType}</div>
                                            </div>
                                            <div>x{card.cardQuantity}</div>
                                        </div>
                                        <button className="deleteCardButton" onClick={() => {deleteCard(card)}}>Delete card</button>
                                    </div>
                                : <></>
                                }
                            </div>
                            )}
                    </div> 
                : <></>
                }
                {cards.length !== 0 ? 
                    <div className="charts">
                        <DeckCreatorStatistics colors={cardColors} cardCosts={cardCosts} types={cardTypes} lands={landsColors}/>
                    </div>
                : <></>
                }
                <div className="priceAndSaveButton" >
                    <div className="price" hidden={cards.length === 0}>Price: {(deckPrice).toFixed(2)}€</div>
                    <button className="saveButton" onClick={() => {console.log(deck); saveDeck()}} hidden={cards.length === 0}>Save</button>
                </div>
            </div>
            <div className="cardFinderDiv">
                {currentCard? 
                    <div className="buttonDiv">
                        <button onClick={addCard} className='addButton'>Add One</button>
                    </div>
                    :<></>
                }
                <AutocompleteFinder setCard={setCurrentCard}/>
            </div>
        </div>
    );
}

/*

code for deck legalities

                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="legalityLabel">Legality</InputLabel>
                        <Select
                            labelId="deckLegality"
                            id="deckLegality"
                            value={deckLegality}
                            onChange={handleChange}
                            label="legality"
                            name="legality">
                            <MenuItem value={'standard'}>Standard</MenuItem>
                            <MenuItem value={'commander'}>Commander</MenuItem>
                            <MenuItem value={'legacy'}>Leacy</MenuItem>
                            <MenuItem value={'pauper'}>Pauper</MenuItem>
                        </Select>
                    </FormControl>

*/

export default DeckCreator;