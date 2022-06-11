import { useEffect, useState } from 'react'
import '../../Css/ShoppingCart/ShopingCart.css'

function ShopingCart(props) {

    const decks = props.decks
    const cards = props.cards
    const deleteCard = props.deleteCard
    const deleteDeck = props.deleteDeck

    const [decksLength, setDecksLength] = useState()
    const [cardsLength, setCardsLength] = useState()
    const [totalDecksPrice, setTotalDecksPrice] = useState(0)
    const [totalCardsPrice, setTotalCardsPrice] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)

    useEffect(() => {
        console.log(decks)
        setCardsLength(cards.length)
        setDecksLength(decks.length)
        getCardPrices()
        getDeckPrices()
    }, [])

    useEffect(() => {
        setDecksLength(decks.length)
    }, [decks])

    useEffect(() => {
        setCardsLength(cards.length)
        getCardPrices()
    }, [cards])

    useEffect(() => {
        setTotalPrice(totalCardsPrice + totalDecksPrice)
    }, [totalCardsPrice, totalDecksPrice])

    function getCardPrices() {
        let auxPrice = 0

        cards.forEach(card => {
            if (card.prices.eur) {
                auxPrice += parseFloat(card.prices.eur)
            }
        });

        setTotalCardsPrice(auxPrice)
    }

    function getDeckPrices() {
        let auxPriceDeck = 0

        decks.forEach(deck => {
            if(deck.deckPrice) {
                auxPriceDeck += parseFloat(deck.deckPrice)
            }
        })

        setTotalDecksPrice(auxPriceDeck)
    }

    return (  
        <div className="mainShoppingCartDiv">
            { cardsLength === 0 && decksLength === 0 ? 
                <div className="emptyCart">
                    Wow, this is so empty! Go buy something!
                </div>
                :
                <div className='fullCart'>
                    
                    {decksLength !== 0 ? 
                        <div className='sectionCart'>
                            <p className='sectionTitle'>Decks: </p> 
                            <div className='mapDiv'>
                                {decks.map((deck) => {
                                    return (<div key={deck._id} className='deckDivShoppingCart'>
                                        <div className='itemInfo'>
                                            <div className='deckNameClass'>{deck.deckName}</div>
                                            <div className='numberOfCards'>Number of cards: {deck.cards.length}</div>
                                            <div className='deckPrice'>Price: {deck.deckPrice}€</div>
                                        </div>
                                        <button className='deleteButton' onClick={() => {deleteDeck(deck._id)}}>Delete</button>
                                    </div>)
                                })}
                            </div>
                            <div className='priceTotal'>Total deck price: {totalDecksPrice}€</div>
                        </div>
                        : 
                        <></>
                    }
                    {cardsLength !== 0 ? 
                        <div className='sectionCart'>
                            <p className='sectionTitle'>Cards: </p> 
                            <div className='mapDiv'>
                                {cards.map((card) => {
                                    return(<div key={card.id} className='deckDivShoppingCart'>
                                        <div className='itemInfo'>
                                            <div className='deckNameClass'>{card.name}</div>
                                            {card.prices.eur && <div className='deckPrice'>Price: {card.prices.eur}€</div>}
                                        </div>
                                        <button className='deleteButton' onClick={() => {deleteCard(card.id)}}>Delete</button>
                                    </div>)
                                })}
                            </div>
                            <div className='priceTotal'>Total cards price: {totalCardsPrice.toFixed(2)}€</div>
                        </div>
                        : 
                        <></>               
                    }
                    
                    <div className='purchaseButtonContainer'>
                        <div className='grandTotal'>Grand total: {totalPrice}€</div>
                        <button onClick={() => {console.log(parseFloat(totalDecksPrice) + totalCardsPrice.toFixed(2))}} className='purchaseButton'>Purchase</button>
                    </div>

                </div>

            }
        </div>
    );
}

export default ShopingCart;