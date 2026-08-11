// Fichier : mobile/src/hooks/useLocation.js
// Rôle   : Hook React Native pour suivre la position GPS de l'utilisateur
//          Utilise expo-location, avec fallback sur les coordonnées de Goma

import { useState, useEffect, useCallback } from 'react';
// import * as Location from 'expo-location';  // Décommenter quand Expo est installé

// Coordonnées par défaut : Goma, Nord-Kivu, RDC
const DEFAULT_LOCATION = {
  latitude: -1.6777,
  longitude: 29.2285,
};

/**
 * Hook pour gérer la géolocalisation.
 *
 * @returns {{
 *   location: { latitude: number, longitude: number } | null,
 *   error: string | null,
 *   loading: boolean,
 *   refresh: () => void
 * }}
 */
export function useLocation() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const getLocation = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // TODO: Décommenter quand expo-location est installé
      // const { status } = await Location.requestForegroundPermissionsAsync();
      //
      // if (status !== 'granted') {
      //   setError('Permission de localisation refusée');
      //   setLocation(DEFAULT_LOCATION);
      //   setLoading(false);
      //   return;
      // }
      //
      // const currentLocation = await Location.getCurrentPositionAsync({
      //   accuracy: Location.Accuracy.Balanced,
      // });
      //
      // setLocation({
      //   latitude: currentLocation.coords.latitude,
      //   longitude: currentLocation.coords.longitude,
      // });

      // Pour le squelette, utiliser les coordonnées par défaut
      setLocation(DEFAULT_LOCATION);
    } catch (err) {
      console.error('[Location] Erreur:', err);
      setError('Impossible d\'obtenir la position');
      setLocation(DEFAULT_LOCATION);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getLocation();
  }, [getLocation]);

  return { location, error, loading, refresh: getLocation };
}

export default useLocation;
