const express = require("express");
const app = express();
const pokemons = require("./mock-pokemon");

const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Application web Pokémon");
});

app.get("/api/pokemon", (req, res) => {
  res.send(pokemons);
});

app.get("/api/pokemon/:id", (req, res) => {
  let id = parseInt(req.params.id);
  const pokemon = pokemons.find((pokemon) => pokemon.id === id);
  res.send(`Vous avez demandé le Pokémon ${pokemon.name}`);
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
