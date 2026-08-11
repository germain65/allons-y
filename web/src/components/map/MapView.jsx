// Fichier : src/components/map/MapView.jsx
// Rôle : Affichage de la carte Leaflet

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import DriverMarker from './DriverMarker';

// Corriger l'icône par défaut de Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const RecenterAutomatically = ({ lat, lng }) => {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng]);
  }, [lat, lng, map]);
  return null;
};

const MapView = ({ userPosition, drivers = [], route = null }) => {
  if (!userPosition) return <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Chargement carte...</div>;

  return (
    <MapContainer center={[userPosition.lat, userPosition.lng]} zoom={15} style={{ height: '100%', width: '100%' }} zoomControl={false}>
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      
      <RecenterAutomatically lat={userPosition.lat} lng={userPosition.lng} />

      <Marker position={[userPosition.lat, userPosition.lng]}>
        <Popup>Vous êtes ici</Popup>
      </Marker>

      {drivers.map(driver => (
        <DriverMarker key={driver.id} driver={driver} />
      ))}
    </MapContainer>
  );
};

export default MapView;
