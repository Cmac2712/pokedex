import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Pokemon, PokemonResponse } from "../../App";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import { getPokemonDescription } from "../../utils";

interface Props {
  pokemon: PokemonResponse;
}

const PokemonSingle = ({ pokemon }: Props) => {
  const { name } = useParams<{ name: string }>();
  const url = pokemon?.results?.find((pokemon) => pokemon.name === name)?.url;
  const [pokemonData, setPokemonData] = useState<Pokemon>();

  useEffect(() => {
    const fetchPokemonData = async () => {
      if (!url) return;

      const response = await fetch(url);
      const data = await response.json();

      console.log(data);
      setPokemonData(data);
    };

    fetchPokemonData();
  }, []);

  return (
    <Container maxWidth="sm">
      <Link
        to={`/`}
        className="link-yellow"
        style={{
          margin: "0 0 1rem 0",
        }}
      >
        ← Back
      </Link>
      <Card variant="outlined" sx={{ padding: "2rem" }}>
        <h3 style={{ marginBottom: "1rem" }}>{pokemonData?.name}</h3>
        {getPokemonDescription(pokemonData).map((str) => (
          <p style={{ textAlign: "center", margin: "0" }}>{str}</p>
        ))}
        <img
          width="200"
          src={pokemonData?.sprites?.front_default}
          alt={pokemonData?.name}
          style={{
            display: "block",
            margin: "0 auto",
          }}
        />
        <div className="pokemon-info">
          <dl>
            <dt>Stats</dt>
            {pokemonData?.stats.map(({ base_stat, stat }) => (
              <dd
                key={stat.name}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                {stat.name.split("-").join(" ")}:{" "}
                <strong style={{ padding: "0 0 0 1rem" }}>{base_stat}</strong>
              </dd>
            ))}
          </dl>
          <dl>
            <dt>Abilities</dt>
            {pokemonData?.abilities.map(({ ability }) => (
              <dd key={ability.name}>{ability.name.split("-").join(" ")}</dd>
            ))}
          </dl>
          <dl>
            <dt>Moves</dt>
            {pokemonData?.moves.slice(0, 5).map(({ move }) => (
              <dd key={move.name}>{move.name.split("-").join(" ")}</dd>
            ))}
          </dl>
        </div>
      </Card>
    </Container>
  );
};

export { PokemonSingle };
