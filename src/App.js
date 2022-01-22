import './App.css';
import { BrowserRouter, Route, Routes, Switch } from "react-router-dom"
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import PokemonCreate from './components/PokemonCreate';
import Details from './components/Details';


function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/create" element={<PokemonCreate />} />
          <Route exact path="/pokemons/:id" element={<Details />} />
        </Routes>
        {/* <h1>Henry Pokemon</h1> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
