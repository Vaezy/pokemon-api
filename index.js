import express from "express";
import morgan from "morgan";
import authMdlr from "./src/auth/auth.js";
import { initDb } from "./src/db/sequelize.js";
import { pokemonRoutes } from "./src/routes/pokemons-routes.js";
import { userRoutes } from "./src/routes/users-routes.js";

const app = express();
const port = 3000;

app.use(morgan("dev"));
app.use(express.json());

initDb();

userRoutes(app);
pokemonRoutes(app, authMdlr);

app.use(({ res }) => {
  const message = "Erreur. Essayez une autre URL.";
  res.status(404).json({ message });
});

app.listen(port, () =>
  console.log(`Application démarrée sur : http://localhost:${port}`),
);
