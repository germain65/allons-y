// Fichier : src/hooks/useGeolocation.js
// Rôle : Hook pour récupérer la position GPS

import { useState, useEffect } from 'react';

export const useGeolocation = () => {
  const [position, setPosition] = useState({ lat: -1.658, lng: 29.220 }); // Goma par défaut
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('La géolocalisation n\'est pas supportée par votre navigateur');
      setLoading(false);
      return;
    }

    const watcher = navigator.geolocation.watchPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        });
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      },
      { enableHighAccuracy: true }
    );

    return () => navigator.geolocation.clearWatch(watcher);
  }, []);

  return { position, error, loading };
};
