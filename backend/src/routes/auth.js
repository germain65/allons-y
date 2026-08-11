// Fichier : src/routes/auth.js
// Rôle : Routes d'authentification

import express from 'express';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../database/init.js';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken, verifyAccessToken } from '../utils/jwt.js';
import { uploadPhoto } from '../middleware/upload.js';
import notificationProvider from '../services/NotificationProvider.js';

const router = express.Router();

router.post('/signup', uploadPhoto, async (req, res, next) => {
  try {
    const { firstName, lastName, email, phone, password, accountType, province, city, licensePlate } = req.body;
    
    if (!firstName || !lastName || !phone || !password) {
      return res.status(400).json({ message: 'Champs obligatoires manquants' });
    }

    const existingUser = db.prepare('SELECT id FROM users WHERE phone = ?').get(phone);
    if (existingUser) {
      return res.status(400).json({ message: 'Ce numéro est déjà utilisé' });
    }

    const id = uuidv4();
    const hashedPassword = await bcrypt.hash(password, 10);
    const profilePhoto = req.file ? req.file.filename : null;

    db.prepare(`
      INSERT INTO users (id, firstName, lastName, email, phone, password, accountType, currentMode, province, city, licensePlate, profilePhoto)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(id, firstName, lastName, email, phone, hashedPassword, accountType || 'rider', accountType || 'rider', province, city, licensePlate, profilePhoto);

    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(id);
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    delete user.password;

    res.status(201).json({ user, accessToken, refreshToken });
  } catch (err) {
    next(err);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { phone, password } = req.body;
    
    const user = db.prepare('SELECT * FROM users WHERE phone = ?').get(phone);
    if (!user) {
      return res.status(401).json({ message: 'Identifiants invalides' });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: 'Identifiants invalides' });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    delete user.password;

    res.json({ user, accessToken, refreshToken });
  } catch (err) {
    next(err);
  }
});

router.post('/forgot-password', async (req, res, next) => {
  try {
    const { phone, email } = req.body;
    const user = db.prepare('SELECT * FROM users WHERE phone = ? OR email = ?').get(phone, email);
    
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur introuvable' });
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60000).toISOString();
    
    db.prepare(`
      INSERT INTO verification_codes (id, userId, phone, email, code, type, expiresAt)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(uuidv4(), user.id, phone, email, code, 'reset_password', expiresAt);

    if (phone) await notificationProvider.sendSMS(phone, `Code de réinitialisation: ${code}`);
    else if (email) await notificationProvider.sendEmail(email, 'Réinitialisation', `Code: ${code}`);

    res.json({ message: 'Code envoyé', devCode: code });
  } catch (err) {
    next(err);
  }
});

router.post('/verify-code', async (req, res, next) => {
  try {
    const { phone, email, code } = req.body;
    const verif = db.prepare(`
      SELECT * FROM verification_codes 
      WHERE (phone = ? OR email = ?) AND code = ? AND used = 0 AND expiresAt > datetime('now')
    `).get(phone, email, code);

    if (!verif) {
      return res.status(400).json({ message: 'Code invalide ou expiré' });
    }

    db.prepare('UPDATE verification_codes SET used = 1 WHERE id = ?').run(verif.id);
    const tempToken = generateAccessToken({ id: verif.userId, accountType: 'reset' });

    res.json({ tempToken });
  } catch (err) {
    next(err);
  }
});

router.post('/reset-password', async (req, res, next) => {
  try {
    const { tempToken, newPassword } = req.body;
    const tokenData = verifyAccessToken(tempToken);

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    db.prepare('UPDATE users SET password = ? WHERE id = ?').run(hashedPassword, tokenData.id);

    res.json({ message: 'Mot de passe réinitialisé' });
  } catch (err) {
    next(err);
  }
});

router.post('/refresh-token', async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    const decoded = verifyRefreshToken(refreshToken);
    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(decoded.id);
    
    if (!user) return res.status(401).json({ message: 'Utilisateur introuvable' });

    const accessToken = generateAccessToken(user);
    res.json({ accessToken });
  } catch (err) {
    next(err);
  }
});

export default router;
