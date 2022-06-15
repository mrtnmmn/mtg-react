import { useEffect, useState } from "react";

function useShoppingList() {

    const [decks, setDecks] = useState([])
    const [cards, setCards] = useState([])

    const addCard = (card) => {
        
        setCards([...cards, card])
    }

    const deleteCard = (cardId) => {
        
        let newCards = cards.filter((card) => {
            return (card.id !== cardId)
        })

        setCards([...newCards])
        
    }

    const addDeck = (deck) => {
        setDecks([...decks, deck])
    }

    const deleteDeck = (deckId) => {
        
        let newDecks = decks.filter((deck) => {
            return (deck._id !== deckId)
        })

        setDecks([...newDecks])
        
    }

    const deleteAll = () => {
        setCards([])
        setDecks([])
    }

    return [decks, cards, addDeck, deleteDeck, addCard, deleteCard, deleteAll]
}

export default useShoppingList;