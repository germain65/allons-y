// Fichier : web/vite.config.js
// Rôle   : Configuration Vite avec alias @shared et base URL pour GitHub Pages

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  // Base URL pour déploiement GitHub Pages (https://germain65.github.io/allons-y/)
  base: '/allons-y/',
  resolve: {
    alias: {
      '@shared': path.resolve(__dirname, '../shared'),
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:3001',
      '/socket.io': { target: 'http://localhost:3001', ws: true },
    },
  },
});
