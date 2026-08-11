// Fichier : mobile/src/services/socket.js
// Rôle   : Connexion Socket.IO pour le temps réel (positions, offres, chat)
//          Configuration identique à l'app web

import { io } from 'socket.io-client';
import { getAccessToken } from './api';

// ============================================================
// CONFIGURATION
// ============================================================

const SOCKET_URL = __DEV__
  ? 'http://10.0.2.2:3001'  // Android emulator
  : 'https://api.allons-y.app';

let socket = null;

/**
 * Initialise la connexion Socket.IO avec authentification JWT.
 * @returns {Promise<import('socket.io-client').Socket>}
 */
export async function connectSocket() {
  if (socket?.connected) {
    return socket;
  }

  const token = await getAccessToken();
  if (!token) {
    console.warn('[Socket] Pas de token — connexion impossible');
    return null;
  }

  socket = io(SOCKET_URL, {
    auth: { token },
    transports: ['websocket'],
    reconnection: true,
    reconnectionAttempts: 10,
    reconnectionDelay: 1000,
  });

  socket.on('connect', () => {
    console.log('[Socket] ✅ Connecté:', socket.id);
  });

  socket.on('disconnect', (reason) => {
    console.log('[Socket] ❌ Déconnecté:', reason);
  });

  socket.on('connect_error', (error) => {
    console.error('[Socket] Erreur de connexion:', error.message);
  });

  return socket;
}

/**
 * Déconnecte le socket.
 */
export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}

/**
 * Retourne l'instance socket actuelle (peut être null).
 * @returns {import('socket.io-client').Socket|null}
 */
export function getSocket() {
  return socket;
}

export default { connectSocket, disconnectSocket, getSocket };
