import { useEffect, useState } from "react";

function Decks() {

    const [logged, setLogged] = useState(false)
    const [decks, setDecks] = useState([])
    const [res, setRes] = useState()

    useEffect(() => {
        setLogged(true)
        fetchApi()
    })

    function fetchApi() {

        fetch('http://localhost:8080/test01/prueba')
        .then((res) => res.json())
        .then((data) => setRes(data.data))

    }

    return (  
        
        <div>
            {logged? 
                <div>
                    {res}
                </div>
                :
                <div>To create decks, log in</div>
            }
        </div>
    );
}

export default Decks;