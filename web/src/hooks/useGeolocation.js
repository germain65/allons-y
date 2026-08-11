/**
 * src/hooks/useGeolocation.js
 * Hook pour gérer la position GPS de l'utilisateur et récupérer son adresse via Reverse Geocoding.
 */
import { useState, useEffect, useRef } from 'react';

export const useGeolocation = () => {
  // Position par défaut : Goma, RDC
  const [position, setPosition] = useState({ lat: -1.658, lng: 29.220 });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Nouveaux états pour le reverse geocoding
  const [address, setAddress] = useState(null);
  const [addressLoading, setAddressLoading] = useState(false);
  
  // Référence pour gérer le debounce (timeout) sans re-rendu
  const debounceTimerRef = useRef(null);

  // 1. Suivi de la position GPS
  useEffect(() => {
    if (!navigator.geolocation) {
      setError("La géolocalisation n'est pas supportée par votre navigateur");
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

  // 2. Reverse geocoding avec l'API Nominatim
  useEffect(() => {
    setAddressLoading(true);

    // Nettoyer le timer précédent (debounce)
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Définir un nouveau timer de 2 secondes
    debounceTimerRef.current = setTimeout(async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${position.lat}&lon=${position.lng}&accept-language=fr`
        );
        
        if (!response.ok) {
          throw new Error("Erreur de requête vers Nominatim");
        }

        const data = await response.json();
        
        // Extraction des composants
        setAddress({
          display_name: data.display_name,
          road: data.address?.road || '',
          suburb: data.address?.suburb || '',
          city: data.address?.city || data.address?.town || data.address?.village || ''
        });
      } catch (err) {
        console.error("Erreur de reverse geocoding:", err);
        // Fallback: afficher les coordonnées GPS en cas d'erreur
        setAddress({
          display_name: `${position.lat.toFixed(4)}, ${position.lng.toFixed(4)}`,
          road: '',
          suburb: '',
          city: ''
        });
      } finally {
        setAddressLoading(false);
      }
    }, 2000);

    // Nettoyage
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [position.lat, position.lng]);

  return { position, address, addressLoading, error, loading };
};
