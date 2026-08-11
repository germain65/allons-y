// Fichier : shared/pricing/index.js
// Rôle   : Calcule le prix d'une course Allons-y en tenant compte de 4 facteurs
//
// Formule :
//   prixBrut = distanceKm × tarifParKm × facteurHeure × facteurDemande × facteurMétéo
//   prixFinal = 0.7 × prixBrut + 0.3 × moyenneHebdomadaire (si disponible)
//
// Le passager peut ensuite ajuster le prix entre -20% et +30% du prix calculé.

// ============================================================
// TARIFS DE BASE PAR KILOMÈTRE (en Francs Congolais — CDF)
// ============================================================
// 1 USD ≈ 2 800 CDF (taux approximatif)
// Moto : ~500 CDF/km (~0.18 USD)
// Taxi  : ~1 000 CDF/km (~0.36 USD)

const BASE_PRICE_PER_KM = {
  moto: 500,
  taxi: 1000,
};

// Prix minimum absolu pour éviter les courses à prix dérisoire
const MIN_ABSOLUTE_PRICE = {
  moto: 500,
  taxi: 1000,
};

// ============================================================
// FACTEUR 1 — HEURE DE LA JOURNÉE
// ============================================================
// Les heures de pointe augmentent le prix, la nuit aussi (moins de chauffeurs)

/**
 * Retourne le multiplicateur basé sur l'heure actuelle.
 * @param {number} hour — heure du jour (0-23)
 * @returns {number} multiplicateur (ex: 1.3 = +30%)
 */
export function getTimeFactor(hour) {
  // Nuit profonde (23h - 5h) : peu de chauffeurs disponibles
  if (hour >= 23 || hour < 5) return 1.5;
  // Pointe du matin (5h - 9h) : forte demande
  if (hour >= 5 && hour < 9) return 1.3;
  // Matinée calme (9h - 12h)
  if (hour >= 9 && hour < 12) return 1.0;
  // Pause midi (12h - 14h) : légère hausse
  if (hour >= 12 && hour < 14) return 1.1;
  // Après-midi calme (14h - 17h)
  if (hour >= 14 && hour < 17) return 1.0;
  // Pointe du soir (17h - 20h) : très forte demande
  if (hour >= 17 && hour < 20) return 1.4;
  // Soirée (20h - 23h) : hausse modérée
  return 1.2;
}

// ============================================================
// FACTEUR 2 — DEMANDE / FRÉQUENCE DANS LA ZONE
// ============================================================
// Plus il y a de courses actives dans la zone, plus le prix augmente

/**
 * Retourne le multiplicateur basé sur le nombre de courses actives dans la zone.
 * @param {number} activeRidesInZone — nombre de courses en cours à proximité
 * @returns {number} multiplicateur
 */
export function getDemandFactor(activeRidesInZone) {
  if (activeRidesInZone <= 2) return 0.9;   // Faible demande → petit bonus passager
  if (activeRidesInZone <= 5) return 1.0;   // Demande normale
  if (activeRidesInZone <= 10) return 1.2;  // Forte demande
  return 1.5;                               // Très forte demande (surge)
}

// ============================================================
// FACTEUR 3 — CONDITIONS MÉTÉO
// ============================================================
// La pluie augmente le prix (plus risqué en moto, plus de demande)

const WEATHER_FACTORS = {
  clear: 1.0,       // Ciel dégagé
  cloudy: 1.0,      // Nuageux (pas d'impact)
  rain: 1.3,        // Pluie → +30%
  heavy_rain: 1.5,  // Forte pluie → +50%
};

/**
 * Retourne le multiplicateur météo.
 * @param {string} weather — condition météo ('clear', 'cloudy', 'rain', 'heavy_rain')
 * @returns {number} multiplicateur
 */
export function getWeatherFactor(weather) {
  return WEATHER_FACTORS[weather] || 1.0;
}

// ============================================================
// FACTEUR 4 — MOYENNE GLISSANTE SUR 7 JOURS
// ============================================================
// On lisse le prix avec la moyenne des courses similaires de la dernière semaine.
// Cela évite les variations de prix trop brusques d'un jour à l'autre.

/**
 * Applique le facteur de moyenne hebdomadaire au prix calculé.
 * Si aucune moyenne n'est disponible, retourne le prix tel quel.
 * @param {number} calculatedPrice — prix brut calculé avec les 3 premiers facteurs
 * @param {number|null} weeklyAverage — prix moyen des courses similaires sur 7 jours
 * @returns {number} prix lissé
 */
