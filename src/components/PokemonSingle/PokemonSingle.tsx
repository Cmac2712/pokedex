import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Pokemon, PokemonResponse } from "../../App";

interface Props {
  pokemon: PokemonResponse;
}

const PokemonSingle = ({ pokemon }: Props) => {
  const { name } = useParams<{ name: string }>();
  const url = pokemon?.results?.find((pokemon) => pokemon.name === name)?.url;
  const [pokemonData, setPokemonData] = useState<Pokemon>();

  useEffect(() => {
    console.log("single component mounted");
    const fetchPokemonData = async () => {
      if (!url) return;

      const response = await fetch(url);
      const data = await response.json();

      setPokemonData(data);
    };

    fetchPokemonData();
  }, []);

  return (
    <div>
      <h3>{pokemonData?.name}</h3>
      <img src={pokemonData?.sprites?.front_default} alt={pokemonData?.name} />
      <h4>Stats</h4>
      <ul>
        {/* STATS */}
        {pokemonData?.stats.map(({ base_stat, stat }) => (
          <li key={stat.name}>
            {stat.name}: {base_stat}
          </li>
        ))}
      </ul>
      <h4>Abilities</h4>
      <ul>
        {/* ABILITIES */}
        {pokemonData?.abilities.map(({ ability }) => (
          <li key={ability.name}>{ability.name}</li>
        ))}
      </ul>
    </div>
  );
};

export { PokemonSingle };
