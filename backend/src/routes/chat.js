// Fichier : src/routes/chat.js
// Rôle : Routes pour la messagerie

import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../database/init.js';
import { auth } from '../middleware/auth.js';
import { uploadPhoto } from '../middleware/upload.js';
import { getIO } from '../socket/index.js';

const router = express.Router();

router.use(auth);

router.get('/:rideId', (req, res, next) => {
  try {
    const messages = db.prepare('SELECT * FROM messages WHERE rideId = ? ORDER BY createdAt ASC').all(req.params.rideId);
    res.json(messages);
  } catch (err) {
    next(err);
  }
});

router.post('/:rideId', (req, res, next) => {
  try {
    const { content } = req.body;
    const rideId = req.params.rideId;
    const id = uuidv4();

    db.prepare(`
      INSERT INTO messages (id, rideId, senderId, content, type)
      VALUES (?, ?, ?, ?, 'text')
    `).run(id, rideId, req.user.id, content);

    const message = db.prepare('SELECT * FROM messages WHERE id = ?').get(id);
    
    const ride = db.prepare('SELECT * FROM rides WHERE id = ?').get(rideId);
    const recipientId = ride.riderId === req.user.id ? ride.driverId : ride.riderId;
    
    if (recipientId) {
      getIO().to(recipientId).emit('chat:message', message);
    }

    res.status(201).json(message);
  } catch (err) {
    next(err);
  }
});

router.post('/:rideId/photo', uploadPhoto, (req, res, next) => {
  try {
    const rideId = req.params.rideId;
    const id = uuidv4();

    db.prepare(`
      INSERT INTO messages (id, rideId, senderId, filePath, type)
      VALUES (?, ?, ?, ?, 'photo')
    `).run(id, rideId, req.user.id, req.file.filename);

    const message = db.prepare('SELECT * FROM messages WHERE id = ?').get(id);
    
    const ride = db.prepare('SELECT * FROM rides WHERE id = ?').get(rideId);
    const recipientId = ride.riderId === req.user.id ? ride.driverId : ride.riderId;
    
    if (recipientId) {
      getIO().to(recipientId).emit('chat:message', message);
    }

    res.status(201).json(message);
  } catch (err) {
    next(err);
  }
});

export default router;
