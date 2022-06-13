import '../../Css/Admin/PurchaseOrders.css'

import { useEffect, useState } from 'react';

function PurchaseOrders() {

    const [purchaseOrders, setPurchaseOrders] = useState([])
    const [selectedOrderDeck, setSelectedOrderDeck] = useState({})
    const [selectedOrderCard, setSelectedOrderCard] = useState({})
    const [selectedItem, setSelectedItem] = useState("nothing")

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

    function fetchDeck(id) {
        fetch("http://localhost:5300/deck/getOneFromId", {
            method: 'post', 
            body: JSON.stringify({_id: id}), 
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        //.then(response => console.log(response))
        .then(response => setSelectedOrderDeck(response.data))
        .then(setSelectedItem("deck"))
        .then(console.log(selectedOrderDeck))
    }

    function fetchCard(id) {
        console.log('fetchCard')
        fetch("http://localhost:5300/card/getOneFromId", {
            method: 'post', 
            body: JSON.stringify({_id: id}), 
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        //.then(response => console.log(response))
        .then(response => setSelectedOrderCard(response.data))
        .then(setSelectedItem("card"))
    }

    function divClicked(order) {
        setSelectedItem("nothing")
        setSelectedOrderDeck({})
        setSelectedOrderCard({})
        console.log('clicked')
        if (order.purchaseType === 'deck') {
            fetchDeck(order._id)
        }
        if (order.purchaseType === 'card') {
            fetchCard(order._id)
        }
    }

    useEffect(() => {
        fetchAll()
    }, [])

    return (  
        <div className='mainPurchaseOrders'>
            <div className='purchasesList'>
                {purchaseOrders.map((order) => {
                    return (
                        <div key={order._id} onClick={() => {divClicked(order)}}>
                            {order._id}
                        </div>
                    )
                })}
            </div>
            <div className='selectedPurchase'>
                <div>TITLE</div>
                <div>{selectedItem}</div>
                <div>
                    {selectedItem === "deck" ?
                        <div>
                            {selectedOrderDeck.deckName}
                        </div>
                        :
                        <></>
                    }
                </div>
                <div>
                    {selectedItem === "card" ?
                        <div>
                            {selectedOrderCard.cardName}
                        </div>
                        :
                        <></>
                    }
                </div>
                
            </div>

        </div>
    );
}

export default PurchaseOrders;