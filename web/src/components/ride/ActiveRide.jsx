// Fichier : src/components/ride/ActiveRide.jsx
// Rôle : Écran pendant la course

import React from 'react';
import { useTranslation } from 'react-i18next';

const ActiveRide = ({ eta, destination }) => {
  const { t } = useTranslation();

  return (
    <div style={{ textAlign: 'center' }}>
      <h2 style={{ color: 'var(--color-primary)', marginBottom: '0.5rem' }}>En route !</h2>
      <p style={{ marginBottom: '1.5rem' }}>Arrivée estimée dans <strong>{eta || 10} minutes</strong></p>
      
      <div className="card" style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
        <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: '0.25rem' }}>Destination</div>
        <div style={{ fontWeight: 'bold' }}>{destination?.name || 'Destination en cours...'}</div>
      </div>
      
      <button className="btn btn-outline" style={{ width: '100%' }}>
        Partager ma course
      </button>
    </div>
  );
};

export default ActiveRide;