export function applyWeeklyAverage(calculatedPrice, weeklyAverage) {
  if (!weeklyAverage || weeklyAverage <= 0) {
    return calculatedPrice;
  }
  // Pondération : 70% prix calculé, 30% moyenne historique
  return Math.round(0.7 * calculatedPrice + 0.3 * weeklyAverage);
}

// ============================================================
// CALCUL PRINCIPAL DU PRIX
// ============================================================

/**
 * Calcule le prix d'une course avec les 4 facteurs.
 *
 * @param {Object} params
 * @param {number} params.distanceKm — distance estimée en kilomètres
 * @param {'moto'|'taxi'} params.vehicleType — type de véhicule
 * @param {number} params.hour — heure du jour (0-23)
 * @param {number} params.activeRidesInZone — courses actives à proximité
 * @param {string} params.weather — condition météo
 * @param {number|null} params.weeklyAverage — moyenne hebdomadaire (null si indisponible)
 *
 * @returns {{
 *   basePrice: number,
 *   rawPrice: number,
 *   finalPrice: number,
 *   minPrice: number,
 *   maxPrice: number,
 *   factors: {
 *     timeFactor: number,
 *     demandFactor: number,
 *     weatherFactor: number,
 *     weeklyAverage: number|null
 *   }
 * }}
 */
export function calculatePrice({
  distanceKm,
  vehicleType = 'moto',
  hour = new Date().getHours(),
  activeRidesInZone = 0,
  weather = 'clear',
  weeklyAverage = null,
}) {
  // Prix de base = distance × tarif au km
  const pricePerKm = BASE_PRICE_PER_KM[vehicleType] || BASE_PRICE_PER_KM.moto;
  const basePrice = distanceKm * pricePerKm;

  // Appliquer les 3 premiers facteurs
  const timeFactor = getTimeFactor(hour);
  const demandFactor = getDemandFactor(activeRidesInZone);
  const weatherFactor = getWeatherFactor(weather);

  const rawPrice = basePrice * timeFactor * demandFactor * weatherFactor;

  // Appliquer le 4e facteur (moyenne hebdomadaire)
  let finalPrice = applyWeeklyAverage(rawPrice, weeklyAverage);

  // Appliquer le prix minimum absolu
  const minAbsolute = MIN_ABSOLUTE_PRICE[vehicleType] || MIN_ABSOLUTE_PRICE.moto;
  finalPrice = Math.max(Math.round(finalPrice), minAbsolute);

  // Bornes pour l'ajustement par le passager
  // Le passager peut baisser jusqu'à -20% ou augmenter jusqu'à +30%
  const minPrice = Math.max(Math.round(finalPrice * 0.8), minAbsolute);
  const maxPrice = Math.round(finalPrice * 1.3);

  return {
    basePrice: Math.round(basePrice),
    rawPrice: Math.round(rawPrice),
    finalPrice,
    minPrice,
    maxPrice,
    factors: {
      timeFactor,
      demandFactor,
      weatherFactor,
      weeklyAverage,
    },
  };
}

/**
 * Détermine le message de statut à afficher au passager en fonction du prix choisi.
 *
 * @param {number} chosenPrice — prix proposé par le passager
 * @param {number} finalPrice — prix recommandé par l'algorithme
 * @param {number} driversLooking — nombre de chauffeurs examinant l'offre
 * @returns {{ message: string, level: 'low'|'normal'|'good'|'high' }}
 */
export function getPriceStatusMessage(chosenPrice, finalPrice, driversLooking) {
  const ratio = chosenPrice / finalPrice;

  if (ratio < 0.85) {
    return {
      message: `${driversLooking} chauffeur${driversLooking > 1 ? 's' : ''} examine${driversLooking > 1 ? 'nt' : ''} votre offre — Prix en dessous de la moyenne : attendez-vous à moins d'offres`,
      level: 'low',
    };
  }

  if (ratio < 1.0) {
    return {
      message: `${driversLooking} chauffeur${driversLooking > 1 ? 's' : ''} examine${driversLooking > 1 ? 'nt' : ''} votre offre`,
      level: 'normal',
    };
  }

  if (ratio <= 1.15) {
    return {
      message: `${driversLooking} chauffeur${driversLooking > 1 ? 's' : ''} examine${driversLooking > 1 ? 'nt' : ''} votre offre — Bon prix : votre requête est prioritaire`,
      level: 'good',
    };
  }

  return {
    message: `${driversLooking} chauffeur${driversLooking > 1 ? 's' : ''} examine${driversLooking > 1 ? 'nt' : ''} votre offre — Prix très attractif : réponse rapide attendue`,
    level: 'high',
  };
}
