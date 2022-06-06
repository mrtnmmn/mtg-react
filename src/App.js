import './App.css';
import NavBar from './Components/NavBar';
import RandomCard from './Components/RandomCard';
import CardFinder from './Components/CardFinder';

import {Route, Routes} from "react-router-dom";
import MainPage from './Components/MainPages';
import Decks from './Components/Decks/Decks';
import Login from './Components/Login';
import Register from './Components/Register';
import DeckCreator from './Components/Decks/DeckCreator';
import { useState } from 'react';

import useLogin from './Components/Hooks/useLogin'

function App() {
  
  const [login, setFalse, setTrue] = useLogin() 

  return (
    <div className="mainDiv">
      <NavBar login={login} setFalse={setFalse}/>
      <Routes>
        <Route path='/' element={<MainPage/>}/>
        <Route path='/random' element = {<RandomCard />}/>
        <Route path='/finder' element = {<CardFinder/>}/>
        <Route path='/decks' element = {<Decks/>}/>
        <Route path='/login' element = {<Login login={login} setTrue={setTrue}/>}/>
        <Route path='/register' element = {<Register/>}/>
        <Route path='/deckCreator' element = {<DeckCreator/>}/>
      </Routes>
    </div>
  );
}

export default App;
