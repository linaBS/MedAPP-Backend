// authMiddleware.js

import jwt from "jsonwebtoken";

export const authenticate = async (req, res, next) => {
  const authToken = req.headers.authorization;

  if (!authToken || !authToken.startsWith("Bearer")) {
    return res.status(401).json({ message: 'Pas de jeton, autorisation refusée' });
  }

  try {
    const token = authToken.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.userId = decodedToken.id;
    req.role = decodedToken.role; // Supposez que le rôle soit stocké dans le jeton.

    next();
  } catch (err) {
    return res.status(401).json({ message: 'Jeton invalide ou expiré' });
  }
};


