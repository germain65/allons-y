// Fichier : src/components/layout/BottomSheet.jsx
// Rôle : Composant Bottom Sheet avec drag et style ultra-moderne

import React, { useState, useRef, useEffect } from 'react';

const BottomSheet = ({ children, initialHeight = '50vh' }) => {
  const [height, setHeight] = useState(initialHeight);
  const sheetRef = useRef(null);

  useEffect(() => {
    setHeight(initialHeight);
  }, [initialHeight]);
  
  const toggleHeight = () => {
    if (height === '38vh' || height === '50vh') setHeight('85vh');
    else if (height === '85vh') setHeight('25vh');
    else setHeight('38vh');
  };

  return (
    <div 
      ref={sheetRef}
      className="bottom-sheet"
      style={{ 
        height, 
        transition: 'height 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderTopLeftRadius: '24px',
        borderTopRightRadius: '24px',
        boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.08)',
        border: '1px solid rgba(255,255,255,0.4)',
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 40,
        overflow: 'hidden'
      }}
    >
      <div 
        onClick={toggleHeight}
        style={{ 
          padding: '12px 0 20px 0',
          cursor: 'grab',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%'
        }}
        title="Glisser ou cliquer pour agrandir"
      >
        <div className="drag-handle" style={{
          width: '40px',
          height: '5px',
          backgroundColor: 'var(--border-default, #E5E7EB)',
          borderRadius: '10px',
          boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)'
        }} />
      </div>
      <div style={{ height: 'calc(100% - 37px)', overflowY: 'auto', paddingBottom: '2rem' }}>
        {children}
      </div>
    </div>
  );
};

export default BottomSheet;

