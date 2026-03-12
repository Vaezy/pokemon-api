import bcrypt from "bcrypt";
import { DataTypes, Sequelize } from "sequelize";
import pokemonModel from "../models/pokemon.js";
import userModel from "../models/user.js";
import pokemonsMock from "./mock-pokemon.js";

const sequelize = new Sequelize("pokedex", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

const Pokemon = pokemonModel(sequelize, DataTypes);
const User = userModel(sequelize, DataTypes);

const initDb = () => {
  return sequelize.sync({ force: true }).then((_) => {
    pokemonsMock.map((pokemon) => {
      Pokemon.create({
        name: pokemon.name,
        hp: pokemon.hp,
        cp: pokemon.cp,
        picture: pokemon.picture,
        types: pokemon.types,
      });
    });

    bcrypt.hash("pikachu", 10).then((hash) => {
      User.create({ username: "pikachu", password: hash });
    });
    console.log("La base de données a bien été initialisée avec succès !");
  });
};

export { initDb, Pokemon, User };
