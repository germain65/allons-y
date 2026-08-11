// Fichier : src/components/ride/DriverArriving.jsx
// Rôle : Écran quand le chauffeur est en route vers le client

import React from 'react';
import { useTranslation } from 'react-i18next';
import Avatar from '../ui/Avatar';

const DriverArriving = ({ driver, eta, onContact, onCancel }) => {
  const { t } = useTranslation();

  return (
    <div>
      <h3 style={{ textAlign: 'center', marginBottom: '1.5rem', color: 'var(--color-primary)' }}>
        {t('ride.driverArriving', { time: eta || 3 })}
      </h3>

      <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
        <Avatar src={driver?.photo} alt={driver?.firstName} size="lg" />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{driver?.firstName || 'Chauffeur'}</div>
          <div style={{ color: 'var(--color-text-secondary)' }}>⭐ {driver?.rating || '4.9'}</div>
          <div style={{ marginTop: '0.25rem', fontWeight: 'bold' }}>{driver?.licensePlate || '1234 AB 56'}</div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <button className="btn btn-outline" style={{ flex: 1 }} onClick={onContact}>
          📞 {t('ride.contactDriver')}
        </button>
        <button className="btn btn-danger" style={{ flex: 1 }} onClick={onCancel}>
          {t('ride.cancelRide')}
        </button>
      </div>
    </div>
  );
};

export default DriverArriving;
