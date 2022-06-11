import "./App.css"
import NavBar from "./Components/NavBar"
import RandomCard from "./Components/RandomCard"
import CardFinder from "./Components/CardFinder"

import { Route, Routes } from "react-router-dom"
import MainPage from "./Components/MainPages"
import Decks from "./Components/Decks/Decks"
import Login from "./Components/Login"
import Register from "./Components/Register"
import DeckCreator from "./Components/Decks/DeckCreator"
import ShopingCart from "./Components/ShoppingCart/ShopingCart"

import useLogin from "./Components/Hooks/useLogin"
import useShoppingList from "./Components/Hooks/useShoppingList"

function App() {
  const [login, isAdmin, setFalse, setTrue, setAdminFalse, setAdminTrue] = useLogin()
  const [decks, cards, addDeck, deleteDeck, addCard, deleteCard] = useShoppingList()

  return (
    <div className="mainDiv">
      <NavBar login={login} admin={isAdmin} setFalse={setFalse} setAdminFalse={setAdminFalse}/>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/random" element={<RandomCard addCard={addCard}/>} />
        <Route path="/finder" element={<CardFinder addCard={addCard} />} />
        <Route path="/decks" element={<Decks login={login}  addDeck={addDeck}/>} />
        <Route path="/login" element={<Login login={login} setTrue={setTrue} setAdminTrue={setAdminTrue} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/deckCreator" element={<DeckCreator />} />
        <Route path="/shoppingCart" element={<ShopingCart decks={decks} cards={cards} deleteDeck={deleteDeck} deleteCard={deleteCard} />} /> 
      </Routes>
    </div>
  )
}

export default App
