// Fichier : src/middleware/auth.js
// Rôle : Middleware d'authentification JWT

import { verifyAccessToken } from '../utils/jwt.js';
import { db } from '../database/init.js';

export const auth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Non autorisé' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyAccessToken(token);
    
    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'Utilisateur introuvable' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token invalide' });
  }
};

export const optionalAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      const decoded = verifyAccessToken(token);
      const user = db.prepare('SELECT * FROM users WHERE id = ?').get(decoded.id);
      if (user) {
        req.user = user;
      }
    }
  } catch (error) {
    // Ignorer les erreurs pour l'auth optionnelle
  }
  next();
};
