import jwt from "jsonwebtoken";
import { private_key } from "./private_key.js";

export default (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) {
    return res
      .status(401)
      .json({ message: "Vous n'avez pas fourni de jeton d'authentification." });
  }

  const token = authorizationHeader.split(" ")[1];
  jwt.verify(token, private_key, (error, decodedToken) => {
    if (error) {
      return res
        .status(401)
        .json({
          message:
            "L'utilisateur n'est pas autorisé à accéder à cette ressource.",
        });
    }
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      return res
        .status(401)
        .json({ message: "L'identifiant de l'utilisateur est invalide." });
    } else {
      next();
    }
  });
};
