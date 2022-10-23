import { useState, useEffect, SetStateAction } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import { PokemonSingle } from "./components/PokemonSingle";
import { PokemonList } from "./components/PokemonList";

type PokemonStat = {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
};

type PokemonMove = {
  move: {
    name: string;
  };
};

type PokemonAbility = {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
};

export interface Pokemon {
  name: string;
  url: string;
  sprites: {
    front_default: string;
  };
  species: {
    name: string;
  };
  stats: PokemonStat[];
  abilities: PokemonAbility[];
  moves: PokemonMove[];
}

export interface PokemonResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pick<Pokemon, "name" | "url">[];
}

function App() {
  const [pokemon, setPokemon] = useState<PokemonResponse>();

  // Get pokemon data from API
  useEffect(() => {
    const fetchPokemon = async () => {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=1154"
      );
      const data = await response.json();

      setPokemon(data);
    };

    fetchPokemon();
  }, []);

  return (
    <Router>
      <h1>Pokedex</h1>
      <Routes>
        {pokemon && (
          <>
            <Route
              path="/pokemon/:name"
              element={<PokemonSingle pokemon={pokemon} />}
            />
            <Route path="/" element={<PokemonList pokemon={pokemon} />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
