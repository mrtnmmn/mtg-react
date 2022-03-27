import logo from './logo.svg';
import './App.css';
import NavBar from './Components/NavBar';
import RandomCard from './Components/RandomCard';

function App() {
  return (
    <div className="mainDiv">
      <NavBar/>
      <RandomCard/>
    </div>
  );
}

export default App;
