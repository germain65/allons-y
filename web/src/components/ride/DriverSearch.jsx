// Fichier : src/components/ride/DriverSearch.jsx
// Rôle : Écran d'attente pendant la recherche de chauffeur

import React from 'react';
import { useTranslation } from 'react-i18next';
import LoadingSpinner from '../ui/LoadingSpinner';

const DriverSearch = ({ onCancel }) => {
  const { t } = useTranslation();

  return (
    <div style={{ textAlign: 'center', padding: '2rem 0' }}>
      <LoadingSpinner size="60px" />
      <h3 style={{ marginTop: '1.5rem', marginBottom: '0.5rem' }}>{t('ride.searching')}</h3>
      <p style={{ marginBottom: '2rem' }}>Plusieurs chauffeurs examinent votre demande...</p>
      
      <button className="btn btn-danger" style={{ width: '100%' }} onClick={onCancel}>
        {t('ride.cancelRide')}
      </button>
    </div>
  );
};

export default DriverSearch;
