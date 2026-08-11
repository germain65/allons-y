// Fichier : src/middleware/errorHandler.js
// Rôle : Gestionnaire global d'erreurs

import { config } from '../config/index.js';

export const errorHandler = (err, req, res, next) => {
  console.error(err);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Erreur interne du serveur';

  res.status(statusCode).json({
    message,
    ...(config.env === 'development' && { stack: err.stack })
  });
};
