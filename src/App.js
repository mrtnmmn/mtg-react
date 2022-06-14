import { Route, Routes } from "react-router-dom"

import NavBar from "./Components/NavBar"
import RandomCard from "./Components/RandomCard"
import CardFinder from "./Components/CardFinder"
import MainPage from "./Components/MainPages"
import Decks from "./Components/Decks/Decks"
import Login from "./Components/Login"
import Register from "./Components/Register"
import DeckCreator from "./Components/Decks/DeckCreator"
import ShopingCart from "./Components/ShoppingCart/ShopingCart"
import Stock from "./Components/Admin/Stock"
import useLogin from "./Components/Hooks/useLogin"
import useShoppingList from "./Components/Hooks/useShoppingList"
import PurchaseOrders from "./Components/Admin/PurchaseOrders"

import "./App.css"


function App() {
  const [login, isAdmin, setFalse, setTrue, setAdminFalse, setAdminTrue] = useLogin()
  const [decks, cards, addDeck, deleteDeck, addCard, deleteCard, deleteAll] = useShoppingList()

  return (
    <div className="mainDiv">
      <NavBar login={login} admin={isAdmin} setFalse={setFalse} setAdminFalse={setAdminFalse} deleteAll={deleteAll}/>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/random" element={<RandomCard addCard={addCard} isAdmin={isAdmin} />} />
        <Route path="/finder" element={<CardFinder addCard={addCard} isAdmin={isAdmin}/>} />
        <Route path="/decks" element={<Decks login={login}  addDeck={addDeck} />} />
        <Route path="/login" element={<Login login={login} setTrue={setTrue} setAdminTrue={setAdminTrue} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/deckCreator" element={<DeckCreator />} />
        <Route path="/shoppingCart" element={<ShopingCart decks={decks} cards={cards} deleteDeck={deleteDeck} deleteCard={deleteCard} deleteAll={deleteAll}/>} /> 
        <Route path="/stock" element={<Stock admin={isAdmin}/>} />
        <Route path="/purchaseOrders" element={<PurchaseOrders admin={isAdmin}/>} />
      </Routes>
    </div>
  )
}

export default App
