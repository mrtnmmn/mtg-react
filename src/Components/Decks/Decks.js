import { useEffect, useState } from "react";
import '../../Css/Decks.css'
import DeckCreator from "./DeckCreator";
import DeckListComponent from "./DeckListComponent";
import DecksSidebar from "./DecksSidebar";
import Card from '../Card'

import { Link } from 'react-router-dom';


function Decks(props) {

    const [decksIds, setDecksIds] = useState([])
    const [decks, setDecks] = useState([])
    const [selectedDeck, setSelectedDeck] = useState({})
    const [creating, setCreating] = useState(false)
    const [mainMenu, setMainMenu] = useState(true)
    const [res, setRes] = useState()
    const [selectedCard, setSelectedCard] = useState()

    const login = props.login
    const addDeck = props.addDeck
    const isAdmin = props.admin
    const addCard = props.addCard

    useEffect(() => {

        fetchUserDecks()
    }, [])

    useEffect(() => {

        if (creating) {
            setMainMenu(false)
        } else {
            setMainMenu(true)
        }

    }, [creating])

    useEffect(() => {

        decksIds.forEach(element => {
            fetchDeck(element)
        });

    }, [decksIds])

    function getDecks() {
        decksIds.forEach(element => {
            fetchDeck(element)
        });
    }

    function fetchUserDecks() {

        fetch("https://magikatg.herokuapp.com/deck/getByUser", {
            method: 'POST', 
            body: JSON.stringify({_id: sessionStorage.getItem("userId")}), // data can be `string` or {object}!
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        //.then(response => console.log(response))
        .then(response => setDecks([...decksIds, ...response.data]))

    }

    function fetchDeck(deckId) {

        fetch("https://magikatg.herokuapp.com/deck/getOneFromId", {
            method: 'POST', 
            body: JSON.stringify({_id: deckId}), // data can be `string` or {object}!
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => setDecks([...decks, response.data]))

    }

    function deletedOne(id) {
        let newDecks = decks.filter((deck) => {
            return (deck._id !== id)
        })

        setDecks([...newDecks])

    }

    useEffect(() => {
        console.log(selectedCard)
    }, [selectedCard])

    return (  
        
        <div>
            {login? 
                <div>
                    {mainMenu?
                    <div className="loggedMainDiv">
                        {decks.length !== 0 ?
                            <div className="decksListDiv">
                                {decks.map((deck) => {
                                        if (deck._id){ 
                                            return <DeckListComponent deck={deck} setSelectedDeck={setSelectedDeck} selectedDeck={selectedDeck} setSelectedCard={setSelectedCard} key={deck._id}/>
                                        }
                                    }
                                    //<div className="deckDivInDecksList" key={deck._id} onClick={() => setSelectedDeck(deck)}>
                                    //    {deck.deckName} 
                                    //</div>
                                )}
                            </div>
                        :
                            <div className="noDecksMessage">You don't have decks</div>
                        }

                        <div className="decksSidebar">
                            <DecksSidebar deck={selectedDeck} setSelectedDeck={setSelectedDeck} setCreating={setCreating} deletedOne={deletedOne} addDeck={addDeck}/>
                            { selectedCard ?
                                <Card card={selectedCard} isAdmin={isAdmin} addCard={addCard} />
                            :
                                <></>
                            }
                        </div>
                    </div>
                    :<></>
                    }
                    {creating?
                    <DeckCreator deck={selectedDeck}/>
                    : <></>
                    }
                </div>
                :
                <div className="unsignedDiv">
                    <h1 className="logInTitle">
                        <Link to="/login">
                            To create decks, log in
                        </Link>
                    </h1>
                </div>
            }
        </div>
    );
}

export default Decks;