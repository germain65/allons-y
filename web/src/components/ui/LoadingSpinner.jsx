// Fichier : src/components/ui/LoadingSpinner.jsx
// Rôle : Spinner de chargement animé ultra-premium

import React from 'react';

const LoadingSpinner = ({ size = '40px', color = 'var(--primary, var(--color-primary))' }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
      <div 
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          background: `conic-gradient(from 0deg, transparent 0%, transparent 20%, ${color} 100%)`,
          WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 4px), black 0)',
          mask: 'radial-gradient(farthest-side, transparent calc(100% - 4px), black 0)',
          animation: 'spin 0.8s cubic-bezier(0.4, 0, 0.2, 1) infinite'
        }} 
      />
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;
