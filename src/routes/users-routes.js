import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { private_key } from "../auth/private_key.js";
import { User } from "../db/sequelize.js";

export const userRoutes = (app) => {
  app.post("/api/login", (req, res) => {
    User.findOne({ where: { username: req.body.username } })
      .then((user) => {
        if (!user)
          return res
            .status(404)
            .json({ message: "L'utilisateur demandé n'existe pas." });

        bcrypt
          .compare(req.body.password, user.password)
          .then((isPasswordValid) => {
            if (!isPasswordValid)
              return res
                .status(401)
                .json({ message: "Le mot de passe est incorrect." });

            // Génération du Token JWT
            const token = jwt.sign({ userId: user.id }, private_key, {
              expiresIn: "24h",
            });
            res.json({
              message: "L'utilisateur a été connecté avec succès",
              data: user,
              token,
            });
          });
      })
      .catch((error) =>
        res
          .status(500)
          .json({ message: "Erreur lors de la connexion.", data: error }),
      );
  });
};
