import './App.css';
import NavBar from './Components/NavBar';
import RandomCard from './Components/RandomCard';
import {Route, Routes} from "react-router-dom";

function App() {
  return (
    <div className="mainDiv">
      <NavBar/>
      <Routes>
        <Route path='/random' element = {<RandomCard/>}/>
      </Routes>
    </div>
  );
}

export default App;
