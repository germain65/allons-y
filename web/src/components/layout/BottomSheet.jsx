// Fichier : src/components/layout/BottomSheet.jsx
// Rôle : Composant Bottom Sheet avec drag

import React, { useState, useRef, useEffect } from 'react';

const BottomSheet = ({ children, initialHeight = '50vh' }) => {
  const [height, setHeight] = useState(initialHeight);
  const sheetRef = useRef(null);
  
  // Implémentation simplifiée du drag pour V1 (click sur le handle pour toggle)
  const toggleHeight = () => {
    if (height === '50vh') setHeight('90vh');
    else if (height === '90vh') setHeight('20vh');
    else setHeight('50vh');
  };

  return (
    <div 
      ref={sheetRef}
      className="bottom-sheet"
      style={{ height, transition: 'height 0.3s ease' }}
    >
      <div 
        onClick={toggleHeight}
        style={{ 
          width: '40px', height: '4px', backgroundColor: 'var(--color-border)', 
          margin: '0 auto 1rem', borderRadius: '2px', cursor: 'pointer' 
        }}
      />
      <div style={{ height: 'calc(100% - 20px)', overflowY: 'auto', paddingBottom: '2rem' }}>
        {children}
      </div>
    </div>
  );
};

export default BottomSheet;
