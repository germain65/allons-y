// Fichier : src/components/driver/DriverDashboard.jsx
// Rôle : Tableau de bord du chauffeur dans le bottom sheet

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import RideOffer from './RideOffer';

const DriverDashboard = ({ isOnline, onToggleOnline, offers, onAcceptOffer, onProposePrice }) => {
  const { t } = useTranslation();

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ margin: 0 }}>Dashboard</h2>
        <button 
          className={`btn ${isOnline ? 'btn-success' : 'btn-outline'}`}
          style={{ backgroundColor: isOnline ? 'var(--color-success)' : 'transparent', color: isOnline ? 'white' : 'var(--color-text)' }}
          onClick={onToggleOnline}
        >
          {isOnline ? t('main.online') : t('main.offline')}
        </button>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <div className="card" style={{ flex: 1, textAlign: 'center', padding: '1rem' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>12</div>
          <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Courses ajd</div>
        </div>
        <div className="card" style={{ flex: 1, textAlign: 'center', padding: '1rem' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>4.8</div>
          <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Note moy.</div>
        </div>
      </div>

      {isOnline && offers.length > 0 && (
        <div>
          <h3 style={{ marginBottom: '1rem' }}>Demandes à proximité</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {offers.map(offer => (
              <RideOffer key={offer.id} offer={offer} onAccept={onAcceptOffer} onProposePrice={onProposePrice} />
            ))}
          </div>
        </div>
      )}

      {isOnline && offers.length === 0 && (
        <div style={{ textAlign: 'center', padding: '2rem 0', color: 'var(--color-text-secondary)' }}>
          En attente de demandes...
        </div>
      )}
    </div>
  );
};

export default DriverDashboard;
