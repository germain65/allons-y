// Fichier : shared/constants/index.js
// Rôle   : Centralise toutes les constantes de l'application Allons-y

export {
  PROVINCES,
  DEFAULT_CITIES,
  getCitiesByProvince,
  getProvinceCoords,
} from './provinces.js';

// --- Types de compte ---
export const ACCOUNT_TYPES = {
  RIDER: 'rider',
  DRIVER: 'driver',
};

// --- Types de véhicule ---
export const VEHICLE_TYPES = {
  MOTO: 'moto',
  TAXI: 'taxi',
};

// --- Statuts d'une course ---
export const RIDE_STATUS = {
  REQUESTED: 'requested',       // Le passager a lancé la recherche
  SEARCHING: 'searching',       // Recherche de chauffeurs en cours
  OFFERED: 'offered',           // Des offres/contre-offres sont en cours
  ACCEPTED: 'accepted',         // Le passager a accepté une offre
  DRIVER_ARRIVING: 'driver_arriving', // Le chauffeur se dirige vers le point de prise en charge
  WAITING: 'waiting',           // Le chauffeur attend le passager (countdown 3 min)
  IN_PROGRESS: 'in_progress',   // Course en cours
  COMPLETED: 'completed',       // Course terminée
  CANCELLED: 'cancelled',       // Course annulée
};

// --- Statuts d'une offre de chauffeur ---
export const OFFER_STATUS = {
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  REJECTED: 'rejected',
  EXPIRED: 'expired',
};

// --- Types de messages dans le chat ---
export const MESSAGE_TYPES = {
  TEXT: 'text',
  PHOTO: 'photo',
  LOCATION: 'location',
  SYSTEM: 'system',
};

// --- Types de notifications ---
export const NOTIFICATION_TYPES = {
  RIDE_REQUEST: 'ride_request',
  RIDE_ACCEPTED: 'ride_accepted',
  DRIVER_ARRIVING: 'driver_arriving',
  DRIVER_ARRIVED: 'driver_arrived',
  RIDE_STARTED: 'ride_started',
  RIDE_COMPLETED: 'ride_completed',
  RIDE_CANCELLED: 'ride_cancelled',
  NEW_OFFER: 'new_offer',
  NEW_MESSAGE: 'new_message',
  RATING_RECEIVED: 'rating_received',
  SYSTEM: 'system',
};

// --- Devise ---
export const CURRENCY = {
  code: 'CDF',
  symbol: 'FC',
  name: 'Franc congolais',
};

// --- Limites de l'application ---
export const LIMITS = {
  MAX_RATING: 5,
  MIN_RATING: 1,
  DRIVER_WAIT_TIMEOUT_SECONDS: 180,  // 3 minutes d'attente max
  OFFER_EXPIRY_SECONDS: 120,          // 2 minutes pour qu'un chauffeur réponde
  SEARCH_TIMEOUT_SECONDS: 300,        // 5 minutes de recherche max
  SEARCH_RADIUS_KM: 5,                // Rayon de recherche des chauffeurs
  MAX_UPLOAD_SIZE_MB: 5,               // Taille max upload en Mo
  PASSWORD_MIN_LENGTH: 8,
  PHONE_MIN_LENGTH: 9,
};

// --- Conditions météo (pour le calcul de prix) ---
export const WEATHER_CONDITIONS = {
  CLEAR: 'clear',
  CLOUDY: 'cloudy',
  RAIN: 'rain',
  HEAVY_RAIN: 'heavy_rain',
};

// --- Numéros utiles (écran Sécurité) ---
export const EMERGENCY_NUMBERS = {
  police: {
    label: 'Police Nationale Congolaise',
    number: '112',
  },
  emergency: {
    label: 'Urgences',
    number: '114',
  },
  support: {
    label: 'Support Allons-y',
    number: '+243 XXX XXX XXX',
  },
};
