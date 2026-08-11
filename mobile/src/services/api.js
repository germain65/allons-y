// Fichier : mobile/src/services/api.js
// Rôle   : Client API pour communiquer avec le backend Allons-y
//          Même logique que le web — réutilise les mêmes endpoints

import AsyncStorage from '@react-native-async-storage/async-storage';

// ============================================================
// CONFIGURATION
// ============================================================

// En développement, pointer vers le serveur local
// En production, remplacer par l'URL du backend déployé
const API_BASE_URL = __DEV__
  ? 'http://10.0.2.2:3001/api'  // Android emulator → localhost
  : 'https://api.allons-y.app/api';

// Pour iOS simulator, utiliser http://localhost:3001/api
// Pour un appareil physique, utiliser l'IP de la machine sur le réseau local

// ============================================================
// TOKENS
// ============================================================

const TOKEN_KEY = 'allonsy_access_token';
const REFRESH_TOKEN_KEY = 'allonsy_refresh_token';

/**
 * Récupère le token d'accès stocké.
 * @returns {Promise<string|null>}
 */
export async function getAccessToken() {
  try {
    return await AsyncStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

/**
 * Stocke les tokens d'authentification.
 * @param {string} accessToken
 * @param {string} refreshToken
 */
export async function setTokens(accessToken, refreshToken) {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, accessToken);
    if (refreshToken) {
      await AsyncStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    }
  } catch (error) {
    console.error('[API] Erreur stockage tokens:', error);
  }
}

/**
 * Supprime les tokens (déconnexion).
 */
export async function clearTokens() {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
    await AsyncStorage.removeItem(REFRESH_TOKEN_KEY);
  } catch (error) {
    console.error('[API] Erreur suppression tokens:', error);
  }
}

// ============================================================
// REQUÊTES HTTP
// ============================================================

/**
 * Effectue une requête API authentifiée.
 *
 * @param {string} endpoint — chemin relatif (ex: '/auth/login')
 * @param {Object} options
 * @param {string} [options.method='GET']
 * @param {Object} [options.body]
 * @param {Object} [options.headers]
 * @returns {Promise<Object>} — réponse JSON
 */
export async function apiRequest(endpoint, options = {}) {
  const { method = 'GET', body, headers = {} } = options;

  // Ajouter le token si disponible
  const token = await getAccessToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // Configurer les headers pour JSON (sauf si FormData)
  if (body && !(body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  const config = {
    method,
    headers,
  };

  if (body) {
    config.body = body instanceof FormData ? body : JSON.stringify(body);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  const data = await response.json();

  if (!response.ok) {
    // Si token expiré, tenter un refresh
    if (response.status === 401 && token) {
      const refreshed = await refreshAccessToken();
      if (refreshed) {
        // Réessayer la requête avec le nouveau token
        return apiRequest(endpoint, options);
      }
    }

    throw new Error(data.error || data.message || 'Erreur réseau');
  }

  return data;
}

/**
 * Rafraîchit le token d'accès via le refresh token.
 * @returns {Promise<boolean>} — true si le refresh a réussi
 */
async function refreshAccessToken() {
  try {
    const refreshToken = await AsyncStorage.getItem(REFRESH_TOKEN_KEY);
    if (!refreshToken) return false;

    const response = await fetch(`${API_BASE_URL}/auth/refresh-token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) return false;

    const data = await response.json();
    await setTokens(data.accessToken, data.refreshToken || refreshToken);
    return true;
  } catch {
    return false;
  }
}

// ============================================================
// RACCOURCIS POUR LES MÉTHODES HTTP
// ============================================================

export const api = {
  get: (endpoint) => apiRequest(endpoint),
  post: (endpoint, body) => apiRequest(endpoint, { method: 'POST', body }),
  put: (endpoint, body) => apiRequest(endpoint, { method: 'PUT', body }),
  delete: (endpoint) => apiRequest(endpoint, { method: 'DELETE' }),
};

export default api;
