// Fichier : src/config/index.js
// Rôle : Configuration centralisée du backend

import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const config = {
  port: process.env.PORT || 3001,
  env: process.env.NODE_ENV || 'development',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
  jwt: {
    secret: process.env.JWT_SECRET || 'allons-y-dev-secret-key-2024',
    refreshSecret: process.env.JWT_REFRESH_SECRET || 'allons-y-dev-refresh-secret-2024',
    accessExpiration: '24h',
    refreshExpiration: '7d',
  },
  uploads: {
    photos: path.join(__dirname, '../../uploads/photos'),
    documents: path.join(__dirname, '../../uploads/documents'),
  }
};
