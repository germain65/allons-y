// Fichier : src/components/ride/CancelRide.jsx
// Rôle : Modal pour confirmer l'annulation et demander la raison

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Modal from '../ui/Modal';

const CancelRide = ({ isOpen, onClose, onConfirm }) => {
  const { t } = useTranslation();
  const [reason, setReason] = useState('');

  const reasons = [
    { id: 'too_long', label: t('ride.tooLong') },
    { id: 'change_plans', label: t('ride.changePlans') },
    { id: 'price', label: t('ride.priceTooHigh') },
    { id: 'other', label: t('ride.other') },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('ride.whyCancel')}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
        {reasons.map(r => (
          <label key={r.id} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: '8px', cursor: 'pointer' }}>
            <input 
              type="radio" 
              name="cancelReason" 
              value={r.id}
              checked={reason === r.id}
              onChange={() => setReason(r.id)}
            />
            {r.label}
          </label>
        ))}
      </div>
      
      <div style={{ display: 'flex', gap: '1rem' }}>
        <button className="btn btn-outline" style={{ flex: 1 }} onClick={onClose}>Retour</button>
        <button 
          className="btn btn-danger" 
          style={{ flex: 1 }} 
          disabled={!reason}
          onClick={() => onConfirm(reason)}
        >
          {t('ride.confirmCancel')}
        </button>
      </div>
    </Modal>
  );
};

export default CancelRide;
