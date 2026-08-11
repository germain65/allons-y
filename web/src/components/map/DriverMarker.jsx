// Fichier : src/components/map/DriverMarker.jsx
// Rôle : Marqueur spécifique pour un chauffeur sur la carte

import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const createDriverIcon = (type) => {
  const emoji = type === 'moto' ? '🏍️' : '🚕';
  
  return L.divIcon({
    html: `<div style="font-size: 24px; background: white; border-radius: 50%; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 5px rgba(0,0,0,0.2); border: 2px solid var(--color-primary);">${emoji}</div>`,
    className: 'driver-marker-icon',
    iconSize: [32, 32],
    iconAnchor: [16, 16]
  });
};

const DriverMarker = ({ driver }) => {
  return (
    <Marker 
      position={[driver.lat, driver.lng]} 
      icon={createDriverIcon(driver.vehicleType)}
    >
      <Popup>
        <div style={{ textAlign: 'center' }}>
          <strong>{driver.firstName}</strong>
          <br/>
          ⭐ {driver.rating}
        </div>
      </Popup>
    </Marker>
  );
};

export default DriverMarker;
