// Fichier : src/components/ride/DriverOffers.jsx
// Rôle : Affichage des offres reçues

import React from 'react';
import { useTranslation } from 'react-i18next';
import Avatar from '../ui/Avatar';

const DriverOffers = ({ offers, onAccept, onCancel }) => {
  const { t } = useTranslation();

  return (
    <div>
      <h3 style={{ marginBottom: '1rem' }}>Offres ({offers.length})</h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '300px', overflowY: 'auto', marginBottom: '1rem' }}>
        {offers.map(offer => (
          <div key={offer.id} className="card" style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem', animation: 'fadeIn 0.3s' }}>
            <Avatar src={offer.driver.photo} alt={offer.driver.firstName} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 'bold' }}>{offer.driver.firstName}</div>
              <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>⭐ {offer.driver.rating} • {offer.eta} min</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontWeight: 'bold', color: 'var(--color-primary)', marginBottom: '0.25rem' }}>{offer.price} FC</div>
              <button className="btn btn-primary" style={{ padding: '0.25rem 0.75rem', fontSize: '0.875rem' }} onClick={() => onAccept(offer.id)}>
                {t('ride.accept')}
              </button>
            </div>
          </div>
        ))}
      </div>

      <button className="btn btn-danger" style={{ width: '100%' }} onClick={onCancel}>
        {t('ride.cancelRide')}
      </button>
    </div>
  );
};

export default DriverOffers;
