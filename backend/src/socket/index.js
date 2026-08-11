// Fichier : src/socket/index.js
// Rôle : Gestionnaire Socket.IO

import { verifyAccessToken } from '../utils/jwt.js';
import { db } from '../database/init.js';
import { v4 as uuidv4 } from 'uuid';

let ioInstance;

export const initSocket = (io) => {
  ioInstance = io;

  io.use((socket, next) => {
    const token = socket.handshake.auth?.token || socket.handshake.query?.token;
    if (!token) {
      return next(new Error('Authentication error'));
    }
    try {
      const decoded = verifyAccessToken(token);
      socket.user = decoded;
      next();
    } catch (err) {
      next(new Error('Authentication error'));
    }
  });

  io.on('connection', (socket) => {
    const userId = socket.user.id;
    socket.join(userId);

    const user = db.prepare('SELECT accountType, currentMode FROM users WHERE id = ?').get(userId);
    if (user && user.currentMode === 'driver') {
      socket.join('drivers');
    }

    socket.on('driver:update-location', ({ lat, lng }) => {
      if (user?.currentMode !== 'driver') return;
      db.prepare('UPDATE users SET lastLat = ?, lastLng = ?, lastLocationUpdate = datetime("now") WHERE id = ?').run(lat, lng, userId);
      
      const activeRide = db.prepare(`
        SELECT riderId FROM rides 
        WHERE driverId = ? AND status IN ('accepted', 'waiting', 'in_progress') 
        LIMIT 1
      `).get(userId);
      
      if (activeRide) {
        io.to(activeRide.riderId).emit('position:update', { lat, lng });
      }
    });

    socket.on('driver:go-online', () => {
      db.prepare('UPDATE users SET isOnline = 1 WHERE id = ?').run(userId);
    });

    socket.on('driver:go-offline', () => {
      db.prepare('UPDATE users SET isOnline = 0 WHERE id = ?').run(userId);
    });

    socket.on('chat:typing', ({ rideId }) => {
      const ride = db.prepare('SELECT riderId, driverId FROM rides WHERE id = ?').get(rideId);
      if (!ride) return;
      const recipientId = ride.riderId === userId ? ride.driverId : ride.riderId;
      if (recipientId) {
        io.to(recipientId).emit('chat:typing', { rideId, userId });
      }
    });

    socket.on('disconnect', () => {
      if (user && user.currentMode === 'driver') {
        db.prepare('UPDATE users SET isOnline = 0 WHERE id = ?').run(userId);
      }
    });
  });
};

export const getIO = () => {
  if (!ioInstance) {
    throw new Error('Socket.IO not initialized');
  }
  return ioInstance;
};
