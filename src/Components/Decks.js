import { useEffect, useState } from "react";
import '../Css/Decks.css'

function Decks() {

    const [logged, setLogged] = useState(false)
    const [decks, setDecks] = useState(['name0'])
    const [res, setRes] = useState()

    useEffect(() => {

        if(sessionStorage.getItem('token')) {
            console.log('token')
            setLogged(true)
        }

        fetchApi()
        setDecks([...decks, 'Name1'])
        setDecks([...decks, 'Name2'])

        console.log(decks)
    }, [])

    function fetchApi() {


    }


    return (  
        
        <div>
            {logged? 
                <div>
                    Logged

                    {decks.map((name) => 
                        <div className="deckDivInDecksList" key={name}>
                            {name} 
                        </div>
                    )}
                    {res}
                </div>
                :
                <div className="unsignedDiv">
                    <h1 className="logInTitle">To create decks, log in</h1>
                </div>
            }
        </div>
    );
}

export default Decks;