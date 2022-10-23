import { useState } from "react";
import { Link } from "react-router-dom";
import { PokemonResponse } from "../../App";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import TextField from "@mui/material/TextField";
import { capitalize } from "../../utils";

interface Props {
  pokemon: PokemonResponse;
}

const PokemonList = ({ pokemon }: Props) => {
  const [search, setSearch] = useState("");
  const pokemonList = pokemon?.results.filter(({ name }) =>
    name.includes(search)
  );

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          bgcolor: "background.paper",
          padding: "1rem",
        }}
      >
        <TextField
          id="search"
          label="Search&hellip;"
          variant="outlined"
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            margin: "none",
          }}
          fullWidth
        />
      </Box>
      <Box
        sx={{
          width: "100%",
          padding: "0 0 0 0",
          bgcolor: "background.paper",
        }}
      >
        <div className="app">
          {search && (
            <p className="search-term">
              Search: <strong>{search}</strong>
            </p>
          )}
          {pokemonList.map(({ url, name }) => {
            if (name.includes(search)) {
              return (
                <List key={`pokemon-${name}`}>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <Link to={`/pokemon/${name}`}>{capitalize(name)}</Link>
                    </ListItemButton>
                  </ListItem>
                </List>
              );
            }
          })}
        </div>
      </Box>
    </Container>
  );
};

export { PokemonList };
