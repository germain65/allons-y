// Fichier : src/services/MapProvider.js
// Rôle : Service de calculs géographiques et cartographiques

class MapProvider {
  calculateDistance(lat1, lng1, lat2, lng2) {
    const R = 6371; // Rayon de la Terre en km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  calculateETA(distanceKm, vehicleType) {
    const speedKmh = vehicleType === 'taxi' ? 20 : 25;
    return Math.ceil((distanceKm / speedKmh) * 60);
  }

  async reverseGeocode(lat, lng) {
    return `Adresse proche de ${lat.toFixed(4)}, ${lng.toFixed(4)}`;
  }
}

const mapProvider = new MapProvider();
export default mapProvider;
