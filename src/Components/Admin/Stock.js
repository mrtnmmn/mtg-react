import { useEffect, useState } from 'react';
import '../../Css/Admin/Stock.css'
import CustomButton from '../CustomButton';

function Stock() {

    const [cards, setCards] = useState([]) 
    const [displayCards, setDisplayCards] = useState([])
    const [filterName, setFilterName] = useState("")
    const [filterPrice, setFilterPrice] = useState(0)

    function fetchAll() {
        fetch("http://localhost:5300/card/", {
            method: 'get', 
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => setCards([...response.data]))
    }

    useEffect(() => {
        fetchAll()
    }, [])

    useEffect(() => {
        setDisplayCards([...cards])
    }, [cards])

    function applyFilters() {

        let newCards = cards.filter((card) => {
            if (filterName.length !== 0) {
                console.log(card)
                if (card.cardName === filterName) {
                    return card
                }
            } else {
                return card
            }
        })

        console.log(newCards)

        newCards = newCards.filter((card) => {
            if (card.cardPrice < filterPrice) {
                return card
            }
        })

        setDisplayCards([...newCards])

    }

    let handleSubmit = async (e) => {

        e.preventDefault();

    }

    let handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "filterName") setFilterName(value);
        if (name === "filterPrice") setFilterPrice(value)
    }

    function addOne(cardId) {
        fetch("http://localhost:5300/card/addOne", {
            method: 'post', 
            body: JSON.stringify({_id: cardId}), 
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (res.status === 200) {
                console.log('correct')
                let updatedCards = cards.filter((card) => {
                    if (card._id === cardId) {
                        let newCard = card
                        newCard.cardQuantity = card.cardQuantity + 1
                        return newCard
                    } else {
                        return card
                    }
                })
                setCards([...updatedCards])
            }
        })
        .catch(error => console.error('Error:', error))
        
    }

    function subtractOne(cardId) {
        fetch("http://localhost:5300/card/subtractOne", {
            method: 'post', 
            body: JSON.stringify({_id: cardId}), 
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (res.status === 200) {
                console.log('correct')
                let updatedCards = cards.filter((card) => {
                    if (card._id === cardId) {
                        let newCard = card
                        newCard.cardQuantity = card.cardQuantity - 1
                        return newCard
                    } else {
                        return card
                    }
                })
                setCards([...updatedCards])
            }
        })
        .catch(error => console.error('Error:', error))
    }


    return (  
        <div className="stockMainDiv">

            <div className='cardsDiv'>
                {displayCards.length !== 0 ?
                <div className='displayCards'>
                    {displayCards.map((card) => {
                        return (
                            <div className='individualCard'>
                                <div className='cardInfo'>                            
                                    <div className='cardName'>{card.cardName}</div>
                                    <div className='cardQuantity'>Quantity: {card.cardQuantity}</div>
                                    <div className='cardPrice'>Price: {card.cardPrice}€</div>
                                </div>
                                <div className='cardButtons'>
                                    <CustomButton class={"green"} text={"Add One"} buttonFunction={() => {addOne(card._id)}}></CustomButton>
                                    <CustomButton class={"red"} text={"Subtract One"} buttonFunction={() => {subtractOne(card._id)}}></CustomButton>
                                </div>
                            </div>
                        )
                    })}
                </div>
                :
                <div className='zeroMatches'>No cards match</div>
                }

            </div>

            <form onSubmit={handleSubmit} className='filtersDiv'>
                <h1>Filters: </h1>
                <div>
                    <label>Name: </label>
                    <input type="text" value={filterName} name="filterName" onChange={handleChange} />
                </div>
                <div>
                    <label>Max price: </label>
                    <input type="text" value={filterPrice} name="filterPrice" onChange={handleChange} />            
                </div>
                <div className='filtersButtonsDiv'>
                    <CustomButton class={"green"} text={"Apply filters"} buttonFunction={applyFilters} />
                    <CustomButton class={"red"} text={"Delete Filters"} buttonFunction={() => {setDisplayCards([...cards]); setFilterName(""); setFilterPrice(0)}} />
                </div>
            </form>
        </div>
    );
}

export default Stock;