// Fichier : src/services/PricingService.js
// Rôle : Service de tarification des courses

import { calculatePrice } from '../../../shared/pricing/index.js';
import { db } from '../database/init.js';
import mapProvider from './MapProvider.js';

class PricingService {
  async getPrice({ pickupLat, pickupLng, destLat, destLng, vehicleType }) {
    const distanceKm = mapProvider.calculateDistance(pickupLat, pickupLng, destLat, destLng);
    const activeRides = this.getActiveRidesInZone(pickupLat, pickupLng, 5);
    const weeklyAverage = this.getWeeklyAverage(pickupLat, pickupLng, destLat, destLng, vehicleType);
    const weather = this.getRandomWeather();

    return calculatePrice({
      distanceKm,
      vehicleType,
      activeRidesInZone: activeRides,
      weeklyAverage,
      weatherCondition: weather
    });
  }

  getWeeklyAverage(pickupLat, pickupLng, destLat, destLng, vehicleType) {
    // Calcul simplifié (zone +- 0.01)
    const stmt = db.prepare(`
      SELECT AVG(agreedPrice) as avgPrice 
      FROM rides 
      WHERE vehicleType = ? 
        AND status = 'completed'
        AND createdAt > datetime('now', '-7 days')
        AND ABS(pickupLat - ?) < 0.01 AND ABS(pickupLng - ?) < 0.01
    `);
    const result = stmt.get(vehicleType, pickupLat, pickupLng);
    return result && result.avgPrice ? Math.round(result.avgPrice) : null;
  }

  getActiveRidesInZone(lat, lng, radiusKm) {
    const rides = db.prepare(`
      SELECT pickupLat, pickupLng 
      FROM rides 
      WHERE status IN ('searching', 'offered', 'in_progress')
    `).all();

    let count = 0;
    for (const ride of rides) {
      if (mapProvider.calculateDistance(lat, lng, ride.pickupLat, ride.pickupLng) <= radiusKm) {
        count++;
      }
    }
    return count;
  }

  getRandomWeather() {
    const rand = Math.random();
    if (rand < 0.5) return 'clear';
    if (rand < 0.75) return 'cloudy';
    if (rand < 0.95) return 'rain';
    return 'heavy_rain';
  }
}

const pricingService = new PricingService();
export default pricingService;
