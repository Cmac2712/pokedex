import { useState } from "react";
import { Link } from "react-router-dom";
import { PokemonResponse } from "../../App";

interface Props {
  pokemon: PokemonResponse;
}

const PokemonList = ({ pokemon }: Props) => {
  const [search, setSearch] = useState("");
  const pokemonList = pokemon?.results.filter(({ name }) =>
    name.includes(search)
  );

  return (
    <div className="app">
      <>
        <input type="text" onChange={(e) => setSearch(e.target.value)} />

        {search && <p>Search: {search}</p>}
        {pokemonList.map(({ url, name }) => {
          if (name.includes(search)) {
            return (
              <ul key={`pokemon-${name}`} className="list-unstyled">
                <li>
                  <Link to={`/pokemon/${name}`}>{name}</Link>
                </li>
              </ul>
            );
          }
        })}
      </>
    </div>
  );
};

export { PokemonList };
