// Fichier : src/routes/users.js
// Rôle : Routes utilisateurs

import express from 'express';
import { db } from '../database/init.js';
import { auth } from '../middleware/auth.js';
import { uploadPhoto } from '../middleware/upload.js';

const router = express.Router();

router.use(auth);

router.get('/me', (req, res) => {
  const user = { ...req.user };
  delete user.password;
  res.json(user);
});

router.put('/me', (req, res, next) => {
  try {
    const { firstName, lastName, email, province, city, notificationConsent } = req.body;
    db.prepare(`
      UPDATE users 
      SET firstName = COALESCE(?, firstName),
          lastName = COALESCE(?, lastName),
          email = COALESCE(?, email),
          province = COALESCE(?, province),
          city = COALESCE(?, city),
          notificationConsent = COALESCE(?, notificationConsent),
          updatedAt = datetime('now')
      WHERE id = ?
    `).run(firstName, lastName, email, province, city, notificationConsent, req.user.id);
    
    const updatedUser = db.prepare('SELECT * FROM users WHERE id = ?').get(req.user.id);
    delete updatedUser.password;
    res.json(updatedUser);
  } catch (err) {
    next(err);
  }
});

router.post('/me/photo', uploadPhoto, (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'Aucun fichier uploadé' });
    db.prepare('UPDATE users SET profilePhoto = ? WHERE id = ?').run(req.file.filename, req.user.id);
    res.json({ profilePhoto: req.file.filename });
  } catch (err) {
    next(err);
  }
});

router.get('/:id/public', (req, res, next) => {
  try {
    const user = db.prepare(`
      SELECT firstName, lastName, profilePhoto, rating, ratingCount, accountType 
      FROM users WHERE id = ?
    `).get(req.params.id);
    if (!user) return res.status(404).json({ message: 'Utilisateur introuvable' });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.put('/me/mode', (req, res, next) => {
  try {
    if (req.user.accountType !== 'driver') {
      return res.status(403).json({ message: 'Disponible uniquement pour les chauffeurs' });
    }
    const currentMode = req.user.currentMode === 'rider' ? 'driver' : 'rider';
    db.prepare('UPDATE users SET currentMode = ? WHERE id = ?').run(currentMode, req.user.id);
    res.json({ currentMode });
  } catch (err) {
    next(err);
  }
});

router.delete('/me', (req, res, next) => {
  try {
    db.prepare("UPDATE users SET phone = phone || '_deleted_' || id WHERE id = ?").run(req.user.id);
    res.json({ message: 'Compte supprimé' });
  } catch (err) {
    next(err);
  }
});

export default router;
