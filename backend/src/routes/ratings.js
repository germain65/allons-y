// Fichier : src/routes/ratings.js
// Rôle : Routes des évaluations

import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../database/init.js';
import { auth } from '../middleware/auth.js';
import { getIO } from '../socket/index.js';

const router = express.Router();

router.use(auth);

router.post('/', (req, res, next) => {
  try {
    const { rideId, score, comment } = req.body;
    
    if (score < 1 || score > 5) {
      return res.status(400).json({ message: 'Score invalide' });
    }

    const ride = db.prepare('SELECT * FROM rides WHERE id = ?').get(rideId);
    if (!ride) return res.status(404).json({ message: 'Course introuvable' });

    const isRider = ride.riderId === req.user.id;
    const isDriver = ride.driverId === req.user.id;

    if (!isRider && !isDriver) {
      return res.status(403).json({ message: 'Non autorisé' });
    }

    const toUserId = isRider ? ride.driverId : ride.riderId;
    const id = uuidv4();

    db.prepare(`
      INSERT INTO ratings (id, rideId, fromUserId, toUserId, score, comment)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(id, rideId, req.user.id, toUserId, score, comment);

    const avg = db.prepare('SELECT AVG(score) as avgScore, COUNT(id) as count FROM ratings WHERE toUserId = ?').get(toUserId);
    db.prepare('UPDATE users SET rating = ?, ratingCount = ? WHERE id = ?').run(avg.avgScore || 5.0, avg.count, toUserId);

    getIO().to(toUserId).emit('rating:received', { rideId, score });

    res.status(201).json({ message: 'Évaluation soumise' });
  } catch (err) {
    next(err);
  }
});

router.get('/user/:id', (req, res, next) => {
  try {
    const ratings = db.prepare('SELECT * FROM ratings WHERE toUserId = ? ORDER BY createdAt DESC').all(req.params.id);
    res.json(ratings);
  } catch (err) {
    next(err);
  }
});

export default router;
