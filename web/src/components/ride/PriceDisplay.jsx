// Fichier : src/components/ride/PriceDisplay.jsx
// Rôle : Affichage du prix et sélection du véhicule

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const PriceDisplay = ({ basePrice = 2000, onConfirm }) => {
  const { t } = useTranslation();
  const [vehicle, setVehicle] = useState('moto');
  const [customPrice, setCustomPrice] = useState(basePrice);

  return (
    <div className="card" style={{ marginTop: '1rem' }}>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
        <button 
          className={`btn ${vehicle === 'moto' ? 'btn-primary' : 'btn-outline'}`}
          style={{ flex: 1 }}
          onClick={() => setVehicle('moto')}
        >
          🏍️ Moto
        </button>
        <button 
          className={`btn ${vehicle === 'taxi' ? 'btn-primary' : 'btn-outline'}`}
          style={{ flex: 1 }}
          onClick={() => setVehicle('taxi')}
        >
          🚕 Taxi
        </button>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>
          {customPrice} FC
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1rem' }}>
          <button className="btn btn-outline" onClick={() => setCustomPrice(p => Math.max(500, p - 500))}>- 500</button>
          <button className="btn btn-outline" onClick={() => setCustomPrice(p => p + 500)}>+ 500</button>
        </div>
      </div>

      <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => onConfirm(customPrice, vehicle)}>
        {t('ride.findDriver')}
      </button>
    </div>
  );
};

export default PriceDisplay;
