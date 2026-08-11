// Fichier : src/index.js
// Rôle : Point d'entrée de l'application (Serveur Express + Socket.IO)

import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { config } from './config/index.js';
import { initDb } from './database/init.js';
import { initSocket } from './socket/index.js';
import { errorHandler } from './middleware/errorHandler.js';
import { auth } from './middleware/auth.js';

import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import rideRoutes from './routes/rides.js';
import ratingRoutes from './routes/ratings.js';
import chatRoutes from './routes/chat.js';
import notificationRoutes from './routes/notifications.js';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: config.frontendUrl,
    methods: ['GET', 'POST']
  }
});

app.use(cors({ origin: config.frontendUrl }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initDb();
initSocket(io);

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/rides', rideRoutes);
app.use('/api/ratings', ratingRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/notifications', notificationRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Allons-y API' });
});

app.use('/uploads', auth, express.static('uploads'));

app.use(errorHandler);

server.listen(config.port, () => {
  console.log(`🚀 Serveur démarré sur le port ${config.port}`);
  console.log(`🔗 API URL: http://localhost:${config.port}/api`);
  console.log(`\n📋 Comptes de test:`);
  console.log(`- Rider: +243970000001 / Test1234`);
  console.log(`- Driver: +243970000003 / Test1234`);
});
