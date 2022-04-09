import './App.css';
import NavBar from './Components/NavBar';
import RandomCard from './Components/RandomCard';
import CardFinder from './Components/CardFinder';

import {Route, Routes} from "react-router-dom";
import MainPage from './Components/MainPages';
import Decks from './Components/Decks';
import Login from './Components/Login';
import Register from './Components/Register';

function App() {
  return (
    <div className="mainDiv">
      <NavBar/>
      <Routes>
        <Route path='/' element={<MainPage/>}/>
        <Route path='/random' element = {<RandomCard/>}/>
        <Route path='/finder' element = {<CardFinder/>}/>
        <Route path='/decks' element = {<Decks/>}/>
        <Route path='/login' element = {<Login/>}/>
        <Route path='/register' element = {<Register/>}/>
      </Routes>
    </div>
  );
}

export default App;
