// Fichier : src/components/driver/ActiveTrip.jsx
// Rôle : Course en cours côté chauffeur

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Avatar from '../ui/Avatar';

const ActiveTrip = ({ trip, onArrived, onFinishTrip, onContactRider }) => {
  const { t } = useTranslation();
  const [status, setStatus] = useState('heading_to_pickup'); // heading_to_pickup, waiting, in_progress

  return (
    <div>
      <h2 style={{ color: 'var(--color-primary)', marginBottom: '1.5rem', textAlign: 'center' }}>
        {status === 'heading_to_pickup' ? 'En route vers le client' : status === 'waiting' ? 'En attente du client' : 'Course en cours'}
      </h2>

      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <Avatar src={trip?.rider?.photo} alt={trip?.rider?.firstName} />
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 'bold' }}>{trip?.rider?.firstName}</div>
            <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>⭐ {trip?.rider?.rating}</div>
          </div>
          <button className="btn btn-outline" style={{ padding: '0.5rem' }} onClick={onContactRider}>
            📞
          </button>
        </div>

        <div style={{ fontSize: '0.875rem' }}>
          <div>🟢 {trip?.pickupName || 'Point de départ'}</div>
          <div style={{ marginLeft: '6px', borderLeft: '2px solid var(--color-border)', height: '10px', margin: '4px 0 4px 6px' }}></div>
          <div>🔴 {trip?.destinationName || 'Destination'}</div>
        </div>
      </div>

      {status === 'heading_to_pickup' && (
        <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => { setStatus('waiting'); onArrived(); }}>
          {t('driver.informArrival')}
        </button>
      )}

      {status === 'waiting' && (
        <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => setStatus('in_progress')}>
          Démarrer la course
        </button>
      )}

      {status === 'in_progress' && (
        <button className="btn btn-success" style={{ width: '100%', backgroundColor: 'var(--color-success)', color: 'white' }} onClick={onFinishTrip}>
          Terminer la course ({trip?.price || 0} FC)
        </button>
      )}
    </div>
  );
};

export default ActiveTrip;
