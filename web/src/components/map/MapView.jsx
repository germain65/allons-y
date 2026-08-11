/**
 * Fichier: MapView.jsx
 * Rôle: Composant principal d'affichage de la carte utilisant MapLibre GL JS et OpenFreeMap
 */

import React, { useEffect, useRef } from 'react';
import * as maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const MapView = ({ userPosition, drivers = [], route = null, destinationPosition = null }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  
  // Références pour stocker les instances des marqueurs
  const userMarkerRef = useRef(null);
  const destinationMarkerRef = useRef(null);
  const driversMarkersRef = useRef({});

  // Coordonnées par défaut (Goma, RDC)
  const defaultCenter = [29.220, -1.658]; // Note: MapLibre utilise le format [longitude, latitude]

  // Initialisation de la carte
  useEffect(() => {
    // Éviter de réinitialiser la carte si elle existe déjà
    if (mapRef.current) return;

    // Déterminer le centre initial
    const center = userPosition ? [userPosition.lng, userPosition.lat] : defaultCenter;

    // Création de l'instance MapLibre
    mapRef.current = new maplibregl.Map({
      container: mapContainerRef.current,
      style: 'https://tiles.openfreemap.org/styles/liberty', // Style OpenFreeMap "Liberty"
      center: center,
      zoom: 15, // Zoom initial de 15
      attributionControl: false, // Supprimer l'attribution pour un look plus épuré
    });

    // Nettoyage propre lors du démontage du composant
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []); // Exécuté une seule fois au montage

  // Effet pour gérer le marqueur utilisateur et le recentrage automatique
  useEffect(() => {
    if (!mapRef.current || !userPosition) return;

    const lngLat = [userPosition.lng, userPosition.lat];

    // Recentrer la carte doucement vers la nouvelle position
    mapRef.current.flyTo({ center: lngLat, speed: 1.2 });

    // Si le marqueur n'existe pas, on le crée
    if (!userMarkerRef.current) {
      // Élément HTML personnalisé pour la position utilisateur
      const el = document.createElement('div');
      el.className = 'user-marker-pulse';
      el.style.width = '16px';
      el.style.height = '16px';
      el.style.backgroundColor = '#4285F4'; // Bleu style Google/Uber
      el.style.border = '3px solid white';
      el.style.borderRadius = '50%';
      el.style.boxShadow = '0 0 10px rgba(66, 133, 244, 0.6)';
      
      // Injection de styles CSS pour les animations (glassmorphism & pulse)
      if (!document.getElementById('mapview-custom-styles')) {
        const style = document.createElement('style');
        style.id = 'mapview-custom-styles';
        style.innerHTML = `
          @keyframes pulse-ring {
            0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(66, 133, 244, 0.7); }
            70% { transform: scale(1.2); box-shadow: 0 0 0 15px rgba(66, 133, 244, 0); }
            100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(66, 133, 244, 0); }
          }
          .user-marker-pulse {
            animation: pulse-ring 2s infinite cubic-bezier(0.45, 0, 0.55, 1);
          }
          .driver-marker-glass {
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(255, 255, 255, 0.6);
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            border-radius: 50%;
            width: 36px;
            height: 36px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            border: 1px solid rgba(255,255,255,0.8);
            font-size: 20px;
            transition: transform 0.3s ease, background 0.3s ease;
          }
          .driver-marker-glass:hover {
            transform: scale(1.1);
            background: rgba(255, 255, 255, 0.9);
          }
          .destination-marker {
            width: 20px;
            height: 20px;
            background-color: #000000;
            border: 3px solid white;
            border-radius: 50%;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
          }
        `;
        document.head.appendChild(style);
      }

      // Ajouter le marqueur à la carte
      userMarkerRef.current = new maplibregl.Marker({ element: el })
        .setLngLat(lngLat)
        .addTo(mapRef.current);
    } else {
      // Mettre à jour la position du marqueur existant
      userMarkerRef.current.setLngLat(lngLat);
    }
  }, [userPosition]);

  // Effet pour gérer le marqueur de destination
  useEffect(() => {
    if (!mapRef.current) return;

    if (destinationPosition) {
      const lngLat = [destinationPosition.lng, destinationPosition.lat];
      
      if (!destinationMarkerRef.current) {
        const el = document.createElement('div');
        el.className = 'destination-marker';
        
        destinationMarkerRef.current = new maplibregl.Marker({ element: el })
          .setLngLat(lngLat)
          .addTo(mapRef.current);
      } else {
        destinationMarkerRef.current.setLngLat(lngLat);
      }
    } else if (destinationMarkerRef.current) {
      // Si la destination est annulée, retirer le marqueur
      destinationMarkerRef.current.remove();
      destinationMarkerRef.current = null;
    }
  }, [destinationPosition]);

  // Effet pour gérer les marqueurs des chauffeurs
  useEffect(() => {
    if (!mapRef.current) return;

    // Set pour tracker les chauffeurs actuellement dans la props
    const currentDriverIds = new Set(drivers.map(d => d.id));

    // Ajouter ou mettre à jour les marqueurs
    drivers.forEach(driver => {
      const lngLat = [driver.lng, driver.lat];
      
      if (!driversMarkersRef.current[driver.id]) {
        // Création d'un nouveau marqueur chauffeur style glassmorphism
        const el = document.createElement('div');
        el.className = 'driver-marker-glass';
        // Utiliser l'emoji en fonction du type de véhicule (moto ou taxi)
        el.innerHTML = driver.vehicleType === 'moto' ? '🏍️' : '🚕';
        
        driversMarkersRef.current[driver.id] = new maplibregl.Marker({ element: el })
          .setLngLat(lngLat)
          .addTo(mapRef.current);
      } else {
        // Mise à jour fluide de la position
        driversMarkersRef.current[driver.id].setLngLat(lngLat);
      }
    });

    // Nettoyer les marqueurs des chauffeurs qui ne sont plus dans la liste (déconnectés/occupés)
    Object.keys(driversMarkersRef.current).forEach(driverId => {
      if (!currentDriverIds.has(driverId)) {
        driversMarkersRef.current[driverId].remove();
        delete driversMarkersRef.current[driverId];
      }
    });
  }, [drivers]);

  return (
    <div 
      ref={mapContainerRef} 
      style={{ 
        width: '100%', 
        height: '100%', 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        zIndex: 0,
        fontFamily: 'Inter, sans-serif'
      }} 
    />
  );
};

export default MapView;
