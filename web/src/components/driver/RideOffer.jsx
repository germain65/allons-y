// Fichier : src/components/driver/RideOffer.jsx
// Rôle : Affichage d'une demande de course pour le chauffeur

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Avatar from '../ui/Avatar';

const RideOffer = ({ offer, onAccept, onProposePrice }) => {
  const { t } = useTranslation();
  const [showPropose, setShowPropose] = useState(false);
  const [customPrice, setCustomPrice] = useState(offer.price);

  return (
    <div className="card" style={{ animation: 'slideUp 0.3s' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
        <Avatar src={offer.rider.photo} alt={offer.rider.firstName} />
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 'bold' }}>{offer.rider.firstName}</div>
          <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>⭐ {offer.rider.rating}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>{offer.price} FC</div>
          <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>~{offer.distance} km</div>
        </div>
      </div>
      
      <div style={{ marginBottom: '1rem', fontSize: '0.875rem' }}>
        <div>🟢 {offer.pickupName}</div>
        <div style={{ marginLeft: '6px', borderLeft: '2px solid var(--color-border)', height: '10px', margin: '4px 0 4px 6px' }}></div>
        <div>🔴 {offer.destinationName}</div>
      </div>

      {!showPropose ? (
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button className="btn btn-outline" style={{ flex: 1 }} onClick={() => setShowPropose(true)}>
            {t('driver.proposePrice')}
          </button>
          <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => onAccept(offer.id, offer.price)}>
            {t('ride.accept')}
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <input 
            type="number" 
            className="input" 
            value={customPrice} 
            onChange={(e) => setCustomPrice(e.target.value)}
            style={{ flex: 1 }}
          />
          <button className="btn btn-primary" onClick={() => onProposePrice(offer.id, customPrice)}>
            Envoyer
          </button>
        </div>
      )}
    </div>
  );
};

export default RideOffer;
