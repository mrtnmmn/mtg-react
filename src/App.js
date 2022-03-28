import './App.css';
import NavBar from './Components/NavBar';
import RandomCard from './Components/RandomCard';
import CardFinder from './Components/CardFinder';

import {Route, Routes} from "react-router-dom";

function App() {
  return (
    <div className="mainDiv">
      <NavBar/>
      <Routes>
        <Route path='/random' element = {<RandomCard/>}/>
        <Route path='/finder' element = {<CardFinder/>}/>
      </Routes>
    </div>
  );
}

export default App;
