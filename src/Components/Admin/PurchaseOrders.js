import '../../Css/Admin/PurchaseOrders.css'

import { useEffect, useState } from 'react';
import CustomButton from '../CustomButton';
import Card from '../Card';

function PurchaseOrders() {

    const [purchaseOrders, setPurchaseOrders] = useState([])
    const [selectedItem, setSelectedItem] = useState({})
    const [selectedItemDecks, setSelectedItemDecks] = useState([])
    const [selectedItemCards, setSelectedItemCards] = useState([])
    const [selectedCard, setSelectedCard] = useState({})
    const [stock, setStock] = useState(false)

    const apiFindByName = 'https://api.scryfall.com/cards/named?fuzzy='

    function fetchAll() {
        fetch("http://localhost:5300/purchaseOrders/", {
            method: 'get', 
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => setPurchaseOrders([...response.data]))
    }

    function fetchAllDecksAndCardsFromOrder(order) {

        let arr = []

        if (order && order.deckIds) {
            if (order.deckIds.length !== 0) {
                for (const deck of order.deckIds) {
                    fetch("http://localhost:5300/deck/getOneFromId", {
                        method: 'post', 
                        body: JSON.stringify({_id: deck}), 
                        headers:{
                            'Content-Type': 'application/json'
                        }
                    }).then(res => res.json())
                    .catch(error => console.error('Error:', error))
                    //.then(response => console.log(response.data))
                    .then(response => setSelectedItemDecks([...selectedItemDecks, response.data]))
                }
            }
        }

        if (order && order.cardIds) {
            if (order.cardIds.length !== 0) {
                for (const card of order.cardIds) {
                    fetch("https://api.scryfall.com/cards/" + card)
                    .then((res) => res.json())
                    //.then((response) => console.log(response))
                    .then((response) => setSelectedItemCards([...selectedItemCards, response]))
                    .then(console.log(selectedItemCards))

                    /*
                    fetch("http://localhost:5300/card/getOneFromId", {
                        method: 'post', 
                        body: JSON.stringify({_id: card}), 
                        headers:{
                            'Content-Type': 'application/json'
                        }
                    }).then(res => res.json())
                    .catch(error => console.error('Error:', error))
                    .then(response => setSelectedItemCards([...selectedItemCards, response.data]))
                    */
                }
            }
        }

    }

    function divClicked(order) {
        setSelectedItemDecks([])
        setSelectedItemCards([])
        setSelectedCard([])
        setSelectedItem(order)
        checkStockItem(order)
    }

    function selectCard(cardName) {

        fetch(apiFindByName + cardName)
        .then((res) => res.json())
        .then((data) => setSelectedCard(data))
    
    }

    function submitOrder() {
        fetch("http://localhost:5300/purchaseOrders/", {
            method: 'delete', 
            body: JSON.stringify({_id: selectedItem._id}), 
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))

    }

    function checkStockItem(order) {
        fetch("http://localhost:5300/purchaseOrders/checkStock", {
            method: 'post', 
            body: JSON.stringify({_id: order._id}), 
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => setStock(response.data))
        .then(console.log(stock))
    }

    useEffect(() => {
        fetchAll()
    }, [])

    useEffect(() =>  {
        fetchAllDecksAndCardsFromOrder(selectedItem)
    }, [selectedItem])

    return (  
        <div className='mainPurchaseOrders'>
            <div className='purchasesList'>
                {purchaseOrders.map((order) => {
                    return (
                        <div key={order._id} onClick={() => {divClicked(order); console.log(order)}}>
                            Purchase Id: {order._id}
                        </div>

                    )
                })}
            </div>
            <div className='selectedPurchase'>
                {
                    selectedItem._id  ?
                        <div className='centerItems'>
                            <div className='purchaseId'>
                                Purchase Id: {selectedItem._id}
                            </div>
                            {selectedItemDecks.length !== 0 ?
                                <div className='selectedItemDecks'>
                                    <div className='sectionTitle'>Decks: </div>
                                    {selectedItemDecks.map((deck) => {
                                        return <div className='purchaseOrderDeck'>
                                            <div className='purchaseOrderDeckName'>Deck name: {deck.deckName}</div>
                                            <div>{deck.cards.map((card) => {
                                                return (
                                                    <div className='selectedDeckCardListItem' onClick={() => {selectCard(card.cardName)}}>
                                                        {card.cardName}
                                                        <div>x{card.cardQuantity}</div>
                                                    </div>
                                                )
                                            })}</div>
                                        </div>
                                    })}
                                </div>
                            : 
                                <></>
                            }
                            {selectedItemCards.length !== 0 ? 
                                <div className='selectedItemDecks'>
                                    <div className='sectionTitle'>Cards: </div>
                                    {selectedItemCards.map((card) => {
                                        return <div className='selectedItemCardList' onClick={() => {selectCard(card.name)}}>
                                            <div>{card.name}</div>
                                        </div>
                                    })}
                                </div>
                            : 
                                <></>
                            }
                            {selectedCard.id ? 
                                <div className='cardSelectedFullInfo'>
                                    <Card card={selectedCard}></Card>
                                </div>
                            :
                                <></>
                            }
                            {stock ?
                                <div className='submitButtonDiv'>
                                    <CustomButton class={"green"} text={"Submit order"} buttonFunction={submitOrder} />
                                </div>
                            :
                                <div className='sectionTitle'>Not enougth stock to submit</div>
                            }
                        </div>
                    :
                    <div className='noSelectedOrder'>
                        No order has been selected
                    </div>
                }

            </div>

        </div>
    );
}

export default PurchaseOrders;