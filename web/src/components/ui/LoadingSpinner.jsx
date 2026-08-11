// Fichier : src/components/ui/LoadingSpinner.jsx
// Rôle : Spinner de chargement animé

import React from 'react';

const LoadingSpinner = ({ size = '40px', color = 'var(--color-primary)' }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
      <div style={{
        width: size,
        height: size,
        border: `4px solid ${color}`,
        borderTopColor: 'transparent',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }} />
    </div>
  );
};

export default LoadingSpinner;
