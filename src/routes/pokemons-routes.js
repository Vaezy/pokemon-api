import { Pokemon } from "../db/sequelize.js";

export const pokemonRoutes = (app, authMdlr) => {
  // Obtenir tous les pokémons
  app.get("/api/pokemons", authMdlr, (req, res) => {
    Pokemon.findAll()
      .then((pokemons) =>
        res.json({ message: "La liste a bien été récupérée.", data: pokemons }),
      )
      .catch((error) =>
        res.status(500).json({ message: "Erreur serveur.", data: error }),
      );
  });

  // Obtenir un pokémon par ID
  app.get("/api/pokemons/:id", authMdlr, (req, res) => {
    Pokemon.findByPk(req.params.id)
      .then((pokemon) => {
        if (pokemon === null)
          return res
            .status(404)
            .json({ message: "Aucun pokémon trouvé avec cet ID." });
        res.json({ message: "Pokémon trouvé.", data: pokemon });
      })
      .catch((error) =>
        res.status(500).json({ message: "Erreur serveur.", data: error }),
      );
  });

  // Créer un pokémon
  app.post("/api/pokemons", authMdlr, (req, res) => {
    Pokemon.create(req.body)
      .then((pokemon) =>
        res.json({
          message: `Le pokémon ${pokemon.name} a été créé.`,
          data: pokemon,
        }),
      )
      .catch((error) => {
        if (
          error.name === "SequelizeValidationError" ||
          error.name === "SequelizeUniqueConstraintError"
        ) {
          return res.status(400).json({ message: error.message, data: error });
        }
        res.status(500).json({ message: "Erreur serveur.", data: error });
      });
  });

  // Modifier un pokémon
  app.put("/api/pokemons/:id", authMdlr, (req, res) => {
    Pokemon.update(req.body, { where: { id: req.params.id } })
      .then((_) => {
        return Pokemon.findByPk(req.params.id).then((pokemon) => {
          if (pokemon === null)
            return res
              .status(404)
              .json({ message: "Aucun pokémon trouvé avec cet ID." });
          res.json({
            message: `Le pokémon ${pokemon.name} a été modifié.`,
            data: pokemon,
          });
        });
      })
      .catch((error) => {
        if (error.name === "SequelizeValidationError")
          return res.status(400).json({ message: error.message, data: error });
        res.status(500).json({ message: "Erreur serveur.", data: error });
      });
  });

  // Supprimer un pokémon
  app.delete("/api/pokemons/:id", authMdlr, (req, res) => {
    Pokemon.findByPk(req.params.id)
      .then((pokemon) => {
        if (pokemon === null)
          return res
            .status(404)
            .json({ message: "Aucun pokémon trouvé avec cet ID." });
        const pokemonDeleted = pokemon;
        return Pokemon.destroy({ where: { id: pokemon.id } }).then((_) =>
          res.json({
            message: `Le pokémon ${pokemonDeleted.name} a été supprimé.`,
            data: pokemonDeleted,
          }),
        );
      })
      .catch((error) =>
        res.status(500).json({ message: "Erreur serveur.", data: error }),
      );
  });
};
