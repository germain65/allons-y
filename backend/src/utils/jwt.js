// Fichier : src/utils/jwt.js
// Rôle : Gestion des tokens JWT

import jwt from 'jsonwebtoken';
import { config } from '../config/index.js';

export const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user.id, accountType: user.accountType },
    config.jwt.secret,
    { expiresIn: config.jwt.accessExpiration }
  );
};

export const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user.id },
    config.jwt.refreshSecret,
    { expiresIn: config.jwt.refreshExpiration }
  );
};

export const verifyAccessToken = (token) => {
  return jwt.verify(token, config.jwt.secret);
};

export const verifyRefreshToken = (token) => {
  return jwt.verify(token, config.jwt.refreshSecret);
};
