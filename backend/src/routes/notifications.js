// Fichier : src/routes/notifications.js
// Rôle : Routes pour les notifications

import express from 'express';
import { db } from '../database/init.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.use(auth);

router.get('/', (req, res, next) => {
  try {
    const notifs = db.prepare('SELECT * FROM notifications WHERE userId = ? ORDER BY createdAt DESC').all(req.user.id);
    res.json(notifs);
  } catch (err) {
    next(err);
  }
});

router.put('/:id/read', (req, res, next) => {
  try {
    db.prepare('UPDATE notifications SET isRead = 1 WHERE id = ? AND userId = ?').run(req.params.id, req.user.id);
    res.json({ message: 'Notification lue' });
  } catch (err) {
    next(err);
  }
});

router.put('/read-all', (req, res, next) => {
  try {
    db.prepare('UPDATE notifications SET isRead = 1 WHERE userId = ?').run(req.user.id);
    res.json({ message: 'Toutes les notifications lues' });
  } catch (err) {
    next(err);
  }
});

export default router;
