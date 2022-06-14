import { useEffect, useState } from "react";
import '../../Css/Decks.css'
import ColorsChart from "../Charts/ColorsChart";
import DeckCreator from "./DeckCreator";
import DeckListComponent from "./DeckListComponent";
import DecksSidebar from "./DecksSidebar";

import { Link } from 'react-router-dom';

function Decks(props) {

    const [decksIds, setDecksIds] = useState([])
    const [decks, setDecks] = useState([])
    const [selectedDeck, setSelectedDeck] = useState({})
    const [creating, setCreating] = useState(false)
    const [mainMenu, setMainMenu] = useState(true)
    const [res, setRes] = useState()

    const login = props.login
    const addDeck = props.addDeck

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

        fetch("http://localhost:5300/deck/getByUser", {
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

        fetch("http://localhost:5300/deck/getOneFromId", {
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
                                            return <DeckListComponent deck={deck} setSelectedDeck={setSelectedDeck} selectedDeck={selectedDeck} key={deck._id}/>
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